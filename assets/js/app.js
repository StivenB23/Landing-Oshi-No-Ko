const containerEpisodiesTemp1 = document.getElementById('container-episodies-temp1');
const containerEpisodiesTemp2 = document.getElementById('container-episodies-temp2');
const containerCast = document.getElementById('casts');
const contentModal = document.getElementById('modal__content--message');


let stateModeGame = JSON.parse(sessionStorage.getItem('modeAventure'));
let parsedClues = sessionStorage.getItem('cluesFound') !== null ? JSON.parse(sessionStorage.getItem('cluesFound')) : [];
let numberCluesFound = new Set(parsedClues);

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
        actor: 'Freddie',
        imagen: 'https://imagedelivery.net/5ejkUOtsMH5sf63fw6q33Q/1cb4d6b9-e7e9-40f5-bc8c-6be782d47a00/public'
    },
    {
        personaje: 'Rubi',
        actor: 'Yan',
        imagen: 'https://i.pinimg.com/736x/41/01/2d/41012db60de94c749647173b21ce5d67.jpg'
    },
    {
        personaje: 'Ai Hoshino',
        actor: 'Name',
        imagen: 'https://i.pinimg.com/736x/30/ed/83/30ed839c04e2ad2c7fabcbb534c4df52.jpg'
    },
    {
        personaje: 'Memcho',
        actor: 'Crisstal',
        imagen: 'https://i.pinimg.com/736x/11/da/e7/11dae78a41252b48bf7875ba0fab0e4b.jpg'
    }
    ,
    {
        personaje: 'Kana Arima',
        actor: 'Lumy',
        imagen: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/47f68a11-045e-405b-a73b-77f15538ce10/width=450/kanaarima-2279058996.jpeg'
    }
]

const contentHTML = {
    startGameQuestion: `<p>Estas a punto de iniciar una aventura. ¿Aceptas el desafio?</p>
        <button onClick="modestateAventure(true)" class="button__primary">Sí</button><button onClick="modestateAventure(false)" class="button__secondary">No</button>`,
    OptionNoGame: `<p><br>Al parecer no estas listo para la aventura</b> </p>`,
    HistoryAndInstrucctions: ` <p>El diario de Ai Hoshino contiene un código que puede revelar la verdad sobre su pasado, pero ha sido encriptado en un formato extraño. Solo quienes puedan descifrar las pistas repartidas en momentos clave de la serie podrán revelar el código. Cada pista te llevará a una parte del código encriptado, y solo cuando reúnas todas las piezas podrás resolver el enigma. <br> <b> Has aceptado el desafío, ahora solo queda saber si podrás superarlo.</p>
    <ul class="list__instruccions">
        <li>Encuentra las 5 pistas ocultas en esta página web. (Haz clic en los diferentes elementos).</li>
        <li>Las pistas pueden ser palabras, imágenes o cualquier otro objeto.</li>
        <li>Cuando encuentres todas las pistas, el botón de abajo se activará.</li>
    </ul>
    <button id="buttonEnterCode" disabled onClick="showFormCode()" class="button__primary">Ingresar Código</button>
     `,
    formCode: `
    <div class="container__codeForm">
        <h5>Ingresa el Código</h5>
        <form id="codeForm" class="codeForm">
            <input type="text" id="digit1" placeholder="0" autocomplete="off" maxlength="1" oninput="moveToNext(this, 'digit2')" autofocus>
            <input type="text" id="digit2" placeholder="0" autocomplete="off" maxlength="1" oninput="moveToNext(this, 'digit3')">
            <input type="text" id="digit3" placeholder="0" autocomplete="off" maxlength="1" oninput="moveToNext(this, 'digit4')">
            <input type="text" id="digit4" placeholder="0" autocomplete="off" maxlength="1" oninput="moveToNext(this, 'digit5')">
            <input type="text" id="digit5" placeholder="0" autocomplete="off" maxlength="1">
        </form>
        <button type="button"  onClick="validateCode()" class="button__primary">Validar Código</button>
    </div>`,
    congratulations: `
    <div>
        <h2>Felicidades!</h2>
        <p>Has completado la aventura y has encontrado todas las pistas necesarias para descifrar el código. Aquí está tu código:</p>
        <h1 class="code">12345</h1>
        <p>Recuerda que solo podrás descifrar el código si lo encuentras en el momento clave de la serie. Como próximo paso, sigue leyendo el diario de Ai Hoshino para descubrir más detalles sobre su pasado y cómo lograrlo.</p>
        <button onClick="resetGame()" class="button__primary">Volver a jugar</button>
    </div>
    </div>
    `
}

