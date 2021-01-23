import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

const getAllFiles = async () => {
  const { data } = await axios({
    url: `https://wamy-style-api.herokuapp.com/graphql`,
    method: 'post',
    data: {
      query: `
     {
      allUsers { id name }
     }
     `,
    },
  });
  return data;
};

const uploadProductFiles = async (files: File) => {
  console.log(files, 'FI');

  const data = await axios({
    url: `http://localhost:4000/graphql`,
    method: 'post',
    data: {
      query: `
      mutation {
        uploadFile(file: ${files}) {url}
      }
     `,
    },
  });

  return data;
};

export const useFiles = () => {
  return useQuery('files', getAllFiles);
};

export const useUploadFile = () => {
  return useMutation(uploadProductFiles);
};
