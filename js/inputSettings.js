// Setting up a custom input -------------------------
const placeholderText = 'Введите текст сообщения...';
commentInput.innerHTML = placeholderText;
commentInput.style.color = '#999';
commentButton.classList.add("input-button-lock");

commentInput.addEventListener('focus', function () {
    if (commentInput.innerText === placeholderText) {
        commentInput.innerText = '';
        commentInput.style.color = '#000';
    }
});

commentInput.addEventListener('blur', function () {
    if (commentInput.innerText.trim() === '') {
        commentInput.innerText = placeholderText;
        commentInput.style.color = '#999';
        getText();
    }
});

// Prohibiting sending by pressing enter -----------------
function preventEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();

    }
}
commentButton.addEventListener('keydown', preventEnter);