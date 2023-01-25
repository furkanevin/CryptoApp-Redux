import axios from 'axios';

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import useApi from '../../../Reduxs/newtool/src/hooks/useApi';

// const cryptoApiHeaders = {
//   'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
//   'X-RapidAPI-Key': '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
// };

// const baseUrl = 'https://coinranking1.p.rapidapi.com';

// const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// export const cryptoApi = createApi({
//   reducerPath: 'cryptoApi',
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getCryptos: builder.query({
//       query: () => createRequest('/coins'),
//     }),
//   }),
// });

// export const { useGetCryptosQuery } = cryptoApi;

function useApi() {
  axios.defaults.baseURL = 'https://coinranking1.p.rapidapi.com/';
  axios.defaults.headers = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
  };

  return axios;
}

export default useApi;
