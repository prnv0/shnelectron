import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./index.css";
import { Grid } from "ag-grid-community";

let rowData = [];

const columnDefs = [
  { field: "task", editable: true, flex: 1 },
  {
    field: "Status",
    width: 120,
    cellRenderer(params) {
      const input = document.createElement("input");

      input.type = "checkbox";
      input.checked = params.value;
      input.classList.add("checkbox");
      input.addEventListener("change", (event) => {
        params.setValue(input.checked);
      });

      return input;
    },
  },
  {
    field: "remove",
    width: 100,
    cellRenderer(params) {
      const button = document.createElement("button");

      button.textContent = "✕";
      button.classList.add("btn", "remove-btn");
      button.addEventListener("click", () => removeTodo(params.rowIndex));

      return button;
    },
  },
];
const gridOptions = {
  columnDefs,
  rowData,
};
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");
const addBtn = document.getElementById("add-btn");
const addTodo = () => {
  rowData = [...rowData, { task: "New Task", completed: false }];
  gridOptions.api.setRowData(rowData);
};
const removeTodo = (rowIndex) => {
  rowData = rowData.filter((value, index) => {
    return index !== rowIndex;
  });
  gridOptions.api.setRowData(rowData);
};
const clearFromFile = async () => {
  
};
const setupGrid = () => {
  const gridDiv = document.getElementById("grid");

  new Grid(gridDiv, gridOptions);
  addBtn.addEventListener("click", addTodo);
  clearBtn.addEventListener("click", clearFromFile);
};

document.addEventListener("DOMContentLoaded", setupGrid);