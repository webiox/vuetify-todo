<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app :mobile-breakpoint="768">
      <v-img
        class="pa-4 pt-7"
        gradient="to top left, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        lazy-src="http://localhost:8080/header-bg.jpg"
        height="170"
        src="http://localhost:8080/header-bg.jpg"
      >
        <v-avatar size="70" class="mb-2">
          <img src="https://i.pravatar.cc/300" alt="John" />
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">
          Pourya Sharifi
        </div>
        <div class="white--text text-subtitle-2">@alaki</div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      src="header-bg.jpg"
      prominent
      :height="$route.path === '/' ? '235' : '170'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top left, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container class="pa-2 header-container">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search-input />
        </v-row>
        <v-row>
          <v-app-bar-title class="ml-2 text-h4">
            {{ $store.state.appTitle }}
          </v-app-bar-title>
        </v-row>
        <v-row>
          <live-date-time />
        </v-row>
        <v-row v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snack-bar />
    </v-main>
  </v-app>
</template>

<script>
import SnackBar from "@/components/Shared/Snackbar.vue";
import SearchInput from "@/components/Tools/Search.vue";
import LiveDateTime from "@/components/Tools/LiveDateTime.vue";
import FieldAddTaskVue from "@/components/Todo/FieldAddTask.vue";

export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "To-Do", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-help-box", to: "about" },
    ],
    right: null,
  }),
  mounted() {
    this.$store.dispatch("getTasks");
  },
  components: {
    "field-add-task": FieldAddTaskVue,
    "snack-bar": SnackBar,
    "search-input": SearchInput,
    "live-date-time": LiveDateTime,
  },
};
</script>

<style scoped>
.header-container {
  max-width: none !important;
}
</style>
