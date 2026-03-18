'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const serviceIcons: Record<string, string> = {
  'Wheel Change': '🔄',
  'Tyre Fitting': '🔧',
  'Oil Change': '🛢️',
  Brakes: '🛑',
  'AdBlue & Fluids': '💧',
  Inspection: '🔩',
  'MOT Preparation': '🚗',
  'Air Conditioning': '❄️',
};

const years = Array.from({ length: 25 }, (_, i) => String(2024 - i));
const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
];
const steps = [
  { number: 1, label: 'Service' },
  { number: 2, label: 'Vehicle' },
  { number: 3, label: 'Date & Time' },
  { number: 4, label: 'Contact' },
];

interface Service {
  id: number;
  name: string;
  price: string;
  description: string;
}
interface Brand {
  id: number;
  name: string;
}
interface CarModel {
  id: number;
  name: string;
  brand_id: number;
}
interface FormData {
  serviceId: number | null;
  serviceName: string;
  showAllServices: boolean;
  brandId: number | null;
  brandName: string;
  modelId: number | null;
  modelName: string;
  year: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  numberplate: string;
  notes: string;
  deliveryOption: 'pickup' | 'delivery' | '';
}

const emptyForm: FormData = {
  serviceId: null,
  serviceName: '',
  showAllServices: false,
  brandId: null,
  brandName: '',
  modelId: null,
  modelName: '',
  year: '',
  date: '',
  time: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  numberplate: '',
  notes: '',
  deliveryOption: '',
};

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<CarModel[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch(API + '/api/services')
      .then((r) => r.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(console.error);
    fetch(API + '/api/cars/brands')
      .then((r) => r.json())
      .then((data) => setBrands(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!formData.brandId) return;
    fetch(API + '/api/cars/models/' + formData.brandId)
      .then((r) => r.json())
      .then((data) => setModels(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, [formData.brandId]);

  useEffect(() => {
    if (!formData.date) return;
    setBookedSlots([]);
    fetch(API + '/api/public/availability?date=' + formData.date)
      .then((r) => r.json())
      .then((data) =>
        setBookedSlots(Array.isArray(data.bookedSlots) ? data.bookedSlots : []),
      )
      .catch(console.error);
  }, [formData.date]);

  useEffect(() => {
    const step = searchParams.get('step');
    const serviceId = searchParams.get('serviceId');
    const serviceName = searchParams.get('serviceName');
    if (serviceId && serviceName) {
      setFormData((prev) => ({
        ...prev,
        serviceId: Number(serviceId),
        serviceName: serviceName,
      }));
    }
    if (step) setCurrentStep(Number(step));
  }, [searchParams]);

  const visibleServices = formData.showAllServices
    ? services
    : services.slice(0, 6);

  const validate = () => {
    const e: Record<string, string> = {};
    if (currentStep === 1 && !formData.serviceId)
      e.service = 'Please select a service.';
    if (currentStep === 2) {
      if (!formData.brandId) e.brand = 'Please select a car brand.';
      if (!formData.modelId) e.model = 'Please select a model.';
      if (!formData.year) e.year = 'Please select a year.';
    }
    if (currentStep === 3) {
      if (!formData.date) e.date = 'Please select a date.';
      if (!formData.time) e.time = 'Please select a time.';
    }
    if (currentStep === 4) {
      if (!formData.firstName.trim()) e.firstName = 'First name is required.';
      if (!formData.lastName.trim()) e.lastName = 'Last name is required.';
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
        e.email = 'A valid email is required.';
      if (!formData.phone.trim()) e.phone = 'Phone number is required.';
      if (!formData.numberplate.trim()) e.numberplate = 'Number plate is required.';
      if (!formData.deliveryOption) e.deliveryOption = 'Please select an option.';
    
    
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    if (currentStep < 4) {
      setCurrentStep((s) => s + 1);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(API + '/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          numberplate: formData.numberplate,
          car_model_id: formData.modelId,
          car_year: Number(formData.year),
          service_id: formData.serviceId,
          booking_date: formData.date,
          booking_time: formData.time,
          pickup_required: formData.deliveryOption === 'pickup',
          delivery_required: formData.deliveryOption === 'delivery',
          notes: formData.notes,
        }),
      });
      if (!res.ok) throw new Error('Booking failed');
      setSubmitted(true);
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const update = (field: keyof FormData, value: string | boolean | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors({});
  };

  const inputClass = (err?: string) =>
    'w-full px-5 py-4 rounded-xl border-[1.5px] bg-gray-50 text-[#1a2b4a] text-base outline-none transition placeholder-gray-400 ' +
    (err ? 'border-red-400' : 'border-gray-200 focus:border-[#F5C518]');

  if (submitted) {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16'>
        <div className='bg-white rounded-2xl shadow-lg max-w-md w-full p-10 flex flex-col items-center gap-5 text-center'>
          <div className='text-6xl'>✅</div>
          <h2 className='text-2xl font-extrabold text-[#1a2b4a]'>Appointment Confirmed!</h2>
          <p className='text-sm text-gray-600 leading-relaxed'>
            Thank you, <strong>{formData.firstName}</strong>! Your appointment for{' '}
            <strong>{formData.serviceName}</strong> on <strong>{formData.date}</strong> at{' '}
            <strong>{formData.time}</strong> has been successfully booked.
          </p>
          <p className='text-xs text-gray-400'>
            A confirmation sent to <strong>{formData.email}</strong>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setCurrentStep(1); setFormData(emptyForm); }}
            className='w-full py-4 bg-[#F5C518] text-[#1a2b4a] font-extrabold rounded-xl text-base shadow-[0_4px_14px_rgba(245,197,24,0.4)] hover:brightness-105 transition-all'
          >
            Book New Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    
    <div className='min-h-screen bg-gray-100 py-8 px-4'>if (!formData.address) e.address = 'Address is required.';
      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.08)]'>
        <div className='px-8 pt-10 pb-14 md:px-16'>
          <h1 className='text-3xl md:text-4xl font-extrabold text-blue-500 mb-3'>Book an Appointment</h1>
          <p className='text-base text-gray-500 leading-relaxed mb-10'>
            Use our simple booking assistant to schedule your service appointment.
          </p>

          {/* Step indicators */}
          <div className='flex items-center mb-12 w-full'>
            {steps.map((step, i) => (
              <div key={step.number} className='flex items-center' style={{ flex: i < steps.length - 1 ? '1' : '0' }}>
                <div
                  className='flex flex-col items-center shrink-0'
                  onClick={() => { if (step.number < currentStep) setCurrentStep(step.number); }}
                  style={{ cursor: step.number < currentStep ? 'pointer' : 'default' }}
                >
                  <div className={
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 ' +
                    (currentStep === step.number
                      ? 'bg-[#F5C518] text-[#1a2b4a] ring-4 ring-yellow-200'
                      : currentStep > step.number
                        ? 'bg-[#F5C518] text-[#1a2b4a]'
                        : 'bg-gray-200 text-gray-400')
                  }>
                    {step.number}
                  </div>
                  <span className={
                    'text-xs font-semibold text-center whitespace-nowrap mt-1 ' +
                    (currentStep === step.number ? 'text-[#F5C518]' : currentStep > step.number ? 'text-[#1a2b4a]' : 'text-gray-400')
                  }>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={
                    'h-0.75 flex-1 mx-2 rounded-full transition-all duration-300 ' +
                    (currentStep > i + 1 ? 'bg-[#F5C518]' : 'bg-gray-200')
                  } />
                )}
              </div>
            ))}
          </div>

          {/* Step 1 - Service */}
          {currentStep === 1 && (
            <div className='mb-6'>
              <h2 className='text-2xl font-extrabold text-[#1a2b4a] mb-6'>1. Select a Service</h2>
              {services.length === 0 ? (
                <p className='text-gray-400 text-sm'>Loading services...</p>
              ) : (
                <div className='border border-gray-200 rounded-xl overflow-hidden'>
                  {visibleServices.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { update('serviceId', s.id); update('serviceName', s.name); }}
                      className={
                        'flex items-center w-full px-6 py-5 gap-4 border-b border-gray-100 text-left transition-all duration-200 last:border-b-0 ' +
                        (formData.serviceId === s.id ? 'bg-yellow-50 border-l-4 border-l-[#F5C518] animate-pulse' : 'bg-white hover:bg-gray-50')
                      }
                    >
                      <span className='text-2xl w-8 text-center'>{serviceIcons[s.name] || '🔧'}</span>
                      <span className='flex-1 text-base font-semibold text-[#1a2b4a]'>{s.name}</span>
                      <span className='text-sm text-gray-400 font-medium'>€{s.price}</span>
                      {formData.serviceId === s.id && <span className='text-[#F5C518] font-bold text-lg'>✓</span>}
                    </button>
                  ))}
                  {!formData.showAllServices && services.length > 6 && (
                    <button
                      onClick={() => update('showAllServices', true)}
                      className='flex items-center w-full px-6 py-5 gap-4 bg-white hover:bg-gray-50 transition-all'
                    >
                      <span className='text-xl w-7 text-center text-gray-400'>···</span>
                      <span className='flex-1 text-sm font-semibold text-blue-500'>Show more services</span>
                    </button>
                  )}
                </div>
              )}
              {errors.service && <p className='text-red-500 text-xs font-semibold mt-2'>{errors.service}</p>}
            </div>
          )}

          {/* Step 2 - Vehicle */}
          {currentStep === 2 && (
            <div className='mb-6'>
              <h2 className='text-2xl font-extrabold text-[#1a2b4a] mb-6'>2. Select Your Vehicle</h2>
              <div className='flex flex-col gap-4'>
                <div>
                  <select
                    value={formData.brandId ?? ''}
                    className={inputClass(errors.brand)}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const b = brands.find((x) => x.id === val);
                      update('brandId', val || null);
                      update('brandName', b?.name || '');
                      update('modelId', null);
                      update('modelName', '');
                      setModels([]);
                    }}
                  >
                    <option value=''>Car Brand</option>
                    {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                  {errors.brand && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.brand}</p>}
                </div>
                <div>
                  <select
                    value={formData.modelId ?? ''}
                    disabled={!formData.brandId}
                    className={inputClass(errors.model) + ' disabled:opacity-50 disabled:cursor-not-allowed'}
                    onChange={(e) => {
                      const m = models.find((x) => x.id === Number(e.target.value));
                      update('modelId', Number(e.target.value));
                      update('modelName', m?.name || '');
                    }}
                  >
                    <option value=''>Car Model</option>
                    {models.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                  {errors.model && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.model}</p>}
                </div>
                <div>
                  <select value={formData.year} onChange={(e) => update('year', e.target.value)} className={inputClass(errors.year)}>
                    <option value=''>Year</option>
                    {years.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                  {errors.year && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.year}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Date & Time */}
          {currentStep === 3 && (
            <div className='mb-6'>
              <h2 className='text-2xl font-extrabold text-[#1a2b4a] mb-6'>3. Select Date & Time</h2>
              <div className='flex flex-col gap-4'>
                <div>
                  <input
                    type='date'
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => { update('date', e.target.value); update('time', ''); }}
                    className={inputClass(errors.date)}
                  />
                  {errors.date && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.date}</p>}
                </div>
                <div>
                  <select
                    value={formData.time}
                    onChange={(e) => update('time', e.target.value)}
                    className={inputClass(errors.time)}
                    disabled={!formData.date}
                  >
                    <option value=''>{formData.date ? 'Select a time' : 'Select a date first'}</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t} disabled={bookedSlots.includes(t)}>
                        {bookedSlots.includes(t) ? `${t} — Booked` : t}
                      </option>
                    ))}
                  </select>
                  {errors.time && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.time}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 - Contact */}
          {currentStep === 4 && (
            <div className='mb-6'>
              <h2 className='text-2xl font-extrabold text-[#1a2b4a] mb-6'>4. Contact Information</h2>
              <div className='flex flex-col gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <input type='text' placeholder='First Name*' value={formData.firstName}
                      onChange={(e) => update('firstName', e.target.value)} className={inputClass(errors.firstName)} />
                    {errors.firstName && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.firstName}</p>}
                  </div>
                  <div>
                    <input type='text' placeholder='Last Name*' value={formData.lastName}
                      onChange={(e) => update('lastName', e.target.value)} className={inputClass(errors.lastName)} />
                    {errors.lastName && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <input type='email' placeholder='Email*' value={formData.email}
                    onChange={(e) => update('email', e.target.value)} className={inputClass(errors.email)} />
                  {errors.email && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.email}</p>}
                </div>
                <div>
                  <input type='tel' placeholder='Phone*' value={formData.phone}
                    onChange={(e) => update('phone', e.target.value)} className={inputClass(errors.phone)} />
                  {errors.phone && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.phone}</p>}
                </div>
                <div>
                  <input type='text' placeholder='Address' value={formData.address}
                    onChange={(e) => update('address', e.target.value)} className={inputClass(errors.address)} />
                  {errors.address && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.address}</p>}
                </div>

                {/* Number Plate */}
                <div>
                  <input
                    type='text'
                    placeholder='Number Plate* (e.g. AB12 CDE)'
                    value={formData.numberplate}
                    onChange={(e) => update('numberplate', e.target.value.toUpperCase())}
                    className={inputClass(errors.numberplate)}
                  />
                  {errors.numberplate && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.numberplate}</p>}
                </div>

                {/* Notes */}
                <div>
                  <textarea
                    placeholder='Additional notes (optional) — e.g. strange noise, warning light on dashboard...'
                    value={formData.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    rows={3}
                    className='w-full px-5 py-4 rounded-xl border-[1.5px] bg-gray-50 text-[#1a2b4a] text-base outline-none transition placeholder-gray-400 resize-none border-gray-200 focus:border-[#F5C518]'
                  />
                </div>

                {/* Delivery Option */}
                <div>
                  <p className='text-sm font-bold text-[#1a2b4a] mb-3'>Pick-up or Home Delivery*</p>
                  <div className='grid grid-cols-2 gap-4'>
                    <button type='button'
                      onClick={() => update('deliveryOption', formData.deliveryOption === 'pickup' ? '' : 'pickup')}
                      className={
                        'flex flex-col items-center gap-2 py-5 px-4 rounded-xl border-2 transition-all duration-200 ' +
                        (formData.deliveryOption === 'pickup' ? 'border-[#F5C518] bg-yellow-50' : 'border-gray-200 bg-white hover:bg-gray-50')
                      }
                    >
                      <span className='text-3xl'>🏪</span>
                      <span className={'text-sm font-bold ' + (formData.deliveryOption === 'pickup' ? 'text-[#1a2b4a]' : 'text-gray-500')}>
                        Self Drop-off
                      </span>
                      <span className='text-xs text-gray-400 text-center leading-tight'>Drop your car at our shop</span>
                      {formData.deliveryOption === 'pickup' && <span className='text-[#F5C518] font-bold text-lg'>✓</span>}
                    </button>
                    <button type='button'
                      onClick={() => update('deliveryOption', formData.deliveryOption === 'delivery' ? '' : 'delivery')}
                      className={
                        'flex flex-col items-center gap-2 py-5 px-4 rounded-xl border-2 transition-all duration-200 ' +
                        (formData.deliveryOption === 'delivery' ? 'border-[#F5C518] bg-yellow-50' : 'border-gray-200 bg-white hover:bg-gray-50')
                      }
                    >
                      <span className='text-3xl'>🚚</span>
                      <span className={'text-sm font-bold ' + (formData.deliveryOption === 'delivery' ? 'text-[#1a2b4a]' : 'text-gray-500')}>
                        Home Delivery
                      </span>
                      <span className='text-xs text-gray-400 text-center leading-tight'>We come to you</span>
                      {formData.deliveryOption === 'delivery' && <span className='text-[#F5C518] font-bold text-lg'>✓</span>}
                    </button>
                  </div>
                  {errors.deliveryOption && <p className='text-red-500 text-xs font-semibold mt-2'>{errors.deliveryOption}</p>}
                </div>
              </div>

              {/* Summary */}
              <div className='mt-6 bg-gray-50 rounded-xl border border-gray-100 p-5'>
                <h3 className='text-xs font-bold text-[#1a2b4a] uppercase tracking-widest mb-3'>Summary</h3>
                {[
                  { label: 'Service', value: formData.serviceName },
                  { label: 'Vehicle', value: `${formData.brandName} ${formData.modelName} (${formData.year})` },
                  { label: 'Appointment', value: `${formData.date} at ${formData.time}` },
                  { label: 'Number Plate', value: formData.numberplate },
                  { label: 'Option', value: formData.deliveryOption === 'pickup' ? 'Self Drop-off' : 'Home Delivery' },
                ].map((row) => (
                  <div key={row.label} className='flex gap-2 text-sm text-gray-600 pb-2 mb-2 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0'>
                    <span className='font-bold text-[#1a2b4a] min-w-22.5'>{row.label}:</span>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
              {errors.submit && <p className='text-red-500 text-sm font-semibold mt-3 text-center'>{errors.submit}</p>}
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={loading}
            className='w-full py-5 bg-[#F5C518] text-[#1a2b4a] font-extrabold rounded-xl text-lg shadow-[0_4px_14px_rgba(245,197,24,0.4)] hover:brightness-105 active:scale-[0.98] transition-all duration-200 mt-4 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? 'Booking...' : currentStep === 4 ? 'Book Now' : 'Next'}
          </button>
        </div>
      </div>
    </div>
   
  );
}
