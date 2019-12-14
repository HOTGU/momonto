const toDoForm = document.querySelector(".js-toDoForm");
const toDoList = document.querySelector(".js-toDoList");
const toDoInput = toDoForm.querySelector("input");
const delBtnControl = document.querySelector("button");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  console.log(cleanToDos);
  toDos = cleanToDos;
  saveToDo();
}

function successToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  console.log(li.id);
  const setupToDos = toDos.filter(function(toDo) {
    return toDo.id === parseInt(li.id);
  });
  if (btn.innerHTML === "완료") {
    li.style.color = "red";
    btn.style.backgroundColor = "red";
    setupToDos[0].color = "red";
    setupToDos[0].check = "미완료";
    setupToDos[0].backgroundColor = "red";
    saveToDo();
    btn.innerHTML = "미완료";
  } else {
    li.style.color = "white";
    btn.style.backgroundColor = "green";
    setupToDos[0].color = "white";
    setupToDos[0].check = "완료";
    setupToDos[0].backgroundColor = "green";
    saveToDo();
    btn.innerHTML = "완료";
  }
}

function saveToDo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, color, check, backgroundColor) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const sucBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.classList.add("css-btn");
  sucBtn.classList.add("css-btn");
  delBtn.innerHTML = "삭제";
  delBtn.addEventListener("click", deleteToDo);
  sucBtn.addEventListener("click", successToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(sucBtn);
  li.appendChild(delBtn);
  li.id = newId;
  li.style.color = color;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
    color: color,
    check: check,
    backgroundColor
  };
  sucBtn.innerHTML = check;
  sucBtn.style.backgroundColor = backgroundColor;
  toDos.push(toDoObj);
  saveToDo();
}

function submitHandle(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  const color = "white";
  const check = "완료";
  const backgroundColor = "green";
  paintToDo(currentValue, color, check, backgroundColor);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text, toDo.color, toDo.check, toDo.backgroundColor);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", submitHandle);
}
init();
