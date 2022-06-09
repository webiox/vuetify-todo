import Vue from 'vue';
import Vuex from 'vuex';
import Localbase from 'localbase';

let db = new Localbase('db');
db.config.debug = false;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    searchTerm: null,
    tasks: [
      // {
      //   id: 1,
      //   title: "Wake Up!",
      //   done: false,
      //   dueDate: "2022-05-06"
      // },
      // {
      //   id: 2,
      //   title: "Get Bananas",
      //   done: false,
      //   dueDate: "2022-05-17"
      // },
      // {
      //   id: 3,
      //   title: "Eat Bananas",
      //   done: false,
      //   dueDate: null
      // }
    ],
    snackbar: {
      show: false,
      text: '',
    },
    sorting: false,
  },
  mutations: {
    // ------------------------------------------
    // Set Search Term
    setSearchTerm(state, value) {
      state.searchTerm = value;
    },
    // ------------------------------------------
    // Add Task
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    // ------------------------------------------
    // Update Task
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    // ------------------------------------------
    // Set Tasks
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    // ------------------------------------------
    // Done Task
    doneTask(state, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    // ------------------------------------------
    // Delete Task
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    // ------------------------------------------
    // Show Snackbar
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    // ------------------------------------------
    // Hide Snackbar
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
    // ------------------------------------------
    // Toggle Sorting
    toggleSorting(state) {
      state.sorting = !state.sorting;
    },
    // ------------------------------------------
  },
  actions: {
    // ------------------------------------------
    // Set Tasks
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks);
      commit('setTasks', tasks);
    },
    // ------------------------------------------
    // Get Tasks
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks);
      });
    },
    // ------------------------------------------
    // Add Task
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask);
        commit('showSnackbar', 'Task Added!');
      });
    },
    // ------------------------------------------
    // Done Task
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      if (task) {
        db.collection('tasks').doc({ id: id }).update({
          done: !task.done
        }).then(() => {
          commit('doneTask', id);
        });
      }
    },
    // ------------------------------------------
    // Update Task
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload);
        commit('showSnackbar', 'Task Updated!');
      });
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload);
        commit('showSnackbar', 'Task Due Date Updated!');
      });
    },
    // ------------------------------------------
    // Delete Task
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id);
        commit('showSnackbar', 'Task Deleted!');
      });
    }
    // ------------------------------------------
  },
  getters: {
    taskFiltered(state) {
      if (!state.searchTerm) {
        return state.tasks;
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.searchTerm.toLowerCase()));
    },
  },
  modules: {
  }
})
