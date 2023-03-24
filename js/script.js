const wrapper = document.querySelector(".wrapper");
const headerMenu = document.querySelector(".header__menu");
const faqFormDropdown= document.querySelector(".faq__form-dropdown");
const servicesFormCategoryDropdown = document.querySelector(".services__form-category");
const servicesFormSorting = document.querySelector(".services__form-sorting");
const serviceInfoDropdown = document.querySelector(".service-info__dropdown");
const reviewModalInput = document.querySelector(".people-saying-review-modal__container input");
const reviewModalTextarea = document.querySelector(".people-saying-review-modal__container textarea");


let userReview = {
    stars: false,
    name: false,
    text: false,
}



document.addEventListener("click", (event) => {

    // Burger menu
	if (findParent(event, "header__menu-burger", 2, true)) {
		headerMenu.classList.toggle("header__menu_open");
	} else if (!findParent(event, "header__menu", 3, true) && headerMenu.classList.contains("header__menu_open")) {
		headerMenu.classList.remove("header__menu_open");
	}

    // Open people-saying-modal
    if (findParent(event, "people-saying-card", 3, true) && findParent(event, "swiper-slide", 3, true)) {
        wrapper.classList.add("open_people-saying-modal");

    }
    // Close people-saying-modal
    if (findParent(event, "people-saying-card__close-btn", 2, true) || event.target.classList.contains("people-saying-modal")) {
        wrapper.classList.remove("open_people-saying-modal");       
    }

    // Open/close faq question
    if (findParent(event, "faq__question", 3, true)) {
        let currentQuestion;
        if (event.target.classList.contains("faq__question")) {
            currentQuestion = event.target;
        } else if (event.target.parentNode.classList.contains("faq__question")) {
            currentQuestion = event.target.parentNode;
        } else if (event.target.parentNode.parentNode.classList.contains("faq__question")) {
            currentQuestion = event.target.parentNode.parentNode;
        } else if (event.target.parentNode.parentNode.parentNode.classList.contains("faq__question")) {
            currentQuestion = event.target.parentNode.parentNode.parentNode;
        }

        currentQuestion.classList.toggle("faq__question_open");

    }

    // Faq form dropdown
    if (findParent(event, "faq__form-dropdown-btn", 2, true)) {
        faqFormDropdown.classList.toggle("faq__form-dropdown_open");
    } else if (event.target.id.includes("theme")) {
        let text = event.target.parentNode.querySelector("label").textContent;
        let textElem = document.querySelector(".faq__form-dropdown-btn span");
        textElem.textContent = text;
        textElem.style.opacity = 1;
        faqFormDropdown.classList.remove("faq__form-dropdown_open");
    } else if (!findParent(event, "faq__form-dropdown", 4, true) && document.querySelector(".faq__form-dropdown_open")) {
        faqFormDropdown.classList.remove("faq__form-dropdown_open");
    }

    // Services category dropdown
    if (findParent(event, "services__form-category-btn", 2, true)) {
        servicesFormCategoryDropdown.classList.toggle("services__form-category_open");
    } else if (event.target.id.includes("services-category-")) {
        let number = document.querySelectorAll(".services__form-category-items ul li input:checked").length;
        document.querySelector(".services__form-category-items-info-selected span").textContent = number;
    } else if (event.target.classList.contains("services__form-category-items-info-clear")) {
        let checkedElems = document.querySelectorAll(".services__form-category-items ul li input:checked");
        if (checkedElems) {
            checkedElems.forEach(elem => {
                elem.checked = false;
            });
            document.querySelector(".services__form-category-items-info-selected span").textContent = 0;
        }
    } else if (!findParent(event, "services__form-category", 4, true) && document.querySelector(".services__form-category_open")) {
        servicesFormCategoryDropdown.classList.remove("services__form-category_open");
    }

    // Services sorting button
    if (findParent(event, "services__form-sorting-btn", 2, true)) {
        servicesFormSorting.classList.toggle("services__form-sorting_open");
    } else if (findParent(event, "services__form-sorting-items", 1, true)) {
        if (event.target.tagName == "BUTTON") {
            servicesFormSorting.classList.remove("services__form-sorting_open");
        }
    } else if (!findParent(event, "services__form-sorting-items", 1, true) && document.querySelector(".services__form-sorting_open")) {
        servicesFormSorting.classList.remove("services__form-sorting_open");
    }

    // service-detail: current Influencer
    if (event.target.id.includes("influencer-")) {
        let name = event.target.parentNode.querySelector("p").textContent;
        document.querySelector(".service-info__influencers > p").innerHTML = "Influencer:<span></span>";
        document.querySelector(".service-info__influencers > p span").textContent = name;
    }
    // service-detail: current User coverage
    if (event.target.id.includes("coverage-")) {
        let name = event.target.parentNode.querySelector("label").textContent;
        document.querySelector(".service-info__coverage > p").innerHTML = "User coverage:<span></span>";
        document.querySelector(".service-info__coverage > p span").textContent = name;
    }

    // service-detail: service-info__dropdown
    if (findParent(event, "service-info__dropdown-btn", 2, true)) {
        serviceInfoDropdown.classList.toggle("service-info__dropdown_open");
    } else if (event.target.id.includes("package-")) {
        let allPackages = serviceInfoDropdown.querySelectorAll(".service-info__dropdown-items div");
        allPackages.forEach((package, index) => {
            if (package.querySelector("input") == event.target) {
                let packageText = package.querySelector("label").textContent;
                let btn = serviceInfoDropdown.querySelector(".service-info__dropdown-btn span");
                btn.textContent = `Package ${index+1} : ${packageText}`;
                btn.style.opacity = 1;
                document.querySelector(".service-info__btns .add-to-cart-btn").removeAttribute("disabled");

                serviceInfoDropdown.classList.remove("service-info__dropdown_open");
            }
        });
    } else if (!findParent(event, "service-info__dropdown", 4, true) && document.querySelector(".service-info__dropdown_open")) {
        serviceInfoDropdown.classList.remove("service-info__dropdown_open");
    }

    // Open people-saying-review-modal
    if (event.target.classList.contains("people-saying-review__write-review-btn")) {
        wrapper.classList.add("open_people-saying-review-modal");
    }
    // Stars people-saying-review-modal
    if (findParent(event, "people-saying-review-modal__stars", 2, false)) {

        let currentStar;

        if (event.target.tagName == "svg") {
            currentStar = event.target;
        } else if (event.target.tagName == "path") {
            currentStar = event.target.parentNode;
        }

        userReview.stars = true;
        checkUserReview();

        document.querySelectorAll(".people-saying-review-modal__stars svg").forEach(star => {
            star.classList.remove("active");
        });

        document.querySelectorAll(".people-saying-review-modal__stars svg").forEach((star, index) => {
            if (currentStar == star) {
                for(let i = 1; i <= (index+1); i++) {
                    document.querySelector(`.people-saying-review-modal__stars svg:nth-child(${i})`).classList.add("active");
                }
            }
        });
    }

    // Close people-saying-review-modal
    if (findParent(event, "people-saying-review-modal__close-btn", 2, true) || event.target.classList.contains("people-saying-review-modal") || event.target.classList.contains("people-saying-review-modal__btn")) {
        wrapper.classList.remove("open_people-saying-review-modal");
    }
});



