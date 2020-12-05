// React
import { useState } from "react"

// Material ui
import { AppBar, Avatar, Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

// Comoponents
import Profile from "./profile"

const useStyles = makeStyles({
    root: {
        padding: "15px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    button: {
        marginRight: 10
    }
})

const Navbar = ({ user, auth, signIn, setTodos }) => {
    const [open, setOpen] = useState(false)

    const styles = useStyles()

    const handleClose = () => setOpen(false)

    const authenticateUser = () => {
        setOpen(false)

        signIn()
    }

    const signOut = () => {
        setTodos(null)
        auth.signOut()
    }

    return (
        <>
            <AppBar position="sticky" color="primary" className={styles.root}>
                <Typography variant="h5">
                    Todo App
                </Typography>
                <div className="nav-options">
                    {
                        user !== null && user !== "not available" ? (
                            <Button color="secondary" variant="contained" className={styles.button} onClick={signOut}>Sign out</Button>
                        ) : null
                    }
                    <div  onClick={() => setOpen(!open)}>
                        <Avatar src={user !== null && user !== "not available" ? user.photoURL : "null"} alt={user !== null && user !== "not available" ? user.displayName : null} />
                    </div>
                </div>
            </AppBar>

            <Profile
                user={user} 
                open={open} 
                handleClose={handleClose}
                setOpen={setOpen}
                signIn={authenticateUser}
                signOut={signOut}
            />
        </>
    )
}

export default Navbar
