import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./_root-route";
import { useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-markercluster";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Showing, ShowingGroup } from "@/types/client";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import { PageHeader } from "@/components/PageHeader";

export const showingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/showings",
  errorComponent: (e) => (
    <div>
      {e.error.message}: {JSON.stringify(e.error.stack)}
    </div>
  ),
  component: ShowingsMap,
});

interface ShowingsMapProps {
  showingGroups: ShowingGroup[];
  onAddShowing: (showing: Omit<Showing, "id">) => void;
}

function MapEvents({ onClick }: { onClick: (e: L.LeafletMouseEvent) => void }) {
  useMapEvents({
    click: onClick,
  });
  return null;
}

function ShareControl() {
  const map = useMap();

  const handleShare = useCallback(() => {
    const center = map.getCenter();
    const zoom = map.getZoom();
    const url = `https://www.google.com/maps/@${center.lat},${center.lng},${zoom}z`;
    navigator.clipboard.writeText(url).then(() => {
      alert("Map link copied to clipboard!");
    });
  }, [map]);

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <Button
          onClick={handleShare}
          className="bg-white text-black hover:bg-gray-100"
        >
          Share Map
        </Button>
      </div>
    </div>
  );
}

function ShowingsMap({ showingGroups, onAddShowing }: ShowingsMapProps) {
  /*const [newShowing, setNewShowing] = useState<Omit<Showing, "id">>({
    title: "",
    address: "",
    date: "",
    time: "",
    clientId: "",
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        delete (L.Icon.Default.prototype )._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
          iconUrl: "/leaflet/images/marker-icon.png",
          shadowUrl: "/leaflet/images/marker-shadow.png",
        });
      });
    }
  }, []); */
  /* 
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    setNewShowing((prev) => ({
      ...prev,
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    }));
  };

  const handleAddShowing = () => {
    onAddShowing(newShowing);
    setNewShowing({
      title: "",
      address: "",
      date: "",
      time: "",
      clientId: "",
      lat: 0,
      lng: 0,
    });
  };
 */
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Showings Map">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Showing</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Showing</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  {/* <Input
                    id="title"
                    value={newShowing.title}
                    onChange={(e) =>
                      setNewShowing((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  /> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {/* <Input
                    id="address"
                    value={newShowing.address}
                    onChange={(e) =>
                      setNewShowing((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  /> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  {/*  <Input
                    id="date"
                    type="date"
                    value={newShowing.date}
                    onChange={(e) =>
                      setNewShowing((prev) => ({ ...prev, date: e.target.value }))
                    }
                  /> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  {/*  <Input
                    id="time"
                    type="time"
                    value={newShowing.time}
                    onChange={(e) =>
                      setNewShowing((prev) => ({ ...prev, time: e.target.value }))
                    }
                  /> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientId">Client ID</Label>
                  {/* <Input
                    id="clientId"
                    value={newShowing.clientId}
                    onChange={(e) =>
                      setNewShowing((prev) => ({
                        ...prev,
                        clientId: e.target.value,
                      }))
                    }
                  /> */}
                </div>
                {/*  <Button onClick={handleAddShowing}>Add Showing</Button> */}
              </div>
            </DialogContent>
          </Dialog>
        </PageHeader>
        <div className="h-[600px] rounded-lg overflow-hidden">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
              {showingGroups?.flatMap((group) =>
                group.showings.map((showing) => (
                  <Marker
                    key={showing.id}
                    position={[showing.lat, showing.lng]}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{showing.title}</h3>
                        <p>{showing.address}</p>
                        <p>
                          {new Date(showing.date).toLocaleDateString()} at{" "}
                          {showing.time}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))
              )}
            </MarkerClusterGroup>
            {/* <MapEvents onClick={handleMapClick} />
            <ShareControl /> */}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
