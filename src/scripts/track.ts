/**
 * One call for every custom event. Sends to GA4 and the Meta Pixel when they're loaded (Milestone 6 adds the
 * loaders, behind the cookie notice), and does nothing otherwise. Never throws: tracking must not break the page.
 */
export type TrackEvent =
  | 'test_started'
  | 'test_completed'
  | 'whatsapp_click'
  | 'result_card_downloaded'
  | 'lab_idea_shuffled'
  | 'email_click';

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: TrackEvent, params: Params = {}) {
  const page = location.pathname;
  const data = { page, ...params };
  try {
    window.gtag?.('event', event, data);
    window.fbq?.('trackCustom', event, data);
  } catch {
    /* ignore */
  }
  if (import.meta.env.DEV) console.debug('[track]', event, data);
}

/** Wires every element with data-track="event" (and optional data-source) on the page. Call once per page. */
export function bindTracking(root: ParentNode = document) {
  root.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
    if (!el) return;
    track(el.dataset.track as TrackEvent, { source: el.dataset.source });
  });
}
