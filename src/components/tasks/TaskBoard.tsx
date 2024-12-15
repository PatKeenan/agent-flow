import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskColumn from './TaskColumn';
import ProjectSelector from './ProjectSelector';
import CreateTaskModal from './CreateTaskModal';
import CreateProjectModal from './CreateProjectModal';

export default function TaskBoard() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const columns = [
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'in-progress', title: 'In Progress', tasks: [] },
    { id: 'review', title: 'Review', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ];

  return (
    <div className="flex-1 overflow-hidden bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <ProjectSelector
              selectedProject={selectedProject}
              onSelect={setSelectedProject}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsCreateProjectOpen(true)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              New Project
            </button>
            <button
              onClick={() => setIsCreateTaskOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Add Task
            </button>
          </div>
        </div>

        <div className="flex gap-6 h-[calc(100vh-12rem)] overflow-x-auto pb-6">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.title}
              tasks={column.tasks}
              onDrop={(taskId) => {
                // Handle task drop
              }}
            />
          ))}
        </div>

        {isCreateTaskOpen && (
          <CreateTaskModal
            projectId={selectedProject}
            onClose={() => setIsCreateTaskOpen(false)}
          />
        )}

        {isCreateProjectOpen && (
          <CreateProjectModal
            onClose={() => setIsCreateProjectOpen(false)}
          />
        )}
      </div>
    </div>
  );
}