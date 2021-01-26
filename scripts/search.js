//Modal Control for Search Modal
document.getElementById("searchRequest").addEventListener("click", event => {
    document.getElementById("searchModal").style.display = "block";
});

document.getElementById("closeSearch").addEventListener("click", event => {
    document.getElementById("searchModal").style.display = "none";
  });

  window.addEventListener("click", event => {
    if (event.target == document.getElementById("searchModal")) {
        document.getElementById("searchModal").style.display = "none";
    }
  });
  // End Modal Control