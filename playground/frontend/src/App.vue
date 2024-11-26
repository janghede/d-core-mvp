<script setup lang="ts">
import MainMenu from "@frontend/components/menu/MainMenu.vue";
import { IMainMenuConfig } from "@frontend/interfaces/menu/MainMenu";

const mainMenuConfig: IMainMenuConfig = {
  header: "Meny",
  items: [
    { label: "Home", path: "/" },
    { label: "SmartTable", path: "/SmartTable" },
  ],
};
</script>

<template>
  <MainMenu :config="mainMenuConfig"><router-view /></MainMenu>
</template>

<style></style>
