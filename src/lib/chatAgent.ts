import type { Lang } from '@/i18n/translations';

export type ChatMessage = { role: 'user' | 'assistant'; text: string };

const ENDPOINT = import.meta.env.VITE_MAKE_CHAT_ENDPOINT as string | undefined;

type AgentResponse = Partial<Record<'response' | 'reply' | 'message' | 'output' | 'text', unknown>>;

/** Envía el mensaje del visitante al webhook de Make y devuelve la respuesta del agente. */
export async function askAgent({
  sessionId,
  lang,
  message,
  signal,
}: {
  sessionId: string;
  lang: Lang;
  message: string;
  signal: AbortSignal;
}): Promise<string> {
  if (!ENDPOINT) throw new Error('VITE_MAKE_CHAT_ENDPOINT no está configurado');

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
    body: JSON.stringify({ conversationID: sessionId, message, lang }),
  });
  if (!res.ok) throw new Error(`El agente respondió con HTTP ${res.status}`);

  const data: AgentResponse = await res.json();
  const reply = [data.response, data.reply, data.message, data.output, data.text].find(
    (v): v is string => typeof v === 'string' && v.trim() !== ''
  );
  if (!reply) throw new Error('Respuesta vacía del agente');
  return reply.trim();
}