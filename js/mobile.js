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