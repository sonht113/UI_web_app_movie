import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles(() => {
  return createStyles({
    search: {
      margin: '0',
      width: '100%',
    },
  });
});

interface IProps {
  user: any;
  setUser: any;
}

const Header: React.FC<IProps> = ({ user, setUser }) => {
  const { search } = useStyles();

  console.log(user);

  const [showClearIcon, setShowClearIcon] = useState('none');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === '' ? 'none' : 'flex');
  };

  const handleClick = (): void => {
    // TODO: Clear the search input
    console.log('clicked the clear icon...');
  };
  return (
    <div>
      <Box sx={{ padding: '30px', backgroundColor: '#dddddd' }}>
        <Grid
          container
          spacing={5}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Grid item xs={4}>
            <img
              width={300}
              src='https://www.galaxycine.vn/website/images/galaxy-logo.png'
              alt='logo'
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl className={search}>
              <TextField
                size='small'
                variant='outlined'
                onChange={handleChange}
                placeholder={'Search film...'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position='end'
                      style={{ display: showClearIcon }}
                      onClick={handleClick}
                    >
                      <ClearIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4} alignItems='center'>
            <div
              onClick={() => {
                setUser({});
              }}
            >
              <Box
                display={'flex'}
                justifyContent='center'
                alignItems={'center'}
                gap={1}
                sx={{ float: 'right', cursor: 'pointer' }}
              >
                <AccountCircleIcon sx={{ fontSize: 30 }} />
                {user.name ? (
                  <Typography sx={{ fontSize: 15 }}>{user.name}</Typography>
                ) : (
                  <Typography sx={{ fontSize: 15 }}>Đăng nhập</Typography>
                )}
              </Box>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Header;
