import React from 'react';
import { Github, Globe, Server } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: "Microservices Deployment Platform",
      description: "Build a complete microservices platform using Kubernetes, implementing service discovery, load balancing, and automated scaling.",
      tools: ["Kubernetes", "Docker", "Helm", "Prometheus"],
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Infrastructure as Code Pipeline",
      description: "Create a multi-environment infrastructure using Terraform with automated deployment pipelines and security best practices.",
      tools: ["Terraform", "AWS", "GitHub Actions", "Vault"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Monitoring & Observability Suite",
      description: "Implement a comprehensive monitoring solution with metrics collection, log aggregation, and alerting systems.",
      tools: ["Grafana", "Prometheus", "ELK Stack", "AlertManager"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600">
            Real-world projects you'll build during the internship
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Server className="w-5 h-5" />
                  <span className="text-sm">Production-grade deployment</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}