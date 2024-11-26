<script setup lang="ts">
import type { PropType } from "vue";
import { ISmartTableConfig } from "../../interfaces/table/SmartTable";

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
        <td v-for="column in props.config.columns">
          <template v-if="column.type == 'string'">
            {{ row[column.key] }}
          </template>
          <template v-else-if="column.type == 'list'">
            <ul>
              <li v-for="item in row[column.key]">
                {{ item }}
              </li>
            </ul>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style></style>
