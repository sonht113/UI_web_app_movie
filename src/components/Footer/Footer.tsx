import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

const Footer = () => {
  return (
    <Box color={'black'} sx={{ backgroundColor: 'gray', padding: '10' }}>
      <Grid container spacing={4}>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Typography variant='h6'>GIỚI THIỆU</Typography>
          <Box>
            <Typography variant='subtitle1'>VỀ CHÚNG TÔI</Typography>
            <Typography variant='subtitle1'>THỎA THUẬN SỬ DỤNG</Typography>
            <Typography variant='subtitle1'>QUY CHẾ HOẠT ĐỘNG</Typography>
            <Typography variant='subtitle1'>CHÍNH SÁCH BẢO MẬT</Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Typography variant='h6'>GIỚI THIỆU</Typography>
          <Box>
            <Typography variant='subtitle1'>VỀ CHÚNG TÔI</Typography>
            <Typography variant='subtitle1'>THỎA THUẬN SỬ DỤNG</Typography>
            <Typography variant='subtitle1'>QUY CHẾ HOẠT ĐỘNG</Typography>
            <Typography variant='subtitle1'>CHÍNH SÁCH BẢO MẬT</Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Typography variant='h6'>GIỚI THIỆU</Typography>
          <Box>
            <Typography variant='subtitle1'>VỀ CHÚNG TÔI</Typography>
            <Typography variant='subtitle1'>THỎA THUẬN SỬ DỤNG</Typography>
            <Typography variant='subtitle1'>QUY CHẾ HOẠT ĐỘNG</Typography>
            <Typography variant='subtitle1'>CHÍNH SÁCH BẢO MẬT</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
