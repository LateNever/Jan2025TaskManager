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
      state.tasks.push({
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        workTimeSec: action.payload.workTimeSec,
        active: false,
        status: 'new',
        planTime: action.payload.planTime,
        isVisible: true,
        isCompact: true,
      });
    },

    editTask(state, action) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload.formId) {
          task.title = action.payload.title;
          task.description = action.payload.description;
          if (task.workTimeSec !== action.payload.workTimeSec) {
            task.workTimeSec = action.payload.workTimeSec;
            task.planTime = action.payload.planTime;
            task.status = 'new';
          }
        } else return;
      });
    },

    activateTask(state, action) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload.id) {
          if (task.active === false) {
            task.active = true;
          } else {
            task.active = false;
          }
          if (task.status !== 'inProcess') {
            task.status = 'inProcess';
          }
        }
      });
    },

    deactivateTask(state, action) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload.id) task.active = false;
      });
    },

    completeTask(state, action) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload.id) {
          if (task.status !== 'completed') {
            task.status = 'completed';
          } else {
            task.status = 'inProcess';
          }

          task.active = false;
          task.workTimeSec =
            action.payload.planTime - action.payload.workTimeSec;
        }
      });
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => {
        return task.id !== action.payload.id;
      });
    },

    updateWorkTime(state, action) {
      state.tasks.forEach((task) => {
        if (task.id === action.payload.id)
          task.workTimeSec = task.workTimeSec - 1;
      });
    },

    compactTask(state, action) {
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
  deactivateTask,
  completeTask,
  deleteTask,
  updateWorkTime,
  compactTask,
  searchTask,
} = taskSlice.actions;

export default taskSlice.reducer;
