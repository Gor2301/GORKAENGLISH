'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getBlogPosts } from '@/lib/pocketbase-service';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  published: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getBlogPosts();
        
        if (result.success && result.data) {
          setPosts(result.data as unknown as BlogPost[]);
        } else {
          setError(result.error || 'Failed to load blog posts');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="content-block text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[#03010D]">
                <span className="text-[#8A61FF]">Blog</span> & Resources
              </h1>
              <p className="mt-4 text-lg text-[#666666]">
                Tips, strategies, and inspiration for your English learning journey
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section-padding bg-[#F8F8F8]">
          <div className="container-custom">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-[#8A61FF] border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-[#666666]">Loading posts...</p>
              </div>
            ) : error ? (
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
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#666666]">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl border border-[#E5E5E6] overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#8A61FF] font-medium mb-3">
                        <span className="bg-[#EFEAFF] px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#03010D] group-hover:text-[#8A61FF] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-[#666666] text-sm mt-2 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-4 flex items-center gap-4 text-sm text-[#666666]">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {post.author}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center text-[#8A61FF] font-medium text-sm group-hover:gap-2 transition-all gap-1">
                        Read More
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#8A61FF] py-16">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Want to receive learning tips weekly?
            </h2>
            <p className="text-white/80 mt-2 mb-6">
              Subscribe to our newsletter for the latest tips and resources
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button variant="secondary" size="md">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}