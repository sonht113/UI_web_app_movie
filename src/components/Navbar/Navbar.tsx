import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

interface IProps {
  setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>;
  activeMenu: string | null;
}

const Navbar: React.FC<IProps> = ({ setActiveMenu, activeMenu }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static' color='transparent'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex', gap: 50 },
            }}
          >
            <Link to={'/'} style={{ textDecoration: 'none', color: 'black  ' }}>
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  localStorage.setItem('activeMenu', 'home');
                  setActiveMenu('home');
                }}
                sx={{
                  my: 2,
                  color: 'black',
                  display: 'block',
                  fontWeight: 700,
                }}
                variant={activeMenu === 'home' ? 'contained' : undefined}
              >
                Home
              </Button>
            </Link>
            <Link
              to={'/movie/ticket'}
              style={{ textDecoration: 'none', color: 'black  ' }}
            >
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  localStorage.setItem('activeMenu', 'ticket');
                  setActiveMenu('ticket');
                }}
                sx={{
                  my: 2,
                  color: 'black',
                  display: 'block',
                  fontWeight: 700,
                }}
                variant={activeMenu === 'ticket' ? 'contained' : undefined}
              >
                Buy ticket
              </Button>
            </Link>
            <Button
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => {
                handleClick(e);
                handleCloseNavMenu();
                localStorage.setItem('activeMenu', 'movies');
                setActiveMenu('movies');
              }}
              sx={{
                my: 2,
                color: 'black',
                display: 'block',
                fontWeight: 700,
              }}
              variant={activeMenu === 'movies' ? 'contained' : undefined}
            >
              Movies
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Link
                to={'/movie/now-showing'}
                style={{ textDecoration: 'none', color: 'black  ' }}
              >
                <MenuItem onClick={handleClose}>PHIM ĐANG CHIẾU</MenuItem>
              </Link>
              <Link
                to={'/movie/soon-showing'}
                style={{ textDecoration: 'none', color: 'black  ' }}
              >
                <MenuItem onClick={handleClose}>PHIM SẮP CHIẾU</MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