if (reviewModalInput && reviewModalTextarea) {
    reviewModalInput.addEventListener("input", (event) => {
        if (userReview.name == false) {
            if (reviewModalInput != "") {
                userReview.name = true;
                checkUserReview();
            }
        }
    });
    reviewModalTextarea.addEventListener("input", (event) => {
        if (userReview.text == false) {
            if (reviewModalTextarea != "") {
                userReview.text = true;
                checkUserReview();
            }
        }
    });
}
    



function findParent(event, parentClass, amount, self) {
    if (document.querySelector(`.${parentClass}`)) {
        if (self == true && event.target.classList.contains(parentClass)) {
            return true;
        }

        const parents = [
            event.target.parentNode.classList,
            event.target.parentNode.parentNode.classList,
            event.target.parentNode.parentNode.parentNode.classList,
            event.target.parentNode.parentNode.parentNode.parentNode.classList,
        ];

        for (let i = 0; i <= amount-1; i++) {

            if (parents[i].contains(parentClass)) {
                return true;
            }

        }

        return false;
    } else {
        return false;
    }
}



function checkUserReview() {
    if (userReview.stars == true && userReview.name == true && userReview.text == true) {
        document.querySelector(".people-saying-review-modal__btn").removeAttribute("disabled");
    }
}



const bestOffers_Swiper = new Swiper('.best-offers__swiper', {

    spaceBetween: 20,
    slidesPerView: "auto",
    resistanceRatio: 0,

    pagination: {
       el: '.best-offers__pagination',
       clickable: true,
    },

    navigation: {
        nextEl: '.best-offers__btn-right',
        prevEl: '.best-offers__btn-left',
    },
});



const peopleSaying__Swiper = new Swiper(".people-saying__swiper",  {
   
    slidesPerView: "auto",
    resistanceRatio: 0,

     pagination: {
       el: '.people-saying__pagination',
       clickable: true,
    },

    navigation: {
        nextEl: '.people-saying__btn-right',
        prevEl: '.people-saying__btn-left',
    },

    breakpoints: {
        // when window width is >= 1px
        1: {
            spaceBetween: 20,
        },
        // when window width is >= 1201px
        1201: {
            spaceBetween: 40,
        },
    },
});



const additionalServices__Swiper = new Swiper('.best-offers__swiper_additional-services', {

    spaceBetween: 40,
    slidesPerView: "auto",
    resistanceRatio: 0,

    pagination: {
       el: '.best-offers__pagination_additional-services',
       clickable: true,
    },

    navigation: {
        nextEl: '.best-offers__btn-right_additional-services',
        prevEl: '.best-offers__btn-left_additional-services',
    },

    breakpoints: {
        // when window width is >= 1px
        1: {
            spaceBetween: 20,
        },
        // when window width is >= 1201px
        1201: {
            spaceBetween: 40,
        },
        // when window width is >= 1441px
        1441: {
            spaceBetween: 20,
        },
    },
});