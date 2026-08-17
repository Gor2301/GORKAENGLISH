import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Shield, Eye, Lock, Database, Mail, Cookie } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
                  <Shield size={40} className="text-[#8A61FF]" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#03010D]">
                Privacy <span className="text-[#8A61FF]">Policy</span>
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
                    <Eye size={24} className="text-[#8A61FF]" />
                    Introduction
                  </h2>
                  <p className="text-[#666666] leading-relaxed">
                    GORKAENGLISH ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                  </p>
                  <p className="text-[#666666] leading-relaxed mt-2">
                    Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                  </p>
                </div>

                {/* Information We Collect */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <Database size={24} className="text-[#8A61FF]" />
                    Information We Collect
                  </h2>
                  <p className="text-[#666666] leading-relaxed mb-3">
                    We may collect the following types of information:
                  </p>
                  <ul className="space-y-2 text-[#666666] list-disc pl-6">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, and any other information you provide when booking lessons, contacting us, or subscribing to our newsletter.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring URLs.</li>
                    <li><strong>Device Information:</strong> Browser type, operating system, and device type.</li>
                  </ul>
                </div>

                {/* How We Use Your Information */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <Mail size={24} className="text-[#8A61FF]" />
                    How We Use Your Information
                  </h2>
                  <p className="text-[#666666] leading-relaxed mb-3">
                    We use the information we collect to:
                  </p>
                  <ul className="space-y-2 text-[#666666] list-disc pl-6">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process bookings and payments</li>
                    <li>Send you lesson confirmations and updates</li>
                    <li>Respond to your inquiries and support requests</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Monitor and analyze usage patterns</li>
                  </ul>
                </div>

                {/* Cookies */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <Cookie size={24} className="text-[#8A61FF]" />
                    Cookies
                  </h2>
                  <p className="text-[#666666] leading-relaxed">
                    We use cookies to enhance your experience on our website. Cookies are small data files stored on your device. You can choose to disable cookies in your browser settings, but this may affect certain features of our website.
                  </p>
                  <p className="text-[#666666] leading-relaxed mt-2">
                    We use the following types of cookies:
                  </p>
                  <ul className="space-y-2 text-[#666666] list-disc pl-6 mt-2">
                    <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
                    <li><strong>Preference Cookies:</strong> Remember your language and other preferences.</li>
                  </ul>
                </div>

                {/* Data Security */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <Lock size={24} className="text-[#8A61FF]" />
                    Data Security
                  </h2>
                  <p className="text-[#666666] leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                {/* Your Rights */}
                <div>
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3">
                    Your Rights
                  </h2>
                  <p className="text-[#666666] leading-relaxed mb-3">
                    Depending on your location, you may have the following rights:
                  </p>
                  <ul className="space-y-2 text-[#666666] list-disc pl-6">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Object to or restrict processing of your information</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <p className="text-[#666666] leading-relaxed mt-3">
                    To exercise these rights, please contact us at: <a href="mailto:hello@gorkaenglish.com" className="text-[#8A61FF] hover:underline">hello@gorkaenglish.com</a>
                  </p>
                </div>

                {/* Contact */}
                <div className="pt-6 border-t border-[#E5E5E6]">
                  <h2 className="text-2xl font-bold text-[#03010D] mb-3 flex items-center gap-3">
                    <Mail size={24} className="text-[#8A61FF]" />
                    Contact Us
                  </h2>
                  <p className="text-[#666666] leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us:
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