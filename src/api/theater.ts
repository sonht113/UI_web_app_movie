import axiosClient from './axiosClient';

const theaterApi = {
  getAll: async () => {
    const url = '/theater/list';
    return await axiosClient.get(url);
  },
};

export default theaterApi;
