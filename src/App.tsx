import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Projects } from './components/Projects';
import { Curriculum } from './components/Curriculum';
import { Pricing } from './components/Pricing';
import { ApplicationForm } from './components/ApplicationForm';

function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Header />
      <Hero />
      <Features />
      <Projects />
      <Curriculum />
      <Pricing />
      <section id="apply" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Apply Now</h2>
            <p className="text-xl text-gray-600">
              Take the first step towards mastering DevOps
            </p>
          </div>
          <ApplicationForm />
        </div>
      </section>
    </div>
  );
}

export default App;