import axios from 'axios';

const movieDb = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '04b8960a80386d8a5595dbf03510a402',
        language: 'es-ES'
    }
});

export default movieDb;