import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FileText, CheckCircle, AlertCircle, Users, Clock, CreditCard } from 'lucide-react';

export default function TermsPage() {
  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="content-block text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#EFEAFF] rounded-full">
                  <FileText size={40} className="text-[#8A61FF]" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#03010D]">
                Terms of <span className="text-[#8A61FF]">Service</span>
              </h1>
              <p className="mt-4 text-[#666666]">
                Last updated: August 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-[#F8F8F8] pt-0">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 border border-[#E5E5E6]">
              
              <div className="space-y-8">
                {/* Introduction */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <AlertCircle size={24} className="text-[#8A61FF]" />
                    Agreement to Terms
                  </h2>
                  <p className="text-[#666666] leading-relaxed">
                    By using GORKAENGLISH ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
                  </p>
                </div>

                {/* Services */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <CheckCircle size={24} className="text-[#8A61FF]" />
                    Our Services
                  </h2>
                  <p className="text-[#666666] leading-relaxed mb-3">
                    GORKAENGLISH provides English language lessons and tutoring services, including:
                  </p>
                  <ul className="space-y-2 text-[#666666] list-disc pl-6">
                    <li>Live English lessons with Levita</li>
                    <li>AI-powered tutoring through Gemini integration</li>
                    <li>Lesson materials and resources</li>
                    <li>Progress tracking and feedback</li>
                  </ul>
                </div>

                {/* Booking & Payments */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <CreditCard size={24} className="text-[#8A61FF]" />
                    Bookings & Payments
                  </h2>
                  <ul className="space-y-2 text-[#666666] list-disc pl-6">
                    <li>Lesson bookings are subject to availability</li>
                    <li>Payment is required before the first lesson</li>
                    <li>We reserve the right to cancel or reschedule lessons with reasonable notice</li>
                    <li>Refund policy: Cancellations made 24 hours in advance are eligible for a full refund or reschedule</li>
                    <li>No-shows or last-minute cancellations may be subject to a fee</li>
                  </ul>
                </div>

                {/* User Responsibilities */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <Users size={24} className="text-[#8A61FF]" />
                    User Responsibilities
                  </h2>
                  <p className="text-[#666666] leading-relaxed mb-3">
                    By using our services, you agree to:
                  </p>
                  <ul className="space-y-2 text-[#666666] list-disc pl-6">
                    <li>Provide accurate and truthful information</li>
                    <li>Respect the teacher and other students</li>
                    <li>Attend lessons on time and be prepared</li>
                    <li>Not share your account credentials with others</li>
                    <li>Use the services for lawful purposes only</li>
                  </ul>
                </div>

                {/* Intellectual Property */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <FileText size={24} className="text-[#8A61FF]" />
                    Intellectual Property
                  </h2>
                  <p className="text-[#666666] leading-relaxed">
                    All content on this website — including text, graphics, logos, lesson materials, and AI-generated content — is the property of GORKAENGLISH and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express permission.
                  </p>
                </div>

                {/* AI Tutor */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <Clock size={24} className="text-[#8A61FF]" />
                    AI Tutor
                  </h2>
                  <p className="text-[#666666] leading-relaxed">
                    Our AI Tutor, powered by Google Gemini, is provided as a supplementary learning tool. While we strive for accuracy, AI-generated responses may contain errors. We recommend using the AI Tutor alongside live lessons with Levita for the best learning experience.
                  </p>
                </div>

                {/* Limitation of Liability */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <AlertCircle size={24} className="text-[#8A61FF]" />
                    Limitation of Liability
                  </h2>
                  <p className="text-[#666666] leading-relaxed">
                    GORKAENGLISH provides services "as is" without warranties of any kind. We are not liable for any damages arising from your use of our website or services. In no event shall our total liability exceed the amount you paid for our services.
                  </p>
                </div>

                {/* Changes to Terms */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3">
                    Changes to These Terms
                  </h2>
                  <p className="text-[#666666] leading-relaxed">
                    We reserve the right to update these Terms of Service at any time. We will notify you of changes by posting the new terms on this page. Your continued use of our services constitutes acceptance of the updated terms.
                  </p>
                </div>

                {/* Contact */}
                <div className="pt-6 border-t border-[#E5E5E6]">
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <Users size={24} className="text-[#8A61FF]" />
                    Contact Us
                  </h2>
                  <p className="text-[#666666] leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="mt-3 p-4 bg-[#F8F8F8] rounded-lg">
                    <p className="text-[#03010D] font-medium">GORKAENGLISH</p>
                    <p className="text-[#666666] text-sm">Email: <a href="mailto:hello@gorkaenglish.com" className="text-[#8A61FF] hover:underline">hello@gorkaenglish.com</a></p>
                    <p className="text-[#666666] text-sm">Phone: +1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}