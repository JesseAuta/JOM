'use client';

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

export default function MapSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Map only, no title or description */}
      <LeafletMap />
    </section>
  );
}