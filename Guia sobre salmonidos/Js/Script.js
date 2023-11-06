document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.querySelector(".contenedor");
    const carrusel = document.querySelector(".carrusel");
    const anchoPrimeraTarjeta = carrusel.querySelector(".tarjeta").offsetWidth;
    const botonesFlecha = document.querySelectorAll(".contenedor i");
    const elementosCarrusel = [...carrusel.children];

    let arrastrando = false, autoplay = true, startX, inicioScrollLeft, timeoutId;

    // Obtener la cantidad de tarjetas que caben en el carrusel a la vez
    let tarjetasPorVista = Math.round(carrusel.offsetWidth / anchoPrimeraTarjeta);

    // Insertar copias de las últimas tarjetas al principio del carrusel para desplazamiento infinito
    elementosCarrusel.slice(-tarjetasPorVista).reverse().forEach(tarjeta => {
        carrusel.insertAdjacentHTML("afterbegin", tarjeta.outerHTML);
    });

    // Insertar copias de las primeras tarjetas al final del carrusel para desplazamiento infinito
    elementosCarrusel.slice(0, tarjetasPorVista).forEach(tarjeta => {
        carrusel.insertAdjacentHTML("beforeend", tarjeta.outerHTML);
    });

    // Desplazar el carrusel a una posición adecuada para ocultar las primeras tarjetas duplicadas en Firefox
    carrusel.classList.add("no-transition");
    carrusel.scrollLeft = carrusel.offsetWidth;
    carrusel.classList.remove("no-transition");

    // Agregar controladores de eventos para los botones de flecha para desplazar el carrusel hacia la izquierda y la derecha
    botonesFlecha.forEach(btn => {
        btn.addEventListener("click", () => {
            carrusel.scrollLeft += btn.id == "izquierda" ? -anchoPrimeraTarjeta : anchoPrimeraTarjeta;
        });
    });

    const inicioArrastre = (e) => {
        arrastrando = true;
        carrusel.classList.add("arrastrando");
        // Registra la posición inicial del cursor y el desplazamiento inicial del carrusel
        startX = e.pageX;
        inicioScrollLeft = carrusel.scrollLeft;
    }

    const arrastrar = (e) => {
        if (!arrastrando) return; // si arrastrando es falso, salir
        // Actualiza la posición de desplazamiento del carrusel en función del movimiento del cursor
        carrusel.scrollLeft = inicioScrollLeft - (e.pageX - startX);
    }

    const detenerArrastre = () => {
        arrastrando = false;
        carrusel.classList.remove("arrastrando");
    }

    const desplazamientoInfinito = () => {
        // Si el carrusel está al principio, desplázalo al final
        if (carrusel.scrollLeft === 0) {
            carrusel.classList.add("no-transition");
            carrusel.scrollLeft = carrusel.scrollWidth - (2 * carrusel.offsetWidth);
            carrusel.classList.remove("no-transition");
        }
        // Si el carrusel está al final, desplázalo al principio
        else if (Math.ceil(carrusel.scrollLeft) === carrusel.scrollWidth - carrusel.offsetWidth) {
            carrusel.classList.add("no-transition");
            carrusel.scrollLeft = carrusel.offsetWidth;
            carrusel.classList.remove("no-transition");
        }

        // Borrar el tiempo de espera existente y comenzar la reproducción automática si el mouse no está sobre el carrusel
        clearTimeout(timeoutId);
        if (!contenedor.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if (window.innerWidth < 800 || !autoplay) return; // Salir si la ventana es más pequeña que 800 o si autoplay es falso
        // Reproducir automáticamente el carrusel después de 2500 ms
        timeoutId = setTimeout(() => carrusel.scrollLeft += anchoPrimeraTarjeta, 2500);
    }
    autoPlay();

    carrusel.addEventListener("mousedown", inicioArrastre);
    carrusel.addEventListener("mousemove", arrastrar);
    document.addEventListener("mouseup", detenerArrastre);
    carrusel.addEventListener("scroll", desplazamientoInfinito);
    contenedor.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    contenedor.addEventListener("mouseleave", autoPlay);
});
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".input, textarea");

    inputs.forEach((input) => {
        input.addEventListener("focus", function () {
            const label = this.nextElementSibling;
            label.style.transform = "translate(2px, -15px)";
            label.style.fontSize = "13px";
        });

        input.addEventListener("blur", function () {
            const label = this.nextElementSibling;
            if ((this.value === "" || (this.tagName === 'TEXTAREA' && this.value.trim() === "")) && !this.classList.contains("textarea")) {
                label.style.transform = "none";
                label.style.fontSize = "16px";
            }
        });
    });
});
