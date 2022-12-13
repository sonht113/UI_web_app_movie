import axiosClient from './axiosClient';

const movieAPI = {
  getAll: async () => {
    const url = '/movie/list';
    return await axiosClient.get(url);
  },
};

export default movieAPI;
