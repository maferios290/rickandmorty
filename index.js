const searchCharacter = () => {
    let characterName = document.getElementById('search-field').value;
    fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
    .then(res => res.json())
    .then(data => displayCharacters(data.results))
    .catch(error => console.error('Error fetching characters:', error));
};

const displayCharacters = (characters) => {
    const characterContainer = document.getElementById("character-container");
    characterContainer.innerHTML = '';

    characters.forEach(character => {
        const characterDiv = document.createElement("div");
        characterDiv.className = "col-md-4 mb-4";
        characterDiv.innerHTML = `
            <div class="card">
                <img src="${character.image}" class="card-img-top" alt="${character.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text"><strong>Origin:</strong> ${character.origin.name}</p>
                    <p class="card-text"><strong>Location:</strong> ${character.location.name}</p>
                </div>
            </div>
        `;
        characterContainer.appendChild(characterDiv);
    });
};