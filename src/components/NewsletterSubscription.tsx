'use client';

import { useState } from 'react';
import { trackNewsletterSubscription } from '@/utils/analytics';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage({
        text: 'Please enter your email address.',
        type: 'error',
      });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      setMessage({
        text: data.message || 'Successfully subscribed to the newsletter!',
        type: 'success',
      });
      setEmail('');
      
      // Track successful newsletter subscription
      trackNewsletterSubscription();
    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Stay updated with our newsletter
        </h2>
        <p className="mt-3 text-xl text-white/80 sm:mt-4">
          Subscribe to our newsletter and receive the latest updates, news, and exclusive content.
        </p>
        
        <form onSubmit={handleSubmit} className="mt-8 sm:flex sm:max-w-md sm:mx-auto">
          <label htmlFor="email" className="sr-only">Email address</label>
          <div className="min-w-0 flex-1">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="block w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-l-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            />
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="block w-full px-4 py-3 font-medium text-white bg-blue-800 hover:bg-blue-700 rounded-r-md shadow focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
        </form>
        
        {message && (
          <div 
            className={`mt-4 p-3 rounded-md ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : message.type === 'error'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
