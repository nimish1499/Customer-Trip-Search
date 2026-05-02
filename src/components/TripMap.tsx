import { Fragment, useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import type { Trip } from "../types/trip";

const markerIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

function FitBounds({ trips }: { trips: Trip[] }) {
  const map = useMap();
  useEffect(() => {
    if (!trips.length) return;
    const b = L.latLngBounds([]);
    trips.forEach((t) => {
      b.extend([t.originLat, t.originLng]);
      b.extend([t.destLat, t.destLng]);
    });
    map.fitBounds(b, { padding: [48, 48] });
  }, [map, trips]);
  return null;
}

type Props = {
  trips: Trip[];
  selectedId: number | null;
};

export function TripMap({ trips, selectedId }: Props) {
  const center: [number, number] =
    trips[0] ? [(trips[0].originLat + trips[0].destLat) / 2, (trips[0].originLng + trips[0].destLng) / 2] : [48, 8];
  return (
    <div className="h-[min(70vh,32rem)] w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:h-[min(calc(100vh-14rem),40rem)]">
      <MapContainer center={center} zoom={4} className="h-full w-full" scrollWheelZoom>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitBounds trips={trips} />
        {trips.map((t) => {
          const sel = selectedId === t.id;
          const positions: [number, number][] = [
            [t.originLat, t.originLng],
            [t.destLat, t.destLng],
          ];
          return (
            <Fragment key={`${t.id}-${t.tripStart}`}>
              <Polyline
                positions={positions}
                pathOptions={{
                  color: sel ? "#22d3ee" : "#64748b",
                  weight: sel ? 5 : 2,
                  opacity: sel ? 1 : 0.65,
                }}
              />
              <Marker position={[t.originLat, t.originLng]} icon={markerIcon} />
              <Marker position={[t.destLat, t.destLng]} icon={markerIcon} />
            </Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
