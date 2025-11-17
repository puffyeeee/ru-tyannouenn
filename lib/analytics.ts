export function logAnalyticsEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", eventName, params);
}
