document.addEventListener("DOMContentLoaded", function () {
  const app = document.querySelector(".app");
  let products = [];
  let currentPageProducts = [];
  let currentPage = 1;
  const productPerPage = 9;
  let paginationArray = [];
  let slideLength = 3;

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      if (!response.ok) throw new Error("Something went wrong");
      const data = await response.json();
      products = data.products;
      let paginationLength =
        products.length % productPerPage === 0
          ? products.length / productPerPage
          : Math.floor(products.length / productPerPage) + 1;
      paginationArray = Array.from(
        { length: paginationLength },
        (_, i) => i + 1
      );
    } catch (error) {
      console.log("fetch data error:", error);
    }
    const render = () => {
      let slideArray = Array.from({ length: slideLength }, (_, i) => {
        if (currentPage === 1) {
          return currentPage + i;
        }
        if (currentPage === paginationArray.length) {
          return currentPage - slideLength + i + 1;
        }
        return slideLength % 2 === 0
          ? currentPage - (slideLength % 2) + i - 1
          : currentPage - Math.ceil(slideLength / 2) + i + 1;
      });

      app.innerHTML = null;
      const productsDiv = document.createElement("div");
      productsDiv.classList.add("products-container");
      currentPageProducts = products.slice(
        productPerPage * currentPage - productPerPage,
        productPerPage * currentPage
      );

      currentPageProducts.forEach((item) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
              <img src="${item.thumbnail}" alt="${item.title}"/>
              <div class="stroke"></div>
              <p>${item.title}</p>
              `;
        productsDiv.appendChild(productCard);
      });
      app.appendChild(productsDiv);
      const paginationDiv = document.createElement("div");
      paginationDiv.innerHTML = null;
      const prevBtn = document.createElement("button");
      prevBtn.classList.add("btn", "btn-prev");
      prevBtn.innerText = "<";
      prevBtn.disabled = currentPage === paginationArray[0];
      const firstButton = document.createElement("button");
      firstButton.classList.add("btn", "btn-prev__first");
      firstButton.innerText = "<<";
      firstButton.disabled = currentPage === paginationArray[0];
      const nextBtn = document.createElement("button");
      nextBtn.classList.add("btn", "btn-next");
      nextBtn.innerText = ">";
      nextBtn.disabled =
        currentPage === paginationArray[paginationArray.length - 1];
      const lastButton = document.createElement("button");
      lastButton.classList.add("btn", "btn-next__last");
      lastButton.innerText = ">>";
      lastButton.disabled =
        currentPage === paginationArray[paginationArray.length - 1];
      paginationDiv.classList.add("pagination-container");
      paginationDiv.appendChild(firstButton);
      paginationDiv.appendChild(prevBtn);
      slideArray.forEach((n) => {
        const numberItem = document.createElement("span");
        numberItem.classList.add("pagination-number");
        if (currentPage === n) numberItem.classList.add("active");
        numberItem.innerText = n;
        paginationDiv.appendChild(numberItem);
      });
      paginationDiv.appendChild(nextBtn);
      paginationDiv.appendChild(lastButton);
      app.appendChild(paginationDiv);

      paginationDiv.addEventListener("click", function (event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === "span") {
          currentPage = parseInt(target.innerText);
          render();
        }
      });
      prevBtn.addEventListener("click", function () {
        if (currentPage > paginationArray[0]) {
          currentPage -= 1;
          render();
        }
      });
      firstButton.addEventListener("click", function () {
        if (currentPage > paginationArray[0]) {
          currentPage = 1;
          render();
        }
      });
      nextBtn.addEventListener("click", function () {
        if (currentPage < paginationArray[paginationArray.length - 1]) {
          currentPage += 1;
          render();
        }
      });
      lastButton.addEventListener("click", function () {
        if (currentPage < paginationArray[paginationArray.length - 1]) {
          currentPage = paginationArray.length;
          render();
        }
      });
    };
    render();
  };
  fetchData();
});
