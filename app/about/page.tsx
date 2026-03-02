"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { title } from "process";

// Variants for scroll animations
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  const cards = [
    {
      src: "/company.png",
      alt: "JOM Auto Team",
      title: "Our Professional Team",
      desc: "Our experienced mechanics work with precision and care, ensuring every repair is done quickly and professionally.",
      titleColor: "text-yellow-500 ",
      
      descColor: "text-gray-700",
    },
    {
      src: "/deliver.png",
      alt: "Fast & Reliable Delivery",
      title: "Fast & Reliable Delivery",
      desc: "We provide fast delivery of parts and services, ensuring your car is ready when you need it.",
      titleColor: "text-blue-800",
      descColor: "text-gray-700",
    },
    {
      src: "/office.png",
      alt: "Our Office",
      title: "Comfortable Office",
      desc: "Enjoy our clean, modern waiting area with Wi-Fi and refreshments while your vehicle is being serviced.",
      titleColor: "text-green-600",
      descColor: "text-gray-700",
    },
  ];

  return (
    <main className="w-full bg-gray-50">

      {/* --- ABOUT US INTRO --- */}
      <motion.section
        className="max-w-6xl mx-auto px-6 py-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-blue-800">About JOM Auto</h1>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          At JOM Auto, we combine expertise, precision, and dedication to provide
          top-quality automotive services. Our team works daily to ensure every
          vehicle is handled with the highest standards of care and professionalism.
        </p>
      </motion.section>

      {/* --- HERO CARDS (Animated) --- */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 relative">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 overflow-hidden relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            variants={fadeUp}
          >
            <Image
              src={card.src}
              alt={card.alt}
              width={1200}
              height={800}
              className="w-full h-56 object-cover"
            />

            {/* --- MOBILE PHONE & CLOCK ICONS FIXED ON COMPANY CARD ONLY --- */}
            {index === 0 && (
              <div className="absolute bottom-4 right-4 flex gap-3 md:hidden">
                <button className="w-12 h-12 bg-yellow-400 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transform transition">
                  <Image src="/phone.png" alt="Call" width={24} height={24} />
                </button>
                <button className="w-12 h-12 bg-yellow-400 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transform transition">
                  <Image src="/clock.png" alt="Hours" width={24} height={24} />
                </button>
              </div>
            )}

            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-3 ${card.titleColor}`}>
                {card.title}
              </h2>
              <p className={`${card.descColor}`}>{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12 text-blue-800">Why Choose JOM Auto?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="w-3 h-3 mt-2 bg-yellow-400 rounded-full" />
            <p className="text-gray-700">Certified and experienced mechanics</p>
          </div>
          <div className="flex gap-4">
            <div className="w-3 h-3 mt-2 bg-yellow-400 rounded-full" />
            <p className="text-gray-700">Fast turnaround times</p>
          </div>
          <div className="flex gap-4">
            <div className="w-3 h-3 mt-2 bg-yellow-400 rounded-full" />
            <p className="text-gray-700">Modern diagnostic equipment</p>
          </div>
          <div className="flex gap-4">
            <div className="w-3 h-3 mt-2 bg-yellow-400 rounded-full" />
            <p className="text-gray-700">Customer-focused service</p>
          </div>
        </div>
      </section>

      {/* --- STATS / TRUST (Animated) --- */}
      <motion.section
        className="bg-gray-900 text-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "5,000+", label: "Happy Customers" },
            { value: "100%", label: "Commitment to Quality" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <h3 className="text-4xl font-bold text-yellow-400">{stat.value}</h3>
              <p className="mt-2 text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* --- CTA --- */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl font-semibold mb-6 text-blue-800">
          Ready to Service Your Vehicle?
        </h2>
        <p className="text-gray-600 mb-8">
          Book your appointment today and experience professional automotive care.
        </p>

        <a
          href="/appointment"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full transition"
        >
          Make an Appointment
        </a>
      </section>

    </main>
  );
}