async function carregarRepositorios(nomeUsuario) {
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

function exibirTarefas() {
    const descricaoTarefa = document.getElementById('taskDescription');
    const dataHoraTarefa = document.getElementById('taskDatetime');
    const listaTarefas = document.getElementById('taskList');
    listaTarefas.innerHTML = '';

    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(tarefa => {
        const itemLista = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.completada; 
        checkbox.addEventListener('change', function() {
            tarefa.completada = this.checked;
            atualizarTarefa(tarefa);
        });
        itemLista.appendChild(checkbox);

        const conteudoTarefa = document.createElement('span');
        conteudoTarefa.textContent = tarefa.conteudo + ' - ' + descricaoTarefa.value + " - " + tarefa.repo + ' - ' + dataHoraTarefa.value;
        if (tarefa.completada) {
            conteudoTarefa.classList.add('completada');
        }
        itemLista.appendChild(conteudoTarefa);

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.addEventListener('click', function() {
            removerTarefa(tarefa.id);
        });
        itemLista.appendChild(botaoRemover);

        listaTarefas.appendChild(itemLista);
    });
}

function adicionarTarefa() {
    const entradaTarefa = document.getElementById('taskInput');
    const valorEntradaTarefa = entradaTarefa.value.trim();
    if (valorEntradaTarefa === '') return;

    const tarefa = {
        id: Date.now(),
        conteudo: valorEntradaTarefa,
        completada: false,
        repo: document.getElementById('repoSelect').value
    };

    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    entradaTarefa.value = '';
    document.getElementById('repoSelect').selectedIndex = 0;

    exibirTarefas();
}

function atualizarTarefa(tarefaAtualizada) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const indice = tarefas.findIndex(tarefa => tarefa.id === tarefaAtualizada.id);
    if (indice !== -1) {
        tarefas[indice] = tarefaAtualizada;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        exibirTarefas();
    }
}

function removerTarefa(idTarefa) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas = tarefas.filter(tarefa => tarefa.id !== idTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    exibirTarefas();
}

const entradaUsuario = document.getElementById('nomeUsuario');
entradaUsuario.addEventListener('blur', function () {
    const nomeUsuario = entradaUsuario.value;
    if (nomeUsuario.trim() !== '') {
        carregarRepositorios(nomeUsuario);
    }
});

window.addEventListener('load', function () {
    exibirTarefas();
});
