import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import 'react-slideshow-image/dist/styles.css';
import movieAPI from '../../api/movie';

const menu = [
  {
    title: 'PHIM ĐANG CHIẾU',
    key: 'now',
  },
  {
    title: 'PHIM SẮP CHIẾU',
    key: 'soon',
  },
];

const MovieNowShowing = () => {
  const [activeMenu, setActiveMenu] = useState('now');
  const [movies, setMovies] = useState<any>([]);

  const getMovie = async () => {
    try {
      const res = await movieAPI.getAll();
      if (!res) return;
      setMovies(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <Box sx={{ marginBottom: 20 }}>
      {' '}
      <Box sx={{ width: '80%', margin: '50px auto' }}>
        <Box
          display={'flex'}
          justifyContent={'flex-start'}
          gap={5}
          sx={{ borderBottom: '2px solid gray' }}
        >
          {menu.map((item, index) => (
            <Box
              onClick={() => setActiveMenu(item.key)}
              key={item.key}
              sx={{
                cursor: 'pointer',
                borderBottom: activeMenu === item.key ? '2px solid red' : '',
              }}
            >
              <Typography>{item.title}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ marginTop: 5 }}>
          <Grid container spacing={6}>
            {movies
              .filter((item: any) => {
                if (activeMenu === 'now') {
                  return item.status === 'NOW_SHOWING';
                } else {
                  return item.status === 'SOON_SHOW';
                }
              })
              .map((movie: any, index: number) => (
                <Grid key={index} item xs={3}>
                  <Card>
                    <CardMedia
                      component='img'
                      alt='green iguana'
                      height='450'
                      image={
                        'https://cdn.galaxycine.vn/media/2022/12/6/900x1350_1670294885150.jpg'
                      }
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant='h6'
                        component='div'
                        sx={{
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }}
                      >
                        {movie.name}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <Button variant='outlined' size='medium'>
                        Xem thêm
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieNowShowing;
