export type LeadPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  service: string; // software | digital | automation | innovation | templates | other
  message: string;
  lang: 'es' | 'en';
  source: string;
  page: string;
  submittedAt: string; // ISO 8601
};

/**
 * Dónde se guardan los leads: define VITE_LEADS_ENDPOINT en tu archivo .env
 * (por ejemplo, un webhook de Make / n8n / Zapier, Formspree, una función
 * de Supabase o tu propio backend). Recibe un POST con el JSON de LeadPayload.
 */
const ENDPOINT = import.meta.env.VITE_LEADS_ENDPOINT as string | undefined;

export async function submitLead(lead: LeadPayload): Promise<void> {
  if (!ENDPOINT) {
    if (import.meta.env.DEV) {
      // En desarrollo, sin endpoint: simula el envío para poder probar el formulario
      console.info('[leads] Modo desarrollo: no se envió a ningún servidor.', lead);
      await new Promise((resolve) => setTimeout(resolve, 900));
      return;
    }
    // En producción un lead nunca debe perderse en silencio
    throw new Error('VITE_LEADS_ENDPOINT no está configurado');
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`No se pudo guardar el lead (HTTP ${res.status})`);
}