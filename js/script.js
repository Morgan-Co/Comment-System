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

// Checking for mobile devices ------
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


// Adding a class, depending on the device -------
let filterLink = document.querySelector(".filter__link");
if (isMobile.any()) {
    document.body.classList.add('_touch');
    filterLink.addEventListener("click", function (e) {
        e.preventDefault();
        filterLink.parentElement.classList.toggle('_active');
    });

} else {
    document.body.classList.add('_pc');
}

// Добавляем обработчик клика на весь документ
document.addEventListener("click", function (e) {
    // Проверяем, является ли элемент, на который был совершен клик, родительским элементом filterLink
    if (!e.target.closest(".filter__link")) {
        filterLink.parentElement.classList.remove('_active');
    }
});

// User Name generation --------
function generateUsername() {
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

// Commenting system -------------------------------------------------
// Main variables -------------------------------------------------------
const commentButton = document.querySelector(".comment-input__button");
const commentForm = document.getElementById("comment-input-form");
const commentList = document.getElementById("comments-list");
const commentInput = document.getElementById("comment-input");
let commentsNumber = document.getElementById("comment-counter");
let AllCommentUserImg;
let allComments;
let newCommentText;
let ratingNumber = 0;
let newComment;
// Comment counter -----------
function commentCounter() {
    allComments = document.querySelectorAll(".comment");
    commentsNumber.innerHTML = `(${allComments.length})`;
} commentCounter();

// System for adding a custom image ----------------------
let finalUserImg;
let userImg = document.getElementById("user-img");
let selectInput = document.getElementById("select-input");
selectInput.addEventListener("change", () => {
    uploadFile(selectInput.files[0]);
});

function uploadFile(file) {

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
    }
});

// Prohibiting sending by pressing enter -----------------
function preventEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
}
commentButton.addEventListener('keydown', preventEnter);

// A function that takes values from input and comment creation ---------
function getText() {
    commentButton.onclick = function (e) {

        e.preventDefault();

        // Create new comment element -------------------------------------
        newComment = document.createElement("li");
        newComment.classList.add("comment");

        let commentValue = document.getElementById("comment-input").innerHTML;

        if (!finalUserImg) {
            finalUserImg = `<img src="source/img/userImg.png" alt="face">`
        }

        // Adding a date ----------------------------------------
        let currentDate = new Date();
        // Date Conversion --------------------------------------
        let currentTime = currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            // second: '2-digit'
        });
        let formattedDate = currentDate.toLocaleDateString([], {
            day: "2-digit",
            month: "2-digit",
        });

        // Filling in a comment --------------------------------------------------
        newComment.innerHTML =
            `<div class="comment__body">
                <div class="comment__left">
                    <div class="comment__user-image comment-user-image comment-user-image-not-adaptive">
                        <div class="comment-user-image__img" id="comment-user-img">
                            ${finalUserImg}
                        </div>
                    </div>
                </div>
                <div class="comment__right">
                    <div class="comment__top">
                        <div class="comment__top-left">
                            <div class="comment__user-image comment-user-image comment-user-image-adaptive">
                                <div class="comment-user-image__img" id="comment-user-img">
                                    ${finalUserImg}
                                </div>
                            </div>
                            <div class="comment__name">${commentInputName.innerHTML}</div>
                        </div>
                        <div class="comment__top-right">
                            <div class="comment__date">
                                <div class="comment__day">${formattedDate}</div>
                                <div class="comment__time">${currentTime}</div>
                                <div class="comment__curent-date">${currentDate}</div>
                            </div>
                        </div>
                    </div>
                    <div class="comment__center">
                        <div class="comment__text">
                            ${commentValue}
                        </div>
                    </div>
                    <div class="comment__bottom">
                        <button class="comment__button reply-button _icon-reply-solid"><span>Ответить</span></button>
                        <button class="comment__button favorites-button _icon-heart-regular">
                            <span>В избранное</span>
                        </button>
                        <div class="comment__rating">
                            <button class="rating__button minus-button _icon-minus"></button>
                            <span class="rating__value">${ratingNumber}</span>
                            <button class="rating__button plus-button _icon-plus"></button>
                        </div>
                    </div>
                </div>
            </div>`;

        // Adding a new comment to the list -------------------------------
        commentList.appendChild(newComment);

        reset();

        replyComment();
        favorite();
        plusClick();
        minusClick();
        commentCounter();
        localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
    }
} getText()


