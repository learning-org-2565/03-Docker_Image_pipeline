import React from 'react';
import { Server, Cloud, Shield, GitBranch, Terminal, Database } from 'lucide-react';

export function DevOpsInfo() {
  const topics = [
    {
      icon: <Terminal className="w-8 h-8 text-blue-500" />,
      title: "Infrastructure as Code",
      description: "Learn to manage and provision infrastructure using code with tools like Terraform and CloudFormation."
    },
    {
      icon: <GitBranch className="w-8 h-8 text-blue-500" />,
      title: "CI/CD Pipelines",
      description: "Master continuous integration and deployment using GitHub Actions, Jenkins, and other modern tools."
    },
    {
      icon: <Cloud className="w-8 h-8 text-blue-500" />,
      title: "Container Orchestration",
      description: "Deep dive into Docker and Kubernetes for managing containerized applications at scale."
    },
    {
      icon: <Database className="w-8 h-8 text-blue-500" />,
      title: "Database Management",
      description: "Learn database deployment, backup, and scaling strategies in a DevOps environment."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Security Best Practices",
      description: "Implement security measures throughout the DevOps pipeline and infrastructure."
    },
    {
      icon: <Server className="w-8 h-8 text-blue-500" />,
      title: "Monitoring & Troubleshooting",
      description: "Master the art of monitoring, logging, and troubleshooting in complex environments."
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Why Learn DevOps With Us?</h2>
          <p className="text-xl text-gray-600">
            Bridge the gap between development and operations with our comprehensive, hands-on program designed specifically for junior engineers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">{topic.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{topic.title}</h3>
              <p className="text-gray-600">{topic.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Real-World Experience</h3>
          <p className="text-lg text-gray-600 mb-8">
            Our program focuses on practical implementation, troubleshooting, and best practices. You'll work on real projects, face real challenges, and learn how to solve them effectively.
          </p>
          <a
            href="#pricing"
            className="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Pricing Plans
          </a>
        </div>
      </div>
    </div>
  );
}