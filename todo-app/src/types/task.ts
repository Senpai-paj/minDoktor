export type Task = {
  id: string; 
  title: string;
  description: string;
  dueDate: Date;
  createDate: Date;
  editDate?: Date;
  status: boolean;
  priority: number;
}
  