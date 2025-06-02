
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

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('openai_api_key', key);
  }

  getApiKey(): string | null {
    if (this.apiKey) return this.apiKey;
    return localStorage.getItem('openai_api_key');
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
              content: `You are OptraBot, an AI assistant for Optra Design Studio founded by Aniketh in Bangalore. You help with:
- Information about Aniketh and his design work
- Services: Brand identity, web design, creative direction
- Contact: aniketh@optra.me
- Studio philosophy: Premium design that drives results

Be helpful, concise, and professional. Keep responses under 100 words.`
            },
            ...messages.slice(-10) // Keep last 10 messages for context
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
      console.error('Error calling OpenAI API:', error);
      return this.getFallbackResponse(messages[messages.length - 1].content);
    }
  }

  private getFallbackResponse(userMessage: string): LLMResponse {
    const lowercaseMessage = userMessage.toLowerCase();
    
    const responses: { [key: string]: string[] } = {
      aniketh: [
        "Aniketh is the creative force behind Optra Design! 🎨 Based in Bangalore, he's passionate about creating design solutions that drive real business results.",
        "Meet Aniketh - the founder who believes design can change everything! 🚀 He started Optra as a solo venture to deliver hyper-premium experiences."
      ],
      services: [
        "Optra specializes in premium digital experiences! 🎯 We offer brand identity design, interactive web experiences, creative direction, and strategic consultation.",
        "Our services transform your business: ✨ Brand Identity (logos, visual systems), Web Design, Creative Direction, and Consultation. Every project gets Aniketh's personal touch."
      ],
      contact: [
        "Ready to start something amazing? 🌟 The best way to reach Aniketh is via email at aniketh@optra.me - you'll get a personal response within 48 hours!",
        "Let's connect! 🤝 Aniketh personally responds to every inquiry at aniketh@optra.me within 48 hours."
      ],
      pricing: [
        "Great question about pricing! 💰 Every project is unique, so Aniketh provides customized quotes. Reach out to aniketh@optra.me with your project details!",
        "Investment varies based on project scope and complexity! 💎 Aniketh believes in transparent, value-based pricing."
      ]
    };

    if (lowercaseMessage.includes('blog')) {
      return {
        response: "Check out our new blog at /blog! 📝 Aniketh shares insights about design, creativity, and the journey of building exceptional experiences.",
        success: true,
        isOffline: true
      };
    }

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
      "I need an API key to provide AI responses. You can set one in the settings, or I can help with basic information about Optra Design and Aniketh's services. 🤔",
      "I'm currently using my offline database. I specialize in information about Optra's services, Aniketh's background, and getting you connected for consultations. 🎨"
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