// Comment response function ----------
function replyComment() {

    let replyButton = document.getElementsByClassName("reply-button");

    for (let i = 0; i < replyButton.length; i++) {
        replyButton[i].addEventListener("click", function (e) {
            var replyName = this.parentElement.parentElement.querySelector('.comment__top').querySelector('.comment__name').innerHTML;

            commentInput.focus();

            commentButton.onclick = function getReplyText(e) {

                e.preventDefault();

                let commentValue = document.getElementById("comment-input").innerHTML;

                if (!finalUserImg) {
                    finalUserImg = `<img src="source/img/userImg.png" alt="face">`
                }

                // Adding a date ----------------------------------------
                let currentDate = new Date();
                // Date Conversion --------------------------------------
                let currentTime = currentDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                });
                let formattedDate = currentDate.toLocaleDateString([], {
                    day: "2-digit",
                    month: "2-digit"
                });

                let commentSubList = document.createElement("ul");
                commentSubList.id = "comment-list";
                commentSubList.classList.add("reply-comment-list");
                let replyComment = document.createElement("li");
                replyComment.classList.add("comment");

                replyComment.innerHTML =
                    `<div class="comment__body">
                        <div class="comment__left">
                            <div class="comment__user-image comment-user-image comment-user-image-not-adaptive">
                                <div class="comment-user-image__img" id="comment-user-img">
                                    ${finalUserImg}
                                </div>
                            </div>
                        </div>
                        <div class="comment__right">
                            <div class="comment__top">
                                <div class="comment__top-left">
                                    <div class="comment__user-image comment-user-image comment-user-image-adaptive">
                                        <div class="comment-user-image__img" id="comment-user-img">
                                            ${finalUserImg}
                                        </div>
                                    </div>
                                    <div class="comment__userName">
                                        <div class="comment__name">${commentInputName.innerHTML}</div>
                                        <div class="comment__reply-name _icon-reply-solid">${replyName}</div>
                                    </div>

                                </div>
                                <div class="comment__top-right">
                                    <div class="comment__date">
                                        <div class="comment__day">${formattedDate}</div>
                                        <div class="comment__time">${currentTime}</div>
                                        <div class="comment__curent-date">${currentDate}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="comment__center">
                                <div class="comment__text">
                                    ${commentValue}
                                </div>
                            </div>
                            <div class="comment__bottom">
                                <button class="comment__button favorites-button _icon-heart-regular">
                                    <span>В избранное</span>
                                </button>
                                <div class="comment__rating">
                                    <button class="rating__button minus-button _icon-minus"></button>
                                    <span class="rating__value">${ratingNumber}</span>
                                    <button class="rating__button plus-button _icon-plus"></button>
                                </div>
                            </div>
                        </div>
                    </div>`;


                replyButton[i].parentElement.parentElement.parentElement.parentElement.append(commentSubList);
                commentSubList.appendChild(replyComment);

                replyComment.classList.add("_reply-comment");

                reset();


                getText();
                favorite();
                plusClick();
                minusClick();
                commentCounter();
                localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
            }
        });
    }
} replyComment()
let favoritesButton = document.getElementsByClassName("favorites-button");
function favorite() {

    for (let i = 0; i < favoritesButton.length; i++) {
        favoritesButton[i].onclick = function () {
            this.classList.toggle("_icon-heart-solid");
            this.classList.toggle("_icon-heart-regular");
            allComments = document.querySelectorAll(".comment");

            if (this.classList.contains("_icon-heart-solid")) {
                this.innerHTML = "В избранном";
                allComments[i].classList.add("favorite-comment");
            } else {
                this.innerHTML = "В избранное";
                allComments[i].classList.remove("favorite-comment");
            }
            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
        }
    }
} favorite()

let ratingValue = document.getElementsByClassName("rating__value");
let plusButton = document.getElementsByClassName("plus-button");
let minusButton = document.getElementsByClassName("minus-button");

