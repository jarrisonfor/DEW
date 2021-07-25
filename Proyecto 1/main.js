let validar = false

const checkMatricula = /^[0-9]{4}[ -]?[A-Z]{3}$/gi
const checkNumero = /^[0-9]{1,10}$/
const checkHora = /^(?:(?:([01]?\d|2[0-3]):)([0-5]?\d):)([0-5]?\d)$/
const checkSemaforo = /^verde|rojo|naranja$/i
const checkNombre = /^[a-z ]{4,30}$/i

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let invalido = false;

let ncoches = 2;
invalido = validar
while (invalido) {
    ncoches = prompt(`Dime el numero de coches`)
    invalido = checkNumero.test(ncoches) ? false : true;
    if (invalido) {
        alert('Formato del numero de coches incorrecto')
    }
}

let nedificios = 2;
invalido = validar
while (invalido) {
    nedificios = prompt(`Dime el numero de edificios`)
    invalido = checkNumero.test(nedificios) ? false : true;
    if (invalido) {
        alert('Formato del numero de edificios incorrecto')
    }
}
let hora = '20:20:20'
invalido = validar
while (invalido) {
    hora = prompt(`Dime la hora`)
    invalido = checkHora.test(hora) ? false : true;
    if (invalido) {
        alert('Formato de la hora es incorrecto')
    }
}

let semaforo = 'verde'
invalido = validar
while (invalido) {
    semaforo = prompt(`Dime un color de semaforo`)
    invalido = checkSemaforo.test(semaforo) ? false : true;
    if (invalido) {
        alert('El color introducido es incorrecto')
    }
}


let verde = semaforo == 'verde' ? 'iluminado' : ''
let naranja = semaforo == 'naranja' ? 'iluminado' : ''
let rojo = semaforo == 'rojo' ? 'iluminado' : ''
let nocamina = naranja != '' || verde != '' ? 'iluminado' : ''
let camina = rojo != '' ? 'iluminado' : ''
let pantalla = screen.width;
let width = 500 * (nedificios > ncoches ? nedificios : ncoches)
let tipowidth = 'px'
if (pantalla > width) {
    width = 100
    tipowidth = '%'
}

let html = `
    <div id="semaforo">
    <div class="luz rojo ${rojo}"></div>
    <div class="luz naranja ${naranja}"></div>
    <div class="luz verde ${verde}"></div>
    </div>
    <div id="caminar">
    <div class="no-puede-caminar ${nocamina}">Dont Walk</div>
    <div class="puede-caminar ${camina}">Walk</div>
    </div>
    <div id="palo2" class="palo"></div>
    <div id="reloj">${hora}</div>
        <div id="palo1" class="palo"></div>
        <div id="contenedor" style="width:${width}${tipowidth}">
            <div id="tiendas">
`;

for (let i = 1; i <= nedificios; i++) {
    let nombre = `Tienda ${i}`
    invalido = validar
    while (invalido) {
        nombre = prompt(`Dime el nombre de la tienda`)
        invalido = checkNombre.test(nombre) ? false : true;
        if (invalido) {
            alert('El numero de portal introducido es incorrecto')
        }
    }
    let numero = `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`
    invalido = validar
    while (invalido) {
        numero = prompt(`Dime el numero de portal`)
        invalido = checkNumero.test(numero) ? false : true;
        if (invalido) {
            alert('El numero de portal introducido es incorrecto')
        }
    }
    let served = `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`
    invalido = validar
    while (invalido) {
        served = prompt(`Dime una cantidad de productos vendidos`)
        invalido = checkNumero.test(served) ? false : true;
        if (invalido) {
            alert('El numero de productos introducido es incorrecto')
        }
    }

    html += `
    <div class="tienda">
        <div class="nombre">${nombre}</div>
        <div class="puerta-poster">
            <div class="puerta-numero">
                <div class="numero">${numero}</div>
                <div class="puerta">
                    <div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div class="poster">
                <div class="emoji">
                    &#${randomIntFromInterval(128512, 128580)}
                </div>
                <div class="served">
                    Over ${served} served!
                </div>
            </div>
        </div>
    </div>
`;
}

html += `
</div>
<div id="coches">
    <div id="acera">
    </div>
    <div id="divisiona"></div>
    <div id="divisionb">
`;

for (let i = 1; i <= ncoches; i++) {
    let matricula = `${i}${i}${i}${i}-ABC`
    invalido = validar
    while (invalido) {
        matricula = prompt(`Dime la matricula del ${i}º coche`)
        invalido = checkMatricula.test(matricula) ? false : true;
        if (invalido) {
            alert('Formato de matricula incorrecto')
        }
    }
    html += `
    <div class="coche">
        <img src="coche.png">
        <div class="matricula">${matricula}</div>
    </div>
`
}

html += `
        </div>
    </div>
</div>
`;

document.write(html)