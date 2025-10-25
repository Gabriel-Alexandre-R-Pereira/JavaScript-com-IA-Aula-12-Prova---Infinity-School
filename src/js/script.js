const inputNotaUsuario = document.querySelector("#inputNotaUsuario");
const botaoAdicionarNota = document.querySelector("#botaoAdicionarNota");
const listaNotas = document.querySelector("#listaNotas");
let todasNotas = [];

const adicionarNota = (event) => {
    event.preventDefault();
    
    if (inputNotaUsuario.value.replaceAll(" ", "").length > 0) {
        const tituloNotaRepetido = todasNotas.some((nota) => {
            return nota.titulo.toLowerCase() === inputNotaUsuario.value.toLowerCase();
        })

        console.log(tituloNotaRepetido);
        
        if (tituloNotaRepetido) {
            alert("ERRO! Título de Nota já Existente.")
        } else {
            construirElementoNota(inputNotaUsuario.value);

            const objetoNota = {
                titulo: inputNotaUsuario.value.trim()
            };
    
            todasNotas.push(objetoNota);
            localStorage.setItem("Lista de Notas", JSON.stringify(todasNotas));
        }
    } else {
        alert("ERRO! Título da Nota não pode ser vazio.");
    };

    inputNotaUsuario.value = "";
};

const construirElementoNota = (tituloNota) => {
    tituloNota = tituloNota.trim();
    
    const novaNota = document.createElement("li");
    const nota = document.createElement("p");
    const botaoRemoverNota = document.createElement("button");

    nota.textContent = tituloNota;
    botaoRemoverNota.textContent = "Remover Nota";

    botaoRemoverNota.setAttribute("type", "button");

    listaNotas.appendChild(novaNota);
    novaNota.appendChild(nota);
    novaNota.appendChild(botaoRemoverNota);

    botaoRemoverNota.addEventListener("click", removerNota);
}

const clickBotaoAdicionarNota = (event) => {
    if (event.key === "Enter") {
        botaoAdicionarNota.click();
        event.preventDefault();  
    };
};

const removerNota = (event) => {
    event.preventDefault();

    const tituloNotaRemover = event.target.parentElement.children[0].textContent;
    const indiceNotaRemover = todasNotas.findIndex((nota) => {
        return nota.titulo === tituloNotaRemover;
    });

    todasNotas.splice(indiceNotaRemover, 1);
    localStorage.setItem("Lista de Notas", JSON.stringify(todasNotas));

    listaNotas.removeChild(event.target.parentElement);
};

const carregarNotas = () => {
    todasNotas = (JSON.parse(localStorage.getItem("Lista de Notas")));

    for (let nota of todasNotas) {
        construirElementoNota(nota.titulo);
    };
};

botaoAdicionarNota.addEventListener("click", adicionarNota);
inputNotaUsuario.addEventListener("keydown", clickBotaoAdicionarNota);

if ((localStorage.getItem("Lista de Notas")) !== null) {
    window.addEventListener("load", carregarNotas);
}