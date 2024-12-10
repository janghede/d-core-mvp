<script setup lang="ts">
import SmartTable from "@frontend/components/table/SmartTable.vue";
import { ISmartTableConfig } from "@frontend/interfaces/table/SmartTable";

const tableConfig: ISmartTableConfig = {
  columns: [
    { label: "Column A", key: "a", type: "string" },
    { label: "Column B", key: "b", type: "string" },
    { label: "Column C", key: "c", type: "list" },
  ],
  data: [
    { a: "hej", b: "Då", c: [1, 2, 3, 4] },
    { a: "Test1", b: "Test2", c: [1, 2, 4, 9, 10] },
  ],
};
</script>

<template>
  <SmartTable :config="tableConfig"></SmartTable>
</template>

<style></style>
