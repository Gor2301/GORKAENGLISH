'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Button from '../ui/Button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from '@/lib/translations';
import { locales, defaultLocale, type Locale } from '@/i18n';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, changeLocale } = useLocale();
  const t = useTranslations(locale);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/lessons', label: t.nav.lessons },
    { href: '/blog', label: t.nav.blog },
    { href: '/ai-tutor', label: 'AI Tutor' },
    { href: '/contact', label: t.nav.contact },
  ];

  const localeNames: Record<Locale, string> = {
    es: 'ES',
    en: 'EN',
    ru: 'RU',
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E6]">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#03010D] hover:text-[#8A61FF] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="primary" size="sm">
              {t.nav.bookLesson}
            </Button>
            <div className="w-px h-6 bg-[#E5E5E6]" />
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-sm font-medium text-[#03010D] hover:text-[#8A61FF] transition-colors"
              >
                {localeNames[locale]}
                <ChevronDown size={16} />
              </button>
              
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-20 bg-white border border-[#E5E5E6] rounded-lg shadow-lg overflow-hidden">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        changeLocale(loc);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-[#F8F8F8] transition-colors ${
                        locale === loc ? 'text-[#8A61FF] font-semibold' : 'text-[#03010D]'
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#F8F8F8] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E5E5E6]">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#03010D] hover:text-[#8A61FF] transition-colors font-medium px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#E5E5E6]">
                <Button variant="primary" size="sm" className="w-full">
                  {t.nav.bookLesson}
                </Button>
                <div className="mt-3 flex items-center justify-center space-x-4">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        changeLocale(loc);
                        setIsMenuOpen(false);
                      }}
                      className={`text-sm font-medium transition-colors ${
                        locale === loc ? 'text-[#8A61FF]' : 'text-[#03010D] hover:text-[#8A61FF]'
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;