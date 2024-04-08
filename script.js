async function carregarRepositorios() {
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    if (!nomeUsuario) {
        alert('Por favor, insira um nome de usuário do GitHub.');
        return;
    }

    try {
        const resposta = await fetch(`https://api.github.com/users/${nomeUsuario}/repos`);
        const repositorios = await resposta.json();
        console.log(repositorios);
        const selecaoRepositorio = document.getElementById('repoSelect');
        selecaoRepositorio.innerHTML = '';
        repositorios.forEach(repo => {
            const opcao = document.createElement('option');
            opcao.value = repo.name;
            opcao.textContent = repo.name;
            selecaoRepositorio.appendChild(opcao);
        });
    } catch (erro) {
        console.error('Erro ao carregar repositórios:', erro);
    }
}
// Função para adicionar uma tarefa à lista

let contadorTarefas = 0;

function adicionarTarefa() {
    const inputTarefa = document.getElementById('taskInput').value;
    if (!inputTarefa) {
        alert('Por favor, insira uma tarefa.');
        return;
    }

    const listaTarefas = document.getElementById('taskList');
    const novaTarefa = document.createElement('li');
    novaTarefa.textContent = inputTarefa;
    novaTarefa.setAttribute('data-id', contadorTarefas);
    contadorTarefas++;
    novaTarefa.addEventListener('click', removerTarefa); // Adiciona evento de clique para remover a tarefa
    listaTarefas.appendChild(novaTarefa);

    // Limpa o campo de entrada após adicionar a tarefa
    document.getElementById('taskInput').value = '';

    exibirTarefa();
}

function removerTarefa(event) {
    const tarefaSelecionada = event.target;
    const confirmacao = confirm(`Tem certeza de que deseja remover a tarefa "${tarefaSelecionada.textContent}"?`);
    if (confirmacao) {
        tarefaSelecionada.removeEventListener('click', removerTarefa); // Remove o evento de clique antes de remover a tarefa
        tarefaSelecionada.remove();
    }
}

document.querySelector('button').addEventListener('click', adicionarTarefa);

// Função para exibir as informações da tarefa selecionada
function exibirTarefa() {
    // Captura a lista de tarefas
    const listaTarefas = document.getElementById('taskList');

    // Captura a tarefa selecionada
    const tarefaSelecionada = listaTarefas.querySelector('li.selected');
    if (!tarefaSelecionada) {
        alert('Selecione uma tarefa para exibir.');
        return;
    }

    // Exibe as informações da tarefa selecionada
    alert(tarefaSelecionada.textContent);
}

// Adiciona um evento de clique ao botão de adicionar tarefa
document.querySelector('button').addEventListener('click', adicionarTarefa);

// Adiciona eventos de clique aos botões de remover e exibir tarefa
document.getElementById('removeTaskBtn').addEventListener('click', removerTarefa);
document.getElementById('showTaskBtn').addEventListener('click', exibirTarefa);
