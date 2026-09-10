/* =========================================================
   NOVA BITE - JAVASCRIPT PRINCIPAL
   Tecnologías: JavaScript Vanilla + DOM
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    configurarFormulario();
    configurarBotonVolverArriba();

});


/* =========================================================
   2. VALIDACIÓN DEL FORMULARIO DE CONTACTO
   ========================================================= */

function configurarFormulario() {

    /*
     * Buscamos el formulario por su ID.
     *
     * En contacto.html vamos a utilizar:
     * id="formContacto"
     */
    const formulario = document.getElementById("formContacto");


    /*
     * Si estamos en index.html o info.html,
     * el formulario no existe.
     *
     * En ese caso simplemente terminamos la función
     * para evitar errores en la consola.
     */
    if (!formulario) {
        return;
    }


    /*
     * Escuchamos el evento "submit".
     *
     * Se ejecuta cuando el usuario presiona
     * el botón de enviar.
     */
    formulario.addEventListener("submit", function (event) {

        /*
         * Evitamos que el navegador envíe realmente
         * los datos o recargue la página.
         *
         * Esto permite hacer un envío simulado.
         */
        event.preventDefault();


        /* ---------------------------------------------
           OBTENER LOS CAMPOS DEL FORMULARIO
           --------------------------------------------- */

        const nombre = document.getElementById("nombre");
        const email = document.getElementById("email");
        const asunto = document.getElementById("asunto");
        const mensaje = document.getElementById("mensaje");


        /* ---------------------------------------------
           OBTENER LOS MENSAJES DE ERROR
           --------------------------------------------- */

        const errorNombre = document.getElementById("errorNombre");
        const errorEmail = document.getElementById("errorEmail");
        const errorAsunto = document.getElementById("errorAsunto");
        const errorMensaje = document.getElementById("errorMensaje");


        /*
         * Variable para determinar si el formulario
         * es válido.
         *
         * Comenzamos suponiendo que sí lo es.
         */
        let formularioValido = true;


        /* ---------------------------------------------
           LIMPIAR ERRORES ANTERIORES
           --------------------------------------------- */

        ocultarError(errorNombre);
        ocultarError(errorEmail);
        ocultarError(errorAsunto);
        ocultarError(errorMensaje);


        /*
         * Quitamos clases visuales anteriores.
         */
        quitarEstadoInvalido(nombre);
        quitarEstadoInvalido(email);
        quitarEstadoInvalido(asunto);
        quitarEstadoInvalido(mensaje);


        /* =================================================
           VALIDAR NOMBRE
           ================================================= */

        /*
         * trim() elimina espacios innecesarios
         * al principio y al final.
         */
        const valorNombre = nombre.value.trim();

        if (valorNombre === "") {

            mostrarError(
                errorNombre,
                "Por favor, ingresá tu nombre."
            );

            marcarInvalido(nombre);

            formularioValido = false;

        } else if (valorNombre.length < 2) {

            mostrarError(
                errorNombre,
                "El nombre debe tener al menos 2 caracteres."
            );

            marcarInvalido(nombre);

            formularioValido = false;
        }


        /* =================================================
           VALIDAR EMAIL
           ================================================= */

        const valorEmail = email.value.trim();


        /*
         * Expresión regular sencilla para verificar
         * que el correo tenga un formato válido.
         *
         * Ejemplo válido:
         * usuario@gmail.com
         */
        const formatoEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (valorEmail === "") {

            mostrarError(
                errorEmail,
                "Por favor, ingresá tu correo electrónico."
            );

            marcarInvalido(email);

            formularioValido = false;

        } else if (!formatoEmail.test(valorEmail)) {

            mostrarError(
                errorEmail,
                "Ingresá un correo electrónico válido."
            );

            marcarInvalido(email);

            formularioValido = false;
        }


        /* =================================================
           VALIDAR ASUNTO
           ================================================= */

        /*
         * El asunto también debe tener contenido.
         */
        const valorAsunto = asunto.value.trim();

        if (valorAsunto === "") {

            mostrarError(
                errorAsunto,
                "Por favor, indicá un asunto."
            );

            marcarInvalido(asunto);

            formularioValido = false;
        }


        /* =================================================
           VALIDAR MENSAJE
           ================================================= */

        const valorMensaje = mensaje.value.trim();

        if (valorMensaje === "") {

            mostrarError(
                errorMensaje,
                "Por favor, escribí un mensaje."
            );

            marcarInvalido(mensaje);

            formularioValido = false;

        } else if (valorMensaje.length < 10) {

            mostrarError(
                errorMensaje,
                "El mensaje debe tener al menos 10 caracteres."
            );

            marcarInvalido(mensaje);

            formularioValido = false;
        }


        /* =================================================
           COMPROBAR RESULTADO FINAL
           ================================================= */

        if (formularioValido) {

            /*
             * Todos los datos son correctos.
             * Mostramos el mensaje de éxito.
             */
            mostrarMensajeExito();


            /*
             * Mostramos los datos en la consola.
             *
             * Esto también sirve para demostrar
             * manipulación de datos con JavaScript.
             */
            console.log("Formulario enviado correctamente.");
            console.log("Nombre:", valorNombre);
            console.log("Email:", valorEmail);
            console.log("Asunto:", valorAsunto);
            console.log("Mensaje:", valorMensaje);


            /*
             * Limpiamos el formulario después del
             * envío simulado.
             */
            formulario.reset();

        } else {

            /*
             * Si existen errores, llevamos al usuario
             * hasta el primer campo que necesita corrección.
             */
            enfocarPrimerError(
                nombre,
                email,
                asunto,
                mensaje
            );
        }

    });


    /* =====================================================
       VALIDACIÓN VISUAL EN TIEMPO REAL
       ===================================================== */

    /*
     * Cuando el usuario empieza a escribir,
     * quitamos el estado de error del campo.
     */

    const campos = [
        document.getElementById("nombre"),
        document.getElementById("email"),
        document.getElementById("asunto"),
        document.getElementById("mensaje")
    ];


    campos.forEach(function (campo) {

        if (!campo) {
            return;
        }

        campo.addEventListener("input", function () {

            /*
             * Quitamos el borde de error.
             */
            quitarEstadoInvalido(campo);


            /*
             * Buscamos el mensaje de error asociado.
             */
            const error = obtenerErrorRelacionado(campo);

            ocultarError(error);

        });

    });

}


