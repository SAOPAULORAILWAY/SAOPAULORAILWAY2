export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  image: string;
  imageCaption: string;
  content: string[]; // array of paragraphs for better formatting
  readingTime: number; // in minutes
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MarketingAsset {
  id: string;
  category: 'social' | 'ads' | 'leads' | 'email';
  title: string;
  description: string;
  content: string;
}

export type ReaderTheme = 'cream' | 'paper' | 'charcoal' | 'sepia';
export type ReaderFont = 'serif' | 'sans' | 'mono';
