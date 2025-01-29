import { createSlice } from '@reduxjs/toolkit';

import { tasksStateType } from '@/types/tasksStateType';

const initialState: tasksStateType = {
  tasks: [
    {
      id: 1,
      title: 'Вспомнить JS',
      description: 'Все забыл, но базовая инфа есть в глубинах сознания',
      completed: false,
      timeIsUp: false,
    },
    {
      id: 2,
      title: 'Вспомнить React',
      description: 'Уже начинаю что-то припоминать',
      completed: false,
      timeIsUp: false,
    },
    {
      id: 3,
      title: 'Начать писать на tsx',
      description: 'Вроде не так уж и сложно',
      completed: false,
      timeIsUp: false,
    },
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      console.log('task added');
    },
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
