import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendMessageToGemini(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    // Using Gemini 3.7 Flash for fast, high-quality responses
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-3.5-flash-lite' 
    });

    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error('Gemini API error:', error);
    throw new Error(error.message || 'Failed to get response from AI Tutor');
  }
}

export async function getAITutorResponse(
  message: string,
  context: string = 'You are a helpful English tutor. Help students learn English, correct grammar, and improve their speaking and writing skills. Keep responses clear and encouraging.'
): Promise<string> {
  try {
    // Using Gemini 3.7 Flash for fast, high-quality responses
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-3.5-flash-lite' 
    });
    
    const prompt = `${context}\n\nStudent: ${message}\n\nTutor:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error('Gemini API error:', error);
    throw new Error(error.message || 'Failed to get response from AI Tutor');
  }
}