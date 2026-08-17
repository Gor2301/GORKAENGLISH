'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { useTranslations, useLocale } from '@/lib/translations';
import { useEffect, useState } from 'react';
import { getTestimonials } from '@/lib/pocketbase-service';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating?: number;
  featured: boolean;
}

export default function Home() {
  const { locale } = useLocale();
  const t = useTranslations(locale);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getTestimonials();
        
        if (result.success && result.data) {
          setTestimonials(result.data as Testimonial[]);
        } else {
          setError(result.error || 'Failed to load testimonials');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="content-block text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#03010D] leading-tight">
                {t.hero.title}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-[#666666]">
                {t.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="primary" size="lg">
                  {t.hero.ctaPrimary}
                </Button>
                <Button variant="outline" size="lg">
                  {t.hero.ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="section-padding bg-[#F8F8F8]">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#03010D]">
                {t.categories.title}
              </h2>
              <p className="mt-2 text-[#666666]">{t.categories.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { key: 'general', title: t.categories.general, desc: t.categories.generalDesc },
                { key: 'business', title: t.categories.business, desc: t.categories.businessDesc },
                { key: 'exam', title: t.categories.exam, desc: t.categories.examDesc },
                { key: 'kids', title: t.categories.kids, desc: t.categories.kidsDesc },
              ].map((category) => (
                <div key={category.key} className="bg-white p-6 rounded-xl border border-[#E5E5E6] hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-[#EFEAFF] rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-[#8A61FF] rounded-full" />
                  </div>
                  <h3 className="font-semibold text-[#03010D]">{category.title}</h3>
                  <p className="text-sm text-[#666666] mt-1">{category.desc}</p>
                  <p className="text-xs text-[#8A61FF] mt-3 font-medium">{t.categories.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#03010D]">
                What Our Students Say
              </h2>
              <p className="mt-2 text-[#666666]">Real stories from real learners</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-[#8A61FF] border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-[#666666]">Loading testimonials...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#666666]">No testimonials yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-[#F8F8F8] p-6 rounded-xl border border-[#E5E5E6] hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < (testimonial.rating || 5) ? '#F59E0B' : 'none'} />
                      ))}
                    </div>
                    <p className="text-[#666666] italic">"{testimonial.content}"</p>
                    <div className="mt-4">
                      <p className="font-semibold text-[#03010D]">{testimonial.name}</p>
                      <p className="text-sm text-[#666666]">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-[#8A61FF] py-16">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {t.cta.title}
            </h2>
            <div className="mt-6">
              <Button variant="secondary" size="lg">
                {t.cta.button}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}