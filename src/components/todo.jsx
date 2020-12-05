import { Button, makeStyles, Typography } from "@material-ui/core"

// Material icons
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const Todo = ({ title, completed, id, changeCompleted, deleteTodo }) => {
    const useStyles = makeStyles({
        text: {
            textAlign: "center",
            textDecoration: completed ? "line-through" : "none"
        },
        icon: {
            margin: "0 10px"
        }
    })

    const styles = useStyles()

    return (
        <div className="todo">
            <div>
                <Typography className={styles.text}>{title}</Typography>
            </div>

            <div className="icons">
                <div onClick={() => changeCompleted(id, completed)}>
                    <DoneOutlinedIcon className={styles.icon} />
                </div>
                <div onClick={() => deleteTodo(id)}>
                    <DeleteOutlineOutlinedIcon className={styles.icon} />
                </div>
            </div>
        </div>
    )
}

export default Todo
