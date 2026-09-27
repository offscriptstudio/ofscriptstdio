export interface ProjectConfig {
  projectTypes: string[];
  business: {
    name: string;
    industry: string;
    website: string;
    location: string;
    audience: string;
    description: string;
  };
  goals: string[];
  features: string[];
  growth: string[];
  experience: string;
  timeline: string;
  budget: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
}

export const initialConfig: ProjectConfig = {
  projectTypes: [],
  business: { name: '', industry: '', website: '', location: '', audience: '', description: '' },
  goals: [],
  features: [],
  growth: [],
  experience: '',
  timeline: '',
  budget: '',
  contact: { name: '', email: '', phone: '', company: '' },
};
