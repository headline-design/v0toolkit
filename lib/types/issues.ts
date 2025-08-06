export type IssueType = 'bug' | 'feature' | 'enhancement' | 'documentation' | 'question'
export type IssueStatus = 'open' | 'in-progress' | 'closed' | 'duplicate' | 'wont-fix'
export type IssuePriority = 'low' | 'medium' | 'high' | 'critical'
export type IssueCategory = 'ui' | 'performance' | 'api' | 'documentation' | 'integration' | 'other'

export interface IssueEnvironment {
  browser?: string
  os?: string
  v0Version?: string
  nodeVersion?: string
  additionalInfo?: string
}

export interface IssueAttachment {
  id: string
  name: string
  url: string
  type: 'image' | 'video' | 'file'
  size: number
}

export interface Issue {
  id: string
  title: string
  description: string
  type: IssueType
  status: IssueStatus
  priority: IssuePriority
  category: IssueCategory
  tags: string[]
  author: string
  assignee?: string
  createdAt: string
  updatedAt: string
  closedAt?: string
  attachments: IssueAttachment[]
  relatedIssues: string[]
  issueUrl: string
  prUrl?: string
  reproductionSteps?: string[]
  expectedBehavior?: string
  actualBehavior?: string
  environment?: IssueEnvironment
}

export interface IssueFilters {
  type?: IssueType[]
  status?: IssueStatus[]
  priority?: IssuePriority[]
  category?: IssueCategory[]
  tags?: string[]
  author?: string
  assignee?: string
  search?: string
}

export interface IssueStats {
  total: number
  open: number
  closed: number
  inProgress: number
  byType: Record<IssueType, number>
  byPriority: Record<IssuePriority, number>
  byCategory: Record<IssueCategory, number>
}
