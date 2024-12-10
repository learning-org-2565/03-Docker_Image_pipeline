import React from 'react';
import { CheckCircle } from 'lucide-react';

export function Curriculum() {
  const modules = [
    {
      week: "Week 1",
      title: "Foundation & Git Workflows",
      duration: "1 Week",
      topics: [
        "Git advanced concepts",
        "GitHub Actions fundamentals",
        "Building CI pipelines",
        "Automated testing",
      ],
    },
    {
      week: "Week 2",
      title: "Containerization & Orchestration",
      duration: "1 Week",
      topics: [
        "Docker fundamentals",
        "Container best practices",
        "Kubernetes basics",
        "Deploy containerized apps",
      ],
    },
    {
      week: "Week 3",
      title: "Infrastructure as Code",
      duration: "1 Week",
      topics: [
        "Terraform fundamentals",
        "AWS/Azure infrastructure",
        "Infrastructure best practices",
        "State management",
      ],
    },
    {
      week: "Week 4",
      title: "Monitoring & Final Project",
      duration: "1 Week",
      topics: [
        "Prometheus & Grafana",
        "Log management",
        "End-to-end project",
        "Production deployment",
      ],
    },
  ];

  return (
    <section id="curriculum" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Program Curriculum</h2>
          <p className="text-xl text-gray-600">
            A structured approach to mastering modern DevOps practices.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-blue-500">
                  {module.week}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {module.duration}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{module.title}</h3>
              {module.topics && module.topics.length > 0 ? (
                <ul className="space-y-3">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  Topics for this week will be updated soon.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