function plusClick() {
    for (let i = 0; i < plusButton.length; i++) {
        plusButton[i].addEventListener("click", function (event) {
            ratingValue[i].innerHTML = `${++ratingNumber} `;
            minusButton[i].classList.add("rating-disabled");
            this.classList.add("rating-disabled");

            ratingValue[i].classList.add("plus-color");

            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));

            ratingNumber = 0;
        });
    }
} plusClick()

function minusClick() {
    for (let i = 0; i < minusButton.length; i++) {
        minusButton[i].addEventListener("click", function (event) {
            ratingValue[i].innerHTML = `${--ratingNumber} `;
            this.classList.add("rating-disabled");
            plusButton[i].classList.add("rating-disabled");

            ratingValue[i].classList.add("minus-color");

            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));

            ratingNumber = 0
        });
    }
} minusClick()

const limit = 1000;
let alertMessage = document.querySelector(".alert-message");
let inputLimit = document.querySelector(".comment-input__limit");
inputLimit.innerHTML = `Макс.${limit} символов`;

commentInput.addEventListener('input', function () {

    if (commentInput.innerHTML !== "") {
        commentButton.classList.remove("input-button-lock")
        commentButton.classList.add("input-button-active");
        inputLimit.innerHTML = `${commentInput.innerText.length} /${limit}`;
        if (commentInput.innerText.length > limit) {
            alertMessage.style.cssText = 'opacity: 1; visibility: visible;';
            inputLimit.style.color = "#FF0000";
            commentButton.classList.remove("input-button-active");
            commentButton.classList.add("input-button-lock");
        } else if (commentInput.innerText.length <= limit) {
            alertMessage.style.cssText = 'opacity: 0; visibility: visible;';
            inputLimit.style.color = "#999";
            commentButton.classList.remove("input-button-lock");
        }
    } else {
        commentButton.classList.remove("input-button-active");
        commentButton.classList.add("input-button-lock");
        inputLimit.innerHTML = `Макс. ${limit} символов`;
        alertMessage.style.cssText = 'opacity: 0; visibility: hidden;';
        inputLimit.style.color = "#999";
    }
});

function reset() {
    document.getElementById("comment-input").innerHTML = placeholderText;
    commentButton.classList.add("input-button-lock");
    commentButton.classList.remove("input-button-active");
    inputLimit.innerHTML = `Макс. ${limit} символов`;
    alertMessage.style.cssText = 'opacity: 0; visibility: hidden;';
    commentInput.style.color = '#999';
    inputLimit.style.color = "#999";
}

window.onload = function () {
    let storedComments = localStorage.getItem('comments');
    if (storedComments) {
        commentList.innerHTML = JSON.parse(storedComments);
        replyComment();
        favorite();
        plusClick();
        minusClick();
        commentCounter();
    }

    let localUserImg = localStorage.getItem('userImg');
    if (localUserImg) {
        userImg.innerHTML = JSON.parse(localUserImg);
        finalUserImg = JSON.parse(localUserImg);
    }

    let localUserName = localStorage.getItem('userName');
    if (localUserName) {
        commentInputName.innerHTML = JSON.parse(localUserName);
    }

    let localCommentUserImg = localStorage.getItem('commentUserImg');
    if (localCommentUserImg) {
        let allUserName = document.querySelectorAll(".comment__name");
        for (let i = 0; i < allUserName.length; i++) {
            AllCommentUserImg = document.querySelectorAll(".comment-user-image__img");
            for (let j = 0; j < AllCommentUserImg.length; j++) {
                if (JSON.parse(localUserName) === allUserName[i].innerHTML) {
                    AllCommentUserImg[j].innerHTML = JSON.parse(localCommentUserImg);
                }
            }
        }
    }
}

let filterArrow = document.querySelector(".filter__arrow");

let allCommentLink = document.querySelector(".comment-interaction__comment-value");
allCommentLink.addEventListener("click", function (e) {
    e.preventDefault();

    allComments = document.querySelectorAll(".comment");

    for (let i = 0; i < allComments.length; i++) {
        if (!allComments[i].classList.contains("favorite-comment")) {
            allComments[i].style.display = "block";
        }
    }
});

