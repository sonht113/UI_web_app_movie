import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Desks } from '../../mock/desk';
import Styles from './index.module.css';

interface IProps {
  user: any;
  setDeskActive: any;
  deskActive: any;
  setData: any;
  data: any;
  handleClose: any;
  setTicket: any;
  ticket: any;
}
const FormGiveTicket: React.FC<IProps> = ({
  user,
  setDeskActive,
  deskActive,
  setData,
  data,
  handleClose,
  setTicket,
  ticket,
}) => {
  return (
    <div>
      <Typography variant='h5' sx={{ textAlign: 'center' }}>
        ĐẶT VÉ
      </Typography>
      <Box>
        <Box display={'flex'} gap={5}>
          <Typography>Tên người đặt:</Typography>
          <Typography>{user.name}</Typography>
        </Box>
        <Box display={'flex'} gap={5}>
          <Typography>Email:</Typography>
          <Typography>{user.email}</Typography>
        </Box>
        <Box display={'flex'} gap={5}>
          <Typography>Tên phim:</Typography>
          <Typography>{ticket.movieName}</Typography>
        </Box>
        <Box display={'flex'} gap={5}>
          <Typography>Phòng:</Typography>
          <Typography>{ticket.room}</Typography>
        </Box>
        <Box display={'flex'} gap={5}>
          <Typography>Ngày:</Typography>
          <Typography>{ticket.date}</Typography>
        </Box>
        <Box display={'flex'} gap={5}>
          <Typography>Thời gian:</Typography>
          <Typography>{ticket.time}</Typography>
        </Box>
        <Box>
          <Typography>Chọn ghế:</Typography>
          <Box sx={{ width: '80%', margin: '40px auto' }}>
            {data.map((item: any) => (
              <Box
                key={item.row}
                display={'flex'}
                gap={3}
                sx={{ marginBottom: '10px', width: '80%', margin: '20px auto' }}
              >
                {item.desks.map((desk: any) => (
                  <div
                    key={desk.name}
                    onClick={() => {
                      const result = [...deskActive];
                      const list: any = [...data];
                      const index = result.findIndex(
                        (item) => item === desk.name
                      );
                      if (index === -1) {
                        result.push(desk.name);
                      } else {
                        result.splice(index, 1);
                      }
                      for (let item of list) {
                        for (let i of item.desks) {
                          if (i.name === desk.name) {
                            i.status = !i.status;
                          }
                        }
                      }
                      setTicket({ ...ticket, desks: [...result] });
                      setData([...list]);
                      setDeskActive([...result]);
                    }}
                  >
                    <Typography
                      sx={{
                        padding: '5px 8px',
                        cursor: 'pointer',
                        border: '1px solid gray',
                      }}
                      className={desk.status ? Styles.active : Styles.inactive}
                    >
                      {desk.name}
                    </Typography>
                  </div>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
        <Box>
          <Box
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            gap={3}
          >
            <Box
              sx={{ width: '10px', height: '10px', border: '1px solid gray' }}
            ></Box>
            <Typography>Ghế trống</Typography>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            gap={3}
          >
            <Box
              sx={{
                width: '10px',
                height: '10px',
                border: '1px solid gray',
                backgroundColor: 'red',
              }}
            ></Box>
            <Typography>Ghế đã đặt</Typography>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            gap={3}
          >
            <Box
              sx={{
                width: '10px',
                height: '10px',
                border: '1px solid gray',
                backgroundColor: '#f26b38',
              }}
            ></Box>
            <Typography>Ghế chọn</Typography>
          </Box>
        </Box>
        <Box sx={{ float: 'right' }}>
          <Button
            variant='contained'
            sx={{ marginRight: '20px' }}
            onClick={() => handleClose()}
          >
            Hủy
          </Button>
          <Button variant='contained'>Đặt vé</Button>
        </Box>
      </Box>
    </div>
  );
};

export default FormGiveTicket;
