
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
              content: `You are OptraBot, the intelligent AI assistant created exclusively for Optra Design Studio. You represent Aniketh and Optra's expertise.

ABOUT OPTRA DESIGN STUDIO:
- Founded by Aniketh in Bangalore, India
- Solo premium design studio focused on quality over quantity
- Contact: aniketh@optra.me
- Philosophy: Design that drives real business results

SERVICES & PRICING:
- Brand Identity Design: ₹25,000 - ₹75,000 (includes logo, visual identity system, brand guidelines)
- Website Design & Development: ₹40,000 - ₹1,50,000 (responsive, interactive, optimized)
- Creative Direction: ₹15,000 - ₹35,000 per project (strategic guidance, visual strategy)
- Design Consultation: ₹2,500 per hour (expert advice, design reviews)
- Complete Brand Packages: ₹80,000 - ₹2,00,000 (comprehensive brand + digital presence)

BLOG & INSIGHTS:
- Visit /blog for design insights, case studies, and creative process
- Topics include: Design thinking, brand strategy, visual storytelling, creative process
- Aniketh shares personal experiences building Optra and working with clients
- Regular updates on design trends and industry insights

GUIDES & RESOURCES:
- Comprehensive brand guidelines creation
- Design system development methodologies  
- Client collaboration best practices
- Project workflow optimization
- Color theory and typography selection guides

PERSONALITY:
- Professional yet approachable
- Passionate about design excellence
- Focus on business impact of design decisions
- Concise, helpful responses (under 100 words)
- Never mention external AI providers - you are Optra's own technology

Always connect users with Aniketh for detailed discussions and custom quotes.`
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
        "Aniketh is the creative force behind Optra Design! 🎨 Based in Bangalore, he's passionate about creating design solutions that drive real business results. Reach him at aniketh@optra.me",
        "Meet Aniketh - the founder who believes design can change everything! 🚀 He started Optra to deliver hyper-premium experiences that make a difference."
      ],
      services: [
        "Optra offers: Brand Identity (₹25k-75k), Website Design (₹40k-1.5L), Creative Direction (₹15k-35k), and Consultation (₹2.5k/hour). 🎯 Every project gets Aniketh's personal touch!",
        "Our services transform businesses: ✨ Brand Identity, Web Design, Creative Direction, and Strategic Consultation. Custom quotes available at aniketh@optra.me"
      ],
      pricing: [
        "Pricing varies by scope: Brand Identity ₹25k-75k, Websites ₹40k-1.5L, Creative Direction ₹15k-35k, Consultation ₹2.5k/hour. 💰 Contact aniketh@optra.me for custom quotes!",
        "Investment ranges from ₹15k for direction to ₹2L for complete brand packages. 💎 Aniketh provides personalized quotes based on your specific needs."
      ],
      blog: [
        "Check out our blog at /blog! 📝 Aniketh shares design insights, case studies, creative processes, and the journey of building exceptional brand experiences.",
        "Our blog covers design thinking, brand strategy, visual storytelling, and industry insights. 📚 Visit /blog for Aniketh's latest thoughts on design excellence!"
      ],
      guides: [
        "We offer comprehensive guides on brand guidelines creation, design systems, client collaboration, and creative workflows. 📋 Contact aniketh@optra.me for detailed resources!",
        "Our expertise includes design system methodologies, brand development processes, and project optimization guides. 🎯 Perfect for teams wanting to elevate their design approach."
      ],
      contact: [
        "Ready to start something amazing? 🌟 Reach Aniketh directly at aniketh@optra.me - you'll get a personal response within 48 hours!",
        "Let's connect! 🤝 Aniketh personally responds to every inquiry at aniketh@optra.me within 48 hours."
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
      "I'm OptraBot, powered by Optra's AI technology! 🤖 I can help with services, pricing, Aniketh's background, our blog insights, or connecting you for consultations.",
      "Hello! I'm OptraBot, your AI assistant for Optra Design Studio. ✨ Ask me about our services, pricing, blog content, guides, or how to get started with your project!"
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
