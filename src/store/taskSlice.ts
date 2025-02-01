import { createSlice } from '@reduxjs/toolkit';

import { tasksStateType } from '@/types/tasksStateType';

const initialState: tasksStateType = {
  tasks: [
    {
      id: 1,
      title: 'Задача раз',
      description: 'Описание задачи',
      workTime: '1:00',
      active: false,
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

      state.tasks.push({
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        workTime: action.payload.workTime,
        active: false,
        completed: false,
        timeIsUp: false,
      });
    },

    activateTask(state, action) {
      console.log(action.payload.id);

      state.tasks.forEach((task) => {
        task.id === action.payload.id
          ? (task.active = true)
          : (task.active = false);
      });
    },
  },
});

export const { addTask } = taskSlice.actions;
export const { activateTask } = taskSlice.actions;

export default taskSlice.reducer;
