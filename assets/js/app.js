const containerEpisodiesTemp1 = document.getElementById('container-episodies-temp1');
const containerEpisodiesTemp2 = document.getElementById('container-episodies-temp2');
const containerCast = document.getElementById('casts');
const episodies1 = [
    {
        nombre: 'Capitulo 1',
        number: 1
    },
    {
        nombre: 'Capitulo 2',
        number: 2
    }
]

const CharactersSeries = [
    {
        personaje: 'Aqua',
        actor: 'Vestall',
        imagen: 'https://imagedelivery.net/5ejkUOtsMH5sf63fw6q33Q/1cb4d6b9-e7e9-40f5-bc8c-6be782d47a00/public'
    },
    {
        personaje: 'Rubi',
        actor: '...',
        imagen: 'https://i.pinimg.com/736x/41/01/2d/41012db60de94c749647173b21ce5d67.jpg'
    }
]

const leans = {
    'one': {
        number: '1',
        message: '<p>La primera pista esta ubicada en una escena en donde Ai Hoshino tine un momento clave con sus hijos. <br> En el momento en que el amor se refleja en sus ojos, <b>cuenta las letras de su confesión más importante. Esto te dara el primer número del código </b></p>'
    },
    'two': {
        number: '2',
        message: '<p>La segunda pista ... </b></p>'
    },
    'three': {
        number: '3',
        message: '<p>La tercera pista ... </b></p>'
    },
    'four': {
        number: '4',
        message: '<p>La cuarta pista ... </b></p>'
    },
    'five': {
        number: '5',
        message: '<p>La quinta pista ... </b></p>'
    }
}

episodies1.forEach(episodie => {
    let card = `<div class="card">
                    <div class="card-info">
                        <p class="title">${episodie.nombre}</p>
                    </div>
                </div>`

    containerEpisodiesTemp1.innerHTML += card;
});

CharactersSeries.forEach(person => {
    let cardPerson = `<div class="card__person">
              <img
                src=${person.imagen}
                alt=""
                class=${person.actor === '...' ? 'person__none--cast' : ''}
              />
              <div class="person__information">
                <p class="person__name">${person.personaje}</p>
                <p class="person__actor">Interpretado por <b>${person.actor}</b></p>
              </div>
            </div>`;
    containerCast.innerHTML += cardPerson
})

// Modo aventura 5 misiones

let modeAventure = sessionStorage.getItem('modeAventure');
const contentModal = document.getElementById('modal__content--message');
if (modeAventure == null) {
    contentModal.innerHTML = `
        <p>Estas a punto de iniciar una aventura. ¿Aceptas el desafio?</p>
        <button onClick="modestateAventure(true)" class="button__primary">Sí</button><button onClick="modestateAventure(false)" class="button__secondary">No</button>
    `;
}
if (modeAventure == "true") {
    contentModal.innerHTML = `
        <p>El diario de Ai Hoshino contiene un código que puede revelar la verdad sobre su pasado, pero ha sido encriptado en un formato extraño. Solo quienes puedan descifrar las pistas repartidas en momentos clave de la serie podrán revelar el código. Cada pista te llevará a una parte del código encriptado, y solo cuando reúnas todas las piezas podrás resolver el enigma. <br> <b> Has aceptado el desafío, ahora solo queda saber si podrás superarlo. Deberás buscar en esta página web 5 pistas y hacer clic sobre ellas para ver su contenido </b> </p>
        <div>
    <h5>Ingresa el Código</h5>
    <form id="codeForm" class="codeForm">
        <input type="text" id="digit1" maxlength="1" oninput="moveToNext(this, 'digit2')" autofocus>
        <input type="text" id="digit2" maxlength="1" oninput="moveToNext(this, 'digit3')">
        <input type="text" id="digit3" maxlength="1" oninput="moveToNext(this, 'digit4')">
        <input type="text" id="digit4" maxlength="1" oninput="moveToNext(this, 'digit5')">
        <input type="text" id="digit5" maxlength="1">
        <button type="button" onClick="validateCode()" class="button__primary">Enter</button>
    </form>
</div>
    `;
}

