"use client";

import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t">

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          {/* Opening Hours */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-2">
              Opening Hours
            </h4>
            <p className="text-gray-600 text-sm">Mon – Fri: 8:00 – 18:00</p>
            <p className="text-gray-600 text-sm">Sat: 9:00 – 14:00</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-2">
              Contact
            </h4>
            <p className="flex items-center gap-2 text-gray-600 text-sm">
              <FaPhoneAlt className="text-yellow-500" />
              +49 123 456 789
            </p>
            <p className="flex items-center gap-2 text-gray-600 text-sm">
              <FaMapMarkerAlt className="text-yellow-500" />
              Berlin, Germany
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-yellow-400 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-yellow-400 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-yellow-400 transition">
              <FaTwitter size={18} />
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-6 border-t pt-4 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Auto Repair Service. All rights reserved.
        </div>

      </div>
    </footer>
  );
}