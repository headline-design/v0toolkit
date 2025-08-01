import type { PromptTemplate } from "./types"

export const applicationPrompts: PromptTemplate[] = [
  {
    id: "task-management",
    title: "Task Management App",
    description: "Full-featured project management with team collaboration",
    category: "Productivity",
    difficulty: "Advanced",
    prompt: `Create a comprehensive task management application with:
- Project creation and management with custom fields
- Task creation with title, description, due date, priority, assignee, and labels
- Kanban board view with drag-and-drop functionality between columns
- List view with advanced sorting and filtering options
- Calendar view showing tasks by due date
- Team collaboration features (comments, mentions, file attachments)
- User authentication and role-based permissions (admin, member, viewer)
- Real-time updates using WebSocket or Server-Sent Events
- Dashboard with project overview, statistics, and recent activity
- Time tracking functionality with start/stop timers
- Notification system for task assignments and deadlines
- Search functionality across all projects and tasks
- Export capabilities (PDF reports, CSV data)
- Mobile-responsive design with touch-friendly interactions
- Offline support with data synchronization
- Integration with calendar apps and email notifications
- Dark mode and customizable themes
- Performance optimization for large datasets`,
    tags: ["productivity", "collaboration", "real-time", "full-stack"],
  },
  {
    id: "blog-platform",
    title: "Blog Platform",
    description: "Content management system with rich editor and SEO optimization",
    category: "Content",
    difficulty: "Advanced",
    prompt: `Build a complete blog platform with:
- Rich text editor with formatting options (bold, italic, headers, lists, links)
- Image upload with drag-and-drop and automatic optimization
- Post management (create, edit, delete, publish/draft, schedule)
- Category and tag system with hierarchical organization
- Author profiles with bio, social links, and author pages
- Comment system with moderation, replies, and spam protection
- Advanced search functionality with full-text search
- SEO optimization (meta tags, Open Graph, Twitter Cards, sitemap)
- RSS feed generation and email newsletter integration
- Analytics dashboard with page views, popular posts, and user engagement
- Multi-author support with role-based permissions
- Content versioning and revision history
- Social sharing buttons with custom messaging
- Related posts suggestions using content similarity
- Mobile-responsive design with AMP support
- Performance optimization (image lazy loading, caching, CDN)
- Accessibility features (proper heading structure, alt text, keyboard navigation)
- Integration with headless CMS or database for content storage
- Admin dashboard for site management and user administration`,
    tags: ["cms", "content", "seo", "multi-author"],
  },
  {
    id: "chat-application",
    title: "Real-time Chat Application",
    description: "Modern messaging app with channels and direct messages",
    category: "Communication",
    difficulty: "Advanced",
    prompt: `Create a real-time chat application with:
- User authentication and profile management
- Public channels and private direct messages
- Real-time messaging using WebSocket or Server-Sent Events
- Message threading and replies
- File and image sharing with preview
- Emoji reactions and custom emoji support
- Message search across all conversations
- Online/offline status indicators
- Typing indicators and read receipts
- Push notifications for new messages
- Message formatting (bold, italic, code blocks, mentions)
- Channel creation and management
- User roles and permissions (admin, moderator, member)
- Message history and pagination
- Voice and video call integration
- Screen sharing capabilities
- Mobile-responsive design with touch gestures
- Dark mode and theme customization
- Message encryption for privacy
- Moderation tools (message deletion, user blocking)`,
    tags: ["chat", "real-time", "websocket", "communication"],
  },
  {
    id: "e-learning-platform",
    title: "E-learning Platform",
    description: "Online course platform with video streaming and progress tracking",
    category: "Education",
    difficulty: "Advanced",
    prompt: `Build an e-learning platform with:
- Course creation and management tools
- Video streaming with playback controls and quality selection
- Interactive quizzes and assessments
- Progress tracking and completion certificates
- Student enrollment and payment processing
- Discussion forums for each course
- Live streaming for webinars and lectures
- Assignment submission and grading system
- Instructor dashboard with analytics
- Student profiles and learning paths
- Search and filtering for course discovery
- Rating and review system
- Mobile app support with offline viewing
- Accessibility features (captions, transcripts, screen reader support)
- Integration with video hosting services
- Gamification elements (badges, points, leaderboards)
- Multi-language support
- Content protection and DRM
- Analytics and reporting for administrators
- Integration with external tools (Zoom, Google Classroom)`,
    tags: ["education", "video", "courses", "learning"],
  },
]
