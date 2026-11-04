/**
 * One place for every fact about the business.
 * Anything wrapped in [BRACKETS] is a placeholder. Search for "[" before launch.
 */

export const site = {
  name: 'UNBORING PEOPLE',
  url: 'https://unboringpeople.com',
  tagline: 'Make boring brands unforgettable.',
  positioning: 'We make brands impossible to ignore.',
  belief: "Great brands don't need to shout louder. They need to give people something worth talking about.",
  lines: [
    'Ordinary is not our thing.',
    'Less boring. More business.',
    "Don't just exist. Make an impact.",
    'Attention is just the beginning.',
    'Different thinking. Real growth.',
  ],

  contact: {
    whatsappNumber: '917777949735', // wa.me format: country code + number, no spaces or plus
    whatsappDisplay: '+91 77779 49735',
    email: 'bored@unboringpeople.com',
    instagram: 'unboringpeople',
  },

  places: {
    home: { city: 'Surat', country: 'India', timeZone: 'Asia/Kolkata', label: 'IST', role: 'Head office' },
    away: { city: 'New Jersey', country: 'USA', timeZone: 'America/New_York', label: 'ET', role: 'Remote team' },
    address: {
      street: '8, Malhar Complex, Ichhanath Road, Piplod',
      city: 'Surat',
      region: 'Gujarat',
      postalCode: '395007',
      country: 'IN',
    },
  },

  founding: {
    totalSeats: 3,
    /**
     * Add one entry per signed founding client. The seat shows "Taken: a café in Surat".
     * Add `name` only if the client agreed to be named publicly.
     * Example: { industry: 'café', city: 'Surat' }
     */
    taken: [{ industry: 'lighting', city: 'Surat', name: 'Lumin Art' }] as {
      industry: string;
      city: string;
      name?: string;
    }[],
  },

  /**
   * The client featured on the homepage and /founding. Facts only: who they are and what they make.
   * Add results here only when they're real, measured and approved.
   */
  client: {
    name: 'Lumin Art',
    what: 'Custom architectural and decorative lighting',
    forWho: 'architects, interior designers and premium homes',
    where: 'Surat, with projects across India',
    instagram: 'luminart_lights',
  },

  forms: {
    // Netlify Forms picks up any <form data-netlify="true" name="..."> at build time. No endpoint to set.
    talkFormName: 'talk',
  },

  analytics: {
    ga4Id: '[GA4 MEASUREMENT ID]', // looks like G-XXXXXXXXXX
    metaPixelId: '[META PIXEL ID]', // 15-16 digit number
  },
} as const;

/** True while a value is still a [PLACEHOLDER]. Components use this to avoid shipping broken links. */
export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value);

export const nav = [
  { href: '/services', label: 'Services', verb: 'read' },
  { href: '/lab', label: 'The Lab', verb: 'steal' },
  { href: '/founding', label: 'Founding seats', verb: 'sit' },
  { href: '/manifesto', label: 'Manifesto', verb: 'read' },
  { href: '/talk', label: 'Talk', verb: 'talk' },
] as const;

export const primaryCta = { href: '/test', label: 'Take the Boring Test', verb: 'test' } as const;

/** Builds a wa.me link with the message already typed. */
export function whatsappLink(message: string) {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const emailLine = 'Bored of your marketing?';

export const defaultWhatsappMessage = "Hi UNBORING PEOPLE! I'd like my free Unboring Audit.";

export function mailtoLink(subject: string, body = '') {
  if (isPlaceholder(site.contact.email)) return null;
  const q = new URLSearchParams({ subject, body }).toString().replace(/\+/g, '%20');
  return `mailto:${site.contact.email}?${q}`;
}
