let blocos = JSON.parse(localStorage.getItem("blocos")) || [];

function adicionarBloco() {
    const nome = document.getElementById("nomeBloco").value;

    if (!nome) return;

    blocos.push({
        nome: nome,
        salas: []
    });

    salvarDados();
    atualizarLista();

    document.getElementById("nomeBloco").value = "";
}

function adicionarSala() {
    const blocoIndex = document.getElementById("blocoSala").value;
    const sala = document.getElementById("nomeSala").value;

    if (sala === "") return;

    blocos[blocoIndex].salas.push(sala);

    salvarDados();
    atualizarLista();

    document.getElementById("nomeSala").value = "";
}

function salvarDados() {
    localStorage.setItem("blocos", JSON.stringify(blocos));
}

function atualizarLista() {

    const listaBlocos = document.getElementById("listaBlocos");
    const selectBloco = document.getElementById("blocoSala");

    listaBlocos.innerHTML = "";
    selectBloco.innerHTML = "";

    blocos.forEach((bloco, index) => {

        const option = document.createElement("option");
        option.value = index;
        option.textContent = bloco.nome;
        selectBloco.appendChild(option);

        const li = document.createElement("li");

        let html = `
            <strong>${bloco.nome}</strong>
            <ul>
        `;

        bloco.salas.forEach(sala => {
            html += `<li>Sala ${sala}</li>`;
        });

        html += "</ul>";

        li.innerHTML = html;

        listaBlocos.appendChild(li);
    });
}

atualizarLista();
