import { Issue, IssueFilters, IssueStats } from '@/lib/types/issues'
import { userIssues, UserIssueInput } from '@/lib/data/issues'

class IssueService {
  private issues: Issue[] = []

  constructor() {
    this.issues = this.processUserIssues(userIssues)
  }

  // Convert simple user input to full Issue objects
  private processUserIssues(userInputs: UserIssueInput[]): Issue[] {
    return userInputs.map((input, index) => {
      const id = `v0-${String(index + 1).padStart(3, '0')}`
      const now = new Date().toISOString()
      const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // Random date within last 30 days
      
      return {
        id,
        title: input.title,
        description: input.description,
        type: input.type,
        status: input.status || 'open',
        priority: input.priority || 'medium',
        category: input.category || 'other',
        tags: input.tags || [],
        author: input.author || 'anonymous',
        assignee: input.assignee,
        createdAt,
        updatedAt: input.status === 'closed' ? createdAt : now,
        closedAt: input.status === 'closed' ? now : undefined,
        attachments: [],
        relatedIssues: [],
        issueUrl: input.issueUrl || `#issue-${index + 1}`,
        prUrl: input.prUrl,
        reproductionSteps: input.reproductionSteps,
        expectedBehavior: input.expectedBehavior,
        actualBehavior: input.actualBehavior,
        environment: input.environment
      }
    })
  }

  // Get all issues with optional filtering
  async getIssues(filters?: IssueFilters): Promise<Issue[]> {
    let filteredIssues = [...this.issues]

    if (filters) {
      if (filters.type?.length) {
        filteredIssues = filteredIssues.filter(issue => filters.type!.includes(issue.type))
      }
      if (filters.status?.length) {
        filteredIssues = filteredIssues.filter(issue => filters.status!.includes(issue.status))
      }
      if (filters.priority?.length) {
        filteredIssues = filteredIssues.filter(issue => filters.priority!.includes(issue.priority))
      }
      if (filters.category?.length) {
        filteredIssues = filteredIssues.filter(issue => filters.category!.includes(issue.category))
      }
      if (filters.tags?.length) {
        filteredIssues = filteredIssues.filter(issue => 
          filters.tags!.some(tag => issue.tags.includes(tag))
        )
      }
      if (filters.author) {
        filteredIssues = filteredIssues.filter(issue => 
          issue.author.toLowerCase().includes(filters.author!.toLowerCase())
        )
      }
      if (filters.assignee) {
        filteredIssues = filteredIssues.filter(issue => 
          issue.assignee?.toLowerCase().includes(filters.assignee!.toLowerCase())
        )
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredIssues = filteredIssues.filter(issue =>
          issue.title.toLowerCase().includes(searchTerm) ||
          issue.description.toLowerCase().includes(searchTerm) ||
          issue.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        )
      }
    }

    // Sort by creation date (newest first)
    return filteredIssues.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  // Get a single issue by ID
  async getIssue(id: string): Promise<Issue | null> {
    return this.issues.find(issue => issue.id === id) || null
  }

  // Get issue statistics
  async getIssueStats(): Promise<IssueStats> {
    const total = this.issues.length
    const open = this.issues.filter(issue => issue.status === 'open').length
    const closed = this.issues.filter(issue => issue.status === 'closed').length
    const inProgress = this.issues.filter(issue => issue.status === 'in-progress').length

    const byType = this.issues.reduce((acc, issue) => {
      acc[issue.type] = (acc[issue.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const byPriority = this.issues.reduce((acc, issue) => {
      acc[issue.priority] = (acc[issue.priority] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const byCategory = this.issues.reduce((acc, issue) => {
      acc[issue.category] = (acc[issue.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      total,
      open,
      closed,
      inProgress,
      byType: byType as any,
      byPriority: byPriority as any,
      byCategory: byCategory as any
    }
  }

  // Get all unique tags
  async getAllTags(): Promise<string[]> {
    const allTags = this.issues.flatMap(issue => issue.tags)
    return [...new Set(allTags)].sort()
  }

  // Get all unique authors
  async getAllAuthors(): Promise<string[]> {
    const allAuthors = this.issues.map(issue => issue.author)
    return [...new Set(allAuthors)].sort()
  }

  // Reload issues from the data file
  async reloadIssues(): Promise<{ success: boolean; message: string }> {
    try {
      // In a real implementation, this would re-import the data file
      // For now, we'll simulate reloading
      this.issues = this.processUserIssues(userIssues)
      
      return {
        success: true,
        message: `Reloaded ${this.issues.length} issues from data file`
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to reload issues from data file'
      }
    }
  }
}

export const issueService = new IssueService()
