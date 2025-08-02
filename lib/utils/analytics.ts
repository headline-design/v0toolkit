/**
 * Analytics utilities for V0 Toolkit
 * Track usage of prompts and profiles for insights
 */

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp: Date
}

class AnalyticsService {
  private readonly STORAGE_KEY = "v0-toolkit-analytics"
  private events: AnalyticsEvent[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.loadEvents()
    }
  }

  private loadEvents() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        this.events = JSON.parse(stored).map((event: any) => ({
          ...event,
          timestamp: new Date(event.timestamp),
        }))
      }
    } catch (error) {
      console.error("Failed to load analytics events:", error)
    }
  }

  private saveEvents() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events))
    } catch (error) {
      console.error("Failed to save analytics events:", error)
    }
  }

  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date(),
    }

    this.events.push(analyticsEvent)

    // Keep only last 1000 events
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000)
    }

    this.saveEvents()

    // In production, you might want to send this to an analytics service
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics Event:", analyticsEvent)
    }
  }

  getEvents(eventName?: string): AnalyticsEvent[] {
    if (eventName) {
      return this.events.filter((event) => event.event === eventName)
    }
    return this.events
  }

  getEventCounts(): Record<string, number> {
    const counts: Record<string, number> = {}
    this.events.forEach((event) => {
      counts[event.event] = (counts[event.event] || 0) + 1
    })
    return counts
  }

  clearEvents() {
    this.events = []
    this.saveEvents()
  }
}

export const analytics = new AnalyticsService()

// Convenience functions for common events
export const trackPromptGenerated = (templateId: string, category: string) => {
  analytics.track("prompt_generated", { templateId, category })
}

export const trackProfileCreated = (profileId: string, category: string, fromTemplate: boolean) => {
  analytics.track("profile_created", { profileId, category, fromTemplate })
}

export const trackProfileUsed = (profileId: string, taskId?: string) => {
  analytics.track("profile_used", { profileId, taskId })
}

export const trackPromptCopied = (source: "generator" | "profile") => {
  analytics.track("prompt_copied", { source })
}
