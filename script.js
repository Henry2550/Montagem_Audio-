let blocos = JSON.parse(localStorage.getItem("blocos")) || [];

function adicionarBloco() {
    const nome = document.getElementById("nomeBloco").value;

    if(nome === "") return;

    blocos.push(nome);

    localStorage.setItem("blocos", JSON.stringify(blocos));

    atualizarLista();

    document.getElementById("nomeBloco").value = "";
}

function atualizarLista() {
    const lista = document.getElementById("listaBlocos");

    lista.innerHTML = "";

    blocos.forEach(bloco => {
        const li = document.createElement("li");
        li.textContent = bloco;
        lista.appendChild(li);
    });
}

atualizarLista();
