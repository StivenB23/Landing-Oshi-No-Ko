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

let modeAventure = localStorage.getItem('modeAventure');
const contentModal = document.getElementById('modal__content--message');
if (modeAventure == null) {
    contentModal.innerHTML = `
        <p>Estas a punto de iniciar una aventura. ¿Aceptas el desafio?</p>
        <button onClick="modestateAventure(true)" class="button__primary">Sí</button><button onClick="modestateAventure(false)" class="button__secondary">No</button>
    `;
}
if (modeAventure == "true") {
    contentModal.innerHTML = `
        <p>El diario de Ai Hoshino contiene un código que puede revelar la verdad sobre su pasado, pero ha sido encriptado en un formato extraño. Solo quienes puedan descifrar las pistas repartidas en momentos clave de la serie podrán revelar el código. Cada pista te llevará a una parte del código encriptado, y solo cuando reúnas todas las piezas podrás resolver el enigma. <br> <b> Has aceptado el desafío, ahora solo queda saber si podrás superarlo. Deberás buscar en esta página 5 pistas y hacer clic sobre ellas para ver su contenido </b> </p>
        <div>
    <h5>Ingresa el Código</h5>
    <form id="codeForm" class="codeForm">
        <input type="text" id="digit1" maxlength="1" oninput="moveToNext(this, 'digit2')" autofocus>
        <input type="text" id="digit2" maxlength="1" oninput="moveToNext(this, 'digit3')">
        <input type="text" id="digit3" maxlength="1" oninput="moveToNext(this, 'digit4')">
        <input type="text" id="digit4" maxlength="1">
    </form>
</div>
    `;
}

function modestateAventure(state) {
    localStorage.setItem('modeAventure', state)
    if (state) {
        contentModal.innerHTML = `
        <p>El diario de Ai Hoshino contiene un código que puede revelar la verdad sobre su pasado, pero ha sido encriptado en un formato extraño. Solo quienes puedan descifrar las pistas repartidas en momentos clave de la serie podrán revelar el código. Cada pista te llevará a una parte del código encriptado, y solo cuando reúnas todas las piezas podrás resolver el enigma. <br> <b> Has aceptado el desafío, ahora solo queda saber si podrás superarlo. Deberás buscar en esta página 5 pistas y hacer clic sobre ellas para ver su contenido </b> </p>
        <div>
    <h5>Ingresa el Código</h5>
    <form id="codeForm" class="codeForm">
        <input type="text" id="digit1" maxlength="1" oninput="moveToNext(this, 'digit2')" autofocus>
        <input type="text" id="digit2" maxlength="1" oninput="moveToNext(this, 'digit3')">
        <input type="text" id="digit3" maxlength="1" oninput="moveToNext(this, 'digit4')">
        <input type="text" id="digit4" maxlength="1">
    </form>
    </div>`
    }else{
        contentModal.innerHTML = `
        <p><br>Al parecer no estas listo para la aventura</b> </p>`
    }
}
function moveToNext(current, nextFieldID) {
    if (current.value.length >= 1) {
        document.getElementById(nextFieldID).focus();
    }
}
document.getElementById('button-close').addEventListener("click", () => {
    document.getElementById('modal__container').style.display = 'none';
})
document.getElementById('open-modal').addEventListener("click", () => {
    document.getElementById('modal__container').style.display = 'block';
})