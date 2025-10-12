import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapInterfaceProps {
  onAreaDrawn?: (area: any) => void;
}

const MapInterface = ({ onAreaDrawn }: MapInterfaceProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([0, 0], 2);
    mapRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Initialize feature group for drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    drawnItemsRef.current = drawnItems;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const startDrawing = () => {
    if (!mapRef.current) return;

    setIsDrawing(true);
    toast.info("Click on the map to draw your project area");

    const polygon = new L.Polygon([], {
      color: "hsl(95, 55%, 20%)",
      fillColor: "hsl(95, 60%, 35%)",
      fillOpacity: 0.3,
      weight: 3,
    });

    let points: L.LatLng[] = [];

    const onClick = (e: L.LeafletMouseEvent) => {
      points.push(e.latlng);
      polygon.setLatLngs(points);
      
      if (points.length === 1) {
        polygon.addTo(mapRef.current!);
      }
    };

    const onDblClick = () => {
      mapRef.current!.off("click", onClick);
      mapRef.current!.off("dblclick", onDblClick);
      setIsDrawing(false);

      if (points.length >= 3) {
        drawnItemsRef.current!.addLayer(polygon);
        
        // Calculate approximate area using Leaflet's built-in methods
        const bounds = polygon.getBounds();
        const area = (bounds.getNorth() - bounds.getSouth()) * 
                    (bounds.getEast() - bounds.getWest()) * 111 * 111; // Rough approximation in hectares
        const areaData = {
          type: "polygon",
          coordinates: points.map(p => [p.lat, p.lng]),
          area: area.toFixed(2),
        };

        onAreaDrawn?.(areaData);
        toast.success(`Area drawn: ${area.toFixed(2)} hectares`);
      } else {
        mapRef.current!.removeLayer(polygon);
        toast.error("Please draw at least 3 points");
      }
    };

    mapRef.current.on("click", onClick);
    mapRef.current.on("dblclick", onDblClick);
  };

  const clearDrawings = () => {
    if (drawnItemsRef.current) {
      drawnItemsRef.current.clearLayers();
      onAreaDrawn?.(null);
      toast.success("Drawings cleared");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={startDrawing} 
          disabled={isDrawing}
          className="flex items-center gap-2"
        >
          <Pencil className="w-4 h-4" />
          {isDrawing ? "Drawing... (Double-click to finish)" : "Draw Project Area"}
        </Button>
        <Button 
          variant="outline" 
          onClick={clearDrawings}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>
      </div>

      <div 
        ref={mapContainerRef} 
        className="w-full h-[600px] rounded-lg border-2 border-border shadow-[var(--shadow-elevated)]"
      />

      <div className="text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Click "Draw Project Area" and click on the map to create your reforestation zone. Double-click to finish.
        </p>
      </div>
    </div>
  );
};

export default MapInterface;
