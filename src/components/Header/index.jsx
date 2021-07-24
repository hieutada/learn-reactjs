import { Badge, Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButon from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import ExploreIcon from '@material-ui/icons/Explore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Login from '../../features/Auth/components/Login';
import Register from '../../features/Auth/components/Register';
import { logout } from '../../features/Auth/userSlice';
import { cartItemsCountSelector } from '../../features/Cart/selectors';

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
    color: '#fff',
    textDecoration: 'none',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

const MODE = {
  REGISTER: 'register',
  LOGIN: 'login',
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const loggedInUser = useSelector((state) => state.user.current);
  const cartItemCount = useSelector(cartItemsCountSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = !!loggedInUser.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    handleCloseMenu();
  };

  const handleCartClick = () => {
    history.push('/cart');
  };

  const classes = useStyles();

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

            <NavLink className={classes.link} to="/products">
              <Button color="inherit">Products</Button>
            </NavLink>

            {/* Dang nhap thanh cong*/}
            {isLoggedIn && (
              <>
                <IconButon color="inherit">
                  <Badge
                    badgeContent={cartItemCount}
                    color="secondary"
                    onClick={handleCartClick}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButon>

                <IconButon color="inherit" onClick={handleUserClick}>
                  <AccountCircleIcon />
                </IconButon>
              </>
            )}

            {/* Chua dang nhap */}
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>
                LOGIN
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButon className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButon>

        <DialogContent>
          <DialogContentText>
            {mode === MODE.REGISTER && (
              <>
                <Register closeDialog={handleClose} />

                <Box textAlign="center">
                  <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                    Already have an account. Loin here!
                  </Button>
                </Box>
              </>
            )}

            {mode === MODE.LOGIN && (
              <>
                <Login closeDialog={handleClose} />

                <Box textAlign="center">
                  <Button
                    color="primary"
                    onClick={() => setMode(MODE.REGISTER)}
                  >
                    Don't have an account. Register here!
                  </Button>
                </Box>
              </>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
