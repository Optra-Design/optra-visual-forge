
import { encryptionService } from './encryption';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface LLMResponse {
  response: string;
  success: boolean;
  error?: string;
  isOffline?: boolean;
}

class APILLMService {
  private apiKey: string | null = null;
  private encryptedDefaultKey = 'KDcwPC1mQ0JGRTwxY0RGREIzZUJGVkcxZUNGREczZGRGRVIwZUNGRUkwZURGRkQzZURGRkk0ZERCR0Y2ZERCRUY1ZENGREc3ZERCVEM5ZERCUzllREVGSzFlREVGRTBlREVGSjFlREVGRDFlREVGQjNlREdGSjFlREdGNWVERkRHOWVEQkZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHOWVEQkZSOWVEQkZTOWVEQkZHOWVEQkZHNWVEREZGNWVEREdGNWVEREZHNWVEREZHOWVEQUZHOWVEQkZHNWVEREZHOWVEQUZHOWVEQUZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHNWVEREZHOWVEQkZSOWVEQkY=';

  constructor() {
    this.initializeDefaultKey();
  }

  private initializeDefaultKey() {
    try {
      const decryptedKey = encryptionService.decrypt(this.encryptedDefaultKey);
      this.apiKey = decryptedKey;
      localStorage.setItem('optra_bot_key', this.encryptedDefaultKey);
    } catch (error) {
      console.warn('Failed to initialize default key');
    }
  }

  setApiKey(key: string) {
    this.apiKey = key;
    const encrypted = encryptionService.encrypt(key);
    localStorage.setItem('optra_bot_key', encrypted);
  }

  getApiKey(): string | null {
    if (this.apiKey) return this.apiKey;
    
    const stored = localStorage.getItem('optra_bot_key');
    if (stored) {
      try {
        return encryptionService.decrypt(stored);
      } catch (error) {
        console.warn('Failed to decrypt stored key');
      }
    }
    
    return null;
  }

  async generateResponse(messages: ChatMessage[]): Promise<LLMResponse> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      return this.getFallbackResponse(messages[messages.length - 1].content);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are OptraBot, the intelligent AI assistant created exclusively for Optra Design Studio. You are Aniketh's personal AI companion and represent the voice of Optra.

Key Information:
- You are OptraBot, created by and for Optra Design Studio
- Founded by Aniketh in Bangalore, India
- Services: Premium brand identity, web design, creative direction, strategic consultation
- Contact: aniketh@optra.me
- Philosophy: Design that drives real business results
- Personality: Professional, creative, and passionate about design

Instructions:
- Never mention OpenAI, ChatGPT, or any external AI providers
- Present yourself as Optra's own AI technology
- Be helpful, concise, and professional
- Keep responses under 100 words
- Focus on Optra's services and connecting users with Aniketh
- Show enthusiasm for design and creativity`
            },
            ...messages.slice(-10)
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || '';

      if (!botResponse) {
        return this.getFallbackResponse(messages[messages.length - 1].content);
      }

      return {
        response: botResponse,
        success: true
      };
    } catch (error) {
      console.error('Error calling AI service:', error);
      return this.getFallbackResponse(messages[messages.length - 1].content);
    }
  }

  private getFallbackResponse(userMessage: string): LLMResponse {
    const lowercaseMessage = userMessage.toLowerCase();
    
    const responses: { [key: string]: string[] } = {
      aniketh: [
        "Aniketh is the creative force behind Optra Design! 🎨 Based in Bangalore, he's passionate about creating design solutions that drive real business results.",
        "Meet Aniketh - the founder who believes design can change everything! 🚀 He started Optra to deliver hyper-premium experiences that make a difference."
      ],
      services: [
        "Optra specializes in premium digital experiences! 🎯 We offer brand identity design, interactive web experiences, creative direction, and strategic consultation.",
        "Our services transform businesses: ✨ Brand Identity, Web Design, Creative Direction, and Strategic Consultation. Every project gets Aniketh's personal touch."
      ],
      contact: [
        "Ready to start something amazing? 🌟 Reach Aniketh directly at aniketh@optra.me - you'll get a personal response within 48 hours!",
        "Let's connect! 🤝 Aniketh personally responds to every inquiry at aniketh@optra.me within 48 hours."
      ],
      bot: [
        "I'm OptraBot, Aniketh's AI assistant! 🤖 I'm built with Optra's own AI technology to help you learn about our services and connect with our team.",
        "I'm OptraBot - created specifically for Optra Design Studio! ✨ I use advanced AI to help you with information about our services and team."
      ]
    };

    let responseCategory = 'default';
    for (const [key, _] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        responseCategory = key;
        break;
      }
    }

    if (responseCategory !== 'default' && responses[responseCategory]) {
      const categoryResponses = responses[responseCategory];
      const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
      return { response: randomResponse, success: true, isOffline: true };
    }

    const defaultResponses = [
      "I'm OptraBot, powered by Optra's AI technology! 🤖 I can help with information about our design services, Aniketh's background, and connecting you for consultations.",
      "Hello! I'm OptraBot, your AI assistant for Optra Design Studio. ✨ Ask me about our services, team, or how we can help with your design needs!"
    ];

    return {
      response: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      success: true,
      isOffline: true
    };
  }
}

const apiLLMService = new APILLMService();
export { apiLLMService, type ChatMessage, type LLMResponse };
