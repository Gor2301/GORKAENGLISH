'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useTranslations, useLocale } from '@/lib/translations';

const Footer: React.FC = () => {
  const { locale } = useLocale();
  const t = useTranslations(locale);
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/lessons', label: t.nav.lessons },
    { href: '/blog', label: t.nav.blog },
    { href: '/contact', label: t.nav.contact },
    { href: '/404', label: '404' },
  ];

  const socialLinks = [
    { 
      href: 'https://x.com/', 
      label: 'X',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      )
    },
    { 
      href: 'https://linkedin.com/', 
      label: 'LinkedIn',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    { 
      href: 'https://instagram.com/', 
      label: 'Instagram',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
    { 
      href: 'https://tiktok.com/', 
      label: 'TikTok',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    },
  ];

  return (
    <footer className="bg-[#F8F8F8] border-t border-[#E5E5E6]">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Logo size="sm" showTagline />
            <p className="text-sm text-[#666666] max-w-xs">
              {t.footer.description}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white hover:bg-[#EFEAFF] transition-colors text-[#03010D] hover:text-[#8A61FF]"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-[#03010D] mb-4">{t.footer.company}</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#666666] hover:text-[#8A61FF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-[#03010D] mb-4">{t.footer.contact}</h3>
            <ul className="space-y-2 text-sm text-[#666666]">
              <li>+1 (555) 123-4567</li>
              <li>
                <a href="mailto:hello@gorkaenglish.com" className="hover:text-[#8A61FF] transition-colors">
                  hello@gorkaenglish.com
                </a>
              </li>
              <li>123 Main Street, City, Country</li>
            </ul>
          </div>

          {/* Newsletter / CTA Column */}
          <div>
            <h3 className="font-semibold text-[#03010D] mb-4">{t.footer.stayUpdated}</h3>
            <p className="text-sm text-[#666666] mb-4">
              {t.footer.newsletter}
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#8A61FF] focus:border-transparent"
              />
              <button className="px-4 py-2 bg-[#8A61FF] text-white rounded-lg hover:bg-[#7A51EF] transition-colors font-medium">
                {t.footer.subscribe}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#E5E5E6] flex flex-col md:flex-row justify-between items-center text-sm text-[#666666]">
          <p>&copy; {currentYear} GORKAENGLISH. {t.footer.rights}</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-[#8A61FF] transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="hover:text-[#8A61FF] transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;