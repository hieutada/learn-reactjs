import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExploreIcon from "@material-ui/icons/Explore";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Register from "../../features/Auth/components/Register";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
}));

export default function Header() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <ExploreIcon className={classes.menuButton} />

            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to="/">
                MY WORLD
              </Link>
            </Typography>

            <NavLink className={classes.link} to="/todos">
              <Button color="inherit">Todos</Button>
            </NavLink>

            <NavLink className={classes.link} to="/albums">
              <Button color="inherit">Albums</Button>
            </NavLink>

            <Button color="inherit" onClick={handleClickOpen}>
              Register
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            <Register closeDialog={handleClose} />
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