function modestateAventure(state) {
    sessionStorage.setItem('modeAventure', state)
    if (state) {
        contentModal.innerHTML = `
        <p>El diario de Ai Hoshino contiene un código que puede revelar la verdad sobre su pasado, pero ha sido encriptado en un formato extraño. Solo quienes puedan descifrar las pistas repartidas en momentos clave de la serie podrán revelar el código. Cada pista te llevará a una parte del código encriptado, y solo cuando reúnas todas las piezas podrás resolver el enigma. <br> <b> Has aceptado el desafío, ahora solo queda saber si podrás superarlo. Deberás buscar en esta página 5 pistas y hacer clic sobre ellas para ver su contenido </b> </p>
        <div>
    <h5>Ingresa el Código</h5>
    <form id="codeForm" class="codeForm">
        <input type="text" id="digit1" maxlength="1" oninput="moveToNext(this, 'digit2')" autofocus>
        <input type="text" id="digit2" maxlength="1" oninput="moveToNext(this, 'digit3')">
        <input type="text" id="digit3" maxlength="1" oninput="moveToNext(this, 'digit4')">
        <input type="text" id="digit4" maxlength="1" oninput="moveToNext(this, 'digit5')">
        <input type="text" id="digit5" maxlength="1">
        <button type="button" onClick="validateCode()" class="button__primary">Enter</button>
    </form>
    </div>`
    } else {
        contentModal.innerHTML = `
        <p><br>Al parecer no estas listo para la aventura</b> </p>`
    }
}
function moveToNext(current, nextFieldID) {
    if (current.value.length >= 1) {
        document.getElementById(nextFieldID).focus();
    }
}
function openModal() {
    document.getElementById('modal__container').style.display = 'block';
}
function closeModal() {
    document.getElementById('modal__container').style.display = 'none';
}
function modalLead(numberLead, contentHTML) {
    contentModal.innerHTML = `
        <h4 class="text__lead">Pista ${numberLead}</h4>
        ${contentHTML}`
    openModal()
}

document.getElementById('button-close').addEventListener("click", closeModal)
document.getElementById('open-modal').addEventListener("click", openModal)

const leads = document.querySelectorAll('#lead')
leads.forEach((lead) => {
    lead.addEventListener('click', (e) => {
        let leanNumber = lead.getAttribute('lead')

        modalLead(leans[leanNumber].number, leans[leanNumber].message)
    });
});

// Code Secret
const KEY_SECRET = 56789444;
function validateCode() {
    const inputs = document.querySelectorAll('#codeForm input')
    let inputCode = document.getElementById('digit1').value + document.getElementById('digit2').value + document.getElementById('digit3').value + document.getElementById('digit4').value + document.getElementById('digit5').value;
    const numeroOfuscado = parseInt(inputCode) ^ KEY_SECRET;
    if (numeroOfuscado == 56772122) {
        inputs.forEach((input) => {
            input.classList.toggle('input__success')
        });
        const audioWin = new Audio("http://127.0.0.1:5500/assets/audio/audio_win.mp3");
        startConfetti()
        audioWin.play()
            .catch((error) => {
                console.error('Error al reproducir el audio:', error);
            });
    } else {
        inputs.forEach((input) => {
            input.classList.toggle('input__error')
        });
        const audioError = new Audio("http://127.0.0.1:5500/assets/audio/audio_error.mp3");
        audioError.play()
            .catch((error) => {
                console.error('Error al reproducir el audio:', error);
            });
    }
}

// Definir duración y fin de la animación
const duration = 4 * 1000;
const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

// Función para generar un número aleatorio en un rango
const randomInRange = (min, max) => Math.random() * (max - min) + min;

// Función para iniciar la animación de confeti
const startConfetti = () => {
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }

        const particleCount = 50 * (timeLeft / duration);

        // Lanzar confeti desde dos puntos de origen
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
    }, 250);
};

// Agregar un event listener al botón para iniciar la animación
document.getElementById('confetti-button').addEventListener('click', startConfetti);
