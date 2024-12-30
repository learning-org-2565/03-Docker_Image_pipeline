import React, { useState } from 'react';
import { ArrowRight, Github, Container, Cloud } from 'lucide-react';
import { DevOpsInfo } from './DevOpsInfo';

export function Hero() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Master DevOps Through
              <span className="text-blue-400"> Real-World Projects</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join our intensive 1-month internship program and build production-grade applications
              with modern DevOps tools and practices. Get hands-on experience with GitHub Actions,
              Terraform, Docker, Kubernetes, and more.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a 
                href="#pricing" 
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </a>
              <button 
                onClick={() => setShowInfo(!showInfo)} 
                className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg"
              >
                Learn More
              </button>
            </div>

            <div className="flex justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Github className="w-6 h-6" />
                <span>GitHub Actions</span>
              </div>
              <div className="flex items-center gap-2">
                <Container className="w-6 h-6" />
                <span>Docker</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-6 h-6" />
                <span>Kubernetes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showInfo && <DevOpsInfo />}
    </>
  );
}