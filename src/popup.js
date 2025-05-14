/*
myButton.addEventListener(
    "click",
    function () {
        myPopup.classList.add("show"
        );
    }
);

closePopup.addEventListener(
    "click",
    function () {
        myPopup.classList.remove(
            "show"
        );
    }
);

myButton_2.addEventListener(
    "click",
    function () {
        myPopup_2.classList.add("show");
    }
);
closePopup_2.addEventListener(
    "click",
    function () {
        myPopup_2.classList.remove(
            "show"
        );
    }
);
myButton_3.addEventListener(
    "click",
    function () {
        myPopup_3.classList.add("show");
    }
);
closePopup_3.addEventListener(
    "click",
    function () {
        myPopup_3.classList.remove(
            "show"
        );
    }
);
window.addEventListener(
    "click",
    function (event) {
        if (event.target == myPopup) {
            myPopup.classList.remove(
                "show"
            );
        

        }
        else if (event.target == myPopup_2) {
            myPopup_2.classList.remove(
                "show"
            );
        }
        else if (event.target == myPopup_3) {
            myPopup_3.classList.remove(
                "show"
            );
        }
    }
);*/

const boxes = document.getElementsByClassName('event-button');

for (const box of boxes) {
  box.addEventListener(
    "click",
    function () {
        event_popup.classList.remove(
            "show"
        );
    }
);
}