let favoritesLink = document.querySelector(".favourites-interaction__link");
favoritesLink.addEventListener("click", function (e) {
    e.preventDefault();

    allComments = document.querySelectorAll(".comment");

    for (let i = 0; i < allComments.length; i++) {
        if (!allComments[i].classList.contains("favorite-comment")) {
            allComments[i].style.display = "none";
        }
    }
});

let sortByRatingLink = document.querySelector(".sort-by-rating");
sortByRatingLink.onclick = function (e) {
    e.preventDefault();
    const liArray = Array.from(commentList.getElementsByTagName("li"));
    liArray.sort((a, b) => {
        const valueA = parseInt(a.querySelector(".rating__value").innerHTML);
        const valueB = parseInt(b.querySelector(".rating__value").innerHTML);
        filterArrow.style.transform = 'rotate(0)';
        return valueB - valueA;
    });

    commentList.innerHTML = "";
    liArray.forEach(li => {
        commentList.appendChild(li);
    });
    localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
    filterArrow.onclick = function () {
        if (isBToA) {
            liArray.sort((a, b) => {
                const valueA = parseInt(a.querySelector(".rating__value").innerHTML);
                const valueB = parseInt(b.querySelector(".rating__value").innerHTML);
                filterArrow.style.transform = 'rotate(0)';
                return valueB - valueA;
            });
            commentList.innerHTML = "";
            liArray.forEach(li => {
                commentList.appendChild(li);
            });
            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
        } else {
            liArray.sort((a, b) => {
                const valueA = parseInt(a.querySelector(".rating__value").innerHTML);
                const valueB = parseInt(b.querySelector(".rating__value").innerHTML);
                filterArrow.style.transform = 'rotate(-180deg)';
                return valueA - valueB;
            });
            commentList.innerHTML = "";
            liArray.forEach(li => {
                commentList.appendChild(li);
            });
            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
        }
        isBToA = !isBToA;
    };
}

let sortByDateLink = document.querySelector(".sort-by-date");
sortByDateLink.onclick = function (e) {
    e.preventDefault();

    const liArray = Array.from(commentList.getElementsByTagName("li"));
    liArray.sort((a, b) => {
        const dateA = new Date(a.querySelector(".comment__curent-date").innerHTML);
        const dateB = new Date(b.querySelector(".comment__curent-date").innerHTML);
        filterArrow.style.transform = 'rotate(0)';
        return dateA - dateB;
    });
    commentList.innerHTML = "";
    liArray.forEach(li => {
        commentList.appendChild(li);
    });
    localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));

    filterArrow.onclick = function () {
        if (isBToA) {
            liArray.sort((a, b) => {
                const dateA = new Date(a.querySelector(".comment__curent-date").innerHTML);
                const dateB = new Date(b.querySelector(".comment__curent-date").innerHTML);
                filterArrow.style.transform = 'rotate(-180deg)';
                return dateB - dateA;
            });
            commentList.innerHTML = "";
            liArray.forEach(li => {
                commentList.appendChild(li);
            });
            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
        } else {
            liArray.sort((a, b) => {
                const dateA = new Date(a.querySelector(".comment__curent-date").innerHTML);
                const dateB = new Date(b.querySelector(".comment__curent-date").innerHTML);
                filterArrow.style.transform = 'rotate(0)';
                return dateA - dateB;
            });
            commentList.innerHTML = "";
            liArray.forEach(li => {
                commentList.appendChild(li);
            });
            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
        }
        isBToA = !isBToA;
    };
}

