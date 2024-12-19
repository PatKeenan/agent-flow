import { ChevronDown } from "lucide-react";

interface ProjectSelectorProps {
  selectedProject: string | null;
  onSelect: (projectId: string | null) => void;
}

export function ProjectSelector({ selectedProject }: ProjectSelectorProps) {
  return (
    <div className="relative">
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
        {selectedProject ? "Project Name" : "All Projects"}
        <ChevronDown size={16} />
      </button>
    </div>
  );
}
