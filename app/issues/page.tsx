"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Issue, IssueFilters, IssueStats } from '@/lib/types/issues'
import { IssueService } from '@/lib/services/issue-service'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Bug, Lightbulb, Zap, FileText, HelpCircle, Search, Filter, TrendingUp, Clock, CheckCircle, AlertCircle, Github, ExternalLink, RefreshCw } from 'lucide-react'

const typeIcons = {
  bug: Bug,
  feature: Lightbulb,
  enhancement: Zap,
  documentation: FileText,
  question: HelpCircle
}

const statusColors = {
  open: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  duplicate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'wont-fix': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [stats, setStats] = useState<IssueStats | null>(null)
  const [filters, setFilters] = useState<IssueFilters>({})
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const issueService = IssueService.getInstance()

  useEffect(() => {
    loadData()
  }, [filters])

  const loadData = async () => {
    setLoading(true)
    try {
      const [issuesData, statsData] = await Promise.all([
        issueService.getAllIssues(filters),
        issueService.getStats()
      ])
      setIssues(issuesData)
      setStats(statsData)
    } catch (error) {
      console.error('Failed to load issues:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSync = async () => {
    setSyncing(true)
    try {
      await issueService.syncFromGitHub()
      await loadData()
    } catch (error) {
      console.error('Failed to sync from GitHub:', error)
    } finally {
      setSyncing(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setFilters(prev => ({ ...prev, search: value || undefined }))
  }

  const handleFilterChange = (key: keyof IssueFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({})
    setSearchTerm('')
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">V0 Issues</h1>
          <p className="text-muted-foreground mt-2">
            Track bugs, feature requests, and improvements for V0. All issues are managed via GitHub.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleSync}
            disabled={syncing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync from GitHub'}
          </Button>
          <Button asChild>
            <Link href="https://github.com/vercel/v0-issues/issues/new" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              Create Issue on GitHub
              <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.open}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed</CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.closed}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* GitHub Notice */}
      <Card className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Github className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">GitHub Integration</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                All issues are managed through our GitHub repository. To create a new issue, report a bug, or request a feature, 
                please visit our GitHub issues page. Issues are automatically synced and displayed here for easy browsing.
              </p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" asChild>
                  <Link href="https://github.com/vercel/v0-issues" target="_blank" rel="noopener noreferrer">
                    <Github className="h-3 w-3 mr-1" />
                    View Repository
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="https://github.com/vercel/v0-issues/issues/new" target="_blank" rel="noopener noreferrer">
                    Create New Issue
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select onValueChange={(value) => handleFilterChange('status', value ? [value] : undefined)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('type', value ? [value] : undefined)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">Bug</SelectItem>
                <SelectItem value="feature">Feature</SelectItem>
                <SelectItem value="enhancement">Enhancement</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="question">Question</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('priority', value ? [value] : undefined)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={clearFilters}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="space-y-4">
        {issues.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No issues found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {Object.keys(filters).length > 0 
                  ? "Try adjusting your filters or search terms"
                  : "No issues have been synced from GitHub yet"
                }
              </p>
              <Button asChild>
                <Link href="https://github.com/vercel/v0-issues/issues/new" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Create First Issue on GitHub
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          issues.map((issue) => {
            const TypeIcon = typeIcons[issue.type]
            
            return (
              <Card key={issue.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Issue Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                      <TypeIcon className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* Issue Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <Link 
                            href={`/issues/${issue.id}`}
                            className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2"
                          >
                            {issue.title}
                          </Link>
                          <p className="text-muted-foreground mt-1 line-clamp-2">
                            {issue.description}
                          </p>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className={statusColors[issue.status]}>
                          {issue.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant="outline" className={priorityColors[issue.priority]}>
                          {issue.priority}
                        </Badge>
                        <Badge variant="secondary">
                          {issue.type}
                        </Badge>
                        <Badge variant="secondary">
                          {issue.category}
                        </Badge>
                        {issue.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {issue.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{issue.tags.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>#{issue.id}</span>
                          <span>by {issue.author}</span>
                          <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                          {issue.assignee && (
                            <span>assigned to {issue.assignee}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={issue.githubIssueUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3 mr-1" />
                              GitHub
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Load More */}
      {issues.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" disabled>
            Showing {issues.length} issues
          </Button>
        </div>
      )}
    </div>
  )
}
