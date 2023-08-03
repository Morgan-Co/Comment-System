"use strict";
// Numbering of grid blocks --------------------------------------------
window.addEventListener("resize", function () {
    let blocks = document.querySelector(".blocks__smaller-blocks");
    if (window.innerWidth < 500) {
        blocks.innerHTML = `
            <div class="blocks__block"></div>
            <div class="blocks__block"></div>`;
    }
    else {
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
        return (isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};
let filterLink = document.querySelector(".filter__link");
filterLink.onclick = function (e) {
    e.preventDefault();
};
// Adding a class, depending on the device -------
if (isMobile.any()) {
    document.body.classList.add('_touch');
    filterLink === null || filterLink === void 0 ? void 0 : filterLink.addEventListener("click", function (e) {
        var _a;
        (_a = filterLink === null || filterLink === void 0 ? void 0 : filterLink.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle('_active');
    });
}
else {
    document.body.classList.add('_pc');
}
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
const commentButton = document.querySelector(".comment-input__button");
const commentForm = document.getElementById("comment-input-form");
const commentList = document.getElementById("comments-list");
const commentInput = document.getElementById("comment-input");
let commentsNumber = document.getElementById("comment-number");
let AllCommentUserImg;
let allComments;
let newCommentText;
let ratingNumber = 0;
let newComment;
// Comment counter -----------
function commentCounter() {
    allComments = document.querySelectorAll(".comment");
    commentsNumber.innerHTML = `(${allComments.length})`;
}
// System for adding a custom image ----------------------
let finalUserImg;
let userImg = document.getElementById("user-img");
let selectInput = document.getElementById("select-input");
selectInput.addEventListener("change", () => {
    if (selectInput && selectInput.files !== null) {
        uploadFile(selectInput.files[0]);
    }
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
        var _a;
        userImg.innerHTML = `<img src="${(_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.result}" alt="${file.name}">`;
        finalUserImg = userImg.innerHTML;
        allComments = document.querySelectorAll(".comment");
        if (allComments) {
            localStorage.setItem('commentUserImg', JSON.stringify(finalUserImg));
        }
        localStorage.setItem('userImg', JSON.stringify(userImg.innerHTML));
    };
    reader.onerror = function (e) {
        alert("kaban");
    };
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
commentButton.addEventListener('keydown', preventEnter);
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
// A function that takes values from input and comment creation ---------
function getText() {
    commentButton.onclick = function (e) {
        var _a;
        e.preventDefault();
        // Create new comment element -------------------------------------
        newComment = document.createElement("li");
        newComment.classList.add("comment");
        let commentValue = (_a = document.getElementById("comment-input")) === null || _a === void 0 ? void 0 : _a.innerHTML;
        if (!finalUserImg) {
            finalUserImg = `<img src="source/img/userImg.png" alt="face">`;
        }
        // Adding a date ----------------------------------------
        let currentDate = new Date();
        // Date Conversion --------------------------------------
        let currentTime = currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
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
                                    <div class="comment__name">${commentInputName.innerHTML}</div></div>
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
                                <button class="comment__button reply-button _icon-reply-solid">Ответить</button>
                                <button class="comment__button favorites-button _icon-heart-regular">В
                                    избранное</button>
                                <div class="comment__rating">
                                    <button class="rating__button minus-button _icon-minus"></button>
                                    <span class="rating__value">${ratingNumber}</span>
                                    <button class="rating__button plus-button _icon-plus"></button>
                                </div>
                            </div>
                        </div>
            </div>`;
        // Adding a new comment to the list -------------------------------
        commentList === null || commentList === void 0 ? void 0 : commentList.appendChild(newComment);
        reset();
        replyComment();
        favorite();
        plusClick();
        minusClick();
        commentCounter();
        localStorage.setItem('comments', JSON.stringify(commentList === null || commentList === void 0 ? void 0 : commentList.innerHTML));
    };
}
getText();
// Comment response function ----------
function replyComment() {
    let replyButton = document.getElementsByClassName("reply-button");
    for (let i = 0; i < replyButton.length; i++) {
        replyButton[i].addEventListener("click", function (e) {
            var _a, _b, _c, _d, _e;
            let replyName = (_e = (_d = (_c = (_b = (_a = replyButton[i]) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector('.comment__top')) === null || _d === void 0 ? void 0 : _d.querySelector('.comment__name')) === null || _e === void 0 ? void 0 : _e.innerHTML;
            commentInput === null || commentInput === void 0 ? void 0 : commentInput.focus();
            commentButton.onclick = function getReplyText(e) {
                var _a, _b, _c, _d, _e;
                e.preventDefault();
                let commentValue = (_a = document.getElementById("comment-input")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                if (!finalUserImg) {
                    finalUserImg = `<img src="source/img/userImg.png" alt="face">`;
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
                                <button class="comment__button favorites-button _icon-heart-regular">В
                                    избранное</button>
                                <div class="comment__rating">
                                    <button class="rating__button minus-button _icon-minus"></button>
                                    <span class="rating__value">${ratingNumber}</span>
                                    <button class="rating__button plus-button _icon-plus"></button>
                                </div>
                            </div>
                        </div>
                            </div>`;
                (_e = (_d = (_c = (_b = replyButton[i].parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.append(commentSubList);
                commentSubList.appendChild(replyComment);
                replyComment.classList.add("_reply-comment");
                reset();
                getText();
                favorite();
                plusClick();
                minusClick();
                commentCounter();
                localStorage.setItem('comments', JSON.stringify(commentList === null || commentList === void 0 ? void 0 : commentList.innerHTML));
            };
        });
    }
}
replyComment();
let favoritesButton = document.getElementsByClassName("favorites-button");
function favorite() {
    for (let i = 0; i < favoritesButton.length; i++) {
        let favoriteButton = favoritesButton[i];
        favoriteButton.onclick = function () {
            favoriteButton.classList.toggle("_icon-heart-solid");
            favoriteButton.classList.toggle("_icon-heart-regular");
            allComments = document.querySelectorAll(".comment");
            if (favoriteButton.classList.contains("_icon-heart-solid")) {
                favoriteButton.innerHTML = "В избранном";
                allComments[i].classList.add("favorite-comment");
            }
            else {
                favoriteButton.innerHTML = "В избранное";
                allComments[i].classList.remove("favorite-comment");
            }
            localStorage.setItem('comments', JSON.stringify(commentList === null || commentList === void 0 ? void 0 : commentList.innerHTML));
        };
    }
}
favorite();
let ratingValue = document.getElementsByClassName("rating__value");
let plusButtons = document.getElementsByClassName("plus-button");
let minusButtons = document.getElementsByClassName("minus-button");
function plusClick() {
    for (let i = 0; i < plusButtons.length; i++) {
        plusButtons[i].addEventListener("click", function (event) {
            ratingValue[i].innerHTML = `${++ratingNumber} `;
            minusButtons[i].classList.add("rating-disabled");
            plusButtons[i].classList.add("rating-disabled");
            ratingValue[i].classList.add("plus-color");
            localStorage.setItem('comments', JSON.stringify(commentList === null || commentList === void 0 ? void 0 : commentList.innerHTML));
            ratingNumber = 0;
        });
    }
}
plusClick();
function minusClick() {
    for (let i = 0; i < minusButtons.length; i++) {
        minusButtons[i].addEventListener("click", function (event) {
            ratingValue[i].innerHTML = `${--ratingNumber} `;
            minusButtons[i].classList.add("rating-disabled");
            plusButtons[i].classList.add("rating-disabled");
            ratingValue[i].classList.add("minus-color");
            localStorage.setItem('comments', JSON.stringify(commentList === null || commentList === void 0 ? void 0 : commentList.innerHTML));
            ratingNumber = 0;
        });
    }
}
minusClick();
const limit = 1000;
let alertMessage = document.querySelector(".alert-message");
let inputLimit = document.querySelector(".comment-input__limit");
inputLimit.innerHTML = `Макс.${limit} символов`;
commentInput === null || commentInput === void 0 ? void 0 : commentInput.addEventListener('input', function () {
    if (commentInput.innerHTML !== "") {
        commentButton === null || commentButton === void 0 ? void 0 : commentButton.classList.remove("input-button-lock");
        commentButton === null || commentButton === void 0 ? void 0 : commentButton.classList.add("input-button-active");
        inputLimit.innerHTML = `${commentInput.innerText.length} /${limit}`;
        if (commentInput.innerText.length > limit) {
            alertMessage.style.cssText = 'opacity: 1; visibility: visible;';
            inputLimit.style.color = "#FF0000";
            commentButton === null || commentButton === void 0 ? void 0 : commentButton.classList.remove("input-button-active");
            commentButton === null || commentButton === void 0 ? void 0 : commentButton.classList.add("input-button-lock");
        }
        else if (commentInput.innerText.length <= limit) {
            alertMessage.style.cssText = 'opacity: 0; visibility: visible;';
            inputLimit.style.color = "#999";
            commentButton === null || commentButton === void 0 ? void 0 : commentButton.classList.remove("input-button-lock");
        }
    }
    else {
        commentButton === null || commentButton === void 0 ? void 0 : commentButton.classList.remove("input-button-active");
        commentButton === null || commentButton === void 0 ? void 0 : commentButton.classList.add("input-button-lock");
        inputLimit.innerHTML = `Макс. ${limit} символов`;
        alertMessage.style.cssText = 'opacity: 0; visibility: hidden;';
        inputLimit.style.color = "#999";
    }
});
function reset() {
    let commentInput = document.getElementById("comment-input");
    commentInput.innerHTML = placeholderText;
    commentButton === null || commentButton === void 0 ? void 0 : commentButton.classList.add("input-button-lock");
    commentButton === null || commentButton === void 0 ? void 0 : commentButton.classList.remove("input-button-active");
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
};
let filterArrow = document.querySelector(".filter__arrow");
let allCommentLink = document.querySelector(".comment-interaction__comment-value");
allCommentLink === null || allCommentLink === void 0 ? void 0 : allCommentLink.addEventListener("click", function (e) {
    e.preventDefault();
    allComments = document.querySelectorAll(".comment");
    for (let i = 0; i < allComments.length; i++) {
        if (!allComments[i].classList.contains("favorite-comment")) {
            allComments[i].style.display = "block";
        }
    }
});
let favoritesLink = document.querySelector(".favourites-interaction__link");
favoritesLink === null || favoritesLink === void 0 ? void 0 : favoritesLink.addEventListener("click", function (e) {
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
    sortByRatingLink.classList.add("_icon-check-solid");
    sortByDateLink.classList.remove("_icon-check-solid");
    sortByRelevanceLink.classList.remove("_icon-check-solid");
    sortByReplaceNumberLink.classList.remove("_icon-check-solid");
    const liArray = Array.from(commentList.getElementsByTagName("li"));
    liArray.sort((a, b) => {
        var _a, _b;
        const AElement = (_a = a.querySelector(".rating__value")) === null || _a === void 0 ? void 0 : _a.innerHTML;
        const BElement = (_b = b.querySelector(".rating__value")) === null || _b === void 0 ? void 0 : _b.innerHTML;
        const valueA = parseInt(AElement);
        const valueB = parseInt(BElement);
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
                var _a, _b;
                const AElement = (_a = a.querySelector(".rating__value")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                const BElement = (_b = b.querySelector(".rating__value")) === null || _b === void 0 ? void 0 : _b.innerHTML;
                const valueA = parseInt(AElement);
                const valueB = parseInt(BElement);
                filterArrow.style.transform = 'rotate(0)';
                return valueB - valueA;
            });
            commentList.innerHTML = "";
            liArray.forEach(li => {
                commentList.appendChild(li);
            });
            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
        }
        else {
            liArray.sort((a, b) => {
                var _a, _b;
                const AElement = (_a = a.querySelector(".rating__value")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                const BElement = (_b = b.querySelector(".rating__value")) === null || _b === void 0 ? void 0 : _b.innerHTML;
                const valueA = parseInt(AElement);
                const valueB = parseInt(BElement);
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
};
let sortByDateLink = document.querySelector(".sort-by-date");
sortByDateLink.onclick = function (e) {
    e.preventDefault();
    sortByRatingLink.classList.remove("_icon-check-solid");
    sortByDateLink.classList.add("_icon-check-solid");
    sortByRelevanceLink.classList.remove("_icon-check-solid");
    sortByReplaceNumberLink.classList.remove("_icon-check-solid");
    const liArray = Array.from(commentList.getElementsByTagName("li"));
    liArray.sort((a, b) => {
        var _a, _b;
        const AElement = (_a = a.querySelector(".comment__curent-date")) === null || _a === void 0 ? void 0 : _a.innerHTML;
        const BElement = (_b = b.querySelector(".comment__curent-date")) === null || _b === void 0 ? void 0 : _b.innerHTML;
        const dateA = new Date(AElement);
        const dateB = new Date(BElement);
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
                var _a, _b;
                const AElement = (_a = a.querySelector(".comment__curent-date")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                const BElement = (_b = b.querySelector(".comment__curent-date")) === null || _b === void 0 ? void 0 : _b.innerHTML;
                const dateA = new Date(AElement);
                const dateB = new Date(BElement);
                filterArrow.style.transform = 'rotate(-180deg)';
                return dateB - dateA;
            });
            commentList.innerHTML = "";
            liArray.forEach(li => {
                commentList.appendChild(li);
            });
            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
        }
        else {
            liArray.sort((a, b) => {
                var _a, _b;
                const AElement = (_a = a.querySelector(".comment__curent-date")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                const BElement = (_b = b.querySelector(".comment__curent-date")) === null || _b === void 0 ? void 0 : _b.innerHTML;
                const dateA = new Date(AElement);
                const dateB = new Date(BElement);
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
};
let sortByRelevanceLink = document.querySelector(".sort-by-relevance");
sortByRelevanceLink.onclick = function (e) {
    e.preventDefault();
    sortByRatingLink.classList.remove("_icon-check-solid");
    sortByDateLink.classList.remove("_icon-check-solid");
    sortByRelevanceLink.classList.add("_icon-check-solid");
    sortByReplaceNumberLink.classList.remove("_icon-check-solid");
    const liArray = Array.from(commentList.getElementsByTagName("li"));
    liArray.sort((a, b) => {
        var _a, _b;
        const AElement = (_a = a.querySelector(".comment__curent-date")) === null || _a === void 0 ? void 0 : _a.innerHTML;
        const BElement = (_b = b.querySelector(".comment__curent-date")) === null || _b === void 0 ? void 0 : _b.innerHTML;
        const dateA = new Date(AElement);
        const dateB = new Date(BElement);
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
                var _a, _b;
                const AElement = (_a = a.querySelector(".comment__curent-date")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                const BElement = (_b = b.querySelector(".comment__curent-date")) === null || _b === void 0 ? void 0 : _b.innerHTML;
                const dateA = new Date(AElement);
                const dateB = new Date(BElement);
                filterArrow.style.transform = 'rotate(0)';
                return dateA - dateB;
            });
            commentList.innerHTML = "";
            liArray.forEach(li => {
                commentList.appendChild(li);
            });
            localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
        }
        else {
            liArray.sort((a, b) => {
                var _a, _b;
                const AElement = (_a = a.querySelector(".comment__curent-date")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                const BElement = (_b = b.querySelector(".comment__curent-date")) === null || _b === void 0 ? void 0 : _b.innerHTML;
                const dateA = new Date(AElement);
                const dateB = new Date(BElement);
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
};
let sortByReplaceNumberLink = document.querySelector(".sort-by-replace-number");
sortByReplaceNumberLink.onclick = function (e) {
    e.preventDefault();
    sortByRatingLink.classList.remove("_icon-check-solid");
    sortByDateLink.classList.remove("_icon-check-solid");
    sortByRelevanceLink.classList.remove("_icon-check-solid");
    sortByReplaceNumberLink.classList.add("_icon-check-solid");
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
                commentList.appendChild(li);
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
                }
                else {
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
};
let isBToA = true;
filterArrow.onclick = function () {
    const liArray = Array.from(commentList.getElementsByTagName("li"));
    if (isBToA) {
        liArray.sort((a, b) => {
            var _a, _b;
            const AElement = (_a = a.querySelector(".comment__curent-date")) === null || _a === void 0 ? void 0 : _a.innerHTML;
            const BElement = (_b = b.querySelector(".comment__curent-date")) === null || _b === void 0 ? void 0 : _b.innerHTML;
            const dateA = new Date(AElement);
            const dateB = new Date(BElement);
            filterArrow.style.transform = 'rotate(-180deg)';
            return dateB - dateA;
        });
        commentList.innerHTML = "";
        liArray.forEach(li => {
            commentList.appendChild(li);
        });
        localStorage.setItem('comments', JSON.stringify(commentList.innerHTML));
    }
    else {
        liArray.sort((a, b) => {
            var _a, _b;
            const AElement = (_a = a.querySelector(".comment__curent-date")) === null || _a === void 0 ? void 0 : _a.innerHTML;
            const BElement = (_b = b.querySelector(".comment__curent-date")) === null || _b === void 0 ? void 0 : _b.innerHTML;
            const dateA = new Date(AElement);
            const dateB = new Date(BElement);
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
