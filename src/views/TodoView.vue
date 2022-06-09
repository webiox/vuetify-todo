<template>
  <div class="home">
    <tasks-list />
    <button-done-sorting v-if="$store.state.sorting" />
  </div>
</template>

<script>
import TasksList from "@/components/Todo/TasksList.vue";
import ButtonDoneSorting from "@/components/Todo/ButtonDoneSorting.vue";

export default {
  name: "Home",

  components: {
    "tasks-list": TasksList,
    "button-done-sorting": ButtonDoneSorting,
  },
};
</script>
