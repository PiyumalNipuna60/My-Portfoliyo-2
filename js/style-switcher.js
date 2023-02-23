/*====toggle style switcher====*/

const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

// hide style switcher on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

/*====theme Color====*/
const alternateStyle = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyle.forEach((style)=>
    {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled",true);

        }
    })
}


/*====Theme light and dark mode====*/

const  dayNight=document.querySelector(".day-night");
window.addEventListener("load",()=>{
    if (document.body.classList.contains("dark")){
        dayNight.querySelector("i").classList.add("fa-sun");
    }else {
        dayNight.querySelector("i").classList.add("fa-moon");

    }
})







