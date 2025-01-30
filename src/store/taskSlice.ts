import { createSlice } from '@reduxjs/toolkit';

import { tasksStateType } from '@/types/tasksStateType';

const initialState: tasksStateType = {
  tasks: [],
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
        completed: false,
        timeIsUp: false,
      });
    },
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
