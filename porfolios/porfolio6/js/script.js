import "../css/style.css";
// Menú Responsive
function myMenuFunction() {
    const menuBth = document.getElementById("myNavMenu");
    if (menuBth.className === "nav-menu") {
        menuBth.className += " responsive";
    } else {
        menuBth.className = "nav-menu";
    }
}

// Modo Oscuro
const body = document.querySelector("body");
const toggleSwitch = document.getElementById("toggle-switch");

toggleSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
});

// Efecto de Escritura
const typingEffect = new Typed(".typedText", {
    strings: ["Designer", "Coder", "Developer"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
});

// Animaciones de Scroll
const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
});

sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".text-info", { delay: 200 });
sr.reveal(".text-btn", { delay: 200 });
sr.reveal(".socical-icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 320 });
sr.reveal(".project-box", { interval: 200 });
sr.reveal(".top-header", {});

const srLeft = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
});

srLeft.reveal(".about-info", { delay: 100 });
srLeft.reveal(".contact-info", { delay: 100 });

const srRight = ScrollReveal({
    origin: "right",
    distance: "80px",
    duration: 2000,
    reset: true,
});

srRight.reveal(".skill", { delay: 100 });
srRight.reveal(".skill-box", { delay: 100 });

// Enlace Activo según el Scroll
const sections = document.querySelectorAll(".section[id]");

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");
        const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add("active-link");
        } else {
            navLink?.classList.remove("active-link");
        }
    });
}

window.addEventListener("scroll", scrollActive);

// Función para regresar a la página anterior
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        alert("No hay una página anterior en el historial.");
    }
}


/*function myMenuFunction(){
    var menuBth = document.getElementById("myNavMenu");

    if(menuBth.className === "nav-menu"){
        menuBth.className += " responsive";
    } 
    else {
        menuBth.className = "nav-menu"
    }
}

/*---------Dark Mode---------*//*

const body = document.querySelector("body"),
    toggleSwitch = document.getElementById("toggle-switch");
toggleSwitch.addEventListener("click", ()=>{
    body.classList.toggle("dark");
});

/*----------typing effect-----------*//*

var typingEffect = new Typed(".typedText", {
    strings: ["Designer","Coder","Developer"],

    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,    
});

/*---------Scroll Animation----------*//*

const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
});

sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".text-info", { delay: 200});
sr.reveal(".text-btn", { delay: 200});
sr.reveal(".socical-icons", { delay: 200});
sr.reveal(".featured-image", { delay: 320});

sr.reveal(".project-box", { internal:200});
sr.reveal(".top-header", {});

const srLeft = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
})

srLeft.reveal(".about-info", { delay: 100});
srLeft.reveal(".contact-info", { delay: 100});

const srRight = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
})

srRight.reveal(".skill", { delay: 100});
srRight.reveal(".skill-box", { delay: 100});


/*---------Active Link---------*//*

const sections = querySelectorAll(".section[id]");

function scrollActive(){
    const scrollY = window.scrollY;
    
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,

        sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(".nav-menu a[href*=" + sectionId + "]")
            .classList.add("active-link");
        }
        else{
            document.querySelector(".nav-menu a[href*=" + sectionId + "]")
            .classList.remove("active-link");
        }    
    });
}

window.addEventListener("scroll", scrollActive);

*/