const accessKey = "NmUXc-0oWYWXRJXAkRpXtILObdHBx1iw4663KVsoL1g";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const clearBtn = document.getElementById("clear-btn");

let keyword = "";
let page = 1;

async function searchImage(saveToLocalStorage = true) {
  keyword = searchBox.value.trim();
  if (!keyword) return;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      searchResult.innerHTML = "";
    }

    const results = data.results;
    if (results.length === 0) {
      searchResult.innerHTML =
        "<p>No results found. Try a different keyword.</p>";
      showMoreBtn.style.display = "none";
      return;
    }

    results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("image-container");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description || "Search image";

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.appendChild(image);

      const downloadBtn = document.createElement("a");
      downloadBtn.href = result.urls.full;
      downloadBtn.download = result.id + "-image.jpg";
      downloadBtn.innerHTML = "⬇️ Download";
      downloadBtn.classList.add("download-btn");

      imageWrapper.appendChild(imageLink);
      imageWrapper.appendChild(downloadBtn);
      searchResult.appendChild(imageWrapper);
    });

    showMoreBtn.style.display = "block";

    if (saveToLocalStorage) {
      localStorage.setItem("searchQuery", keyword);
      localStorage.setItem("searchResults", searchResult.innerHTML);
      localStorage.setItem("showMoreVisible", showMoreBtn.style.display);
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    searchResult.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
    showMoreBtn.style.display = "none";
  }
}

window.addEventListener("load", () => {
  const savedQuery = localStorage.getItem("searchQuery");
  const savedResults = localStorage.getItem("searchResults");
  const showMoreState = localStorage.getItem("showMoreVisible");

  if (savedQuery && savedResults) {
    searchBox.value = savedQuery;
    searchResult.innerHTML = savedResults;
    showMoreBtn.style.display = showMoreState || "none";
  }
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImage();
});

searchBox.addEventListener("input", () => {
  clearBtn.style.display = searchBox.value ? "block" : "none";
});

clearBtn.addEventListener("click", () => {
  searchBox.value = "";
  clearBtn.style.display = "none";
  searchResult.innerHTML = "";
  showMoreBtn.style.display = "none";
  localStorage.clear();
});
