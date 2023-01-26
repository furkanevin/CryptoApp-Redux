import axios from 'axios';

function useApi() {
  axios.defaults.baseURL = 'https://coinranking1.p.rapidapi.com/';
  axios.defaults.headers = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
  };

  return axios;
}

export default useApi;
