/**
 * Opens a WhatsApp URL reliably on mobile and desktop.
 *
 * On mobile: uses window.location.href so the OS hands off directly to the
 * WhatsApp app without a new browser tab. A new tab is the source of
 * unreliability when both WhatsApp and WhatsApp Business are installed —
 * the blank tab's redirect triggers an OS-level app picker that can fail.
 *
 * On desktop: opens a new tab as expected.
 */
export function openWhatsApp(url) {
  if (typeof window === 'undefined') return;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
