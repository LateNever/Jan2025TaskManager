export type TaskType = {
  id: any;
  title: string;
  description: string;
  workTimeSec: number;
  active: boolean;
  status: 'new' | 'inProcess' | 'completed';
  // completed: boolean;
  planTime: number;
  isVisible: boolean;
  isCompact: boolean;
  // inProcess: boolean;
};
