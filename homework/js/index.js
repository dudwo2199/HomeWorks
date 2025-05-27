const modal = document.querySelector('.modal');

window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    if(modal.style.display !== "flex") return;

    modal.style.display = "none";
});

document.querySelector(".doModal").addEventListener("click", () => {
    modal.style.display = "flex";
});

function modalClose() {
    modal.style.display = "none";
}