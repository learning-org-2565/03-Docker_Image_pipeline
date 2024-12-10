import React from 'react';
import { Check, Star } from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';

export function Pricing() {
  const plans = [
    {
      name: "Basic Internship",
      price: APP_CONFIG.PRICING.BASIC,
      features: [
        "Git & GitHub Actions fundamentals",
        "Basic Docker containerization",
        "Introduction to CI/CD",
        "Mentorship support",
        "Project certification"
      ],
      recommended: false
    },
    {
      name: "Intermediate Internship",
      price: APP_CONFIG.PRICING.INTERMEDIATE,
      features: [
        "Everything in Basic plan",
        "Advanced Docker concepts",
        "Kubernetes deployment",
        "Infrastructure as Code",
        "1-on-1 mentorship sessions",
        "Industry-grade projects"
      ],
      recommended: true
    },
    {
      name: "Advanced Internship",
      price: APP_CONFIG.PRICING.ADVANCED,
      features: [
        "Everything in Intermediate plan",
        "Advanced Kubernetes",
        "Cloud architecture design",
        "Security best practices",
        "Production deployment experience",
        "Job referral support"
      ],
      recommended: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Flexible Pricing Plans</h2>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-lg ${
                plan.recommended
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-white border border-gray-200'
              } p-8 shadow-lg`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Recommended
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  ₹{plan.price.toLocaleString()}
                  <span className="text-lg text-gray-600 font-normal">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#apply"
                className={`block text-center py-3 px-6 rounded-lg transition-colors ${
                  plan.recommended
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-900 text-white'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}