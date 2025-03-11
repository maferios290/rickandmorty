document.addEventListener("DOMContentLoaded", () => {
    const characterContainer = document.getElementById("character-container");

    if (!characterContainer) {
        console.error("No se encontró el contenedor de personajes.");
        return;
    }

    fetch("https://rickandmortyapi.com/api/character")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.results) {
                displayCharacters(data.results);
            } else {
                console.error("No se encontraron personajes.");
            }
        })
        .catch(error => console.error("Error al obtener personajes:", error));
});

const displayCharacters = characters => {
    const characterContainer = document.getElementById("character-container");
    characterContainer.innerHTML = '';

    characters.forEach(character => {
        const characterDiv = document.createElement("div");
        characterDiv.className = "col-md-4 mb-4";
        characterDiv.innerHTML = `
            <div class="card" onclick="showCharacterDetails('${character.name}', '${character.image}', '${character.species}', '${character.status}', '${character.origin.name}', '${character.location.name}')">
                <img src="${character.image}" class="card-img-top" alt="${character.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text"><strong>Species:</strong> ${character.species}</p>
                    <p class="card-text"><strong>Status:</strong> ${character.status}</p>
                </div>
            </div>
        `;
        characterContainer.appendChild(characterDiv);
    });
};

const showCharacterDetails = (name, image, species, status, origin, location) => {
    document.getElementById("modalTitle").textContent = name;
    document.getElementById("modalImage").src = image;
    document.getElementById("modalSpecies").textContent = species;
    document.getElementById("modalStatus").textContent = status;
    document.getElementById("modalOrigin").textContent = origin;
    document.getElementById("modalLocation").textContent = location;

    let modal = new bootstrap.Modal(document.getElementById("characterModal"));
    modal.show();
};
