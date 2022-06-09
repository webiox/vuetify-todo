<template>
  <v-text-field
    :value="$store.state.searchTerm"
    @input="$store.commit('setSearchTerm', $event)"
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    class="mt-1 expanding-search"
    :class="{ closed: searchClosed && !$store.state.searchTerm }"
    :disabled="$store.state.sorting"
    placeholder="Search"
    filled
    dense
    clearable
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      searchClosed: true,
    };
  },
};
</script>

<style>
.expanding-search {
  transition: max-width 0.3s;
}
.expanding-search.closed {
  max-width: 45px !important;
}
.expanding-search.closed .v-input__slot {
  background-color: transparent !important;
  cursor: pointer !important;
}
.expanding-search .v-input__slot::before,
.expanding-search .v-input__slot::after {
  border-color: transparent !important;
}
</style>
