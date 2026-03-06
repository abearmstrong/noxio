"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Zap,
  Code,
  Send,
  Mail,
  BarChart3,
  CheckCircle2,
  Loader2,
  Clock,
  ArrowLeft,
} from "lucide-react";

type TaskStatus = "done" | "running" | "pending";

interface Task {
  id: string;
  type: "code" | "tweet" | "email" | "summary";
  title: string;
  status: TaskStatus;
  time: string;
  output?: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    type: "code",
    title: "Fix authentication redirect bug in /api/auth/callback",
    status: "done",
    time: "2 min ago",
    output: "PR #47 created — merged to main",
  },
  {
    id: "2",
    type: "tweet",
    title: "Post product update thread about new dashboard features",
    status: "done",
    time: "15 min ago",
    output: "Posted 4-tweet thread — 23 impressions so far",
  },
  {
    id: "3",
    type: "email",
    title: "Send cold outreach batch to 25 SaaS founders",
    status: "running",
    time: "Just now",
  },
  {
    id: "4",
    type: "code",
    title: "Add rate limiting to public API endpoints",
    status: "running",
    time: "Just now",
  },
  {
    id: "5",
    type: "summary",
    title: "Generate daily metrics summary report",
    status: "pending",
    time: "Scheduled 6:00 PM",
  },
  {
    id: "6",
    type: "tweet",
    title: "Engage with 10 relevant tweets in #buildinpublic",
    status: "pending",
    time: "Scheduled 7:00 PM",
  },
];

const typeIcons = {
  code: Code,
  tweet: Send,
  email: Mail,
  summary: BarChart3,
};

const typeLabels = {
  code: "Code",
  tweet: "Tweet",
  email: "Email",
  summary: "Report",
};

const statusConfig: Record<
  TaskStatus,
  { icon: typeof CheckCircle2; className: string; label: string }
> = {
  done: {
    icon: CheckCircle2,
    className: "text-green-400",
    label: "Completed",
  },
  running: { icon: Loader2, className: "text-blue-400 animate-spin", label: "Running" },
  pending: { icon: Clock, className: "text-muted-foreground", label: "Pending" },
};

function TaskRow({ task }: { task: Task }) {
  const TypeIcon = typeIcons[task.type];
  const status = statusConfig[task.status];
  const StatusIcon = status.icon;

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-colors">
      <div className="mt-0.5">
        <TypeIcon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs font-normal">
            {typeLabels[task.type]}
          </Badge>
          <span className="text-xs text-muted-foreground">{task.time}</span>
        </div>
        <p className="text-sm font-medium leading-snug">{task.title}</p>
        {task.output && (
          <p className="text-xs text-muted-foreground mt-1">{task.output}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <StatusIcon className={`h-4 w-4 ${status.className}`} />
        <span className={`text-xs ${status.className}`}>{status.label}</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const doneTasks = mockTasks.filter((t) => t.status === "done").length;
  const runningTasks = mockTasks.filter((t) => t.status === "running").length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span className="text-lg font-bold tracking-tight">noxio</span>
            </div>
          </div>
          <Badge variant="outline" className="text-green-400 border-green-400/30">
            <span className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse" />
            Agent Active
          </Badge>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-secondary/30 border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Tasks Completed Today</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{doneTasks}</p>
            </CardContent>
          </Card>
          <Card className="bg-secondary/30 border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Currently Running</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">{runningTasks}</p>
            </CardContent>
          </Card>
          <Card className="bg-secondary/30 border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Uptime</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">99.9%</p>
            </CardContent>
          </Card>
        </div>

        {/* Company Info */}
        <Card className="bg-secondary/30 border-border/50 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Your Company</CardTitle>
                <CardDescription>acme-saas.com</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Task Feed */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Activity Feed</h2>
          <p className="text-sm text-muted-foreground">
            Live view of what Noxio is doing for your company
          </p>
        </div>

        <div className="space-y-3">
          {mockTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
