import React, { useContext, useEffect } from 'react'
import { View, ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';
import GradientBackGround from '../components/GradientBackGround';
import HorizontalSlider from '../components/HorizontalSlider';

import MovieCard from '../components/MovieCard';
import useMovies from '../hooks/useMovies';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

const { width: windowWidth } = Dimensions.get('window');


const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upComing, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const { setMainColors } = useContext(GradientContext)

    const getPosterColors = async ( index: number)  => {
        const movie = nowPlaying[index]
        const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path}`;
        
        const [ primary= 'green', secondary = 'orange' ] = await getImageColors( uri )
        setMainColors({ primary, secondary})
    }

    useEffect(() => {
        if( nowPlaying.length > 0 ) {
            getPosterColors(0)
        }
    }, [ nowPlaying ])

    if( isLoading ) {
    
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator  color="red" size={100}/>
            </View>
        )
    }

    return (
        <GradientBackGround>
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>
                    {/* <MovieCard 
                        movie={ moviesAtCinema[0] }
                    /> */}

                    <View style={{
                        height: 440
                    }}>
                        <Carousel 
                        data={ nowPlaying }
                        renderItem={ ({ item }: any) => <MovieCard movie={ item } /> }
                        sliderWidth={ windowWidth }
                        itemWidth={ 300 }
                        inactiveSlideOpacity={ 0.9 }
                        onSnapToItem={ index => getPosterColors(index) }
                    />
                    </View>

                    {/* Peliculas Populares */}
                    <HorizontalSlider movies={ popular }  title="Popular"/>
                    <HorizontalSlider movies={ topRated }  title="Top Rated"/>
                    <HorizontalSlider movies={ upComing }  title="Upcoming"/>
                </View>
            </ScrollView>
        </GradientBackGround>
        )
}

export default HomeScreen
