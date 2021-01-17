import axios from 'axios';
import { useQuery } from 'react-query';

const getAllFiles = async () => {
  const { data } = await axios.get(`https://wamy-style-api.herokuapp.com/`);
  return data;
};

export const useFiles = () => {
  return useQuery('files', getAllFiles);
};
