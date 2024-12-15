import React from 'react';
import { Calendar, User } from 'lucide-react';
import Avatar from '../ui/Avatar';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white p-4 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow"
    >
      {task.projectId && (
        <div className="text-xs font-medium text-blue-600 mb-2">
          {task.projectName}
        </div>
      )}
      <h4 className="font-medium mb-2">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        {task.assignee && (
          <Avatar
            src={task.assignee.avatar}
            alt={task.assignee.name}
            size="sm"
          />
        )}
      </div>
    </div>
  );
}