let sortByRelevanceLink = document.querySelector(".sort-by-relevance");
sortByRelevanceLink.onclick = function (e) {
    e.preventDefault();
    const liArray = Array.from(commentList.getElementsByTagName("li"));
    liArray.sort((a, b) => {
        const dateA = new Date(a.querySelector(".comment__curent-date").textContent);
        const dateB = new Date(b.querySelector(".comment__curent-date").textContent);
        filterArrow.style.transform = 'rotate(-180deg)';
        return dateB - dateA;
    });
    commentList.innerHTML = "";
    liArray.forEach(li => {
        commentList.appendChild(li);
    });

    filterArrow.onclick = function () {
        if (isBToA) {
            liArray.sort((a, b) => {
                const dateA = new Date(a.querySelector(".comment__curent-date").textContent);
                const dateB = new Date(b.querySelector(".comment__curent-date").textContent);
                filterArrow.style.transform = 'rotate(0)';
                return dateA - dateB;
            });
            commentList.innerHTML = "";
            liArray.forEach(li => {
                commentList.appendChild(li);
            });
            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
        } else {
            liArray.sort((a, b) => {
                const dateA = new Date(a.querySelector(".comment__curent-date").textContent);
                const dateB = new Date(b.querySelector(".comment__curent-date").textContent);
                filterArrow.style.transform = 'rotate(-180deg)';
                return dateB - dateA;
            });
            commentList.innerHTML = "";
            liArray.forEach(li => {
                commentList.appendChild(li);
            });
            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
        }
        isBToA = !isBToA;
    };
}

let sortByReplaceNumberLink = document.querySelector(".sort-by-replace-number");
sortByReplaceNumberLink.onclick = function (e) {
    e.preventDefault();

    allComments = document.querySelectorAll(".comment");
    for (let index = 0; index < allComments.length; index++) {
        if (!allComments[index].classList.contains("_reply-comment")) {
            const liArray = Array.from(allComments[index].getElementsByTagName("ul"));
            liArray.sort((a, b) => {
                var aElements = a.querySelectorAll("._reply-comment");
                var bElements = b.querySelectorAll("._reply-comment");
                filterArrow.style.transform = 'rotate(0)';
                return aElements.length - bElements.length;
            });
            commentList.innerHTML = "";
            liArray.forEach(li => {
                commentList.appendChild(li.parentElement);

                const liArray = Array.from(commentList.getElementsByTagName("li"));
                if (isBToA) {
                    liArray.sort((a, b) => {
                        var aElements = a.querySelectorAll("._reply-comment");
                        var bElements = b.querySelectorAll("._reply-comment");
                        filterArrow.style.transform = 'rotate(-180deg)';
                        return aElements.length - bElements.length;
                    });
                    commentList.innerHTML = "";
                    liArray.forEach(li => {
                        commentList.appendChild(li);
                    });
                    localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
                } else {
                    liArray.sort((a, b) => {
                        var aElements = a.querySelectorAll("._reply-comment");
                        var bElements = b.querySelectorAll("._reply-comment");
                        filterArrow.style.transform = 'rotate(0)';
                        return bElements.length - aElements.length;
                    });
                    commentList.innerHTML = "";
                    liArray.forEach(li => {
                        commentList.appendChild(li);
                    });
                    localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
                }
                isBToA = !isBToA;
            });
        }
    }

    localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
}

let isBToA = true;
filterArrow.onclick = function () {
    const liArray = Array.from(commentList.getElementsByTagName("li"));
    if (isBToA) {
        liArray.sort((a, b) => {
            const dateA = new Date(a.querySelector(".comment__curent-date").innerHTML);
            const dateB = new Date(b.querySelector(".comment__curent-date").innerHTML);
            filterArrow.style.transform = 'rotate(-180deg)';
            return dateB - dateA;
        });
        commentList.innerHTML = "";
        liArray.forEach(li => {
            commentList.appendChild(li);
        });
        localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
    } else {
        liArray.sort((a, b) => {
            const dateA = new Date(a.querySelector(".comment__curent-date").innerHTML);
            const dateB = new Date(b.querySelector(".comment__curent-date").innerHTML);
            filterArrow.style.transform = 'rotate(0)';
            return dateA - dateB;
        });
        commentList.innerHTML = "";
        liArray.forEach(li => {
            commentList.appendChild(li);
        });
        localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
    }
    isBToA = !isBToA;
};


// Получаем список элементов
var filterItems = document.querySelectorAll('.filter__sub-link');

// Перебираем элементы и добавляем обработчик события при нажатии
filterItems.forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Добавляем класс к текущему элементу
    item.classList.add('_icon-check-solid');
    
    // Удаляем класс у других элементов
    filterItems.forEach(function(otherItem) {
      if (otherItem !== item) {
        otherItem.classList.remove('_icon-check-solid');
      }
    });
  });
});

