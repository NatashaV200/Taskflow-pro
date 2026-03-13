import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Calendar, User, ArrowRightLeft, Clock3, RotateCcw, RotateCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  column: string;
}

interface ActivityEntry {
  id: string;
  actor: string;
  taskTitle: string;
  fromColumn: string;
  toColumn: string;
  timestamp: string;
  action: "moved" | "undid" | "redid";
}

interface MoveAction {
  taskId: string;
  taskTitle: string;
  actor: string;
  fromColumn: string;
  toColumn: string;
}

const initialTasks: Task[] = [
  { id: "1", title: "Design system updates", assignee: "SC", priority: "High", dueDate: "Mar 15", column: "todo" },
  { id: "2", title: "API integration", assignee: "JM", priority: "Medium", dueDate: "Mar 18", column: "todo" },
  { id: "3", title: "User dashboard", assignee: "ER", priority: "High", dueDate: "Mar 12", column: "progress" },
  { id: "4", title: "Auth flow", assignee: "SC", priority: "Medium", dueDate: "Mar 14", column: "progress" },
  { id: "5", title: "Onboarding wizard", assignee: "JM", priority: "Low", dueDate: "Mar 16", column: "progress" },
  { id: "6", title: "Email templates", assignee: "ER", priority: "Low", dueDate: "Mar 10", column: "review" },
  { id: "7", title: "Landing page", assignee: "SC", priority: "High", dueDate: "Mar 8", column: "done" },
  { id: "8", title: "Database schema", assignee: "JM", priority: "Medium", dueDate: "Mar 5", column: "done" },
];

const columns = [
  { id: "todo", label: "To Do", color: "bg-muted-foreground" },
  { id: "progress", label: "In Progress", color: "bg-primary" },
  { id: "review", label: "Review", color: "bg-accent" },
  { id: "done", label: "Done", color: "bg-secondary" },
];

const priorityColors: Record<string, string> = {
  Low: "bg-secondary/20 text-secondary",
  Medium: "bg-accent/20 text-accent",
  High: "bg-destructive/20 text-destructive",
};

const getColumnLabel = (columnId: string) =>
  columns.find((c) => c.id === columnId)?.label ?? columnId;

const BoardsPage = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>([]);
  const [undoStack, setUndoStack] = useState<MoveAction[]>([]);
  const [redoStack, setRedoStack] = useState<MoveAction[]>([]);

  const handleDragStart = (task: Task) => setDraggedTask(task);

  const addActivityEntry = (entry: MoveAction, action: ActivityEntry["action"]) => {
    setActivityLog((prev) => [
      {
        id: `${entry.taskId}-${Date.now()}-${action}`,
        actor: entry.actor,
        taskTitle: entry.taskTitle,
        fromColumn: getColumnLabel(entry.fromColumn),
        toColumn: getColumnLabel(entry.toColumn),
        timestamp: new Date().toLocaleString([], {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
        action,
      },
      ...prev,
    ]);
  };

  const applyMove = (taskId: string, toColumn: string) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, column: toColumn } : t)));
    setSelectedTask((prev) => (prev && prev.id === taskId ? { ...prev, column: toColumn } : prev));
  };

  const handleUndo = useCallback(() => {
    const lastAction = undoStack[undoStack.length - 1];
    if (!lastAction) return;

    applyMove(lastAction.taskId, lastAction.fromColumn);
    addActivityEntry(lastAction, "undid");

    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, lastAction]);
  }, [undoStack]);

  const handleRedo = useCallback(() => {
    const lastRedo = redoStack[redoStack.length - 1];
    if (!lastRedo) return;

    applyMove(lastRedo.taskId, lastRedo.toColumn);
    addActivityEntry(lastRedo, "redid");

    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, lastRedo]);
  }, [redoStack]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMod = event.ctrlKey || event.metaKey;
      if (!isMod) return;

      const isUndo = event.key.toLowerCase() === "z" && !event.shiftKey;
      const isRedo = event.key.toLowerCase() === "y" || (event.key.toLowerCase() === "z" && event.shiftKey);

      if (isUndo) {
        event.preventDefault();
        handleUndo();
      }

      if (isRedo) {
        event.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  const handleDrop = (columnId: string) => {
    if (!draggedTask) return;

    if (draggedTask.column === columnId) {
      setDraggedTask(null);
      return;
    }

    const fromColumn = draggedTask.column;
    const moveAction: MoveAction = {
      taskId: draggedTask.id,
      taskTitle: draggedTask.title,
      actor: "JD",
      fromColumn,
      toColumn: columnId,
    };

    applyMove(draggedTask.id, columnId);
    addActivityEntry(moveAction, "moved");

    setUndoStack((prev) => [...prev, moveAction]);
    setRedoStack([]);

    setDraggedTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Boards</h1>
          <p className="text-sm text-muted-foreground">Manage your project workflow</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleUndo} disabled={undoStack.length === 0} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Undo
          </Button>
          <Button variant="outline" onClick={handleRedo} disabled={redoStack.length === 0} className="gap-2">
            <RotateCw className="h-4 w-4" /> Redo
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90"><Plus className="h-4 w-4" /> Add Task</Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader><DialogTitle>Create New Task</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Title</Label><Input placeholder="Task title" className="bg-background border-border" /></div>
                <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Describe the task..." className="bg-background border-border" /></div>
                <Button className="w-full bg-primary hover:bg-primary/90">Create Task</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.id);
          return (
            <div
              key={col.id}
              className="rounded-xl border border-border bg-card/50 p-4"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${col.color}`} />
                  <span className="text-sm font-semibold">{col.label}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{colTasks.length}</span>
                </div>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="space-y-3">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    onClick={() => setSelectedTask(task)}
                    className="cursor-pointer rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <p className="text-sm font-medium">{task.title}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">{task.assignee}</div>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />{task.dueDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Activity Log</h2>
          </div>
          <span className="text-xs text-muted-foreground">Who moved what and when</span>
        </div>

        {activityLog.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
            No activity yet. Move a task between columns to track activity.
          </div>
        ) : (
          <div className="space-y-2">
            {activityLog.slice(0, 8).map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/50 px-3 py-2">
                <div className="min-w-0 text-sm">
                  <span className="font-semibold text-foreground">{item.actor}</span>
                  <span className="text-muted-foreground"> {item.action} </span>
                  <span className="font-medium text-foreground">{item.taskTitle}</span>
                  <span className="text-muted-foreground"> from </span>
                  <span className="font-medium text-foreground">{item.fromColumn}</span>
                  <span className="text-muted-foreground"> to </span>
                  <span className="font-medium text-foreground">{item.toColumn}</span>
                </div>
                <div className="ml-4 flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <Clock3 className="h-3.5 w-3.5" />
                  {item.timestamp}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Task detail modal */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          {selectedTask && (
            <>
              <DialogHeader><DialogTitle>{selectedTask.title}</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Assignee</p>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">{selectedTask.assignee}</div>
                      <span className="text-sm">Team member</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Due date</p>
                    <p className="text-sm">{selectedTask.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Priority</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[selectedTask.priority]}`}>{selectedTask.priority}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <p className="text-sm capitalize">{columns.find(c => c.id === selectedTask.column)?.label}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-muted-foreground">No description provided.</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Comments</p>
                  <div className="flex gap-2">
                    <Input placeholder="Add a comment..." className="bg-background border-border" />
                    <Button size="sm" className="bg-primary hover:bg-primary/90">Send</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BoardsPage;
