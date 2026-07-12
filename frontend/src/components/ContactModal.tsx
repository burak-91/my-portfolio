import { useState } from 'react';
import api from '../utils/axios';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EmailRequest {
  name: string;
  email: string;
  message: string;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState<EmailRequest>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Form alanlarının dolu olup olmadığını kontrol et
  const isFormValid = formData.name.trim() !== '' && 
                     formData.email.trim() !== '' && 
                     formData.message.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setStatus('sending');

    try {
      await api.post('/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    } catch (error) {
      setStatus('error');
      console.error('Error sending email:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/90 border border-white/10 rounded-2xl p-8 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          ✕
        </button>
        
        <h2 className="font-serif text-2xl md:text-3xl bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
          Let&apos;s Connect
        </h2>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-300/50 transition-colors"
              required
            />
          </div>
          
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-300/50 transition-colors"
              required
            />
          </div>
          
          <div className="space-y-2">
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-300/50 transition-colors min-h-[120px] resize-none"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={!isFormValid || status === 'sending'}
            className="w-full bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          
          {status === 'success' && (
            <p className="text-emerald-400 text-center font-medium">
              Message sent successfully!
            </p>
          )}
          
          {status === 'error' && (
            <p className="text-red-400 text-center font-medium">
              Failed to send message. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}; 