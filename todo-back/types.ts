export type Task = {
  id: string; 
  title: string;
  description: string;
  dueDate: string;
  createDate: string;
  editDate?: Date;
}