const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-task"); // Corrigido o nome da classe

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
  if (!input.value.trim()) return; // Impede adicionar tarefas vazias

  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });

  input.value = "";

  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = "";

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
        <li class="task ${item.concluida ? "done" : ""}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        `;
  });

  if (listaCompleta) {
    // Verifica se listaCompleta não é null
    listaCompleta.innerHTML = novaLi;
  }

  localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  mostrarTarefas();
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);

  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem("lista");

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

if (button) {
  // Verifica se button não é null
  button.addEventListener("click", adicionarNovaTarefa);
}

recarregarTarefas();
