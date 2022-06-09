<template>
  <v-text-field
    v-model="newTaskTitle"
    @keyup.enter="addTask()"
    class="filled-add-task pa-3"
    outlined
    placeholder="Add Task"
    hide-details
    clearable
  >
    <template v-slot:append>
      <v-icon @click="addTask()" color="white" :disabled="newTaskTitleInvalid"
        >mdi-plus
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: "",
    };
  },

  computed: {
    newTaskTitleInvalid() {
      return !this.newTaskTitle;
    },
  },
  methods: {
    addTask() {
      if (!this.newTaskTitleInvalid) {
        this.$store.dispatch("addTask", this.newTaskTitle); // dispatch used when we want fire an action
        this.newTaskTitle = "";
      }
    },
  },
};
</script>

<style>
.filled-add-task.v-input--is-focused div.v-input__control div.v-input__slot {
  background-color: #3473888e !important ;
}
</style>
