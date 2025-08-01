/**
 * Analytics utilities for tracking user interactions
 * Privacy-focused analytics implementation
 */

interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

class Analytics {
  private isEnabled = false

  constructor() {
    // Only enable analytics in production and with user consent
    this.isEnabled =
      process.env.NODE_ENV === "production" &&
      typeof window !== "undefined" &&
      localStorage.getItem("analytics-consent") === "true"
  }

  /**
   * Track a custom event
   */
  track(event: AnalyticsEvent) {
    if (!this.isEnabled) return

    // Implementation would integrate with your analytics provider
    // For now, we'll use a privacy-focused approach
    console.log("Analytics Event:", event)

    // Example: Send to your analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // })
  }

  /**
   * Track page views
   */
  page(path: string) {
    this.track({
      name: "page_view",
      properties: { path },
    })
  }

  /**
   * Track pattern usage
   */
  trackPatternView(patternId: string, category: string) {
    this.track({
      name: "pattern_viewed",
      properties: { patternId, category },
    })
  }

  /**
   * Track prompt copying
   */
  trackPromptCopy(promptId: string, category: string) {
    this.track({
      name: "prompt_copied",
      properties: { promptId, category },
    })
  }

  /**
   * Track example interactions
   */
  trackExampleInteraction(exampleId: string, action: "view" | "demo" | "github") {
    this.track({
      name: "example_interaction",
      properties: { exampleId, action },
    })
  }
}

export const analytics = new Analytics()
