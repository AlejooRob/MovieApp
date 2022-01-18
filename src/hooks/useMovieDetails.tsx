import { useEffect, useState } from 'react'
import movieDb from '../api/MovieDb';
import { Cast, CreditsResponse } from '../interfaces/creditsInterfaces';
import { MovieFull } from '../interfaces/movieInterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}

const useMovieDetails = ( movieID: number) => {
    
    const [state, setstate] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async() => {
        const movieDetailsPromise = movieDb.get<MovieFull>(`/${movieID}`);
        const castPromise = movieDb.get<CreditsResponse>(`/${movieID}/credits`);
        
        const [ movieDetailResponse, castResponse] = await Promise.all([ movieDetailsPromise, castPromise])
        setstate({
            isLoading: false,
            movieFull: movieDetailResponse.data,
            cast: castResponse.data.cast
        })
    }

    useEffect(() => {
        getMovieDetails();
    }, [])

    return {
        ...state
    }
}

export default useMovieDetails
