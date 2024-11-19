const languor = document.getElementById("languor");
const larger = document.getElementById("larger");
const new_table = document.getElementById("new_table");
const error = document.getElementById("error");
const main_div = document.getElementById("main");

let array2d = 0;

new_table.addEventListener("click", () => {
  let y = Number(larger.value) + 1;
  let x = Number(languor.value) + y;

  if (languor.value > 0 && y < 6 && y > 1 && languor.value < 5) {
    new_table.parentElement.classList.add("display_none");
    array2d = create_array2d(y,x)
    create_table(x, y, main_div);

    main_div.innerHTML += '<button id="solve">solve</button>';
    let table = document.getElementById("table");
    const solve = document.getElementById("solve");

    solve.addEventListener("click", () => {
      data_and_table(table.firstChild, array2d);
      solve_table(array2d, table.firstChild);
    });
  } else {
    error.innerText = "number de colone ou lin invalid";
  }
});

