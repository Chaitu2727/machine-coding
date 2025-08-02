const tabList = [
  {
    id: 1,
    tabName: "Tab 1",
    tabContent: "This is the content for Tab 1",
  },
  {
    id: 2,
    tabName: "Tab 2",
    tabContent: "This is the content for Tab 2",
  },
  {
    id: 3,
    tabName: "Tab 3",
    tabContent: "This is the content for Tab 3",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const tabContainer = document.querySelector(".tab-container");
  const tabContent = document.querySelector(".tab-content");
  let selectedTab = 0;

  function renderTabs() {
    for (let tab of tabList) {
      const listItem = document.createElement("li");
      listItem.id = tab.id;
      listItem.textContent = tab.tabName;
      listItem.classList.add("tab-item");
      if (selectedTab + 1 === tab.id) listItem.classList.add("active");
      tabContainer.appendChild(listItem);
    }
    tabContent.innerHTML = `<p>${tabList[selectedTab].tabContent}</p>`;
  }
  renderTabs();
  tabContainer.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === "li") {
      selectedTab = target.id - 1;
    }
    const tabItems = document.querySelector(".tab-container").childNodes;
    for (let index = 0; index < tabItems.length; index++) {
      tabItems[index].classList.remove("active");
      if (index === selectedTab) {
        tabItems[index].classList.add("active");
      }
    }
    tabContent.innerHTML = `<p>${tabList[selectedTab].tabContent}</p>`;
  });
});
