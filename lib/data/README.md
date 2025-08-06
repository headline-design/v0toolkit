# Issues Data

This directory contains the data files for the V0 Toolkit issue tracker.

## Updating Issues

To add, modify, or remove issues from the tracker, edit the `issues.ts` file in this directory.

### Adding a New Issue

1. Open `lib/data/issues.ts`
2. Add a new object to the `userIssues` array with these fields:

#### Required Fields
- `title`: Brief description of the issue
- `description`: Detailed explanation of the issue
- `type`: One of `'bug'`, `'feature'`, `'enhancement'`, `'documentation'`, `'question'`

#### Optional Fields
- `priority`: `'low'`, `'medium'`, `'high'`, or `'critical'` (defaults to `'medium'`)
- `category`: `'ui'`, `'performance'`, `'api'`, `'documentation'`, `'integration'`, or `'other'` (defaults to `'other'`)
- `tags`: Array of strings for categorization
- `author`: GitHub username or name
- `status`: `'open'`, `'in-progress'`, `'closed'`, `'duplicate'`, or `'wont-fix'` (defaults to `'open'`)
- `assignee`: Who is working on this issue
- `githubIssueUrl`: Link to the actual GitHub issue
- `githubPrUrl`: Link to related pull request
- `reproductionSteps`: Array of steps to reproduce the issue
- `expectedBehavior`: What should happen
- `actualBehavior`: What actually happens
- `environment`: Object with browser, OS, version info

### Issue Types

- **bug**: Something is broken or not working as expected
- **feature**: Request for a new feature or capability
- **enhancement**: Improvement to an existing feature
- **documentation**: Issues related to documentation
- **question**: General questions or clarifications

### Issue Status

- **open**: Issue is new and needs attention
- **in-progress**: Someone is actively working on the issue
- **closed**: Issue has been resolved
- **duplicate**: Issue is a duplicate of another issue
- **wont-fix**: Issue will not be addressed

### Priority Levels

- **critical**: Blocking issue that prevents core functionality
- **high**: Important issue that should be addressed soon
- **medium**: Standard priority issue
- **low**: Nice-to-have or minor issue

### Categories

- **ui**: User interface related issues
- **performance**: Performance and optimization issues
- **api**: API or backend related issues
- **documentation**: Documentation issues
- **integration**: Third-party integration issues
- **other**: Issues that don't fit other categories

### Best Practices

1. **Use descriptive titles** that clearly explain the issue
2. **Include detailed descriptions** with context and impact
3. **Add relevant tags** to help with filtering and searching
4. **Link to GitHub issues** for real discussions and tracking
5. **Include reproduction steps** for bugs
6. **Specify environment details** when relevant
7. **Keep IDs sequential** (v0-001, v0-002, etc.)
8. **Update timestamps** when modifying existing issues

### Example Issue

\`\`\`typescript
{
  title: 'Add support for custom CSS variables',
  description: 'Allow users to define custom CSS variables that can be used throughout generated components for consistent theming.',
  type: 'feature',
  priority: 'medium',
  category: 'ui',
  tags: ['css-variables', 'theming', 'customization'],
  author: 'theme_master',
  githubIssueUrl: 'https://github.com/vercel/v0-issues/issues/11',
  reproductionSteps: [
    'Generate a component with custom CSS variables',
    'View the component on different devices',
    'Notice inconsistent theming'
  ],
  expectedBehavior: 'Custom CSS variables should be applied consistently across all devices',
  actualBehavior: 'Custom CSS variables are not applied consistently',
  environment: {
    browser: 'Chrome 120.0.0',
    os: 'macOS 14.2',
    v0Version: '1.2.3',
    nodeVersion: '18.19.0',
    additionalInfo: 'Any additional context'
  }
}
\`\`\`

The system will automatically generate:
- Unique ID (v0-001, v0-002, etc.)
- Creation and update timestamps
- Default values for optional fields
- GitHub issue URL if not provided

## Tips

- Keep titles concise but descriptive
- Provide detailed descriptions to help others understand the issue
- Use relevant tags to make issues easier to find
- Include reproduction steps for bugs
- Link to actual GitHub issues when available

After making changes, the issue tracker will automatically reflect the updates when the page is refreshed or the sync function is called.
