export interface Task {
  id: string;
  title: string;
  projectId: string;
  assignedTo?: string;
  dueDate?: Date;
  status: 'todo' | 'in-progress' | 'done';
}