<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title> {{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-edit v-if="dialogs.edit" :task="task" @close="closeDialog" />
    <dialog-due-date v-if="dialogs.dueDate" :task="task" @close="closeDialog" />
    <dialog-delete v-if="dialogs.delete" :task="task" @close="closeDialog" />
  </div>
</template>

<script>
import DialogDelete from "@/components/Todo/Dialogs/DialogDelete.vue";
import DialogEdit from "@/components/Todo/Dialogs/DialogEdit.vue";
import DialogDueDate from "@/components/Todo/Dialogs/DialogDueDate.vue";

export default {
  props: ["task"],
  data: () => ({
    dialogs: {
      edit: false,
      dueDate: false,
      delete: false,
    },
    items: [
      {
        title: "Edit",
        icon: "mdi-pencil",
        click() {
          this.dialogs.edit = true;
        },
      },
      {
        title: "Due date",
        icon: "mdi-calendar",
        click() {
          this.dialogs.dueDate = true;
        },
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        click() {
          this.dialogs.delete = true;
        },
      },
      {
        title: "Sort",
        icon: "mdi-drag-horizontal-variant",
        click() {
          if (!this.$store.state.searchTerm) {
            this.$store.commit("toggleSorting");
          } else {
            this.$store.commit(
              "showSnackbar",
              "You can not sort the list while searching!"
            );
          }
        },
      },
    ],
  }),

  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    },
    closeDialog() {
      this.dialogs.delete = false;
      this.dialogs.edit = false;
      this.dialogs.dueDate = false;
    },
  },

  components: {
    "dialog-delete": DialogDelete,
    "dialog-edit": DialogEdit,
    "dialog-due-date": DialogDueDate,
  },
};
</script>
