import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 1. Send email to ADMIN (you)
    const adminEmail = await resend.emails.send({
      from: 'GORKAENGLISH <onboarding@resend.dev>',
      to: ['igo2018fr@gmail.com'],
      subject: subject || `New message from ${name}`,
      replyTo: email,
      html: `
        <h2>📩 New Message from GORKAENGLISH</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p>—<br>GORKAENGLISH Contact Form</p>
      `,
    });

    if (adminEmail.error) {
      console.error('Admin email error:', adminEmail.error);
    }

    // 2. Send confirmation email to STUDENT
    const studentEmail = await resend.emails.send({
      from: 'GORKAENGLISH <onboarding@resend.dev>',
      to: [email],
      subject: 'Thank you for contacting GORKAENGLISH!',
      html: `
        <h2>Thank you, ${name}! 🙏</h2>
        <p>We have received your message and will get back to you within <strong>24 hours</strong>.</p>
        <br>
        <p><strong>Your message:</strong></p>
        <p style="background: #f8f8f8; padding: 12px; border-radius: 8px; border-left: 4px solid #8A61FF;">
          ${message.replace(/\n/g, '<br>')}
        </p>
        <br>
        <p>In the meantime, you can:</p>
        <ul>
          <li>📚 <a href="https://gorkaenglish.com/lessons">Browse our lessons</a></li>
          <li>📖 <a href="https://gorkaenglish.com/blog">Read our blog</a></li>
          <li>📅 <a href="https://gorkaenglish.com/lessons">Book a free trial lesson</a></li>
        </ul>
        <br>
        <p>Best regards,<br>
        <strong>Levita</strong><br>
        GORKAENGLISH</p>
        <hr style="border: none; border-top: 1px solid #E5E5E6;">
        <p style="font-size: 12px; color: #666666;">
          This is an automated confirmation. Please do not reply to this email.
        </p>
      `,
    });

    if (studentEmail.error) {
      console.error('Student email error:', studentEmail.error);
    }

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully',
    }, { status: 200 });

  } catch (error: any) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}