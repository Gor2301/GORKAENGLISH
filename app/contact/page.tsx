'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Save to PocketBase
      const leadResponse = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const leadResult = await leadResponse.json();

      if (!leadResponse.ok) {
        throw new Error(leadResult.error || 'Failed to send message');
      }

      // 2. Send emails via Resend (admin + student)
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: `New Contact Form Message from ${formData.name}`,
        }),
      });

      if (!emailResponse.ok) {
        const emailResult = await emailResponse.json();
        console.warn('Email failed but lead was saved:', emailResult.error);
        // Still show success since the lead was saved
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="content-block text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[#03010D]">
                <span className="text-[#8A61FF]">Contact</span> Us
              </h1>
              <p className="mt-4 text-lg text-[#666666]">
                Have questions? We'd love to hear from you!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form + Info */}
        <section className="section-padding bg-[#F8F8F8]">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-[#03010D] mb-6">
                  Get in Touch
                </h2>
                <p className="text-[#666666] mb-8">
                  Whether you have questions about lessons, want to book a trial, or just want to say hello — we're here to help.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-[#E5E5E6]">
                    <div className="p-2 bg-[#EFEAFF] rounded-lg">
                      <Mail size={20} className="text-[#8A61FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666666]">Email</p>
                      <a href="mailto:hello@gorkaenglish.com" className="text-[#03010D] hover:text-[#8A61FF] transition-colors">
                        hello@gorkaenglish.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-[#E5E5E6]">
                    <div className="p-2 bg-[#FFEEEA] rounded-lg">
                      <Phone size={20} className="text-[#FF9F87]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666666]">Phone</p>
                      <a href="tel:+15551234567" className="text-[#03010D] hover:text-[#8A61FF] transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-[#E5E5E6]">
                    <div className="p-2 bg-[#E8FCF7] rounded-lg">
                      <MapPin size={20} className="text-[#7CEED0]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666666]">Address</p>
                      <p className="text-[#03010D]">123 Main Street, City, Country</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-[#EFEAFF] rounded-lg border border-[#8A61FF]/20">
                  <p className="text-sm text-[#666666]">
                    <span className="font-semibold text-[#8A61FF]">💡 Tip:</span> For fastest response, book a free trial lesson directly through our booking system.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-2xl border border-[#E5E5E6]">
                <h2 className="text-2xl font-bold text-[#03010D] mb-6">
                  Send a Message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#E8FCF7] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-[#7CEED0]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#03010D] mb-2">Message Sent!</h3>
                    <p className="text-[#666666]">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#03010D] mb-1">
                        Your Name *
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
                      <label htmlFor="message" className="block text-sm font-medium text-[#03010D] mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#8A61FF] focus:border-transparent transition resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>

                    <p className="text-xs text-[#666666] text-center">
                      We'll never share your information with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}