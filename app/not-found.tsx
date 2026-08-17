import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      
      <main className="min-h-[70vh] flex items-center justify-center bg-white section-padding">
        <div className="container-custom text-center">
          <div className="max-w-md mx-auto">
            {/* 404 Number */}
            <div className="text-[150px] md:text-[200px] font-bold leading-none text-[#8A61FF] opacity-10 select-none">
              404
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#03010D] mt-[-40px]">
              Page Not Found
            </h1>
            
            <p className="text-[#666666] mt-4">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <Home size={18} className="mr-2" />
                  Go Home
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Search size={18} className="mr-2" />
                  Contact Support
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-12 pt-8 border-t border-[#E5E5E6]">
              <p className="text-sm text-[#666666] mb-4">You might be looking for:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/about" className="text-sm text-[#8A61FF] hover:underline">
                  About Levita
                </Link>
                <span className="text-[#E5E5E6]">|</span>
                <Link href="/lessons" className="text-sm text-[#8A61FF] hover:underline">
                  Our Lessons
                </Link>
                <span className="text-[#E5E5E6]">|</span>
                <Link href="/blog" className="text-sm text-[#8A61FF] hover:underline">
                  Blog
                </Link>
                <span className="text-[#E5E5E6]">|</span>
                <Link href="/contact" className="text-sm text-[#8A61FF] hover:underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}