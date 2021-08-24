import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

let i: number = 0;
export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  let [newTaskTitle, setNewTaskTitle] = useState('');
  function handleCreateNewTask() {
    console.log(newTaskTitle)
    if (!newTaskTitle) {
      console.log('empty')
      return
    }

    const newTask = {
      id: i++,
      title: newTaskTitle,
      isComplete: false,
    }

    // o set demora pra renderizar então usa esse callback usando oldState. ele pega os valores atuais e colocam o newtask no fim igual um push
    // se n adiciona e perde o ultimo
    setTasks(oldState => [...oldState, newTask])
    setNewTaskTitle('')

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    console.log(id);

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    console.log(id);
    // essa const filtra dentro de todas as task  o id diferente do id
    const deletedTasks = tasks.filter(tasks => tasks.id != id)
    // quando vocÊ passa asism ele deleta
    setTasks(deletedTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}