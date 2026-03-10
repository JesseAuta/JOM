"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API = "http://localhost:8000";

const serviceIcons: Record<string, string> = {
  "Wheel Change": "🔄",
  "Tyre Fitting": "🔧",
  "Oil Change": "🛢️",
  "Brakes": "🛑",
  "AdBlue & Fluids": "💧",
  "Inspection": "🔩",
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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API + "/api/services")
      .then(r => r.json())
      .then(data => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-500 mb-4">Our Services</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Professional auto services at competitive prices. Book your appointment online in minutes.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map(s => (
              <div key={s.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-yellow-50 flex items-center justify-center text-3xl">
                    {serviceIcons[s.name] || "🔧"}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#1a2b4a]">{s.name}</h3>
                    <span className="text-[#F5C518] font-bold text-base">€{s.price}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{s.description}</p>
                <Link href="/booking"
                  className="w-full py-3 bg-[#F5C518] text-[#1a2b4a] font-extrabold rounded-xl text-sm text-center
                             shadow-[0_4px_14px_rgba(245,197,24,0.3)] hover:brightness-105 transition-all">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="bg-[#1a2b4a] rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-extrabold mb-3 ">Ready to book?</h2>
          <p className="text-gray-300 mb-6">Schedule your service appointment in just a few steps.</p>
          <Link href="/booking"
            className="inline-block px-8 py-4 bg-[#F5C518] text-[#1a2b4a] font-extrabold rounded-xl
                       shadow-[0_4px_14px_rgba(245,197,24,0.4)] hover:brightness-105 transition-all">
            Book an Appointment
          </Link>
        </div>

      </div>
    </div>
  );
}
