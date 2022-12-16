import axiosClient from './axiosClient';

const movieAPI = {
  getAll: async () => {
    const url = `/movie/list`;
    return await axiosClient.get(url);
  },
  getAllMovieByTheater: async (id: string | undefined) => {
    const url = `/movie/movie-by-theater/${id}`;
    return await axiosClient.get(url);
  },
  getDetail: async (id: string | undefined) => {
    const url = `/movie/get/${id}`;
    return await axiosClient.get(url);
  },
  getChedule: async (id: string | undefined) => {
    const url = `/schedule/list/${id}`;
    return await axiosClient.get(url);
  },
};

export default movieAPI;
