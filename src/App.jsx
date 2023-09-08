import './App.css'
import Tareas from './components/Tareas'
import useFetch from './hooks/useFetch'
function App() {

  const [works] = useFetch()
  

  return (
    <div className='app__main'>
   
      <Tareas/>
     
    </div> 
  )
}

export default App
