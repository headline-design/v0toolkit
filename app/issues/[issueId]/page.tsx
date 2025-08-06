'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ExternalLink, Search, Filter, BarChart3, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { Issue, IssueFilters, IssueStats } from '@/lib/types/issues'
import { issueService } from '@/lib/services/issue-service'

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 border-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  critical: 'bg-red-100 text-red-800 border-red-200'
}

const statusColors = {
  open: 'bg-green-100 text-green-800 border-green-200',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
  closed: 'bg-gray-100 text-gray-800 border-gray-200',
  duplicate: 'bg-purple-100 text-purple-800 border-purple-200',
  'wont-fix': 'bg-red-100 text-red-800 border-red-200'
}

const typeColors = {
  bug: 'bg-red-100 text-red-800 border-red-200',
  feature: 'bg-blue-100 text-blue-800 border-blue-200',
  enhancement: 'bg-green-100 text-green-800 border-green-200',
  documentation: 'bg-purple-100 text-purple-800 border-purple-200',
  question: 'bg-yellow-100 text-yellow-800 border-yellow-200'
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [stats, setStats] = useState<IssueStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [reloading, setReloading] = useState(false)
  const [filters, setFilters] = useState<IssueFilters>({})
  const [searchTerm, setSearchTerm] = useState('')

  const loadIssues = async () => {
    try {
      const [issuesData, statsData] = await Promise.all([
        issueService.getIssues(filters),
        issueService.getIssueStats()
      ])
      setIssues(issuesData)
      setStats(statsData)
    } catch (error) {
      console.error('Failed to load issues:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReload = async () => {
    setReloading(true)
    try {
      const result = await issueService.reloadIssues()
      if (result.success) {
        await loadIssues()
      }
    } catch (error) {
      console.error('Failed to reload issues:', error)
    } finally {
      setReloading(false)
    }
  }

  const handleSearch = () => {
    setFilters({ ...filters, search: searchTerm })
  }

  const handleFilterChange = (key: keyof IssueFilters, value: any) => {
    setFilters({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    setFilters({})
    setSearchTerm('')
  }

  useEffect(() => {
    loadIssues()
  }, [filters])

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading issues...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Issues</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage V0 Toolkit issues and feature requests
          </p>
        </div>
        <Button onClick={handleReload} disabled={reloading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${reloading ? 'animate-spin' : ''}`} />
          Reload Issues
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open</CardTitle>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.open}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed</CardTitle>
              <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.closed}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <Input
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Select onValueChange={(value) => handleFilterChange('type', value ? [value] : undefined)}>
                <SelectTrigger className="w-[140px]">
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
              <Select onValueChange={(value) => handleFilterChange('status', value ? [value] : undefined)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="duplicate">Duplicate</SelectItem>
                  <SelectItem value="wont-fix">Won't Fix</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleFilterChange('priority', value ? [value] : undefined)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={clearFilters} variant="outline">
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="space-y-4">
        {issues.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-muted-foreground">
                <p>No issues found matching your criteria.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          issues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/issues/${issue.id}`}
                        className="text-lg font-semibold hover:text-primary transition-colors"
                      >
                        {issue.title}
                      </Link>
                      {issue.issueUrl && issue.issueUrl !== `#issue-${issue.id.split('-')[1]}` && (
                        <a
                          href={issue.issueUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={typeColors[issue.type]}>
                        {issue.type}
                      </Badge>
                      <Badge className={statusColors[issue.status]}>
                        {issue.status}
                      </Badge>
                      <Badge className={priorityColors[issue.priority]}>
                        {issue.priority}
                      </Badge>
                      {issue.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground text-right">
                    <p>#{issue.id}</p>
                    <p>by {issue.author}</p>
                    <p>{new Date(issue.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">
                  {issue.description}
                </p>
                {issue.assignee && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    Assigned to: {issue.assignee}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
