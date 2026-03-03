"use client";

import { useState } from "react";

const services = [
  { icon: "🔄", label: "Wheel Change" },
  { icon: "🔧", label: "Tyre Fitting" },
  { icon: "🛢️", label: "Oil Change" },
  { icon: "🛑", label: "Brakes" },
  { icon: "💧", label: "AdBlue & Fluids" },
  { icon: "🔩", label: "Inspection" },
  { icon: "🚗", label: "MOT Preparation" },
  { icon: "❄️", label: "Air Conditioning" },
];

const carBrands = ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Toyota", "Ford", "Opel", "Renault", "Peugeot", "Hyundai"];
const carModels: Record<string, string[]> = {
  BMW: ["1er", "3er", "5er", "X3", "X5"],
  "Mercedes-Benz": ["A-Klasse", "C-Klasse", "E-Klasse", "GLC", "GLE"],
  Audi: ["A3", "A4", "A6", "Q3", "Q5"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Polo", "T-Roc"],
  Toyota: ["Yaris", "Corolla", "RAV4", "Camry", "C-HR"],
  Ford: ["Fiesta", "Focus", "Kuga", "Puma", "Mustang"],
  Opel: ["Corsa", "Astra", "Insignia", "Mokka", "Crossland"],
  Renault: ["Clio", "Megane", "Captur", "Kadjar", "Zoe"],
  Peugeot: ["208", "308", "3008", "5008", "2008"],
  Hyundai: ["i20", "i30", "Tucson", "Kona", "Santa Fe"],
};
const years = Array.from({ length: 25 }, (_, i) => String(2024 - i));
const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00",
];

const steps = [
  { number: 1, label: "Service" },
  { number: 2, label: "Vehicle" },
  { number: 3, label: "Date & Time" },
  { number: 4, label: "Contact" },
];

interface FormData {
  service: string;
  showAllServices: boolean;
  brand: string;
  model: string;
  year: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  deliveryOption: "pickup" | "delivery" | "";
}

