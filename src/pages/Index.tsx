import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin, TreeDeciduous, Target, FileText, Leaf, Globe } from "lucide-react";
import heroImage from "@/assets/hero-forest.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-background z-10" />
        
        <div className="container mx-auto px-4 py-20 relative z-20 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-accent/30">
            <Leaf className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">AI-Powered Reforestation Planning</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Plan Effective
            <br />
            <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
              Reforestation Projects
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Help NGOs and governments restore ecosystems with intelligent species recommendations and priority assessments
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Launch Application
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Intelligent Reforestation Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leverage AI and geospatial data to make informed decisions about your reforestation projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Interactive Mapping</CardTitle>
                <CardDescription>
                  Draw project areas directly on the map and visualize your reforestation zones
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-primary-glow flex items-center justify-center mb-4">
                  <TreeDeciduous className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>AI Species Recommendations</CardTitle>
                <CardDescription>
                  Get optimal native tree species based on soil, climate, and environmental factors
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle>Priority Assessment</CardTitle>
                <CardDescription>
                  Identify high-priority zones based on biodiversity corridors and erosion risk
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Action Plans</CardTitle>
                <CardDescription>
                  Generate detailed planting strategies with density and survival predictions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle>Environmental Data</CardTitle>
                <CardDescription>
                  Access comprehensive GIS data including topography, soil types, and climate patterns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-glow to-secondary flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Project Management</CardTitle>
                <CardDescription>
                  Save, manage, and export your reforestation projects for implementation
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-glow to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to Restore Our Planet?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join NGOs and governments worldwide in creating effective, science-backed reforestation strategies
          </p>
          <Link to="/app">
            <Button variant="hero" size="lg" className="bg-background text-foreground hover:bg-background/90">
              Start Planning Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Einstein Digital. Empowering sustainable reforestation worldwide.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
