let blocos = JSON.parse(localStorage.getItem("blocos")) || [];
let equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];

function mostrar(secao) {

    document.getElementById("blocos").style.display = "none";
    document.getElementById("salas").style.display = "none";
    document.getElementById("equipamentos").style.display = "none";

    document.getElementById(secao).style.display = "block";
}

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

    if (!sala) return;

    blocos[blocoIndex].salas.push(sala);

    salvarDados();
    atualizarLista();

    document.getElementById("nomeSala").value = "";
}

function adicionarEquipamento() {

    const nome = document.getElementById("nomeEquipamento").value;

    if (!nome) return;

    equipamentos.push(nome);

    salvarDados();

    atualizarEquipamentos();

    document.getElementById("nomeEquipamento").value = "";
}

function excluirBloco(index) {

    if (!confirm("Excluir bloco e todas as salas?"))
        return;

    blocos.splice(index, 1);

    salvarDados();
    atualizarLista();
}

function excluirSala(blocoIndex, salaIndex) {

    if (!confirm("Excluir sala?"))
        return;

    blocos[blocoIndex].salas.splice(salaIndex, 1);

    salvarDados();
    atualizarLista();
}

function excluirEquipamento(index) {

    if (!confirm("Excluir equipamento?"))
        return;

    equipamentos.splice(index, 1);

    salvarDados();
    atualizarEquipamentos();
}

function salvarDados() {

    localStorage.setItem("blocos", JSON.stringify(blocos));
    localStorage.setItem("equipamentos", JSON.stringify(equipamentos));
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

            <button onclick="excluirBloco(${index})">
                🗑️
            </button>

            <ul>
        `;

        bloco.salas.forEach((sala, salaIndex) => {

            html += `
                <li>
                    Sala ${sala}

                    <button onclick="
                        excluirSala(${index}, ${salaIndex})
                    ">
                        ❌
                    </button>
                </li>
            `;
        });

        html += "</ul>";

        li.innerHTML = html;

        listaBlocos.appendChild(li);
    });
}

function atualizarEquipamentos() {

    const lista = document.getElementById("listaEquipamentos");

    lista.innerHTML = "";

    equipamentos.forEach((equipamento, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${equipamento}

            <button onclick="excluirEquipamento(${index})">
                ❌
            </button>
        `;

        lista.appendChild(li);
    });
}

atualizarLista();
atualizarEquipamentos();

mostrar("blocos");
