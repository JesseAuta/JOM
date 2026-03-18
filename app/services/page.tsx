"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';


const serviceIcons: Record<string, string> = {
  "Wheel Change": "🔄",
  "Tyre Fitting": "🔧",
  "Oil Change": "🛢️",
  Brakes: "🛑",
  "AdBlue & Fluids": "💧",
  Inspection: "🔩",
  "MOT Preparation": "🚗",
  "Air Conditioning": "❄️",
};

interface Service {
  id: number;
  name: string;
  price: string;
  description: string;
}

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [query] = useState(initialQuery.trim().toLowerCase());

  useEffect(() => {
    fetch(API + "/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  // Remove duplicates by service name
  const uniqueServices = Array.from(
    new Map(services.map((s) => [s.name, s])).values()
  );

  // Filter services based on query
  const filteredServices =
    query === "" || query === "all services"
      ? uniqueServices // Show all services if query is empty or "all services"
      : uniqueServices.filter((s) => {
          const search = query;
          return (
            s.name.toLowerCase().includes(search) ||
            s.description.toLowerCase().includes(search) ||
            s.price.toString().includes(search)
          );
        });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-500 mb-4">
            {query === "" || query === "all services"
              ? "All Services"
              : "Search Results"}
          </h1>
          {query && query !== "all services" && (
            <p className="text-gray-500 text-lg">
              Showing results for: <span className="font-bold">{query}</span>
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading...</div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No services found 😕
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredServices.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-yellow-50 flex items-center justify-center text-3xl">
                    {serviceIcons[s.name] || "🔧"}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#1a2b4a]">
                      {s.name}
                    </h3>
                    <span className="text-[#F5C518] font-bold text-base">
                      €{s.price}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {s.description}
                </p>
                <Link
                  href={{
                    pathname: "/booking",
                    query: { serviceId: s.id, serviceName: s.name, step: 2 },
                  }}
                  className="w-full py-3 bg-[#F5C518] text-[#1a2b4a] font-extrabold rounded-xl text-sm text-center
             shadow-[0_4px_14px_rgba(245,197,24,0.3)] hover:brightness-105 transition-all"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}