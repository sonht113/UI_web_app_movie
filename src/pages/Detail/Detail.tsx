import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useRoutes } from 'react-router-dom';
import movieAPI from '../../api/movie';

const Detail = () => {
  const [movie, setMovie] = useState<any>({});
  const params = useParams();

  const getDetail = async () => {
    try {
      const res = await movieAPI.getDetail(params.id);
      console.log(res);
      if (!res) return;
      setMovie({ ...res });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Box sx={{ width: '50%', margin: '200px auto' }}>
      <Grid container spacing={14}>
        <Grid xs={7}>
          <img
            width={400}
            src='https://cdn.galaxycine.vn/media/2022/12/6/900x1350_1670294885150.jpg'
            alt={'detail'}
          />
        </Grid>
        <Grid xs={5}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '30px',
            }}
          >
            <Typography variant='h5'>Name: {movie?.name} </Typography>
            <Typography variant='body1'>
              Director: {movie?.director}{' '}
            </Typography>
            <Typography variant='body1'>
              Release day: {movie?.releaseDate}{' '}
            </Typography>
            <Typography variant='body1'>Genre: {movie?.genre} </Typography>
            <Typography variant='body1'>
              Language: {movie?.language}{' '}
            </Typography>
            <Typography variant='body1'>Cast: {movie?.cast} </Typography>
            <Typography variant='body1'>
              Description: {movie?.description}{' '}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '50px' }}>
        <Box sx={{ width: '300px', borderBottom: '2px solid gray' }}>
          <Typography>NỘI DUNG PHIM</Typography>
        </Box>
        <Typography variant='body1' sx={{ marginTop: 5 }}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32. The standard chunk of Lorem Ipsum used since the
          1500s is reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </Typography>
      </Box>
    </Box>
  );
};

export default Detail;