/* =========================================================
   3. MOSTRAR ERROR
   ========================================================= */

function mostrarError(elemento, mensaje) {

    /*
     * Verificamos que el elemento exista.
     */
    if (!elemento) {
        return;
    }


    /*
     * Escribimos el mensaje.
     */
    elemento.textContent = mensaje;


    /*
     * Agregamos la clase "show".
     *
     * Esta clase está definida en style.css.
     */
    elemento.classList.add("show");
}


/* =========================================================
   4. OCULTAR ERROR
   ========================================================= */

function ocultarError(elemento) {

    if (!elemento) {
        return;
    }

    elemento.textContent = "";
    elemento.classList.remove("show");
}


/* =========================================================
   5. MARCAR CAMPO COMO INVÁLIDO
   ========================================================= */

function marcarInvalido(campo) {

    if (!campo) {
        return;
    }

    /*
     * Bootstrap utiliza esta clase para indicar
     * visualmente un campo inválido.
     */
    campo.classList.add("is-invalid");
}


/* =========================================================
   6. QUITAR ESTADO INVÁLIDO
   ========================================================= */

function quitarEstadoInvalido(campo) {

    if (!campo) {
        return;
    }

    campo.classList.remove("is-invalid");
}


/* =========================================================
   7. ENCONTRAR MENSAJE DE ERROR ASOCIADO
   ========================================================= */

function obtenerErrorRelacionado(campo) {

    /*
     * Según el ID del campo devolvemos
     * el correspondiente mensaje de error.
     */

    if (campo.id === "nombre") {
        return document.getElementById("errorNombre");
    }

    if (campo.id === "email") {
        return document.getElementById("errorEmail");
    }

    if (campo.id === "asunto") {
        return document.getElementById("errorAsunto");
    }

    if (campo.id === "mensaje") {
        return document.getElementById("errorMensaje");
    }

    return null;
}


/* =========================================================
   8. ENFOCAR EL PRIMER CAMPO CON ERROR
   ========================================================= */

function enfocarPrimerError(
    nombre,
    email,
    asunto,
    mensaje
) {

    /*
     * Revisamos los campos en orden.
     * El primero que tenga la clase "is-invalid"
     * recibe el foco.
     */

    const campos = [
        nombre,
        email,
        asunto,
        mensaje
    ];


    for (let campo of campos) {

        if (
            campo &&
            campo.classList.contains("is-invalid")
        ) {

            campo.focus();

            /*
             * Salimos del bucle después de encontrar
             * el primer error.
             */
            break;
        }
    }
}


/* =========================================================
   9. MOSTRAR MENSAJE DE ÉXITO
   ========================================================= */

function mostrarMensajeExito() {

    /*
     * Buscamos el elemento que tendremos
     * preparado en contacto.html.
     */
    const mensajeExito =
        document.getElementById("mensajeExito");


    if (!mensajeExito) {
        return;
    }


    /*
     * Mostramos el mensaje.
     */
    mensajeExito.classList.add("show");


    /*
     * Texto que verá el usuario.
     */
    mensajeExito.innerHTML =
        '<i class="bi bi-check-circle-fill me-2"></i>' +
        '<strong>¡Mensaje enviado!</strong> ' +
        'Gracias por contactarte con NOVA BITE. ' +
        'Te responderemos lo antes posible.';


    /*
     * Después de 5 segundos ocultamos automáticamente
     * el mensaje.
     */
    setTimeout(function () {

        mensajeExito.classList.remove("show");

    }, 5000);

}


/* =========================================================
   10. BOTÓN "VOLVER ARRIBA"
   ========================================================= */

function configurarBotonVolverArriba() {

    /*
     * Buscamos el botón creado en nuestros HTML.
     */
    const boton = document.getElementById("btnVolverArriba");


    /*
     * Si no existe, terminamos.
     */
    if (!boton) {
        return;
    }


    /* =====================================================
       MOSTRAR / OCULTAR BOTÓN AL HACER SCROLL
       ===================================================== */

    window.addEventListener("scroll", function () {

        /*
         * Cuando el usuario baja más de 400px,
         * mostramos el botón.
         */
        if (window.scrollY > 400) {

            boton.classList.add("show");

        } else {

            boton.classList.remove("show");

        }

    });


    /* =====================================================
       VOLVER ARRIBA AL HACER CLICK
       ===================================================== */
    boton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}