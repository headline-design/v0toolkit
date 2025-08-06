# Issues Data

This file contains the issue data for the V0 Toolkit issue tracker. Users can easily add, edit, or remove issues by modifying the `issues.ts` file.

## How to Add an Issue

To add a new issue, simply add an object to the `userIssues` array in `issues.ts`. Here's the minimum required information:

\`\`\`typescript
{
  title: 'Your issue title',
  description: 'Detailed description of the issue',
  type: 'bug' // or 'feature', 'enhancement', 'documentation', 'question'
}
\`\`\`

## Available Fields

### Required Fields
- `title` - Brief title describing the issue
- `description` - Detailed description of the issue
- `type` - One of: 'bug', 'feature', 'enhancement', 'documentation', 'question'

### Optional Fields
- `priority` - 'low', 'medium', 'high', 'critical' (defaults to 'medium')
- `category` - 'ui', 'performance', 'api', 'documentation', 'integration', 'other' (defaults to 'other')
- `tags` - Array of strings for categorization
- `author` - Username or name (defaults to 'anonymous')
- `status` - 'open', 'in-progress', 'closed', 'duplicate', 'wont-fix' (defaults to 'open')
- `assignee` - Who is working on this issue
- `issueUrl` - Link to external issue tracker or documentation
- `prUrl` - Link to related pull request
- `reproductionSteps` - Array of steps to reproduce the issue
- `expectedBehavior` - What should happen
- `actualBehavior` - What actually happens
- `environment` - Object with browser, OS, version info

## Example Issue

\`\`\`typescript
{
  title: 'Button component not responsive on mobile',
  description: 'The generated button components do not scale properly on mobile devices, causing layout issues.',
  type: 'bug',
  priority: 'high',
  category: 'ui',
  tags: ['mobile', 'responsive', 'button'],
  author: 'developer123',
  reproductionSteps: [
    'Generate a button component',
    'View on mobile device',
    'Notice the button overflows container'
  ],
  expectedBehavior: 'Button should scale to fit mobile screens',
  actualBehavior: 'Button overflows and breaks layout',
  environment: {
    browser: 'Safari Mobile',
    os: 'iOS 17',
    v0Version: '1.2.3'
  }
}
\`\`\`

## Auto-Generated Fields

The following fields are automatically generated and don't need to be provided:
- `id` - Unique identifier (v0-001, v0-002, etc.)
- `createdAt` - Timestamp when issue was created
- `updatedAt` - Timestamp when issue was last updated
- `closedAt` - Timestamp when issue was closed (if applicable)
- `attachments` - File attachments (empty array)
- `relatedIssues` - Links to related issues (empty array)

## Tips

1. **Keep titles concise** - Use clear, descriptive titles
2. **Be specific in descriptions** - Include as much detail as possible
3. **Use appropriate tags** - This helps with filtering and organization
4. **Include reproduction steps** - For bugs, always include steps to reproduce
5. **Set proper priority** - Help prioritize work by setting appropriate priority levels

## Reloading Issues

After making changes to the issues data, the system will automatically pick up the changes. In development, you may need to refresh the page to see updates.
\`\`\`

Now let's update the issues listing page to use the new service methods:
