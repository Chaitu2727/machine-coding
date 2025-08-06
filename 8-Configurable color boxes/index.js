let boxes = [
  { id: 1, color: "red", width: "33.3%" },
  { id: 2, color: "green", width: "33.3%" },
  { id: 3, color: "yellow", width: "33.3%" },
  { id: 4, color: "orange", width: "50%" },
  { id: 5, color: "blue", width: "50%" },
  { id: 6, color: "pink", width: "70%" },
  { id: 7, color: "gray", width: "30%" },
];

const container = document.createElement("div");
container.className = "container";

const render = () => {
  container.innerHTML = null;
  boxes.forEach((item) => {
    const box = document.createElement("div");
    box.className = "box";
    box.id = item.id;
    box.style.backgroundColor = item.color;
    box.style.width = item.width;
    container.appendChild(box);
  });
};
render();

const inputDiv = document.createElement("div");
inputDiv.className = "input-container";
const inputColor = document.createElement("input");
inputColor.type = "text";
inputColor.placeholder = "Enter color";
const inputWidth = document.createElement("input");
inputWidth.type = "text";
inputWidth.placeholder = "Enter width";
const addButton = document.createElement("button");
addButton.innerText = "Add";
addButton.addEventListener("click", function () {
  let item = {
    id: boxes.length + 1,
    color: inputColor.value,
    width: `${inputWidth.value}%`,
  };
  inputColor.value = "";
  console.log(boxes);
  inputWidth.value = "";
  boxes.push(item);
  render();
});
inputDiv.appendChild(inputColor);
inputDiv.appendChild(inputWidth);
inputDiv.appendChild(addButton);

document.body.appendChild(container);
container.addEventListener("click", function (event) {
  console.log(event.target.className);

  if (event.target.className === "box") {
    alert(
      `Clicked box ${event.target.id} and color is ${event.target.style.backgroundColor}`
    );
  }
});
document.body.appendChild(inputDiv);
