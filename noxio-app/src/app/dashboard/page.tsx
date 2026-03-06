"use client";

import { useEffect, useState, useCallback } from "react";
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
  RefreshCw,
  FileText,
} from "lucide-react";

type TaskStatus = "done" | "running" | "pending";
type TaskType = "code" | "tweet" | "email" | "summary" | "report";

interface Task {
  id: string;
  type: TaskType;
  title: string;
  status: TaskStatus;
  time_label: string;
  output?: string | null;
}

const typeIcons: Record<TaskType, typeof Code> = {
  code: Code,
  tweet: Send,
  email: Mail,
  summary: BarChart3,
  report: FileText,
};

const typeLabels: Record<TaskType, string> = {
  code: "Code",
  tweet: "Tweet",
  email: "Email",
  summary: "Report",
  report: "Report",
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
  const TypeIcon = typeIcons[task.type] ?? Code;
  const status = statusConfig[task.status] ?? statusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-colors">
      <div className="mt-0.5">
        <TypeIcon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs font-normal">
            {typeLabels[task.type] ?? task.type}
          </Badge>
          <span className="text-xs text-muted-foreground">{task.time_label}</span>
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch {
      // silently handle fetch errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 30_000);
    return () => clearInterval(interval);
  }, [fetchTasks]);

  const doneTasks = tasks.filter((t) => t.status === "done").length;
  const runningTasks = tasks.filter((t) => t.status === "running").length;

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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-1">Activity Feed</h2>
            <p className="text-sm text-muted-foreground">
              Live view of what Noxio is doing for your company
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLoading(true);
              fetchTasks();
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No tasks yet — Noxio is warming up.
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
