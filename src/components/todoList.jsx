import Todo from "./todo"

// Material ui
import { Card, CircularProgress, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    card: {
        margin: "15px",
        padding: "15px",
    },
    header: {
        textAlign: "center",
        margin: "5px",
    },
})

const TodoList = ({ todos, changeCompleted, deleteTodo }) => {
    const styles = useStyles()

    const loadTodos = () => {
        if (todos === null) {
            return (
                <center style={{ margin: 15 }}>
                    <CircularProgress />
                </center>
            )
        } else if (todos === []) {
            return (
                <Typography>No todos!</Typography>
            )
        } else if (todos.legnth !== 0) {
            return todos.map(todo => {
                const id = todo.id
    
                const data = todo.data()
    
                const title = data.title
                const completed = data.completed
    
                return <Todo key={id} id={id} title={title} completed={completed} changeCompleted={changeCompleted} deleteTodo={deleteTodo} />
            })
        }
    }

    return (
        <Card className={styles.card} raised={true}>
            <Typography className={styles.header} variant="h6">
                Todos
            </Typography>

            {loadTodos()}
        </Card>
    )
}

export default TodoList
