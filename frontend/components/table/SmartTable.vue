<script setup lang="ts">
import type { PropType } from "vue";
import { ISmartTableConfig } from "frontend/interfaces/SmartTable";

const props = defineProps({
  config: { type: Object as PropType<ISmartTableConfig>, required: true },
});
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="column in props.config.columns">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.config.data">
        <td v-for="column in props.config.columns">{{ row[column.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style></style>
