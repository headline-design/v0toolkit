"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Issue } from '@/lib/types/issues'
import { IssueService } from '@/lib/services/issue-service'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeft, Calendar, User, Tag, ExternalLink, Github, Bug, Lightbulb, Zap, FileText, HelpCircle, Clock, CheckCircle, AlertTriangle } from 'lucide-react'

const typeIcons = {
  bug: Bug,
  feature: Lightbulb,
  enhancement: Zap,
  documentation: FileText,
  question: HelpCircle
}

const statusIcons = {
  open: Clock,
  'in-progress': AlertTriangle,
  closed: CheckCircle,
  duplicate: AlertTriangle,
  'wont-fix': AlertTriangle
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

export default function IssuePage() {
  const params = useParams()
  const router = useRouter()
  const [issue, setIssue] = useState<Issue | null>(null)
  const [loading, setLoading] = useState(true)

  const issueService = IssueService.getInstance()
  const issueId = params.issueId as string

  useEffect(() => {
    loadIssue()
  }, [issueId])

  const loadIssue = async () => {
    setLoading(true)
    try {
      const issueData = await issueService.getIssueById(issueId)
      if (!issueData) {
        router.push('/issues')
        return
      }
      setIssue(issueData)
    } catch (error) {
      console.error('Failed to load issue:', error)
      router.push('/issues')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (!issue) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Issue not found</h3>
            <p className="text-muted-foreground mb-4">
              The issue you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/issues">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Issues
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const TypeIcon = typeIcons[issue.type]
  const StatusIcon = statusIcons[issue.status]

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
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>#{issue.id}</span>
          <span>•</span>
          <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Main Issue */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                  <TypeIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon className="h-4 w-4" />
                  <Badge className={statusColors[issue.status]}>
                    {issue.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-2xl mb-2">{issue.title}</CardTitle>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline" className={priorityColors[issue.priority]}>
                  {issue.priority} priority
                </Badge>
                <Badge variant="secondary">
                  {issue.type}
                </Badge>
                <Badge variant="secondary">
                  {issue.category}
                </Badge>
              </div>
            </div>
            
            {/* GitHub Actions */}
            <div className="flex flex-col gap-2 min-w-[140px]">
              <Button asChild>
                <Link href={issue.githubIssueUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </Button>
              {issue.githubPrUrl && (
                <Button variant="outline" asChild>
                  <Link href={issue.githubPrUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View PR
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{issue.description}</p>
          </div>

          {/* Reproduction Steps */}
          {issue.reproductionSteps && issue.reproductionSteps.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Steps to Reproduce</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                {issue.reproductionSteps.map((step, index) => (
                  <li key={index} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Expected vs Actual Behavior */}
          {(issue.expectedBehavior || issue.actualBehavior) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {issue.expectedBehavior && (
                <div className="p-4 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                  <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300">Expected Behavior</h3>
                  <p className="text-green-600 dark:text-green-400 leading-relaxed">{issue.expectedBehavior}</p>
                </div>
              )}
              {issue.actualBehavior && (
                <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                  <h3 className="font-semibold mb-2 text-red-700 dark:text-red-300">Actual Behavior</h3>
                  <p className="text-red-600 dark:text-red-400 leading-relaxed">{issue.actualBehavior}</p>
                </div>
              )}
            </div>
          )}

          {/* Environment */}
          {issue.environment && (
            <div>
              <h3 className="font-semibold mb-3">Environment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {issue.environment.browser && (
                  <div className="flex justify-between p-2 rounded bg-muted/50">
                    <span className="font-medium">Browser:</span> 
                    <span className="font-mono">{issue.environment.browser}</span>
                  </div>
                )}
                {issue.environment.os && (
                  <div className="flex justify-between p-2 rounded bg-muted/50">
                    <span className="font-medium">OS:</span> 
                    <span className="font-mono">{issue.environment.os}</span>
                  </div>
                )}
                {issue.environment.v0Version && (
                  <div className="flex justify-between p-2 rounded bg-muted/50">
                    <span className="font-medium">V0 Version:</span> 
                    <span className="font-mono">{issue.environment.v0Version}</span>
                  </div>
                )}
                {issue.environment.nodeVersion && (
                  <div className="flex justify-between p-2 rounded bg-muted/50">
                    <span className="font-medium">Node Version:</span> 
                    <span className="font-mono">{issue.environment.nodeVersion}</span>
                  </div>
                )}
              </div>
              {issue.environment.additionalInfo && (
                <div className="mt-3 p-3 rounded bg-muted/50">
                  <span className="font-medium">Additional Info:</span>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{issue.environment.additionalInfo}</p>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {issue.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {issue.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Related Issues */}
          {issue.relatedIssues.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Related Issues</h3>
              <div className="flex flex-wrap gap-2">
                {issue.relatedIssues.map(relatedId => (
                  <Button key={relatedId} variant="outline" size="sm" asChild>
                    <Link href={`/issues/${relatedId}`}>
                      #{relatedId}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Meta Information */}
          <Separator />
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {issue.author.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>Created by <strong>{issue.author}</strong></span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created {new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Updated {new Date(issue.updatedAt).toLocaleDateString()}</span>
            </div>
            {issue.assignee && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Assigned to <strong>{issue.assignee}</strong></span>
              </div>
            )}
            {issue.closedAt && (
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>Closed {new Date(issue.closedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* GitHub Notice */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Github className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Discuss on GitHub</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                This issue is managed on GitHub. To add comments, provide additional information, or track progress, 
                please visit the GitHub issue page. All discussions and updates happen there.
              </p>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <Link href={issue.githubIssueUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3 w-3 mr-1" />
                    Join Discussion
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
                {issue.githubPrUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <Link href={issue.githubPrUrl} target="_blank" rel="noopener noreferrer">
                      View Pull Request
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
