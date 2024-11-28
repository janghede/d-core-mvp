import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SmartTable from "../../../../frontend/components/table/SmartTable.vue";
import type { ISmartTableConfig } from "../../../../frontend/interfaces/table/SmartTable.js";

const mockConfig: ISmartTableConfig = {
  columns: [
    { label: "Name", key: "name", type: "string" },
    { label: "Age", key: "age", type: "string" },
    { label: "Hobbies", key: "hobbies", type: "list" },
  ],
  data: [
    { name: "Alice", age: "25", hobbies: ["Reading", "Hiking"] },
    { name: "Bob", age: "30", hobbies: ["Gaming", "Cooking"] },
  ],
};

describe("SmartTable.vue", () => {
  it("renders table headers correctly", () => {
    const wrapper = mount(SmartTable, {
      props: { config: mockConfig },
    });

    const headers = wrapper.findAll("thead th");
    expect(headers).toHaveLength(mockConfig.columns.length);
    mockConfig.columns.forEach((column, index) => {
      expect(headers[index].text()).toBe(column.label);
    });
  });

  it("renders table rows and data correctly", () => {
    const wrapper = mount(SmartTable, {
      props: { config: mockConfig },
    });

    const rows = wrapper.findAll("tbody tr");
    expect(rows).toHaveLength(mockConfig.data.length);

    rows.forEach((row, rowIndex) => {
      const cells = row.findAll("td");
      expect(cells).toHaveLength(mockConfig.columns.length);

      cells.forEach((cell, colIndex) => {
        const column = mockConfig.columns[colIndex];
        const rowData = mockConfig.data[rowIndex][column.key];

        if (column.type === "string") {
          expect(cell.text()).toBe(rowData);
        } else if (column.type === "list") {
          const items = cell.findAll("ul li");
          expect(items).toHaveLength(rowData.length);
          rowData.forEach((item: string, itemIndex: number) => {
            expect(items[itemIndex].text()).toBe(item);
          });
        }
      });
    });
  });

  it("handles an empty config gracefully", () => {
    const wrapper = mount(SmartTable, {
      props: { config: { columns: [], data: [] } },
    });

    expect(wrapper.findAll("thead th")).toHaveLength(0);
    expect(wrapper.findAll("tbody tr")).toHaveLength(0);
  });
});
