import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "./_root-route";
import { apiClient } from "@/lib/api";

import { useState } from "react";
import { Plus } from "lucide-react";
import { TaskColumn } from "@/components/TaskColumn";
import { ProjectSelector } from "@/components/ProjectSelector";
import { CreateTaskModal } from "@/components/CreateTaskModal";
import { CreateProjectModal } from "@/components/CreateProjectModal";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";

export const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tasks",
  component: Tasks,
  onError: (error) => {
    console.error(error);
  },
  loader: async () => {
    // Example of data loading
    const tasks = await apiClient.tasks.$get();
    return { tasks };
  },
});

function Tasks() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const columns = [
    { id: "todo", title: "To Do", tasks: [] },
    { id: "in-progress", title: "In Progress", tasks: [] },
    { id: "review", title: "Review", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Tasks">
          <div className="flex items-center gap-4">
            <ProjectSelector
              selectedProject={selectedProject}
              onSelect={setSelectedProject}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setIsCreateProjectOpen(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                New Project
              </button>
              <Button onClick={() => setIsCreateTaskOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </div>
          </div>
        </PageHeader>

        <div className="flex gap-6 h-[calc(100vh-12rem)] overflow-x-auto pb-6">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.title}
              tasks={column.tasks}
              onDrop={(taskId) => {
                // Handle task drop
                console.log(taskId);
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
          <CreateProjectModal onClose={() => setIsCreateProjectOpen(false)} />
        )}
      </div>
    </div>
  );
}
