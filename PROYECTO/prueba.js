let palabras = ['abdomen', 'oreja', 'cabello', 'bigote', 'barba', 'cuello', 'hueso', 'familia', 'abuelo', 'especie', 'naturaleza', 'gallina']
let intentosMaximos = 8;
let intentosFa = 0;
let letrasCorrectas = [];
let letrasIncorrectas = []
let numero = 0
let palabra = seleccionarPalabra()
let finDelJuego = false;
let $btn_reset = document.querySelector('#reset')
let $btn_next = document.querySelector('#next')
let $erroneas = document.querySelector('#erroneas')
let $contaGrap = document.querySelector('#contaGrap')
var $entrada = ""

document.addEventListener("keypress", function (event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        $entrada = document.getElementById("entrada").value;
        recorrerPalabra($entrada)
        validarIntento()
        console.log(intentosFa);
        document.getElementById("formulario").reset();
    }
});
window.addEventListener("load", function () {
    mostrarAciertos()
});

$btn_reset.addEventListener('click', function () {
    let palabras = ['abdomen', 'oreja', 'cabello', 'bigote', 'barba', 'cuello', 'hueso', 'familia', 'abuelo', 'especie', 'naturaleza', 'gallina']
    intentosMaximos = 8;
    intentosFa = 0;
    letrasCorrectas = [];
    letrasIncorrectas = []
    numero = 0
    palabra = seleccionarPalabra()
    finDelJuego = false;
    removv()
    $contaGrap.innerHTML = ""
    $erroneas.innerHTML = ""
    mostrarAciertos()
    console.log(palabras);
})
$btn_next.addEventListener('click', function () {
    palabras.splice(numero, 1)
    palabra = seleccionarPalabra()
    removv()
    intentosMaximos = 8;
    intentosFa = 0;
    letrasCorrectas = [];
    letrasIncorrectas = []
    numero = 0
    finDelJuego = false;
    $contaGrap.innerHTML = ""
    $erroneas.innerHTML = ""
    mostrarAciertos()
    console.log(palabras);
})
function seleccionarPalabra() {
    if (palabras.length > 0) {
        numero = Math.floor(Math.random() * palabras.length)
        return palabras[numero];
    }

}
function dibujarAhorcado() {
    if (intentosFa > 0) {
        let lineas = document.querySelector(`#line-${intentosFa}`)
        lineas.classList.add('visible');
        console.log('dibujando');
    }
}
function mostrarintentos() {
    if (palabras.length > 0) {
        letrasIncorrectas.forEach(element => {
            $erroneas.innerHTML += `<li>${element}</li>`
        });
    }

}
function mostrarAciertos() {
    if (palabras.length > 0) {
        for (let index = 0; index < palabra.length; index++) {
            $contaGrap.innerHTML += `<div class="letras" id="contaGrap-${index}"></div>`
        }
    }

}
function llenarAciertos() {
    for (let index = 0; index < palabra.length; index++) {
        let $contaGrap_element = document.querySelector(`#contaGrap-${index}`)
        const element = palabra[index];

        for (let index = 0; index < letrasCorrectas.length; index++) {
            const element2 = letrasCorrectas[index];
            if (element == element2) {
                $contaGrap_element.innerHTML += element
            }
        }

    }

}
function recorrerPalabra(letra) {
    if ((letrasCorrectas.includes(letra)) || (letrasIncorrectas.includes(letra))) {

    } else {
        for (let index = 0; index < palabra.length; index++) {
            const element = palabra[index];
            if (element == letra) {
                letrasCorrectas.push(letra)
            } else {
                if (!letrasIncorrectas.includes(letra) && !palabra.includes(letra)) {
                    letrasIncorrectas.push(letra)
                    intentosFa += 1
                }

            }

        }
        console.log(letrasCorrectas);
        console.log(letrasIncorrectas);
    }

}
function removv() {
    if (intentosFa > 0) {
        for (let index = 1; index <= intentosFa; index++) {
            let lineas = document.querySelector('.visible')
            lineas.classList.remove('visible');
            console.log('eliminando')

        }
    }
}
function validarIntento() {
    finDelJuego = false
    if (letrasCorrectas.length == palabra.length) {
        console.log('gano');
        palabras.splice(numero, 1)
        palabra = seleccionarPalabra()
        intentosMaximos = 8;
        removv()
        intentosFa = 0;
        letrasCorrectas = [];
        letrasIncorrectas = []
        finDelJuego = true
        $contaGrap.innerHTML = ""
        $erroneas.innerHTML = ""
    }
    if (intentosFa == intentosMaximos - 1) {
        console.log('perdio');
        palabras.splice(numero, 1)
        palabra = seleccionarPalabra()
        intentosMaximos = 8;
        removv()
        intentosFa = 0;
        letrasCorrectas = [];
        letrasIncorrectas = []
        finDelJuego = true
        $contaGrap.innerHTML = ""
        $erroneas.innerHTML = ""
    }
    if (intentosFa < intentosMaximos && finDelJuego == false) {
        dibujarAhorcado()
        $contaGrap.innerHTML = ""
        $erroneas.innerHTML = ""
    }
    mostrarintentos()
    mostrarAciertos()
    llenarAciertos()
    console.log(palabras);
}
