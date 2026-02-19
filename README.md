# Mission Control 🎛️

Agent coordination dashboard for OpenClaw HQ.

## Features

- **Office View** - Visual representation of agent squad with status indicators
- **Tasks Board** - Kanban-style task management with owner/priority filtering
- **Cron Calendar** - View and manage scheduled jobs
- **Activity Feed** - Real-time agent activity stream
- **Quick Stats** - At-a-glance metrics

## Stack

- **Next.js 14** - App Router + Server Components
- **Tailwind CSS** - Styling
- **Convex** - Real-time backend (coming soon)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect to GitHub and deploy from Vercel dashboard.

## Structure

```
src/
├── app/
│   ├── page.tsx        # Main dashboard
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
└── components/
    ├── Header.tsx      # Top navigation
    ├── QuickStats.tsx  # Metric cards
    ├── OfficeView.tsx  # Agent avatars
    ├── TasksBoard.tsx  # Kanban board
    ├── CronCalendar.tsx# Scheduled jobs
    └── ActivityFeed.tsx# Activity stream
```

## TODO

- [ ] Connect Convex backend for real-time data
- [ ] Add OpenClaw API integration
- [ ] Task CRUD operations
- [ ] Cron job management
- [ ] Agent status from heartbeat
- [ ] Dark/light theme toggle
