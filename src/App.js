import { useEffect, useState } from "react"
import './App.css';

// Firebase
import { db, authentication, GoogleProvider } from "./firebase"

// Components
import Navbar from './components/navbar';
import Form from './components/form';
import TodoList from './components/todoList';

// Material ui
import { Button, CircularProgress, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  center: {
    marginTop: 150
  }
})

function App() {
  const [currentUser, setCurrentUser] = useState("not available")
  const [todos, setTodos] = useState(null)

  const styles = useStyles()

  const addTodo = title => {
    try {
      const todo = {
        user: currentUser.email,
        title,
        completed: false
      }

      db.collection("todos").add(todo)
    } catch ({ message }) {
      alert(message)
    }
  }

  const changeCompleted = (id, completed) => {
    try {
      db.collection("todos").doc(id).update({
        completed: !completed
      })
    } catch ({ message }) {
      alert(message)
    }
  }

  const deleteTodo = id => {
    try {
      db.collection("todos").doc(id).delete()
    } catch ({ message }) {
      alert(message)
    }
  }

  const authenticateUser = () => {
    try {
      const provider = new GoogleProvider()

      authentication.signInWithPopup(provider).then(res => {
        const { user } = res

        if (user === null) {
          setCurrentUser(null)
        } else {
          console.log(user)
        }
      })
    } catch ({ message }) {
      alert(message)
    }
  }

  const fetchQuery = async user => {
    try {
      db.collection("todos").where("user", "==", user.email).onSnapshot(snapshot => {
        setTodos(snapshot.docs.reverse())
      })
    } catch ({ message }) {
      alert(message)
    }
  }

  const authUser = callback => {
    try {
      authentication.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user)
          callback(user)
        } else {
          setCurrentUser(null)
        }
      })
    } catch ({ message }) {
      alert(message)
    }
  }

  useEffect(() => {
    authUser(fetchQuery)
  }, [])

  return (
    <div className="app">
      <Navbar
        user={currentUser}
        auth={authentication}
        signIn={authenticateUser}
        setTodos={setTodos}
      />
      {
        currentUser === "not available" ? (
          <center>
            <CircularProgress className={styles.center} />
          </center>
        ) : currentUser === null ? (
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={authenticateUser}
            className={styles.center}
          >
            Sign in via Goolge
          </Button>
        ) : (
          <div>
            <Form addTodo={addTodo} />
            <TodoList todos={todos} changeCompleted={changeCompleted} deleteTodo={deleteTodo} />
          </div>
        )
      }
    </div>
  );
}

export default App;
