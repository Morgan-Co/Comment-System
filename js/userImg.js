// System for adding a custom image ----------------------
let finalUserImg;
let userImg = document.getElementById("user-img");
let selectInput = document.getElementById("select-input");
selectInput.addEventListener("change", () => {
    uploadFile(selectInput.files[0]);
});

export function uploadFile(file) {

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert("kaban");
        selectInput.value = "";
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert("kaban");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        userImg.innerHTML = `<img src="${e.target.result}" alt="${file.name}">`;
        finalUserImg = userImg.innerHTML;
        allComments = document.querySelectorAll(".comment");
        if (allComments) {
            localStorage.setItem('commentUserImg', JSON.stringify(finalUserImg));
        }
        localStorage.setItem('userImg', JSON.stringify(userImg.innerHTML));
    }

    reader.onerror = function (e) {
        alert("kaban");
    }

    reader.readAsDataURL(file);
}
