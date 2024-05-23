let searchInputEl = null;
let searchResultsEl = null;
let spinner = null;
let url = "https://apis.ccbp.in/book-store";

document.addEventListener('DOMContentLoaded', function(){
    searchInputEl = document.getElementById("searchInput");
    searchResultsEl = document.getElementById("searchResults");
    spinner = document.getElementById("spinner");

    searchInputEl.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          let searchInput = event.target.value;
          console.log("searchInput", searchInput);
          fetchAndDisplayBook(searchInput);
        }
      });

});

function displayBooks(jsonData) {
  spinner.classList.add("d-none");
  if (jsonData.length !== 0) {
    searchResultsEl.textContent = "";
    let h1 = document.createElement("h1");
    h1.textContent = "Popular Books";
    h1.classList.add("col-12", "result-title");
    searchResultsEl.appendChild(h1);
    for (let book of jsonData) {
      let bookCard = document.createElement("div");
      bookCard.classList.add(
        "col-6",
        "col-sm-4",
        "col-md-3",
        "col-lg-2",
        "text-center"
      );
      let bookImageEl = document.createElement("img");
      bookImageEl.src = book.imageLink;
      bookImageEl.classList.add("book-img");
      bookCard.appendChild(bookImageEl);
      let authorEl = document.createElement("p");
      authorEl.textContent = book.author;
      authorEl.classList.add("author", "mt-3", "text-center");
      bookCard.appendChild(authorEl);
      searchResultsEl.appendChild(bookCard);
    }
  } else {
    searchResultsEl.textContent = "";
    let h1 = document.createElement("h1");
    h1.textContent = "No results found";
    h1.classList.add("col-12", "result-title", "text-center");
    searchResultsEl.appendChild(h1);
  }
}
function fetchAndDisplayBook(searchInput) {
  spinner.classList.remove("d-none");
  let options = { method: "GET", headers: { Accept: "application/json" } };
  fetch(url + "?title=" + searchInput, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      console.log(jsonData);
      displayBooks(jsonData.search_results);
    });
}

