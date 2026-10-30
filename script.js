const characterId = document.getElementById("characterId");
const btnGo = document.getElementById("btn-go");
const content = document.getElementById("content");
const image = document.getElementById("img");
const conteinerResult = document.getElementById('result-style');
const btnReset = document.getElementById('btn-reset')

const fetchApi = (value) => {
    const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
    return result
}

const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];

const buildResult = (result) => {
    return keys.map((key) => document.getElementById(key)).map((elem) => {
        if (elem.checked === true && (Array.isArray(result[elem.name])) === true) {
            const arrayResult = result[elem.name].join('\r\n');
            console.log(arrayResult)
            const newElem = document.createElement("p");
            newElem.innerHTML = `${elem.name} : ${arrayResult}`;
            content.appendChild(newElem);
        } else if (elem.checked === true && (elem.name === 'origin')) {
            const newElem = document.createElement("p");
            newElem.innerHTML = `${elem.name} : ${result[elem.name].name}`;
            content.appendChild(newElem);
        } else if (elem.checked === true && typeof (result[elem.name]) !== 'object') {
            const newElem = document.createElement("p");
            newElem.innerHTML = `${elem.name} : ${result[elem.name]}`;
            content.appendChild(newElem);
        }

    });
}

btnGo.addEventListener('click', async (event) => {
    event.preventDefault();

    if (characterId.value === '') {
        return content.innerHTML = 'É necessário fazer um filtro.';
    }
    const result = await fetchApi(characterId.value);
    if (content.firstChild === null) {
        conteinerResult.className = 'result-style';
        image.src = `${result.image}`
        buildResult(result);
    } else {
        content.innerHTML = ''
        conteinerResult.className = 'result-style';
        buildResult(result);
        image.src = `${result.image}`
    }
});

btnReset.addEventListener('click', () => location.reload());