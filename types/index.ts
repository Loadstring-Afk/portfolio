export interface Track {
  id: string;
  title: string;
  album: string;
  artist: string;
  src: string;
  duration: number;
}

export interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  playlist: Track[];
  progress: number;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'design';
}
