
// Simple encryption utility for API keys
class EncryptionService {
  private key = 'optra-bot-secure-key-2024';

  encrypt(text: string): string {
    try {
      // Simple XOR encryption with base64 encoding
      let encrypted = '';
      for (let i = 0; i < text.length; i++) {
        encrypted += String.fromCharCode(
          text.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length)
        );
      }
      return btoa(encrypted);
    } catch (error) {
      console.error('Encryption failed:', error);
      return text;
    }
  }

  decrypt(encryptedText: string): string {
    try {
      const encrypted = atob(encryptedText);
      let decrypted = '';
      for (let i = 0; i < encrypted.length; i++) {
        decrypted += String.fromCharCode(
          encrypted.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length)
        );
      }
      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error);
      return encryptedText;
    }
  }
}

export const encryptionService = new EncryptionService();
