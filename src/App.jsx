import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todostring=localStorage.getItem("todos")
    if(todostring){
    let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])
  

  const savetoLS=(params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinished=(e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    savetoLS()
  }
  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    savetoLS()
  }
  const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLS()
  }
  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4() , todo, isCompleted:false}])
    setTodo("")
    savetoLS()
  }
  const handleChange=(e)=>{
    
    setTodo(e.target.value)
  }

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto bg-violet-100 my-5 rounded-xl p-5 min-h-[80vh] md:w-1/3">
      <h1 className='font-bold text-center text-xl'>Did_it-Manage your tasks at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='bg-amber-50 text w-full rounded-lg px-3 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md '>Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
          <h2 className='text-lg font-bold'>your todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todos to display</div> }
          {todos.map(item=>{

          
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 justify-between my-3">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className= {item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><RiDeleteBin6Line /></button>
            </div>

          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
