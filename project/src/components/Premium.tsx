import React, { useState } from 'react';
import { Check, Zap, Crown, Star, Shield, BarChart as ChartBar, MessageSquare, CreditCard } from 'lucide-react';

const features = {
  free: [
    'Basic chat commands',
    'Stream alerts',
    'Channel points system',
    'Basic moderation tools',
    'Single platform support',
  ],
  premium: [
    'Advanced chat commands',
    'Custom alerts and overlays',
    'Advanced loyalty system',
    'AI-powered moderation',
    'Multi-platform streaming',
    'Advanced analytics',
    'Priority support',
    'Custom bot username',
    'Ad-free experience',
    'Unlimited chat commands',
  ],
};

export function Premium() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'paypal' | 'cashapp' | null>(null);

  const handleUpgrade = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = (method: 'paypal' | 'cashapp') => {
    setSelectedPayment(method);
    // In a real app, this would redirect to the payment provider
    console.log(`Processing ${method} payment`);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upgrade to Premium</h1>
          <p className="text-gray-400 text-lg">Take your streaming to the next level</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold">Free</h2>
                <p className="text-gray-400">Get started with basic features</p>
              </div>
            </div>
            
            <div className="text-3xl font-bold mb-6">$0 <span className="text-gray-400 text-lg">/month</span></div>
            
            <ul className="space-y-4 mb-8">
              {features.free.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors">
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Crown className="w-8 h-8 text-yellow-400" />
              <div>
                <h2 className="text-2xl font-bold">Premium</h2>
                <p className="text-gray-200">All features unlocked</p>
              </div>
            </div>
            
            <div className="text-3xl font-bold mb-6">$9.99 <span className="text-gray-200 text-lg">/month</span></div>
            
            <ul className="space-y-4 mb-8">
              {features.premium.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-yellow-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={handleUpgrade}
              className="w-full bg-black/25 text-white py-3 rounded-lg hover:bg-black/40 transition-colors backdrop-blur-sm"
            >
              Upgrade Now
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-200">Secure payment via</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-6" />
                <img src="https://cash.app/icon-196.png" alt="Cash App" className="h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <Shield className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Advanced Moderation</h3>
            <p className="text-gray-400">AI-powered chat moderation with custom rules and automated actions</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <ChartBar className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
            <p className="text-gray-400">Deep insights into your stream performance and audience engagement</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <MessageSquare className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Custom Commands</h3>
            <p className="text-gray-400">Create unlimited custom commands with variables and cooldowns</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Can I switch back to the free plan?</h3>
              <p className="text-gray-400">Yes, you can downgrade to the free plan at any time. Your premium features will remain active until the end of your billing period.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Is there a contract or commitment?</h3>
              <p className="text-gray-400">No, our premium plan is month-to-month and you can cancel anytime.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-400">We offer a 7-day money-back guarantee if you're not satisfied with the premium features.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400">We accept PayPal and Cash App for all premium subscriptions. Both payment methods are secure and offer buyer protection.</p>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-gray-800 p-8 rounded-2xl max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-6">Choose Payment Method</h3>
              <div className="space-y-4">
                <button
                  onClick={() => handlePayment('paypal')}
                  className="w-full bg-[#0070BA] text-white py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-[#005ea6] transition-colors"
                >
                  <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-6" />
                  Pay with PayPal
                </button>
                <button
                  onClick={() => handlePayment('cashapp')}
                  className="w-full bg-[#00D632] text-white py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-[#00bf2d] transition-colors"
                >
                  <img src="https://cash.app/icon-196.png" alt="Cash App" className="h-6" />
                  Pay with Cash App
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors mt-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}