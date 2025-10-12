import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus } from "lucide-react";

interface ProjectListProps {
  onSelectProject: (projectId: string) => void;
}

const ProjectList = ({ onSelectProject }: ProjectListProps) => {
  // Mock projects - will be replaced with real database integration
  const projects = [
    {
      id: "1",
      name: "Northern Forest Restoration",
      area: "125.5 hectares",
      date: "2025-03-15",
      status: "In Progress",
    },
    {
      id: "2",
      name: "Riverside Corridor Project",
      area: "87.2 hectares",
      date: "2025-02-28",
      status: "Planning",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Your Projects
          </CardTitle>
          <CardDescription>
            Manage and view your reforestation projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full sm:w-auto flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New Project
          </Button>
        </CardContent>
      </Card>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No projects yet. Create your first project to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card 
              key={project.id}
              className="border-2 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 cursor-pointer hover:-translate-y-1"
              onClick={() => onSelectProject(project.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1">
                      Created on {project.date}
                    </CardDescription>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {project.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-foreground">{project.area}</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
