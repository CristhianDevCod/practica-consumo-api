document.addEventListener('DOMContentLoaded', startApp);

function startApp(){
	

	consultarApi();
}

async function consultarApi(){
	const url = 'https://rickandmortyapi.com/api/character';

	try {
		const respuesta = await fetch(url);
		const resultado = await respuesta.json();
		mostrarPersonajes(resultado.results);
	} catch (error) {
		console.log(error)
	}
}

function mostrarPersonajes(characters){
	//referencias
	const contenedor = document.querySelector('.character_container');
	characters.forEach(character => {
		let {name, status, species, gender, origin:{name:nameOri}, image } = character

		// cortar cantidad de caracteres
		nameOri = nameOri.substr(0, 13) + '.';
		name = name.substr(0, 12);

		

		const characterObj = document.createElement('article');
		characterObj.classList.add('character');
		// Estructurar el elemento
		characterObj.innerHTML = `
			<header>
				<p><strong>Nombre: </strong>${name}</p>
			</header>
			<div class="img_container">
				<img src="${image}" alt="Imagen de ${name}" width="200px" height="250px">
			</div>
			<footer>
				<p class="status"><Strong>Estado: </Strong>${status}</p>
				<p><Strong>Especie: </Strong>${species}</p>
				<p><Strong>Genero: </Strong>${gender}</p>
				<p><Strong>Origen: </Strong>${nameOri}</p>
			</footer>
		`;

		if(status == 'Alive'){
			characterObj.classList.add('alive')
		} else {
			characterObj.classList.add('dead')
		}
		contenedor.appendChild(characterObj)

	})
}