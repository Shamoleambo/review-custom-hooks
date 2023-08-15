import React, { useEffect, useState } from 'react'
import useHttp from './hooks/useHttp'
import Tasks from './components/Tasks/Tasks'
import NewTask from './components/NewTask/NewTask'

function App() {
  const [tasks, setTasks] = useState([])

  const transformTaks = (tasksObj) => {
    const loadedTasks = []
    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text })
    }

    setTasks(loadedTasks)
  }

  const {
    sendRequest: fetchTasks,
    isLoading,
    error
  } = useHttp(
    {
      url: 'https://temp-9a330-default-rtdb.firebaseio.com/tasks.json'
    },
    transformTaks
  )

  useEffect(() => {
    fetchTasks()
  }, [])

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task))
  }

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  )
}

export default App
