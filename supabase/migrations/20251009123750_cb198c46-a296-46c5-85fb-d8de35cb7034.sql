-- Create species database table
CREATE TABLE public.tree_species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  common_name TEXT NOT NULL,
  scientific_name TEXT NOT NULL UNIQUE,
  native_regions TEXT[] NOT NULL,
  soil_types TEXT[] NOT NULL,
  min_rainfall_mm INTEGER NOT NULL,
  max_rainfall_mm INTEGER NOT NULL,
  min_temperature_c INTEGER NOT NULL,
  max_temperature_c INTEGER NOT NULL,
  growth_rate TEXT CHECK (growth_rate IN ('slow', 'moderate', 'fast')),
  max_height_m DECIMAL(5,2),
  drought_tolerance TEXT CHECK (drought_tolerance IN ('low', 'moderate', 'high')),
  erosion_control_value INTEGER CHECK (erosion_control_value >= 1 AND erosion_control_value <= 10),
  biodiversity_value INTEGER CHECK (biodiversity_value >= 1 AND biodiversity_value <= 10),
  carbon_sequestration_rate DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on species table
ALTER TABLE public.tree_species ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to read species data
CREATE POLICY "Anyone can view species data"
  ON public.tree_species
  FOR SELECT
  USING (true);

-- Create projects table
CREATE TABLE public.reforestation_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  area_coordinates JSONB NOT NULL,
  area_hectares DECIMAL(10,2) NOT NULL,
  soil_type TEXT,
  climate_zone TEXT,
  priority_score INTEGER CHECK (priority_score >= 1 AND priority_score <= 100),
  status TEXT CHECK (status IN ('planning', 'in_progress', 'completed', 'on_hold')) DEFAULT 'planning',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on projects table
ALTER TABLE public.reforestation_projects ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view only their own projects
CREATE POLICY "Users can view their own projects"
  ON public.reforestation_projects
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own projects
CREATE POLICY "Users can create their own projects"
  ON public.reforestation_projects
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own projects
CREATE POLICY "Users can update their own projects"
  ON public.reforestation_projects
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy to allow users to delete their own projects
CREATE POLICY "Users can delete their own projects"
  ON public.reforestation_projects
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create species recommendations table
CREATE TABLE public.species_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.reforestation_projects(id) ON DELETE CASCADE NOT NULL,
  species_id UUID REFERENCES public.tree_species(id) ON DELETE CASCADE NOT NULL,
  suitability_score INTEGER CHECK (suitability_score >= 0 AND suitability_score <= 100) NOT NULL,
  recommended_density_per_hectare INTEGER NOT NULL,
  estimated_survival_rate DECIMAL(5,2) NOT NULL,
  priority_level TEXT CHECK (priority_level IN ('low', 'medium', 'high')) NOT NULL,
  recommendation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on recommendations table
ALTER TABLE public.species_recommendations ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view recommendations for their own projects
CREATE POLICY "Users can view recommendations for their projects"
  ON public.species_recommendations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.reforestation_projects
      WHERE id = project_id AND user_id = auth.uid()
    )
  );

-- Policy to allow users to insert recommendations for their own projects
CREATE POLICY "Users can create recommendations for their projects"
  ON public.species_recommendations
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reforestation_projects
      WHERE id = project_id AND user_id = auth.uid()
    )
  );

-- Add some sample tree species data
INSERT INTO public.tree_species 
  (common_name, scientific_name, native_regions, soil_types, min_rainfall_mm, max_rainfall_mm, 
   min_temperature_c, max_temperature_c, growth_rate, max_height_m, drought_tolerance, 
   erosion_control_value, biodiversity_value, carbon_sequestration_rate)
VALUES
  ('English Oak', 'Quercus robur', ARRAY['Europe', 'Western Asia'], 
   ARRAY['clay', 'loam', 'sandy'], 600, 1000, -5, 25, 'moderate', 40.0, 'moderate', 8, 9, 22.5),
  ('European Ash', 'Fraxinus excelsior', ARRAY['Europe', 'Western Asia'], 
   ARRAY['loam', 'clay'], 700, 1200, -10, 25, 'fast', 35.0, 'low', 7, 8, 18.3),
  ('Silver Birch', 'Betula pendula', ARRAY['Europe', 'Northern Asia'], 
   ARRAY['sandy', 'loam', 'acidic'], 500, 1000, -15, 20, 'fast', 30.0, 'moderate', 6, 7, 15.7),
  ('Sycamore', 'Acer pseudoplatanus', ARRAY['Europe', 'Western Asia'], 
   ARRAY['loam', 'clay', 'rocky'], 600, 1300, -10, 25, 'moderate', 35.0, 'moderate', 7, 8, 19.2);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_tree_species_updated_at
  BEFORE UPDATE ON public.tree_species
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reforestation_projects_updated_at
  BEFORE UPDATE ON public.reforestation_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();