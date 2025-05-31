import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, FileText, Sparkles, Rocket } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 pt-10 sm:pb-32">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Create Professional Resumes with AI
              </h1>
              <p className="relative mt-6 text-lg leading-8 text-muted-foreground sm:max-w-md lg:max-w-none">
                Transform your career journey with our AI-powered resume builder. 
                Create tailored, professional resumes in minutes that stand out to employers.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <button 
                  style={{border: '1px solid #000', background: '#fff', color: '#222', borderRadius: '6px', padding: '12px 24px', fontSize: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}
                  onClick={() => navigate('/dashboard')}
                >
                  <Rocket className="w-4 h-4" />
                  Get Started
                </button>
                <button 
                  style={{border: '1px solid #000', background: '#fff', color: '#222', borderRadius: '6px', padding: '12px 24px', fontSize: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}
                  onClick={() => navigate('/auth/sign-in')}
                >
                  Learn more
                </button>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:ml-16 flex justify-center lg:justify-end">
            <div className="w-80 sm:w-96 md:w-[28rem]">
              <div className="relative">
                <img
                  src="/Gemini_Generated_Image_69y3569y3569y356.jpg"
                  alt="AI Resume Builder"
                  className="rounded-xl bg-gray-900/5 object-cover shadow-lg hover:scale-105 transition-all duration-300"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Build Faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to create a standout resume
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our AI-powered platform helps you create professional resumes that highlight your strengths and catch employers' attention.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  {feature.icon}
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: 'AI-Powered Content',
    description: 'Let our AI help you write compelling professional summaries and job descriptions tailored to your industry.',
    icon: <Brain className="h-5 w-5 text-primary" />,
  },
  {
    name: 'Professional Templates',
    description: 'Choose from a variety of professionally designed templates that help your resume stand out.',
    icon: <FileText className="h-5 w-5 text-primary" />,
  },
  {
    name: 'Smart Formatting',
    description: 'Automatic formatting and layout optimization ensures your resume looks perfect on any device.',
    icon: <Sparkles className="h-5 w-5 text-primary" />,
  },
];

export default Home;
