'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  focusHQ?: boolean; // if true, zooms to HQ
}

export default function LeafletMap({ focusHQ = false }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const garages = [
    {
      name: 'DCI Institute Berlin HQ',
      coords: [52.5208, 13.4094],
      description: 'Main office & demo garage',
      iconUrl: '/images/garage-hq.png',
    },
    {
      name: 'Garage Mitte',
      coords: [52.525, 13.415],
      description: 'Demo garage in Mitte',
      iconUrl: '/images/garage-mitte.png',
    },
    {
      name: 'Garage Kreuzberg',
      coords: [52.498, 13.403],
      description: 'Demo garage in Kreuzberg',
      iconUrl: '/images/garage-kreuzberg.png',
    },
    {
      name: 'Garage Charlottenburg',
      coords: [52.516, 13.295],
      description: 'Demo garage in Charlottenburg',
      iconUrl: '/images/garage-charlottenburg.png',
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    if (!mapRef.current) {
      const map = L.map(containerRef.current).setView([52.5208, 13.4094], 12);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      garages.forEach((garage) => {
        const icon = L.icon({
          iconUrl: garage.iconUrl,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -35],
        });

        const marker = L.marker(garage.coords as L.LatLngTuple, { icon }).addTo(map);

        // Tooltip
        marker.bindTooltip(garage.name, { permanent: false, direction: 'top', offset: [0, -10] });

        // Click to zoom
        marker.on('click', () => {
          map.setView(garage.coords as L.LatLngTuple, 16, { animate: true });
          marker.openPopup();
        });
      });

      // Focus on HQ if requested
      if (focusHQ) {
        const hq = garages[0];
        map.setView(hq.coords as L.LatLngTuple, 16, { animate: true });
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker && (layer.getLatLng().lat === hq.coords[0])) {
            layer.openPopup();
          }
        });
      }
    }

    setTimeout(() => mapRef.current?.invalidateSize(), 200);
  }, [focusHQ]);

  return <div ref={containerRef} className="w-full h-full rounded-lg" />;
}