<template>
  <v-snackbar v-model="$store.state.snackbar.show">
    {{ $store.state.snackbar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="red" text v-bind="attrs" @click="hideSnackbar()">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  methods: {
    hideSnackbar() {
      this.$store.commit("hideSnackbar");
    },
  },
};
</script>

<style>
div.v-snack:not(.v-snack--absolute) {
  height: 100%;
}
</style>
