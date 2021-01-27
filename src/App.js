import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask'
import { db } from './firebase_config'



const App= ()=> {  

  const [showAddTask, setshowAddTask] = useState(false)
  
// Firebase Data Import 
  const [todoInput, setTodoInput] = useState("")

  useEffect(() => {
      getTodos(); 
    }
  , []);

  function getTodos() {
    db.collection("todos").onSnapshot(function(querySnapshot){
      setTodoInput(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          day: doc.data().day,
          reminder: doc.data().reminder,
        }))
      );
    });
  }

// Add Task

const addTask = (task) => {
  // const id = Math.floor(Math.random()*10000)+1
  const newTask = {...task}
  setTodoInput([...todoInput,newTask ])
}

// Delete Task

const deleteTask = (id) => {
  setTodoInput(todoInput.filter((task) => task.id !== id))
  db.collection("todos").doc(id).delete();
  // console.log('delete', id); 
}

// Togle Reminder
const toggleReminder = (id) => {
  setTodoInput(
    todoInput.map((task) => 
      task.id === id ? {...task, reminder:!task.reminder } : task,
    )
  )

  var docRef = db.collection("todos").doc(id);
  docRef.get().then(function(doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            db.collection("todos").doc(id).update(
              {
                reminder:!doc.data().reminder,
              }
            );
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  } 

  return (
    <div className="container">   
      {/* <Header onAdd = {() => setshowAddTask(!showAddTask)} showAdd={showAddTask} /> */}
      <Header onAdd = {setshowAddTask} showAdd={showAddTask} />

      {showAddTask && <AddTask onAdd = {addTask} />}
      {todoInput.length > 0 ? (
        <Tasks tasks={todoInput} onDelete={deleteTask} onToggle={toggleReminder} />) :  ('No Task To Show')}
    </div>
  )
}

export default App;

