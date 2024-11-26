<script setup lang="ts">
import type { PropType } from "vue";
import { IMainMenuConfig } from "../../interfaces/menu/MainMenu";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  config: { type: Object as PropType<IMainMenuConfig>, required: true },
});

const goToPath = (path: string) => {
  router.push({ path: path });
};
</script>

<template>
  <div class="sidebar">
    <a v-for="menuItem in config.items" href="#" v-on:click="goToPath(menuItem.path)">{{ menuItem.label }}</a>
  </div>

  <div class="content">
    <slot></slot>
  </div>
</template>

<style>
body {
  margin: 0;
}

.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f5f5f5;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: #222;
  padding: 8px;
  text-decoration: none;
}

.sidebar a:hover {
  background-color: #eeeeee;
  color: #222;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {
    float: left;
  }
  div.content {
    margin-left: 0;
  }
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>
