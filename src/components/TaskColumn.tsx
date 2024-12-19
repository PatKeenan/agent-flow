import React from "react";
import { MoreHorizontal } from "lucide-react";
import TaskCard from "./TaskCard";
import { Task } from "@server/types";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (taskId: string) => void;
}

export function TaskColumn({ title, tasks, onDrop }: TaskColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    onDrop(taskId);
  };

  return (
    <div
      className="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-sm text-gray-500">{tasks.length}</span>
        </div>
        <button className="p-1 hover:bg-gray-200 rounded">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
