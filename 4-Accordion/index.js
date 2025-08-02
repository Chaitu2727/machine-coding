const sections = [
  { title: "Section 1", content: "This is the content for section 1" },
  { title: "Section 2", content: "This is the content for section 2" },
  { title: "Section 3", content: "This is the content for section 3" },
];

document.addEventListener("DOMContentLoaded", function () {
  let defaultSection = 0;
  const sectionList = document.querySelector(".acc-container");
  for (let index = 0; index < sections.length; index++) {
    const sectionItem = document.createElement("li");
    sectionItem.id = index + 1;
    sectionItem.className = "section-item";
    const title = document.createElement("h2");
    title.innerText = sections[index].title;
    const content = document.createElement("p");
    content.classList.add("section-content");
    if (defaultSection === index) content.classList.add("active");
    content.innerText = sections[index].content;
    sectionItem.appendChild(title);
    sectionItem.appendChild(content);
    sectionList.appendChild(sectionItem);
  }
  sectionList.addEventListener("click", function (event) {
    target = event.target.parentNode;
    if (target.tagName.toLowerCase() === "li") {
      defaultSection = target.id - 1;
    }

    const targetList = document.querySelector(".acc-container").childNodes;
    for (let index = 0; index < targetList.length; index++) {
      targetList[index].childNodes[1].classList.remove("active");
      if (defaultSection == index) {
        targetList[index].childNodes[1].classList.add("active");
      }
    }
  });
});
