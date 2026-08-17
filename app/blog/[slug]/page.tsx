'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getBlogPostBySlug } from '@/lib/pocketbase-service';

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

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getBlogPostBySlug(params.slug);
        
        if (result.success && result.data) {
          setPost(result.data as unknown as BlogPost);
        } else {
          setError(result.error || 'Blog post not found');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="section-padding bg-white">
          <div className="container-custom text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#8A61FF] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-[#666666]">Loading post...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <main className="section-padding bg-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold text-[#03010D]">Post Not Found</h1>
            <p className="text-[#666666] mt-4">{error || "The blog post you're looking for doesn't exist."}</p>
            <Link href="/blog">
              <Button variant="primary" className="mt-6">Back to Blog</Button>
            </Link>
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
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <Link href="/blog" className="flex items-center gap-2 text-[#666666] hover:text-[#8A61FF] transition-colors mb-6">
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
              
              <div className="flex items-center gap-2 text-sm text-[#8A61FF] font-medium mb-4">
                <span className="bg-[#EFEAFF] px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#03010D] mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-[#666666] mb-8 pb-8 border-b border-[#E5E5E6]">
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
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#8A61FF] py-16">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to start your English journey?
            </h2>
            <p className="text-white/80 mt-2 mb-6">
              Book a free trial lesson with Levita today
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