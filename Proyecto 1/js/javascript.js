let validar = true

const checkMatricula = /^[0-9]{4}[ -]?[A-Z]{3}$/i;
const checkNumero = /^[0-9]{1,10}$/;
const checkHora = /^(?:(?:([01]?\d|2[0-3]):)([0-5]?\d):)([0-5]?\d)$/;
const checkSemaforo = /^verde|rojo|naranja$/i;
const checkBoolean = /^yes|no$/i;
const checkTexto = /^[a-z ]{4,30}$/i;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function askValidation(title) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// formulario de preguntas y seteo de informacion
var invalido = true;

// hora
let hora = '20:20:20'
invalido = false;
while (invalido) {
    hora = prompt(`Dime la hora`)
    invalido = !checkHora.test(hora);
    if (invalido) {
        alert('Formato de la hora es incorrecto')
    }
}

// coches
let ncoches = 1;
let matriculas = [];
invalido = validar
while (invalido) {
    ncoches = prompt(`Dime el numero de coches`)
    invalido = !checkNumero.test(ncoches);
    if (invalido) {
        alert('Formato del numero de coches incorrecto')
    } else {
        for (let i = 0; i < ncoches; i++) {
            invalido = true;
            while (invalido) {
                matricula = prompt(`Dime la matricula del ${i + 1}º coche`)
                invalido = !checkMatricula.test(matricula);
                if (invalido) {
                    alert('Formato de matricula incorrecto')
                } else {
                    matriculas.push(matricula);
                }
            }
        }
    }
}

// edificios
let nedificios = 1;
let edificios = [];
invalido = validar
while (invalido) {
    nedificios = prompt(`Dime el numero de edificios`)
    invalido = !checkNumero.test(nedificios);
    if (invalido) {
        alert('Formato del numero de edificios incorrecto')
    } else {
        for (let i = 0; i < nedificios; i++) {
            edificios.push({})
            invalido = true
            while (invalido) {
                nombre = prompt(`Dime el nombre de la ${i + 1}º tienda`)
                invalido = !checkTexto.test(nombre);
                if (invalido) {
                    alert('El numero de portal introducido es incorrecto')
                } else {
                    edificios[i]['nombre'] = nombre;
                }
            }
            invalido = true
            while (invalido) {
                numero = prompt(`Dime el numero de portal de la ${i + 1}º tienda`)
                invalido = !checkNumero.test(numero);
                if (invalido) {
                    alert('El numero de portal introducido es incorrecto')
                } else {
                    edificios[i]['numero'] = numero;
                }
            }
            invalido = true
            while (invalido) {
                served = prompt(`Dame la oferta de la ${i + 1}º tienda`)
                invalido = !checkTexto.test(served);
                if (invalido) {
                    alert('El numero de productos introducido es incorrecto')
                } else {
                    edificios[i]['served'] = served;
                }
            }
        }
    }
}


// semaforo
let semaforo = 'verde'
invalido = validar
while (invalido) {
    semaforo = prompt(`Dime un color de semaforo`)
    invalido = !checkSemaforo.test(semaforo);
    if (invalido) {
        alert('El color introducido es incorrecto')
    }
}
let verde = semaforo == 'verde' ? 'iluminado' : ''
let naranja = semaforo == 'naranja' ? 'iluminado' : ''
let rojo = semaforo == 'rojo' ? 'iluminado' : ''
let nocamina = naranja != '' || verde != '' ? 'iluminado' : ''
let camina = rojo != '' ? 'iluminado' : ''

// hackeando el sistema, no usar document.getelement para asignar estilos dinamicos
let mayor = nedificios > ncoches ? nedificios : ncoches;
let pantalla = screen.width;
let width = 850;
let tipowidth = 'px';
if (mayor < 2) {
    width = 1;
    tipowidth = 'fr';
}

// creacion del html
let html = `
<div id="contenedor" style="grid-template-columns: 100px repeat(${mayor}, ${width}${tipowidth}) 100px;">
    <div>
        <div class="espacio"></div>
        <div class="acera">
            <div id="reloj">
                ${hora}
            </div>
            <div class="palo"></div>
        </div>
        <div class="carretera">
            <div class="divisiona"></div>
            <div class="divisionb"></div>
        </div>
    </div>
`;

for (let i = 0; i < mayor; i++) {
    html += `
        <div>
            <div class="espacio">`;
    if (edificios[i]) {
        html += `
                <div class="tienda">
                    <div class="nombre">${edificios[i].nombre}</div>
                    <div class="numero">${edificios[i].numero}</div>
                    <div class="puerta">
                        <div>
                            <div></div>
                        </div>
                    </div>
                    <div class="poster">
                        <div class="emoji">
                            &#${randomIntFromInterval(128512, 128580)}
                        </div>
                        <div class="served">
                            ${edificios[i].served}
                        </div>
                    </div>
                </div>
        `;
    }
    html += `
            </div>
            <div class="acera"></div>
            <div class="carretera">
                <div class="divisiona"></div>
                <div class="divisionb"></div>
    `;
    if (matriculas[i]) {
        html += `
                <div class="coche">
                    <img src="img/coche.png">
                    <div class="matricula">${matriculas[i]}</div>
                </div>
        `;
    }
    html += `
            </div>
        </div>
    `;
}

html += `
    <div>
        <div class="espacio"></div>
        <div class="acera">
            <div id="semaforo">
                <div class="luz rojo ${rojo}"></div>
                <div class="luz naranja ${naranja}"></div>
                <div class="luz verde ${verde} "></div>
            </div>
            <div id="caminar">
                <div class="no-puede-caminar  ${nocamina}">Dont Walk</div>
                <div class="puede-caminar ${camina}">Walk</div>
            </div>
            <div class="palo"></div>
        </div>
        <div class="carretera">
            <div class="divisiona"></div>
            <div class="divisionb"></div>
        </div>
    </div>
</div>
`;

document.write(html)