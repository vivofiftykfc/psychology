export interface Citation {
  text: string;
  author: string;
  work: string;
  year: number;
}

export interface KeyFigure {
  id: string;
  name: string;
  nameZh: string;
  years: string;
  portrait: string;
  bio: string;
  contributions: string[];
  relatedChapters: string[];
}

export interface Experiment {
  id: string;
  title: string;
  researcher: string;
  year: number;
  question: string;
  method: string;
  findings: string;
  significance: string;
  ethicalNote?: string;
}

export interface ChapterSection {
  id: string;
  title: string;
  content: string[];
  citations?: Citation[];
  callout?: {
    type: "insight" | "question" | "connection" | "experiment";
    text: string;
  };
}

export interface ChapterConnection {
  chapterSlug: string;
  chapterTitle: string;
  description: string;
}

export interface Chapter {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  epigraph?: Citation;
  overview: string;
  sections: ChapterSection[];
  keyFigures: string[];
  keyExperiments: string[];
  connections: ChapterConnection[];
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  category: "philosophy" | "founding" | "theory" | "experiment" | "therapy" | "technology";
  chapterSlug?: string;
}

export interface TheoryNode {
  id: string;
  name: string;
  school: string;
  era: string;
  chapterSlug: string;
  connections: string[];
}

export interface GlossaryTerm {
  term: string;
  termZh: string;
  definition: string;
  relatedTerms: string[];
}
