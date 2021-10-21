import './App.css';
import { useState } from 'react'

function App() {
  const [tarefas, setTarefas] = useState([])
  const [filtro, setFiltro] = useState('todas')
 
  function handleAddTodo(e){
    if (e.key !== 'Enter' || !e.target.value) return;

    const novatarefa = { nome: e.target.value, completadas: false }
    setTarefas([...tarefas, novatarefa ])
    e.target.value = '';
  }

  function handleCompleteTodo(tarefa){
    const novasTarefas = [...tarefas];
    const tarefaCompletada = novasTarefas.find(t => t.nome === tarefa.nome)
    tarefaCompletada.completadas = !tarefaCompletada.completadas

    setTarefas(novasTarefas)
  }

  
  function handleDeleteTodo(tarefa){
      const novasTarefas = tarefas.filter(t => t.nome !== tarefa.nome)

      setTarefas(novasTarefas)
  
  }

  function handleFilterChange(novoFiltro){
    setFiltro(novoFiltro)
    
  }
 
  function filtrarTarefas(tarefa){
    if(filtro === 'todas') return tarefa;

    if(filtro === 'completadas' && tarefa.completadas) return tarefa;

    if(filtro === 'ativas' && !tarefa.completadas) return tarefa;

  }

  function handleClearCompletadas(){
      const tarefasIncompletas = tarefas.filter(tarefa => !tarefa.completadas);

      setTarefas(tarefasIncompletas)
  }

  
  function handleCompleteAll(){
      const tarefasCompletadas = tarefas.map( tarefa =>{
        return { nome: tarefa.nome, completadas: true}

      })
      setTarefas(tarefasCompletadas)
  }

  return (
     <div>
       <h1>Tarefas</h1>

       <button onClick={handleCompleteAll}>()</button>
       <input type="text" onKeyPress={handleAddTodo} />  
       <div>
         <ul>
           {tarefas.filter(filtrarTarefas).map(tarefa => <li><input type="checkbox" checked={tarefa.completadas} onChange={() => handleCompleteTodo(tarefa)} />{tarefa.nome} <button onClick={() => handleDeleteTodo(tarefa)}>X</button> </li>)}  
         </ul>
       </div>
       <p>{tarefas.filter(tarefa => !tarefa.completadas).length} tarefas restantes</p>
       <div>
         <button onClick={() => handleFilterChange('todas')}>Todas</button>
         <button onClick={() => handleFilterChange('ativas')}>Ativas</button>
         <button onClick={() => handleFilterChange('completadas')}>Completadas</button>
       </div>
         <button onClick={handleClearCompletadas}>Limpar Completadas</button>
     </div>
  );
}

export default App;
