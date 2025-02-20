import React from 'react';
import { BookOpen, Users, Zap } from 'react-feather';

function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Notomatic</h1>
        <div className="prose prose-blue max-w-none">
          <p className="text-lg text-gray-700 mb-8">
            Notomatic is an innovative AI-powered note-taking platform designed to revolutionize the way students, educators, and professionals create and manage their notes. Our mission is to make learning and information retention more efficient and effective through the power of artificial intelligence.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-6">
            Founded in 2023, Notomatic was born out of a simple observation: traditional note-taking methods are time-consuming and often fail to capture the most important information. Our team of education experts and AI specialists came together to create a solution that would transform raw lecture content and syllabi into comprehensive, easy-to-understand notes.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How It Works</h2>
          <p className="text-gray-700 mb-6">
            Notomatic uses advanced natural language processing and machine learning algorithms to analyze course materials, lectures, and syllabi. Our AI then generates concise, well-structured notes that highlight key concepts, definitions, and relationships between ideas. Users can customize their note preferences, collaborate with peers, and access their notes from any device.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Zap className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-700">Our advanced AI algorithms process and analyze your course materials with high accuracy.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BookOpen className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Notes</h3>
              <p className="text-gray-700">Generate detailed, well-structured notes that capture all key information from your syllabus.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-700">Easily share and collaborate on notes with classmates or colleagues in real-time.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-6">
            We envision a future where every learner has access to personalized, AI-enhanced study materials that adapt to their unique learning style. Notomatic is committed to continuous improvement and innovation in the field of educational technology, always striving to make learning more accessible, engaging, and effective for everyone.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Join Us</h2>
          <p className="text-gray-700 mb-6">
            Whether you're a student looking to optimize your study time, an educator aiming to provide better resources for your students, or a professional seeking to stay on top of your field, Notomatic is here to support your learning journey. Join us today and experience the future of note-taking!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

