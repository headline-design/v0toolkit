"use client"

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Github, ExternalLink, Bug, Lightbulb, Zap, FileText, HelpCircle, Copy, Download, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const issueTemplates = {
  bug: {
    title: 'Bug Report Template',
    icon: Bug,
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    template: `---
name: Bug Report
about: Create a report to help us improve V0
title: '[BUG] '
labels: bug
assignees: ''
---

## Bug Description
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear and concise description of what you expected to happen.

## Actual Behavior
A clear and concise description of what actually happened.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
- Browser: [e.g. Chrome 120.0.0]
- OS: [e.g. macOS 14.2, Windows 11]
- V0 Version: [e.g. 1.2.3]
- Node.js Version: [e.g. 18.19.0]

## Additional Context
Add any other context about the problem here.`
  },
  feature: {
    title: 'Feature Request Template',
    icon: Lightbulb,
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    template: `---
name: Feature Request
about: Suggest an idea for V0
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

## Feature Description
A clear and concise description of what you want to happen.

## Problem Statement
Is your feature request related to a problem? Please describe.
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

## Proposed Solution
Describe the solution you'd like.
A clear and concise description of what you want to happen.

## Alternative Solutions
Describe alternatives you've considered.
A clear and concise description of any alternative solutions or features you've considered.

## Use Cases
Describe specific use cases where this feature would be helpful.

## Additional Context
Add any other context or screenshots about the feature request here.`
  },
  enhancement: {
    title: 'Enhancement Template',
    icon: Zap,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    template: `---
name: Enhancement
about: Suggest an improvement to existing functionality
title: '[ENHANCEMENT] '
labels: enhancement
assignees: ''
---

## Current Behavior
Describe how the feature currently works.

## Proposed Enhancement
Describe the improvement you'd like to see.

## Benefits
Explain how this enhancement would improve the user experience or functionality.

## Implementation Ideas
If you have ideas about how this could be implemented, please share them.

## Additional Context
Add any other context or screenshots about the enhancement here.`
  },
  documentation: {
    title: 'Documentation Template',
    icon: FileText,
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    template: `---
name: Documentation
about: Report missing or incorrect documentation
title: '[DOCS] '
labels: documentation
assignees: ''
---

## Documentation Issue
Describe what documentation is missing, incorrect, or unclear.

## Location
Where is this documentation located (or where should it be)?

## Current State
What does the current documentation say (if anything)?

## Suggested Improvement
What should the documentation say instead?

## Additional Context
Add any other context about the documentation issue here.`
  },
  question: {
    title: 'Question Template',
    icon: HelpCircle,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    template: `---
name: Question
about: Ask a question about V0
title: '[QUESTION] '
labels: question
assignees: ''
---

## Question
What would you like to know?

## Context
Provide any relevant context or background information.

## What I've Tried
Describe what you've already tried or researched.

## Additional Information
Add any other information that might be helpful.`
  }
}

export default function SubmitIssuePage() {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null)

  const copyTemplate = async (type: string, template: string) => {
    try {
      await navigator.clipboard.writeText(template)
      setCopiedTemplate(type)
      setTimeout(() => setCopiedTemplate(null), 2000)
    } catch (error) {
      console.error('Failed to copy template:', error)
    }
  }

  const downloadTemplate = (type: string, template: string) => {
    const blob = new Blob([template], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${type}-template.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/issues">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Issues
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Submit Issue via GitHub</h1>
          <p className="text-muted-foreground">
            Learn how to create issues on our GitHub repository
          </p>
        </div>
      </div>

      {/* Quick Start */}
      <Card className="mb-8 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
            <Github className="h-5 w-5" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 dark:text-green-300 mb-4">
            Ready to create an issue? Click the button below to go directly to GitHub and create a new issue.
          </p>
          <Button asChild>
            <Link href="https://github.com/vercel/v0-issues/issues/new/choose" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              Create Issue on GitHub
              <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Step by Step Guide */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Step-by-Step Guide</CardTitle>
          <CardDescription>
            Follow these steps to create a well-structured issue on GitHub
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold">Visit our GitHub Repository</h3>
                <p className="text-muted-foreground text-sm">
                  Go to our GitHub issues page and click "New Issue"
                </p>
                <Button variant="outline" size="sm" className="mt-2" asChild>
                  <Link href="https://github.com/vercel/v0-issues" target="_blank" rel="noopener noreferrer">
                    <Github className="h-3 w-3 mr-1" />
                    Visit Repository
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold">Choose Issue Type</h3>
                <p className="text-muted-foreground text-sm">
                  Select the appropriate template based on your issue type (bug, feature, etc.)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold">Fill Out the Template</h3>
                <p className="text-muted-foreground text-sm">
                  Complete all relevant sections in the issue template. The more details you provide, the better we can help.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold">Add Labels and Submit</h3>
                <p className="text-muted-foreground text-sm">
                  Add appropriate labels to categorize your issue and click "Submit new issue"
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issue Templates */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Issue Templates</CardTitle>
          <CardDescription>
            Use these templates to create well-structured issues. Copy the template or download it as a file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(issueTemplates).map(([type, template]) => {
            const Icon = template.icon
            return (
              <div key={type} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{template.title}</h3>
                      <Badge className={template.color}>
                        {type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyTemplate(type, template.template)}
                    >
                      {copiedTemplate === type ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadTemplate(type, template.template)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-muted rounded p-3 text-sm font-mono whitespace-pre-wrap overflow-x-auto max-h-40 overflow-y-auto">
                  {template.template}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
          <CardDescription>
            Follow these guidelines to create effective issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Use descriptive titles</h4>
                <p className="text-sm text-muted-foreground">
                  Make your title specific and descriptive. Instead of "Bug in V0", use "Code generation fails with nested TypeScript interfaces"
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Provide reproduction steps</h4>
                <p className="text-sm text-muted-foreground">
                  For bugs, include clear steps to reproduce the issue. This helps us identify and fix the problem faster.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Include environment details</h4>
                <p className="text-sm text-muted-foreground">
                  Specify your browser, OS, V0 version, and any other relevant environment information.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Add screenshots or examples</h4>
                <p className="text-sm text-muted-foreground">
                  Visual examples help us understand the issue better. Include screenshots, code snippets, or links when relevant.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Search existing issues first</h4>
                <p className="text-sm text-muted-foreground">
                  Before creating a new issue, search existing issues to avoid duplicates. You can add to existing discussions if your issue is similar.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Use appropriate labels</h4>
                <p className="text-sm text-muted-foreground">
                  Add relevant labels to help categorize your issue. This makes it easier for maintainers to prioritize and organize issues.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub Resources */}
      <Card>
        <CardHeader>
          <CardTitle>GitHub Resources</CardTitle>
          <CardDescription>
            Helpful links and resources for working with GitHub issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="https://github.com/vercel/v0-issues" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">V0 Issues Repository</div>
                    <div className="text-sm text-muted-foreground">Main repository for V0 issues</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="https://github.com/vercel/v0-issues/issues" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-3">
                  <Bug className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Browse Issues</div>
                    <div className="text-sm text-muted-foreground">View all existing issues</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="https://github.com/vercel/v0-issues/issues/new/choose" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Create New Issue</div>
                    <div className="text-sm text-muted-foreground">Start with a template</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">GitHub Issues Guide</div>
                    <div className="text-sm text-muted-foreground">Learn about GitHub issues</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
