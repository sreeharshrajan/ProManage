export interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: string[];
  status: 'planning' | 'in-progress' | 'completed';
}