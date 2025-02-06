import { createSlice } from '@reduxjs/toolkit';

import { tasksStateType } from '@/types/tasksStateType';

const initialState: tasksStateType = {
  tasks: [
    {
      id: '1q',
      title: 'Задача раз',
      description: 'Описание задачи',
      workTimeSec: 1,
      active: false,
      status: 'new',
      // completed: false,
      planTime: 1,
      isVisible: true,
      isCompact: true,
      // inProcess: false,
    },
    {
      id: '2ads',
      title: 'Задача два',
      description: 'Описание задачи два',
      workTimeSec: 600,
      active: false,
      status: 'new',
      // completed: false,
      planTime: 1,
      isVisible: true,
      isCompact: true,
      // inProcess: false,
    },
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push({
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        workTimeSec: action.payload.workTimeSec,
        active: false,
        status: 'new',
        // completed: false,
        planTime: action.payload.planTime,
        isVisible: true,
        isCompact: true,
        // inProcess: false,
      });
    },

    editTask(state, action) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload.formId) {
          task.title = action.payload.title;
          task.description = action.payload.description;
          task.workTimeSec = action.payload.workTimeSec;
          task.planTime = action.payload.planTime;
        } else return;
      });
    },

    activateTask(state, action) {
      state.tasks.forEach((task) => {
        task.id === action.payload.id && task.active === false
          ? (task.active = true)
          : (task.active = false);
        if (task.id === action.payload.id && task.status !== 'inProcess') {
          task.status = 'inProcess';
        }
      });
    },

    completeTask(state, action) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload.id) {
          task.status !== 'completed'
            ? (task.status = 'completed')
            : (task.status = 'inProcess');
          task.active = false;
        }
      });
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },

    updateWorkTime(state, action) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload.id)
          task.workTimeSec = task.workTimeSec - 1;
      });
    },

    compactTask(state, action) {
      console.log('hi');
      console.log(action.payload.compact);
      state.tasks.forEach((task) => {
        if (task.id === action.payload.id)
          task.isCompact = action.payload.isCompact;
      });
    },

    searchTask(state, action) {
      const searchText = action.payload.searchText.toLowerCase();
      state.tasks.forEach((task) => {
        if (
          !searchText.trim().length ||
          task.title.toLowerCase().includes(searchText) ||
          task.description.toLowerCase().includes(searchText)
        ) {
          task.isVisible = true;
        } else task.isVisible = false;
      });
    },
  },
});

export const {
  addTask,
  editTask,
  activateTask,
  completeTask,
  deleteTask,
  updateWorkTime,
  compactTask,
  searchTask,
} = taskSlice.actions;

export default taskSlice.reducer;