const emptyForm: FormData = {
  service: "", showAllServices: false, brand: "", model: "",
  year: "", date: "", time: "", firstName: "",
  lastName: "", email: "", phone: "", address: "", deliveryOption: "",
};

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const visibleServices = formData.showAllServices ? services : services.slice(0, 6);

  const validate = () => {
    const e: Record<string, string> = {};
    if (currentStep === 1 && !formData.service) e.service = "Please select a service.";
    if (currentStep === 2) {
      if (!formData.brand) e.brand = "Please select a car brand.";
      if (!formData.model) e.model = "Please select a model.";
      if (!formData.year) e.year = "Please select a year.";
    }
    if (currentStep === 3) {
      if (!formData.date) e.date = "Please select a date.";
      if (!formData.time) e.time = "Please select a time.";
    }
    if (currentStep === 4) {
      if (!formData.firstName.trim()) e.firstName = "First name is required.";
      if (!formData.lastName.trim()) e.lastName = "Last name is required.";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) e.email = "A valid email is required.";
      if (!formData.phone.trim()) e.phone = "Phone number is required.";
      if (!formData.address.trim()) e.address = "Address is required.";
      if (!formData.deliveryOption) e.deliveryOption = "Please select an option.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (currentStep < 4) setCurrentStep((s) => s + 1);
    else setSubmitted(true);
  };

  const update = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors({});
  };

  const inputClass = (err?: string) =>
    `w-full px-5 py-4 rounded-xl border-[1.5px] bg-gray-50 text-[#1a2b4a] text-base outline-none transition placeholder-gray-400 ${
      err ? "border-red-400" : "border-gray-200 focus:border-[#F5C518]"
    }`;

  // ── Success ─────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-10 flex flex-col items-center gap-5 text-center">
          <div className="text-6xl">✅</div>
          <h2 className="text-2xl font-extrabold text-[#1a2b4a]">Appointment Confirmed!</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Thank you, <strong>{formData.firstName}</strong>! Your appointment for{" "}
            <strong>{formData.service}</strong> on <strong>{formData.date}</strong> at{" "}
            <strong>{formData.time}</strong> has been successfully booked.
          </p>
          <p className="text-xs text-gray-400">
            A confirmation has been sent to <strong>{formData.email}</strong>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setCurrentStep(1); setFormData(emptyForm); }}
            className="w-full py-4 bg-[#F5C518] text-[#1a2b4a] font-extrabold rounded-xl text-base
                       shadow-[0_4px_14px_rgba(245,197,24,0.4)] hover:brightness-105 transition-all"
          >
            Book New Appointment
          </button>
        </div>
      </div>
    );
  }

  // ── Main ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.08)]">
        <div className="px-8 pt-10 pb-14 md:px-16">

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-3">
            Book an Appointment
          </h1>
          <p className="text-base text-gray-900 leading-relaxed mb-10">
            Use our simple booking assistant to schedule your service appointment.
          </p>

          {/* Stepper */}
          <div className="flex items-start mb-12 overflow-x-auto pb-1">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-center flex-1 min-w-0">
                {i > 0 && (
                  <div className={`h-[3px] flex-1 rounded-full mt-4 min-w-[12px] transition-all duration-300
                    ${currentStep > i ? "bg-[#F5C518]" : "bg-gray-200"}`}
                  />
                )}
                <div
                  className="flex flex-col items-center gap-1.5 flex-shrink-0"
                  onClick={() => { if (step.number < currentStep) setCurrentStep(step.number); }}
                  style={{ cursor: step.number < currentStep ? "pointer" : "default" }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300
                    ${currentStep === step.number
                      ? "bg-[#F5C518] text-[#1a2b4a] ring-4 ring-yellow-200"
                      : currentStep > step.number
                      ? "bg-[#F5C518] text-[#1a2b4a]"
                      : "bg-gray-200 text-gray-400"}`}
                  >
                    {step.number}
                  </div>
                  <span className={`text-xs font-semibold text-center whitespace-nowrap max-w-[88px] leading-tight
                    ${currentStep === step.number ? "text-[#F5C518]"
                      : currentStep > step.number ? "text-[#1a2b4a]"
                      : "text-gray-400"}`}
                  >
                    {step.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Step 1 ── */}
          {currentStep === 1 && (
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#1a2b4a] mb-6">
                1. Select a Service
              </h2>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {visibleServices.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => update("service", s.label)}
                    className={`flex items-center w-full px-6 py-5 gap-4 border-b border-gray-100
                      text-left transition-all duration-200 last:border-b-0
                      ${formData.service === s.label
                        ? "bg-yellow-50 border-l-4 border-l-[#F5C518]"
                        : "bg-white hover:bg-gray-50"}`}
                  >
                    <span className="text-2xl w-8 text-center">{s.icon}</span>
                    <span className="flex-1 text-base font-semibold text-[#1a2b4a]">{s.label}</span>
                    {formData.service === s.label && (
                      <span className="text-[#F5C518] font-bold text-lg">✓</span>
                    )}
                  </button>
                ))}
                {!formData.showAllServices && (
                  <button
                    onClick={() => update("showAllServices", true)}
                    className="flex items-center w-full px-6 py-5 gap-4 bg-white hover:bg-gray-50 transition-all"
                  >
                    <span className="text-xl w-7 text-center text-gray-400">···</span>
                    <span className="flex-1 text-[15px] font-semibold text-blue-700">
                      Show more services
                    </span>
                  </button>
                )}
              </div>
              {errors.service && <p className="text-red-500 text-xs font-semibold mt-2">{errors.service}</p>}
            </div>
          )}

          {/* ── Step 2 ── */}
          {currentStep === 2 && (
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#1a2b4a] mb-6">2. Select Your Vehicle</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <select
                    value={formData.brand}
                    onChange={(e) => { update("brand", e.target.value); update("model", ""); }}
                    className={inputClass(errors.brand)}
                  >
                    <option value="">Car Brand</option>
                    {carBrands.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {errors.brand && <p className="text-red-500 text-xs font-semibold mt-1">{errors.brand}</p>}
                </div>
                <div>
                  <select
                    value={formData.model}
                    onChange={(e) => update("model", e.target.value)}
                    disabled={!formData.brand}
                    className={`${inputClass(errors.model)} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="">Car Model</option>
                    {formData.brand && carModels[formData.brand]?.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {errors.model && <p className="text-red-500 text-xs font-semibold mt-1">{errors.model}</p>}
                </div>
                <div>
                  <select
                    value={formData.year}
                    onChange={(e) => update("year", e.target.value)}
                    className={inputClass(errors.year)}
                  >
                    <option value="">Year</option>
                    {years.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                  {errors.year && <p className="text-red-500 text-xs font-semibold mt-1">{errors.year}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3 ── */}
          {currentStep === 3 && (
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#1a2b4a] mb-6">3. Select Date & Time</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => update("date", e.target.value)}
                    className={inputClass(errors.date)}
                  />
                  {errors.date && <p className="text-red-500 text-xs font-semibold mt-1">{errors.date}</p>}
                </div>
                <div>
                  <select
                    value={formData.time}
                    onChange={(e) => update("time", e.target.value)}
                    className={inputClass(errors.time)}
                  >
                    <option value="">Time</option>
                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <p className="text-red-500 text-xs font-semibold mt-1">{errors.time}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 4 ── */}
          {currentStep === 4 && (
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#1a2b4a] mb-6">4. Contact Information</h2>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name*"
                      value={formData.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className={inputClass(errors.firstName)}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs font-semibold mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name*"
                      value={formData.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className={inputClass(errors.lastName)}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs font-semibold mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="E-mail*"
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass(errors.email)}
                  />
                  {errors.email && <p className="text-red-500 text-xs font-semibold mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone*"
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass(errors.phone)}
                  />
                  {errors.phone && <p className="text-red-500 text-xs font-semibold mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Address*"
                    value={formData.address}
                    onChange={(e) => update("address", e.target.value)}
                    className={inputClass(errors.address)}
                  />
                  {errors.address && <p className="text-red-500 text-xs font-semibold mt-1">{errors.address}</p>}
                </div>

                {/* Pickup or Delivery */}
                <div>
                  <p className="text-sm font-bold text-[#1a2b4a] mb-3">Pick-up or Home Delivery*</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => update("deliveryOption", "pickup")}
                      className={`flex flex-col items-center gap-2 py-5 px-4 rounded-xl border-2 transition-all duration-200
                        ${formData.deliveryOption === "pickup"
                          ? "border-[#F5C518] bg-yellow-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"}`}
                    >
                      <span className="text-3xl">🏪</span>
                      <span className={`text-sm font-bold ${formData.deliveryOption === "pickup" ? "text-[#1a2b4a]" : "text-gray-500"}`}>
                        Self Drop-off
                      </span>
                      <span className="text-xs text-gray-400 text-center leading-tight">
                        Drop your car at our shop
                      </span>
                      {formData.deliveryOption === "pickup" && (
                        <span className="text-[#F5C518] font-bold text-lg">✓</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => update("deliveryOption", "delivery")}
                      className={`flex flex-col items-center gap-2 py-5 px-4 rounded-xl border-2 transition-all duration-200
                        ${formData.deliveryOption === "delivery"
                          ? "border-[#F5C518] bg-yellow-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"}`}
                    >
                      <span className="text-3xl">🚚</span>
                      <span className={`text-sm font-bold ${formData.deliveryOption === "delivery" ? "text-[#1a2b4a]" : "text-gray-500"}`}>
                        Home Delivery
                      </span>
                      <span className="text-xs text-gray-400 text-center leading-tight">
                        We come to you
                      </span>
                      {formData.deliveryOption === "delivery" && (
                        <span className="text-[#F5C518] font-bold text-lg">✓</span>
                      )}
                    </button>
                  </div>
                  {errors.deliveryOption && (
                    <p className="text-red-500 text-xs font-semibold mt-2">{errors.deliveryOption}</p>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 bg-gray-50 rounded-xl border border-gray-100 p-5">
                <h3 className="text-xs font-bold text-[#1a2b4a] uppercase tracking-widest mb-3">
                  Summary
                </h3>
                {[
                  { label: "Service", value: formData.service },
                  { label: "Vehicle", value: `${formData.brand} ${formData.model} (${formData.year})` },
                  { label: "Appointment", value: `${formData.date} at ${formData.time}` },
                  { label: "Option", value: formData.deliveryOption === "pickup" ? "🏪 Self Drop-off" : "🚚 Home Delivery" },
                ].map((row) => (
                  <div key={row.label} className="flex gap-2 text-sm text-gray-600 pb-2 mb-2 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
                    <span className="font-bold text-[#1a2b4a] min-w-[80px]">{row.label}:</span>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit / Next */}
          <button
            onClick={handleNext}
            className="w-full py-5 bg-[#F5C518] text-[#1a2b4a] font-extrabold rounded-xl text-lg
                       shadow-[0_4px_14px_rgba(245,197,24,0.4)] hover:brightness-105
                       active:scale-[0.98] transition-all duration-200 mt-4"
          >
            {currentStep === 4 ? "Book Now" : "Next"}
          </button>

        </div>
      </div>
    </div>
  );
}
