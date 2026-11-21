import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, CornerDownRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { submitLead } from "@/lib/leads";
import { useLang } from "@/i18n/LanguageContext";

/* ---------- Tipos y validación ---------- */

type FieldName = "firstName" | "lastName" | "phone" | "email" | "company" | "service" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, "required" | "email" | "phone">>;

const EMPTY: Values = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  company: "",
  service: "",
  message: "",
};
const REQUIRED: FieldName[] = ["firstName", "lastName", "phone", "email", "service", "message"];
const ORDER: FieldName[] = ["firstName", "lastName", "phone", "email", "company", "service", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (v: Values): Errors => {
  const errors: Errors = {};
  REQUIRED.forEach((name) => {
    if (!v[name].trim()) errors[name] = "required";
  });
  if (!errors.email && !EMAIL_RE.test(v.email.trim())) errors.email = "email";
  if (!errors.phone) {
    const digits = v.phone.replace(/\D/g, "");
    if (!/^[\d\s()+\-.]+$/.test(v.phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = "phone";
    }
  }
  return errors;
};

/* ---------- Estilos compartidos ---------- */

const focusDark =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B1020]";

const controlClass = (invalid: boolean) =>
  `block w-full rounded-lg bg-[#EEF2FB] px-3.5 py-3 font-sans text-sm text-[#0B1020] placeholder-[#8A94AD] outline-none ring-2 transition-shadow duration-200 ${
    invalid ? "ring-[#D14343]" : "ring-transparent focus:ring-[#3267FD]"
  }`;

/** Etiqueta arriba del campo + mensaje de error debajo. */
const Field = ({
  name,
  label,
  error,
  className = "",
  children,
}: {
  name: FieldName;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) => (
  <div className={className}>
    <label
      htmlFor={`field-${name}`}
      className="mb-1.5 block font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#0B1020]/80"
    >
      {label}
    </label>
    {children}
    {error && (
      <p id={`err-${name}`} role="alert" className="mt-1.5 font-sans text-xs text-[#C62A2F]">
        {error}
      </p>
    )}
  </div>
);

/* ---------- Sección ---------- */

const Contact = () => {
  const { t, lang } = useLang();
  const f = t.contact.form;

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as FieldName;
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Props comunes de cada control (se usan con {...control("campo")})
  const control = (name: FieldName, extraClass = "") => ({
    id: `field-${name}`,
    name,
    value: values[name],
    onChange,
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `err-${name}` : undefined,
    className: `${controlClass(!!errors[name])} ${extraClass}`,
  });
  const errorText = (name: FieldName) => (errors[name] ? f.errors[errors[name]!] : undefined);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    // Trampa para bots: si el campo oculto tiene texto, fingimos éxito sin enviar nada
    if (honeypotRef.current?.value) {
      setStatus("success");
      return;
    }

    const found = validate(values);
    setErrors(found);
    const firstInvalid = ORDER.find((n) => found[n]);
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await submitLead({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        service: values.service,
        message: values.message.trim(),
        lang,
        source: "landing-contacto",
        page: window.location.href,
        submittedAt: new Date().toISOString(),
      });
      setValues(EMPTY);
      setStatus("success");
    } catch (err) {
      console.error("Error al enviar el lead:", err);
      setStatus("error");
    }
  };

  const sending = status === "sending";
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(t.contact.mailSubject)}`;
  const phoneHref = `tel:${SITE.phone.replace(/[^\d+]/g, "")}`;
  const mapQuery = encodeURIComponent(SITE.address);
  const linkClass = `underline decoration-[#0B1020]/40 underline-offset-4 transition-colors hover:decoration-[#0B1020] ${focusDark}`;
  const infoLabel = "font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#0B1020]/70";
  const infoValue = "mt-1.5 font-display text-lg font-bold sm:text-xl";

  return (
    <section
      id="contacto"
      className="relative scroll-mt-20 bg-[#00E1F7] py-24 text-[#0B1020] lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
          {/* Mensaje principal */}
          <div className="lg:col-span-5 lg:row-start-1">
            <p className="flex items-center gap-3 font-sans text-[11px] font-bold tracking-[0.2em]">
              <span aria-hidden className="block h-px w-10 bg-[#0B1020]" />
              {t.contact.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight [text-wrap:balance] sm:text-5xl lg:text-[3.5rem]">
              {t.contact.title}
            </h2>
            <p className="mt-6 max-w-sm font-sans text-lg leading-relaxed">{t.contact.text}</p>
            <a
              href={mailto}
              className={`mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#0B1020] px-7 py-3.5 font-display text-sm font-bold text-white transition-colors duration-200 hover:bg-[#3267FD] ${focusDark}`}
            >
              {t.contact.cta}
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
            </a>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div className="rounded-3xl bg-white p-6 shadow-[8px_8px_0_0_#0B1020] sm:p-8 sm:shadow-[10px_10px_0_0_#0B1020]">
              {status === "success" ? (
                <div
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  className="flex min-h-[420px] flex-col items-start justify-center outline-none"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00E1F7]">
                    <Check size={26} strokeWidth={3} aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {f.success.title}
                  </h3>
                  <p className="mt-3 max-w-sm font-sans text-base leading-relaxed text-[#0B1020]/70">
                    {f.success.text}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className={`mt-8 font-sans text-sm font-semibold text-[#3267FD] underline underline-offset-4 ${focusDark}`}
                  >
                    {f.success.again}
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h3 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                    {f.heading}
                  </h3>

                  <div className="mt-6 grid gap-x-4 gap-y-4 sm:grid-cols-2">
                    <Field name="firstName" label={f.firstName} error={errorText("firstName")}>
                      <input
                        {...control("firstName")}
                        type="text"
                        placeholder={f.placeholders.firstName}
                        autoComplete="given-name"
                        maxLength={120}
                      />
                    </Field>
                    <Field name="lastName" label={f.lastName} error={errorText("lastName")}>
                      <input
                        {...control("lastName")}
                        type="text"
                        placeholder={f.placeholders.lastName}
                        autoComplete="family-name"
                        maxLength={120}
                      />
                    </Field>
                    <Field name="phone" label={f.phone} error={errorText("phone")}>
                      <input
                        {...control("phone")}
                        type="tel"
                        inputMode="tel"
                        placeholder={f.placeholders.phone}
                        autoComplete="tel"
                        maxLength={20}
                      />
                    </Field>
                    <Field name="email" label={f.email} error={errorText("email")}>
                      <input
                        {...control("email")}
                        type="email"
                        inputMode="email"
                        placeholder={f.placeholders.email}
                        autoComplete="email"
                        maxLength={120}
                      />
                    </Field>
                    <Field
                      className="sm:col-span-2"
                      name="company"
                      label={`${f.company} (${f.optional})`}
                      error={errorText("company")}
                    >
                      <input
                        {...control("company")}
                        type="text"
                        placeholder={f.placeholders.company}
                        autoComplete="organization"
                        maxLength={120}
                      />
                    </Field>
                    <Field
                      className="sm:col-span-2"
                      name="service"
                      label={f.service}
                      error={errorText("service")}
                    >
                      <div className="relative">
                        <select
                          {...control("service", `cursor-pointer appearance-none pr-10 ${values.service ? "" : "text-[#8A94AD]"}`)}
                        >
                          <option value="" disabled>
                            {f.placeholders.service}
                          </option>
                          {f.serviceOptions.map((o) => (
                            <option key={o.value} value={o.value} className="text-[#0B1020]">
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={18}
                          aria-hidden
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0B1020]"
                        />
                      </div>
                    </Field>
                    <Field
                      className="sm:col-span-2"
                      name="message"
                      label={f.message}
                      error={errorText("message")}
                    >
                      <textarea
                        {...control("message", "resize-none")}
                        rows={4}
                        maxLength={1000}
                        placeholder={f.placeholders.message}
                      />
                    </Field>
                  </div>

                  {/* Campo trampa para bots (invisible para personas) */}
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  {status === "error" && (
                    <p role="alert" className="mt-5 font-sans text-sm text-[#C62A2F]">
                      {f.errors.send}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    aria-busy={sending}
                    className={`mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#3267FD] py-3.5 font-display text-sm font-bold text-white transition-colors duration-200 hover:bg-[#0B1020] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#3267FD] ${focusDark}`}
                  >
                    {sending ? f.sending : f.submit}
                    {!sending && <ArrowRight size={16} strokeWidth={2.5} aria-hidden />}
                  </button>
                  <p className="mt-3 text-center font-sans text-xs leading-relaxed text-[#0B1020]/60">
                    {f.privacy}
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Datos de contacto + mapa */}
          <div className="lg:col-span-5 lg:row-start-2">
            <dl className="border-t border-[#0B1020]/20 font-sans">
              <div className="border-b border-[#0B1020]/20 py-4">
                <dt className={infoLabel}>{f.infoEmail}</dt>
                <dd className={`${infoValue} break-all`}>
                  <a href={`mailto:${SITE.email}`} className={linkClass}>
                    {SITE.email}
                  </a>
                </dd>
              </div>

              {SITE.phone && (
                <div className="border-b border-[#0B1020]/20 py-4">
                  <dt className={infoLabel}>{f.infoPhone}</dt>
                  <dd className={infoValue}>
                    <a href={phoneHref} className={linkClass}>
                      {SITE.phone}
                    </a>
                  </dd>
                </div>
              )}

              {SITE.whatsapp && (
                <div className="border-b border-[#0B1020]/20 py-4">
                  <dt className={infoLabel}>WhatsApp</dt>
                  <dd className="mt-1.5 text-base font-semibold">
                    <a
                      href={`https://wa.me/${SITE.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 ${linkClass}`}
                    >
                      <CornerDownRight size={16} aria-hidden />
                      {t.contact.whatsapp}
                    </a>
                  </dd>
                </div>
              )}

              {SITE.address && (
                <div className="border-b border-[#0B1020]/20 py-4">
                  <dt className={infoLabel}>{f.infoAddress}</dt>
                  <dd className={infoValue}>{SITE.address}</dd>
                </div>
              )}
            </dl>

            {/* {SITE.address && (
              <div className="relative mt-8 overflow-hidden rounded-2xl bg-white shadow-[8px_8px_0_0_#0B1020]">
                <iframe
                  title={`${f.infoAddress}: ${SITE.address}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block h-56 w-full border-0 sm:h-64"
                />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#0B1020] px-4 py-2 font-sans text-xs font-bold text-white transition-colors hover:bg-[#3267FD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t.contact.openMap}
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;