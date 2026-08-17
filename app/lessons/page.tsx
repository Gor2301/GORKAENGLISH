'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import BookingModal from '@/components/ui/BookingModal';
import { Star, Clock, Users, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getLessonPackages } from '@/lib/pocketbase-service';

interface LessonPackage {
  id: string;
  name: string;
  level: string;
  description: string;
  features: string[];
  sessions: string;
  duration: string;
  price: string;
  popular: boolean;
  active: boolean;
}

export default function LessonsPage() {
  const [packages, setPackages] = useState<LessonPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getLessonPackages();
        
        if (result.success && result.data) {
          setPackages(result.data as LessonPackage[]);
        } else {
          setError(result.error || 'Failed to load lesson packages');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleBookNow = (pkg: { name: string; price: string }) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="section-padding bg-white">
          <div className="container-custom text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#8A61FF] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-[#666666]">Loading packages...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="content-block text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[#03010D]">
                Our <span className="text-[#8A61FF]">Lessons</span>
              </h1>
              <p className="mt-4 text-lg text-[#666666]">
                Choose the package that fits your goals and learning style
              </p>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="section-padding bg-[#F8F8F8]">
          <div className="container-custom">
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : packages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#666666]">No lesson packages available yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packages.map((pkg) => (
                  <div 
                    key={pkg.id}
                    className={`bg-white rounded-2xl border p-6 transition-all hover:shadow-lg relative ${
                      pkg.popular ? 'border-[#8A61FF] shadow-md' : 'border-[#E5E5E6]'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-6 bg-[#8A61FF] text-white text-xs font-bold px-4 py-1 rounded-full">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-[#03010D]">{pkg.name}</h3>
                        <p className="text-sm text-[#8A61FF] font-medium">{pkg.level}</p>
                      </div>
                      <div className="flex items-center gap-1 text-[#F59E0B]">
                        <Star size={16} fill="#F59E0B" />
                        <Star size={16} fill="#F59E0B" />
                        <Star size={16} fill="#F59E0B" />
                        <Star size={16} fill="#F59E0B" />
                        <Star size={16} className="text-[#E5E5E6]" />
                      </div>
                    </div>

                    <p className="text-[#666666] mt-3">{pkg.description}</p>

                    <div className="mt-4 space-y-2">
                      {pkg.features && pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-[#666666]">
                          <CheckCircle size={16} className="text-[#7CEED0]" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#666666]">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {pkg.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        {pkg.sessions}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#E5E5E6]">
                      <div>
                        <span className="text-2xl font-bold text-[#03010D]">{pkg.price}</span>
                        <span className="text-sm text-[#666666]"> / package</span>
                      </div>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleBookNow({ name: pkg.name, price: pkg.price })}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#8A61FF] py-16">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Not sure which package is right for you?
            </h2>
            <p className="text-white/80 mt-2 mb-6">
              Book a free consultation to discuss your goals
            </p>
            <Button variant="secondary" size="lg">
              Book a Free Consultation
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Booking Modal */}
      {selectedPackage && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
        />
      )}
    </>
  );
}