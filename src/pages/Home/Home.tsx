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
import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import 'react-slideshow-image/dist/styles.css';
import { Link } from 'react-router-dom';
import movieAPI from '../../api/movie';

const slideImages = [
  {
    url: 'https://cdn.galaxycine.vn/media/2022/11/29/combo-avatar2-digital-2048x682_1669695949280.jpg',
    caption: 'Slide 1',
  },
  {
    url: 'https://cdn.galaxycine.vn/media/2022/12/2/glx-t12-2048x682_1669990188502.jpg',
    caption: 'Slide 2',
  },
  {
    url: 'https://cdn.galaxycine.vn/media/2022/12/10/avatar2-gift-digital-2048x682_1670636623821.jpg',
    caption: 'Slide 3',
  },
];

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

interface IProps {
  setActiveMenuNav: React.Dispatch<React.SetStateAction<string | null>>;
}

const Home: React.FC<IProps> = ({ setActiveMenuNav }) => {
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
      <div className='slide-container'>
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div
              className='each-slide'
              key={index}
              style={{ maxHeight: '700px' }}
            >
              <img
                src={slideImage.url}
                alt={slideImage.caption}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </Slide>
      </div>
      <Box sx={{ width: '80%', margin: '50px auto' }}>
        <Box
          display={'flex'}
          justifyContent={'flex-start'}
          gap={5}
          sx={{ borderBottom: '2px solid gray' }}
        >
          {menu.map((item, index) => (
            <Box
              onClick={() => {
                getMovie();
                setActiveMenu(item.key);
              }}
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
              ?.filter((item: any) => {
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
                      <Link to={`/movie/detail/${movie.id}`}>
                        <Button variant='outlined' size='medium'>
                          Xem thêm
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box sx={{ marginTop: 3, float: 'right' }}>
          <Link
            to={
              activeMenu === 'now'
                ? '/movie/now-showing'
                : '/movie/soon-showing'
            }
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant='contained'
              onClick={() => {
                localStorage.setItem('activeMenu', 'movies');
                setActiveMenuNav('movies');
                window.scroll(0, 0);
              }}
            >
              Xem thêm <ArrowRightAltIcon />{' '}
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
