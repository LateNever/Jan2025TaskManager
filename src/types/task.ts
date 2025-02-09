export type TaskType = {
  id: string;
  title: string;
  description: string;
  workTimeSec: number;
  active: boolean;
  status: 'new' | 'inProcess' | 'completed';
  planTime: number;
  isVisible: boolean;
  isCompact: boolean;
};
