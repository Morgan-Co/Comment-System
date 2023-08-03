// User Name generation --------
function generateUserName() {
    let randomNumbers = Math.floor(Math.random() * 100000000);
    let randomName = "user" + randomNumbers;

    return randomName;
}

const commentInputName = document.getElementById("comment-input-name");
if (!localStorage.getItem('userName')) {

    const userName = generateUsername();
    const commentInputName = document.getElementById("comment-input-name");
    commentInputName.innerHTML = `${userName}`;

    localStorage.setItem('userName', JSON.stringify(userName));
}