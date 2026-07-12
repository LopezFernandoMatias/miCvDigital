import "./css/style.css";
const menu = document.querySelector("#menu");
const nav = document.querySelector(".links");

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    nav.classList.toggle('active');
}


// Función para regresar a la página anterior
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        alert("No hay una página anterior en el historial.");
    }
}