import React from 'react';
import { Bot, Rocket, Users, Code2, GitBranch, Shield } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Bot className="w-12 h-12 text-blue-400" />,
      title: "AI-Powered Learning",
      description: "Get assistance from AI agents that help you understand concepts and debug issues in real-time."
    },
    {
      icon: <Rocket className="w-12 h-12 text-blue-400" />,
      title: "Production-Grade Projects",
      description: "Build and deploy real applications using industry-standard tools and best practices."
    },
    {
      icon: <Users className="w-12 h-12 text-blue-400" />,
      title: "Mentorship",
      description: "Learn from experienced DevOps engineers who guide you through your journey."
    },
    {
      icon: <Code2 className="w-12 h-12 text-blue-400" />,
      title: "Hands-on Experience",
      description: "Work with modern tools like Terraform, Docker, and Kubernetes in practical scenarios."
    },
    {
      icon: <GitBranch className="w-12 h-12 text-blue-400" />,
      title: "CI/CD Pipelines",
      description: "Master GitHub Actions and build automated deployment pipelines."
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-400" />,
      title: "Best Practices",
      description: "Learn security best practices and infrastructure as code principles."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Our Program?</h2>
          <p className="text-xl text-gray-600">
            Bridge the gap between theory and practice with our comprehensive approach
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}