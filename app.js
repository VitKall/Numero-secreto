let numeroSecreto = 0;
let intentos = 0;
let numeroMaximo = 12;
let maximoIntentos = 4;
let numerosSorteados = [];

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste después de ${intentos} ${(intentos === 1) ? 'intento. ¡Eres genial!' : 'intentos. ¿Puedes mejorar?'}... Pulsa ´Nuevo juego.´`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acierta
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'Psss. Esta vez prueba con alguno que sea menor');
        } else {
            asignarTextoElemento('p', 'Oops. ¡Intenta con alguno mayor!');
        }
        intentos++;
        //El usuario alcanza el número máximo de intentos
        if (intentos > maximoIntentos) {
            asignarTextoElemento('p', '¡Noooo! Haz alcanzado el número máximo de intentos. Pero... no llores. Pulsa ´Nuevo juego´ y obten otra oportunidad.');
            document.getElementById('reiniciar').removeAttribute('disabled');
            numerosSorteados = [];
        }
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function numeroAleatorio() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    //Si ya se sortearon todos los números
    if (numerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Los acertastes todos. ¡Eres el campeón!');
    } else {
        //Si el número generado está en la lista
        if (numerosSorteados.includes(numeroGenerado)) {
            return numeroAleatorio();
        } else {
            numerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Descubre el número');
    asignarTextoElemento('p', `Escribe un número del 1 al ${numeroMaximo}`);
    numeroSecreto = numeroAleatorio();
    intentos = 1;
}

function reiniciarJuego() {
    // Limpiar caja
    limpiarCaja();
    // Restablecer textos de inicio
    // Generar un nuevo número
    condicionesIniciales();
    // Deshabilitar el botón nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();