import { pb, type Booking, type Lead, type BlogPost, type Testimonial, type LessonPackage } from './pocketbase';

// Booking functions
export async function createBooking(data: Omit<Booking, 'id' | 'created' | 'updated'>) {
  try {
    const record = await pb.collection('bookings').create(data);
    return { success: true, data: record };
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return { success: false, error: error.message || 'Failed to create booking' };
  }
}

export async function getBookings() {
  try {
    const records = await pb.collection('bookings').getFullList({
      sort: '-created',
    });
    return { success: true, data: records };
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return { success: false, error: error.message || 'Failed to fetch bookings' };
  }
}

// Lead functions
export async function createLead(data: Omit<Lead, 'id' | 'created' | 'updated'>) {
  try {
    const record = await pb.collection('leads').create(data);
    return { success: true, data: record };
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return { success: false, error: error.message || 'Failed to create lead' };
  }
}

export async function getLeads() {
  try {
    const records = await pb.collection('leads').getFullList({
      sort: '-created',
    });
    return { success: true, data: records };
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return { success: false, error: error.message || 'Failed to fetch leads' };
  }
}

// Blog functions
export async function getBlogPosts() {
  try {
    const records = await pb.collection('blog_posts').getFullList({
      sort: '-date',
      filter: 'published = true',
    });
    return { success: true, data: records };
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return { success: false, error: error.message || 'Failed to fetch blog posts' };
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const records = await pb.collection('blog_posts').getFullList({
      filter: `slug = "${slug}" && published = true`,
    });
    if (records.length === 0) {
      return { success: false, error: 'Blog post not found' };
    }
    return { success: true, data: records[0] };
  } catch (error: any) {
    console.error('Error fetching blog post:', error);
    return { success: false, error: error.message || 'Failed to fetch blog post' };
  }
}

// Testimonial functions
export async function getTestimonials() {
  try {
    const records = await pb.collection('testimonials').getFullList({
      sort: '-created',
      filter: 'featured = true',
    });
    return { success: true, data: records };
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    return { success: false, error: error.message || 'Failed to fetch testimonials' };
  }
}

// Lesson package functions
export async function getLessonPackages() {
  try {
    const records = await pb.collection('lesson_packages').getFullList({
      sort: 'price',
      filter: 'active = true',
    });
    return { success: true, data: records };
  } catch (error: any) {
    console.error('Error fetching lesson packages:', error);
    return { success: false, error: error.message || 'Failed to fetch lesson packages' };
  }
}

export async function getLessonPackageById(id: string) {
  try {
    const record = await pb.collection('lesson_packages').getOne(id);
    return { success: true, data: record };
  } catch (error: any) {
    console.error('Error fetching lesson package:', error);
    return { success: false, error: error.message || 'Failed to fetch lesson package' };
  }
}