'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ExternalLink, ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import Link from 'next/link'
import { Issue } from '@/lib/types/issues'
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

export default function IssuePage() {
  const params = useParams()
  const [issue, setIssue] = useState<Issue | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadIssue = async () => {
      try {
        const issueData = await issueService.getIssue(params.issueId as string)
        if (issueData) {
          setIssue(issueData)
        } else {
          setNotFound(true)
        }
      } catch (error) {
        console.error('Failed to load issue:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    if (params.issueId) {
      loadIssue()
    }
  }, [params.issueId])

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading issue...</p>
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !issue) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Issue Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The issue you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/issues">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Issues
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-6 px-4 md:px-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/issues">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Issues
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Issue</span>
          <span>#{issue.id}</span>
        </div>
      </div>

      {/* Issue Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{issue.title}</h1>
                {issue.issueUrl && issue.issueUrl !== `#issue-${issue.id.split('-')[1]}` && (
                  <a
                    href={issue.issueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="h-5 w-5" />
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
                  {issue.priority} priority
                </Badge>
                <Badge variant="outline">
                  {issue.category}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{issue.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Reproduction Steps */}
          {issue.reproductionSteps && issue.reproductionSteps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Steps to Reproduce</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2">
                  {issue.reproductionSteps.map((step, index) => (
                    <li key={index} className="text-sm">
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}

          {/* Expected vs Actual Behavior */}
          {(issue.expectedBehavior || issue.actualBehavior) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {issue.expectedBehavior && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Expected Behavior</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{issue.expectedBehavior}</p>
                  </CardContent>
                </Card>
              )}
              {issue.actualBehavior && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700">Actual Behavior</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{issue.actualBehavior}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Environment */}
          {issue.environment && (
            <Card>
              <CardHeader>
                <CardTitle>Environment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {issue.environment.browser && (
                    <div>
                      <span className="font-medium">Browser:</span> {issue.environment.browser}
                    </div>
                  )}
                  {issue.environment.os && (
                    <div>
                      <span className="font-medium">OS:</span> {issue.environment.os}
                    </div>
                  )}
                  {issue.environment.v0Version && (
                    <div>
                      <span className="font-medium">V0 Version:</span> {issue.environment.v0Version}
                    </div>
                  )}
                  {issue.environment.nodeVersion && (
                    <div>
                      <span className="font-medium">Node Version:</span> {issue.environment.nodeVersion}
                    </div>
                  )}
                  {issue.environment.additionalInfo && (
                    <div className="col-span-2">
                      <span className="font-medium">Additional Info:</span> {issue.environment.additionalInfo}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Issue Details */}
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Author:</span>
                <span>{issue.author}</span>
              </div>
              {issue.assignee && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Assignee:</span>
                  <span>{issue.assignee}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Created:</span>
                <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Updated:</span>
                <span>{new Date(issue.updatedAt).toLocaleDateString()}</span>
              </div>
              {issue.closedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Closed:</span>
                  <span>{new Date(issue.closedAt).toLocaleDateString()}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          {issue.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {issue.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {issue.issueUrl && issue.issueUrl !== `#issue-${issue.id.split('-')[1]}` && (
                <a href={issue.issueUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View External Issue
                  </Button>
                </a>
              )}
              {issue.prUrl && (
                <a href={issue.prUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Pull Request
                  </Button>
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
