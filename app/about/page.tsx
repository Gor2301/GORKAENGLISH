import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { User, Award, BookOpen, Users, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="content-block text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[#03010D]">
                About <span className="text-[#8A61FF]">Levita</span>
              </h1>
              <p className="mt-4 text-lg text-[#666666]">
                Your dedicated English teacher with years of experience
              </p>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="section-padding bg-[#F8F8F8]">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Photo placeholder with User icon */}
              <div className="bg-[#EFEAFF] rounded-2xl aspect-square flex items-center justify-center">
                <User size={80} className="text-[#8A61FF]" />
              </div>
              
              {/* Bio */}
              <div>
                <h2 className="text-3xl font-bold text-[#03010D] mb-4">
                  Meet Levita
                </h2>
                <p className="text-[#666666] mb-4">
                  Levita is a passionate English teacher with over 5 years of experience helping students achieve fluency and confidence in English.
                </p>
                <p className="text-[#666666] mb-4">
                  Specializing in conversation practice, business English, and exam preparation, Levita creates personalized lessons that fit each student's unique goals and learning style.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-lg border border-[#E5E5E6]">
                    <div className="text-2xl font-bold text-[#8A61FF]">5+</div>
                    <div className="text-sm text-[#666666]">Years Teaching</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-[#E5E5E6]">
                    <div className="text-2xl font-bold text-[#8A61FF]">200+</div>
                    <div className="text-sm text-[#666666]">Students Taught</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teaching Philosophy */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="content-block text-center">
              <h2 className="text-3xl font-bold text-[#03010D] mb-4">
                Teaching Philosophy
              </h2>
              <p className="text-lg text-[#666666]">
                "I believe that learning English should be practical, enjoyable, and tailored to each student's needs. My goal is to help you speak with confidence and communicate naturally in real-life situations."
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-[#EFEAFF] text-[#8A61FF] rounded-full text-sm font-medium flex items-center gap-2">
                  <CheckCircle size={16} /> Conversation Practice
                </span>
                <span className="px-4 py-2 bg-[#FFEEEA] text-[#FF9F87] rounded-full text-sm font-medium flex items-center gap-2">
                  <CheckCircle size={16} /> Business English
                </span>
                <span className="px-4 py-2 bg-[#E8FCF7] text-[#7CEED0] rounded-full text-sm font-medium flex items-center gap-2">
                  <CheckCircle size={16} /> Exam Preparation
                </span>
                <span className="px-4 py-2 bg-[#FFFBEB] text-[#F59E0B] rounded-full text-sm font-medium flex items-center gap-2">
                  <CheckCircle size={16} /> Kids & Teens
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#8A61FF] py-16">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to start learning?
            </h2>
            <p className="text-white/80 mt-2 mb-6">
              Book a free trial lesson today
            </p>
            <Button variant="secondary" size="lg">
              Book a Free Trial Lesson
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}