// Envoi des demandes du site par e-mail via FormSubmit (fonctionne sur un site statique comme GitHub Pages).
// Au tout premier envoi, FormSubmit adresse un e-mail d'activation à LEAD_EMAIL : il faut cliquer le lien une fois.
export const LEAD_EMAIL = 'contact@adn-administration.fr';
const ENDPOINT = `https://formsubmit.co/ajax/${LEAD_EMAIL}`;

// FormSubmit refuse les envois trop lourds : au-delà, le client est invité à envoyer ses pièces par e-mail.
export const MAX_ATTACHMENTS_BYTES = 5 * 1024 * 1024;

export async function sendLead(
  subject: string,
  fields: Record<string, string>,
  files: File[] = [],
  replyTo?: string
): Promise<void> {
  const data = new FormData();
  data.append('_subject', subject);
  data.append('_template', 'table');
  data.append('_captcha', 'false');
  if (replyTo && replyTo.includes('@')) data.append('_replyto', replyTo);
  for (const [key, value] of Object.entries(fields)) data.append(key, value);
  files.forEach((file, i) => data.append(`piece_jointe_${i + 1}`, file, file.name));

  const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Envoi impossible (${res.status})`);
  const json = await res.json().catch(() => ({}));
  if (json.success === false || json.success === 'false') throw new Error(json.message || 'Envoi impossible');
}
