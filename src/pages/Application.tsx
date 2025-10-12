import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MapInterface from "@/components/MapInterface";
import ProjectList from "@/components/ProjectList";
import SpeciesRecommendations from "@/components/SpeciesRecommendations";
import { MapPin, TreeDeciduous, FolderOpen } from "lucide-react";

const Application = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [drawnArea, setDrawnArea] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <TreeDeciduous className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Reforest-AI</h1>
                <p className="text-xs text-muted-foreground">Reforestation Planning Platform</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Map
            </TabsTrigger>
            <TabsTrigger value="species" className="flex items-center gap-2">
              <TreeDeciduous className="w-4 h-4" />
              Species
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Map</CardTitle>
                <CardDescription>
                  Draw your project area on the map to get started with AI-powered recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MapInterface onAreaDrawn={setDrawnArea} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="species" className="space-y-4">
            <SpeciesRecommendations drawnArea={drawnArea} />
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <ProjectList onSelectProject={setActiveProject} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Application;
