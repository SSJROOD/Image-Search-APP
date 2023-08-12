const accessKey = "PDwZaIrB4xEjzxr9W_cLXlF_HZseZ_gYkUfE5tRDWlY";
const formElement = document.querySelector("form");
const searchQuery = document.getElementById("searchQuery");
const searchResults = document.querySelector(".searchResults");
const showMoreBTN = document.getElementById("showmorebtn");

let inputData = "";
let page = 1;

const searchImages = async () => {
  try {
    inputData = searchQuery.value;
    const url = `https://api.unsplash.com/search/photos?page=
                ${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) searchResults.innerHTML = "";

    results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("searchResult");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });
    page++;

    if (page > 1) showMoreBTN.style.display = "block";
  } catch (error) {
    console.error("Error in Fetching Data\n", error);
  }
};

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreBTN.addEventListener("click", () => {
  searchImages();
});
