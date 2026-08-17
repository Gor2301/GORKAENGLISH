 
'use client';

import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import Button from './Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packagePrice: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  packageName,
  packagePrice,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_time: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          lesson_type: packageName,
          status: 'pending',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to book lesson');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferred_time: '',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-[#F8F8F8] transition-colors"
        >
          <X size={24} className="text-[#666666]" />
        </button>

        <h2 className="text-2xl font-bold text-[#03010D] mb-1">
          Book {packageName}
        </h2>
        <p className="text-[#8A61FF] font-medium mb-4">{packagePrice}</p>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#E8FCF7] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-[#7CEED0]" />
            </div>
            <h3 className="text-xl font-bold text-[#03010D] mb-2">Booking Confirmed!</h3>
            <p className="text-[#666666]">
              Thank you for booking! Levita will contact you within 24 hours to confirm your lesson.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#03010D] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#8A61FF] focus:border-transparent transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#03010D] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#8A61FF] focus:border-transparent transition"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#03010D] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#8A61FF] focus:border-transparent transition"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="preferred_time" className="block text-sm font-medium text-[#03010D] mb-1">
                Preferred Time
              </label>
              <select
                id="preferred_time"
                name="preferred_time"
                value={formData.preferred_time}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#8A61FF] focus:border-transparent transition"
              >
                <option value="">Select a time...</option>
                <option value="morning">Morning (9am - 12pm)</option>
                <option value="afternoon">Afternoon (12pm - 5pm)</option>
                <option value="evening">Evening (5pm - 9pm)</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#03010D] mb-1">
                Additional Notes
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#8A61FF] focus:border-transparent transition resize-none"
                placeholder="Any special requests or questions..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Booking...' : 'Book Now'}
            </Button>

            <p className="text-xs text-[#666666] text-center">
              You'll receive a confirmation email with lesson details.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;