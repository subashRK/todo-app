// Material ui
import { makeStyles, Modal, Typography, CircularProgress, Avatar, Button } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    center: {
        marginTop: 150
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none"
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4),
        wordWrap: "break-word",
        wordBreak: "break-all"        
    }
}))

const Profile = ({ user, open, handleClose, setOpen, signIn, signOut }) => {
    const styles = useStyles()

    return (
        <Modal
            className={styles.modal}
            open={open}
            onClose={handleClose}
        >
            {
                user === "not available" ? (
                    <center className={styles.content}>
                        <CircularProgress />
                    </center>
                ) : user === null ? (
                    <div className={styles.content}>
                        <Button variant="contained" color="secondary" onClick={signIn}>Sign in via google</Button>
                    </div>
                ) : (
                    <div className={styles.content}>
                        <Avatar src={user.photoURL} alt={user.displayName} />
                        <br/>
                        <Typography>{user.displayName}</Typography>
                        <Typography>{user.email}</Typography>
                        <br/>
                        <Button color="secondary" variant="contained" onClick={() => {
                            setOpen(false)
                            signOut()
                        }}>Sign out</Button>
                    </div>
                )
            }
        </Modal>
    )
}

export default Profile
