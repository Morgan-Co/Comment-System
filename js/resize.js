// Numbering of grid blocks --------------------------------------------
window.addEventListener("resize", function () {
    let blocks = document.querySelector(".blocks__smaller-blocks");
    if (window.innerWidth < 500) {
        blocks.innerHTML = `
        <div class="blocks__block"></div>
        <div class="blocks__block"></div>`;

    } else {
        blocks.innerHTML = `
        <div class="blocks__block"></div>
        <div class="blocks__block"></div>
        <div class="blocks__block"></div>
        <div class="blocks__block"></div>
        <div class="blocks__block"></div>
        <div class="blocks__block"></div>
        <div class="blocks__block"></div>
        <div class="blocks__block"></div>`;
    }
});