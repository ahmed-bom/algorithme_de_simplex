function create_table(x, y, div) {
  let col = colones(x, y);
  const lin = ["", "e1", "e2", "e3", "e4"];
  let table = "<table id='table'>";

  for (let i = 0; i <= y; i++) {
    table += "<tr>";
    for (let j = 0; j <= x; j++) {
      if (i == 0) {
        if (j != x) {
          table += "<td>" + col[j] + "</td>";
        } else {
          table += "<td>R</td>";
        }
      } else {
        if (j == 0) {
          if (i != y) {
            table += "<td>" + lin[i] + "</td>";
          } else {
            table += "<td>Z</td>";
          }
        } else {
          table += '<td><input type="number"value="0"/></td>';
        }
      }
    }
    table += "</tr>";
  }
  table += "</table>";
  div.innerHTML = table;
}

function create_array2d(rows, columns) {
  let array = [];
  let value = 0;

  for (let i = 0; i < rows; i++) {
    array[i] = [];
    for (let j = 0; j < columns; j++) {
      array[i][j] = value;
    }
  }
  return array;
}

function colones(x, y) {
  const col = ["", "x", "y", "z", "w"];
  const lin = ["e1", "e2", "e3", "e4"];
  let colone = [];
  let c = x - y;
  if (c < 0) c = 0;
  for (let i = 0; i <= c; i++) {
    colone.push(col[i]);
  }
  for (let i = 0; i < y; i++) {
    colone.push(lin[i]);
  }
  return colone;
}

function data_and_table(table, array, method = "get") {
  let tr;
  for (let i = 1; i < table.children.length; i++) {
    tr = table.children[i];
    for (let j = 1; j < tr.children.length; j++) {
      if (method == "get") {
        array[i - 1][j - 1] = parseInt(tr.children[j].firstChild.value);
      } else {
        tr.children[j].innerHTML = array[i - 1][j - 1];
      }
    }
  }
}

function solve_table(array, table) {
  fetch("http://localhost:8080/solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      maze: array,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      animate(table, data.tables, data.pivots);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
function pivot_color(lin, colone, table, color = true) {
  let color1 = "orange";
  let color2 = "green";
  let color3 = "blue";
  if (!color) {
    color1 = "rgba(0, 0, 0, 0)";
    color2 = "rgba(0, 0, 0, 0)";
    color3 = "rgba(0, 0, 0, 0)";
  }
  table.children[lin + 1].style.backgroundColor = color1;
  for (let i = 1; i < table.children.length; i++) {
    table.children[i].children[colone + 1].style.backgroundColor = color2;
  }
  table.children[lin+1].children[colone + 1].style.backgroundColor = color3;
  setTimeout(() => {
    pivot_color(lin, colone, table, (color = false));
  }, 6000);
}
function animate(table, array_of_solution, pivot, i = 0) {
  if (i < array_of_solution.length) {
    data_and_table(table, array_of_solution[i], "push");
    if (i < pivot.length) {
      pivot_color(pivot[i][1], pivot[i][0], table);
    }

    i++;
    setTimeout(() => {
      animate(table, array_of_solution, pivot, i);
    }, 6000);
  }
  return 0;
}
