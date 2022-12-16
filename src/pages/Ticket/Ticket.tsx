import { Grid, Typography, Box, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import movieAPI from '../../api/movie';
import theaterApi from '../../api/theater';
import { FormLogin, FormRegister, FormGiveTicket } from '../../components';
import Styles from './Ticket.module.css';
import { Desks } from '../../mock/desk';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IProps {
  user: any;
  setUser: any;
}

const Ticket: React.FC<IProps> = ({ user, setUser }) => {
  const [theaters, setTheaters] = useState<any>([]);
  const [movies, setMovies] = useState<any>([]);
  const [deskActive, setDeskActive] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState<any>({});
  const [ticket, setTicket] = useState({
    user: '',
    email: '',
    movieName: '',
    room: '',
    time: '',
    date: '',
    theaterName: '',
    desks: [],
  });
  const [open, setOpen] = React.useState(false);
  const [login, setLogin] = useState(false);
  const [data, setData] = useState([...Desks]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDeskActive([]);
    setOpen(false);
    setData([...Desks]);
  };

  const getAllTheater = async () => {
    try {
      const res = await theaterApi.getAll();
      if (!res) return;
      console.log(res);
      setTheaters(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllMovie = async (id: any) => {
    setLoading(true);
    setMovies([]);
    try {
      const res = await movieAPI.getAllMovieByTheater(id);
      if (!res) return;
      console.log(res);
      setLoading(false);
      setMovies(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getSchedule = async (id: any) => {
    setSchedules([]);
    try {
      const res = await movieAPI.getChedule(id);
      if (!res) return;
      console.log(res);
      setSchedules(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTheater();
  }, []);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {user.name ? (
            <FormGiveTicket
              setData={setData}
              data={data}
              setDeskActive={setDeskActive}
              deskActive={deskActive}
              user={user}
              handleClose={handleClose}
              setTicket={setTicket}
              ticket={ticket}
            />
          ) : login ? (
            <FormLogin
              setLogin={setLogin}
              setTicket={setTicket}
              ticket={ticket}
              setUser={setUser}
              handleClose={handleClose}
            />
          ) : (
            <FormRegister
              setTicket={setTicket}
              setLogin={setLogin}
              ticket={ticket}
              setUser={setUser}
              handleClose={handleClose}
            />
          )}
        </Box>
      </Modal>
      <Box sx={{ width: '70%', margin: '100px auto', height: '800px' }}>
        <Grid container>
          <Grid xs={4}>
            <Box>
              <Box
                sx={{
                  backgroundColor: '#f26b38',
                  padding: '4px 0',
                  width: '80%',
                  margin: '0 auto',
                }}
              >
                <Typography sx={{ textAlign: 'center', color: 'white' }}>
                  CHỌN RẠP
                </Typography>
              </Box>
              {theaters.length > 0 &&
                theaters.map((theater: any) => (
                  <Box
                    sx={{
                      padding: '10px 0',
                      width: '80%',
                      margin: '0 auto',
                      borderBottom: '1px solid gray',
                      borderLeft: '1px solid gray',
                      borderRight: '1px solid gray',
                      cursor: 'pointer',
                    }}
                    className={Styles.theater}
                  >
                    <div
                      onClick={() => {
                        setTicket({
                          ...ticket,
                          theaterName: theater?.theaterName,
                        });
                        getAllMovie(theater?.id);
                      }}
                    >
                      <Typography sx={{ textAlign: 'center' }}>
                        {theater?.theaterName}
                      </Typography>
                    </div>
                  </Box>
                ))}
            </Box>
          </Grid>
          <Grid
            xs={4}
            sx={{
              maxHeight: '700px',
              overflow: 'auto',
            }}
            className={Styles.scroll}
          >
            <Box
              sx={{
                backgroundColor: '#f26b38',
                padding: '4px 0',
                width: '80%',
                margin: '0 auto',
              }}
            >
              <div onClick={() => console.log('aaaa')}>
                <Typography sx={{ textAlign: 'center', color: 'white' }}>
                  CHỌN PHIM
                </Typography>
              </div>
            </Box>
            {movies.length > 0 &&
              movies.map((movie: any) => (
                <Box
                  sx={{
                    padding: '20px 0',
                    width: '80%',
                    margin: '0 auto',
                    borderBottom: '1px solid gray',
                    borderLeft: '1px solid gray',
                    borderRight: '1px solid gray',
                    cursor: 'pointer',
                  }}
                  className={Styles.movies}
                >
                  <div
                    className={Styles.movie}
                    onClick={() => {
                      setTicket({
                        ...ticket,
                        movieName: movie?.name,
                      });
                      getSchedule(movie?.id);
                    }}
                  >
                    <img width={50} src={movie?.image?.path} alt='movie' />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Typography sx={{ textAlign: 'center' }}>
                        Name: {movie?.name}
                      </Typography>
                      <Typography sx={{ textAlign: 'center' }}>
                        Cast description: {movie?.castDescription}
                      </Typography>
                      <Typography sx={{ textAlign: 'center' }}>
                        Genre: {movie?.genreName}
                      </Typography>
                    </div>
                  </div>
                </Box>
              ))}
          </Grid>
          <Grid xs={4}>
            <Box
              sx={{
                backgroundColor: '#f26b38',
                padding: '4px 0',
                width: '80%',
                margin: '0 auto',
              }}
            >
              <Typography sx={{ textAlign: 'center', color: 'white' }}>
                CHỌN SUẤT
              </Typography>
            </Box>
            {schedules &&
              schedules?.scheduleDtos.map((item: any) => (
                <Box
                  sx={{
                    width: '80%',
                    margin: '0 auto',
                    borderBottom: '1px solid gray',
                    borderLeft: '1px solid gray',
                    borderRight: '1px solid gray',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ paddingTop: '20px' }}>
                    <Typography style={{ margin: '10px' }}>
                      Day: {item?.date}
                    </Typography>
                    <Box
                      sx={{
                        width: '90%',
                        margin: '20px auto',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                      }}
                    >
                      <div
                        onClick={() => {
                          setTicket({
                            ...ticket,
                            date: item?.date,
                            time: item?.time,
                            room: item?.roomName,
                          });
                          handleOpen();
                        }}
                        style={{
                          border: '1px solid gray',
                          padding: '7px 9px',
                          borderRadius: '5px',
                        }}
                        className={Styles.time}
                      >
                        {item?.time}
                      </div>
                    </Box>
                  </div>
                </Box>
              ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Ticket;
