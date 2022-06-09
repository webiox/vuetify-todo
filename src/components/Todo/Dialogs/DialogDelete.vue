<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5"> Delete Task? </v-card-title>
      <v-card-text>Are you sure you want to DELETE this task?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black darken-1" text @click="closeDialog"> No </v-btn>
        <v-btn color="red darken-1" text @click="deleteTask(task.id)">
          Yes, I'm sure!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  methods: {
    deleteTask(id) {
      // this.$store.commit("deleteTask", id); // commit used for mutations calls
      this.$store.dispatch("deleteTask", id); // dispatch used for actions calls
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
