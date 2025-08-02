/**
 * Application configuration
 * Centralized configuration management for the V0 Toolkit
 */

export const config = {
  // Application metadata
  app: {
    name: "V0 Toolkit",
    description: "Professional toolkit for V0 development",
    version: "1.0.0",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    repository: "https://github.com/headline-design/v0toolkit",
  },

  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
    timeout: 10000,
    retries: 3,
  },

  // Database configuration
  database: {
    url: process.env.DATABASE_URL,
    maxConnections: 10,
    connectionTimeout: 30000,
  },

  // Search configuration
  search: {
    provider: "local", // 'local' | 'algolia' | 'elasticsearch'
    indexName: "v0-toolkit",
    maxResults: 50,
    facetLimit: 20,
  },

  // Analytics configuration
  analytics: {
    enabled: !!process.env.NEXT_PUBLIC_ANALYTICS_ID,
    provider: "vercel", // 'vercel' | 'google' | 'plausible'
    id: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  },

  // Feature flags
  features: {
    promptGenerator: true,
    analytics: true,
    userAccounts: false,
    collaboration: false,
    realTimeCollaboration: false,
    aiAssistant: false,
    advancedAnalytics: true,
    communityContributions: true,
  },

  // Content limits
  limits: {
    maxPatterns: 1000,
    maxPrompts: 500,
    maxExamples: 200,
    maxTagsPerItem: 10,
    maxCodeLength: 50000,
    maxDescriptionLength: 1000,
  },

  // UI configuration
  ui: {
    itemsPerPage: 12,
    maxSearchResults: 100,
    debounceMs: 300,
    animationDuration: 200,
  },

  // V0-specific configuration
  v0: {
    apiUrl: "https://v0.dev/api",
    supportedVersions: ["1.0", "1.1", "1.2"],
    maxTokens: 4000,
    defaultModel: "gpt-4",
  },
} as const

// Type-safe environment variables
export const env = {
  NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
  DATABASE_URL: process.env.DATABASE_URL!,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
} as const

// Validation for required environment variables
const requiredEnvVars = ["DATABASE_URL", "NEXT_PUBLIC_APP_URL"] as const

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}
