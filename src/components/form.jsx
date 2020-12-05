import { useState } from "react"

// Material ui
import { Button, makeStyles, TextField } from "@material-ui/core"

const useStyles = makeStyles({
    input: {
        margin: "10px"
    }
})

const Form = ({ addTodo }) => {
    const [search, setSearch] = useState("")

    const isDisabled = () => {
        if (search.trim() === "") {
            return true
        } else {
            return false
        }
    }

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()

        addTodo(search)

        setSearch("")
    }

    const styles = useStyles()

    return (
        <form onSubmit={handleSubmit} className="form">
            <TextField
                className={styles.input}
                variant="outlined"
                autoFocus={false}
                label="Add todo"
                value={search}
                onChange={handleChange}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isDisabled()}
                disableElevation
            >
                Submit
            </Button>
        </form>
    )
}

export default Form
