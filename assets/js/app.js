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
                class=${person.actor === '...' ? 'person__none--cast': ''}
              />
              <div class="person__information">
                <p class="person__name">${person.personaje}</p>
                <p class="person__actor">Interpretado por <b>${person.actor}</b></p>
              </div>
            </div>`;
    containerCast.innerHTML += cardPerson
})