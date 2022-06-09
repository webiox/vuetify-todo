<template>
  <v-list v-if="tasks.length" flat class="pt-0">
    <draggable v-model="tasks" handle=".handle">
      <task-item v-for="task in tasks" :key="task.id" :task="task" />
    </draggable>
  </v-list>
  <div v-else class="no-tasks">
    <v-icon size="100" color="primary">mdi-check</v-icon>
    <div class="text-h5 primary--text">No Tasks!</div>
  </div>
</template>

<script>
import TaskItem from "@/components/Todo/TaskItem.vue";
import draggable from "vuedraggable";

export default {
  computed: {
    tasks: {
      get() {
        return this.$store.getters.taskFiltered;
      },
      set(value) {
        this.$store.dispatch("setTasks", value);
      },
    },
  },
  components: {
    "task-item": TaskItem,
    draggable: draggable,
  },
};
</script>

<style scoped>
.no-tasks {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}
</style>
