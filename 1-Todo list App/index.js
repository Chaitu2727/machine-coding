document.addEventListener("DOMContentLoaded", function () {
  const formBody = document.querySelector(".form-body");
  const formInput = document.querySelector(".input-text");
  const addBtn = document.querySelector(".add-btn");
  const listItems = document.querySelector(".list-items");
  let editMode = false;
  let editItem = null;

  formBody.addEventListener("submit", function (event) {
    if (formInput.value === "") {
      alert("Add valid task");
    } else {
      if (editMode) {
        event.preventDefault();
        editItem.firstChild.textContent = formInput.value;
        editMode = false;
        editItem = null;
        formInput.value = "";
      } else {
        addTask(event);
      }
      addBtn.textContent = "Add Task";
    }
  });
  function addTask(event) {
    event.preventDefault();
    const task = document.createElement("li");
    task.className = "list-item";
    const editButton = document.createElement("button");
    editButton.className = "list-btn";
    const removeButton = document.createElement("button");
    removeButton.className = "list-btn";
    const buttonDiv = document.createElement("span");
    buttonDiv.classList = "list-btn-grp";

    task.innerHTML = `<span>${formInput.value}</span>`;
    editButton.textContent = "✏️";
    removeButton.textContent = "❌";
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(removeButton);
    task.appendChild(buttonDiv);
    listItems.appendChild(task);
    formInput.value = "";
  }
  function editTask(event) {
    formInput.value = event.target.parentNode.parentNode.firstChild.textContent;
    formInput.focus();
  }
  listItems.addEventListener("click", function (event) {
    const target = event.target;
    const listItem = target.parentNode.parentNode;

    if (target.tagName.toLowerCase() === "button") {
      if (target.textContent === "❌") {
        listItem.remove();
      } else if (target.textContent === "✏️") {
        editMode = true;
        editItem = listItem;
        addBtn.textContent = "Edit Task";
        editTask(event);
      }
    }
  });
});