function showFormCode() {
    contentModal.innerHTML = contentHTML.formCode;
}

const leans = {
    'one': {
        number: '1',
        message: '<p>La primera pista esta ubicada en una escena en donde Ai Hoshino tine un momento clave con sus hijos. <br> En el momento en que el amor se refleja en sus ojos, <b>cuenta las letras de su confesión más importante. Esto te dara el primer número del código </b></p>'
    },
    'two': {
        number: '2',
        message: '<p><b><small class="text__lead">Ten en cuenta el número en las opciones de respuesta</small> <br> ¿Qué profesión desea tener Aqua durante la serie? </b><small>Manga Capítulo 83</small> <br> <br> 2) Actor <br> 7) Médico <br> 6) Productor <br> 8) Profesor <br> </p>'
    },
    'three': {
        number: '3',
        message: '<p><b><small class="text__lead">Ten en cuenta el número en las opciones de respuesta</small><br> ¿Qué evento desencadena que Ruby descubra la verdadera identidad de Gorou Amemiya y su relación con ella? </b> <small>Manga Capítulo 122</small> <br> <br> 4) Encuentra el diario de Gorou con detalles de su vida pasada <br> 0) Aqua revela la verdad para frenar sus planes de venganza <br> 3)  Ruby tiene un flashback de su vida pasada al ver un antiguo video <br> 6) Se lo confiesa la madre adoptiva de AI </p>'
    },
    'four': {
        number: '4',
        message: '<p><b><small class="text__lead">Ten en cuenta el número en las opciones de respuesta</small><br> ¿Por qué Mem-cho decide unirse a B-komachi, a pesar de haber alcanzado ya una gran oportunidad como influencer? </b> <br> <br> 4) Por lealtad a Ai Hoshino <br> 1) Por el deseo de cumplir con un sueño que tenía desde pequeña <br> 6) Por una oferta económica muy tentadora <br> 7) Porque Aqua la convence e que será beneficioso para su carrera  </p>'
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

// Count Clues
function addClue(clueNumber) {
    numberCluesFound.add(clueNumber)
    sessionStorage.setItem('cluesFound', JSON.stringify(Array.from(numberCluesFound.values())));
}

// Modo aventura 5 misiones
function modestateAventure(state) {
    stateModeGame = state
    sessionStorage.setItem('modeAventure', state)
    if (state) {
        contentModal.innerHTML = contentHTML.HistoryAndInstrucctions;
    } else {
        contentModal.innerHTML = contentHTML.OptionNoGame;
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
function observerButton() {
    const input = document.getElementById('buttonEnterCode');
    if (numberCluesFound.size == 5) {
        console.log("remove");

        input.removeAttribute('disabled');
        return;
    }

}
function controllerConent() {
    if (stateModeGame === null) {
        contentModal.innerHTML = contentHTML.startGameQuestion;
    }
    if (stateModeGame) {
        contentModal.innerHTML = contentHTML.HistoryAndInstrucctions;
    }
    if (stateModeGame == false) {
        contentModal.innerHTML = contentHTML.OptionNoGame;
    }
   
    observerButton()
    openModal()
}

document.getElementById('button-close').addEventListener("click", closeModal)
document.getElementById('open-modal').addEventListener("click", controllerConent)

const leads = document.querySelectorAll('#lead')
leads.forEach((lead) => {
    lead.addEventListener('click', (e) => {
        if (stateModeGame != false && stateModeGame != null) {
            let leanNumber = lead.getAttribute('lead')
            addClue(leanNumber)
            modalLead(leans[leanNumber].number, leans[leanNumber].message)
        }
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
        contentModal.innerHTML = contentHTML.congratulations
    } else {
        inputs.forEach((input) => {
            input.classList.add('input__error')
        });
        const audioError = new Audio("http://127.0.0.1:5500/assets/audio/audio_error.mp3");
        audioError.play()
            .catch((error) => {
                console.error('Error al reproducir el audio:', error);
            });
    }
}

function resetGame() {
    sessionStorage.clear('modeAventure')
    sessionStorage.clear('cluesFound')
    closeModal()
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