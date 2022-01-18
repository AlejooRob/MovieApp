
import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Movie } from '../interfaces/movieInterface'
import { useNavigation } from '@react-navigation/native';

interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

const MovieCard = ({ movie, height = 420, width = 300 }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path}`;

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={ () =>  navigation.navigate('DetailScreen' as never, movie as never) }
            activeOpacity={0.8}
            style={{
                width,
                height,
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 5
            }}
        >
            <View style= { styles.imageContainer }>
                <Image 
                source={{ uri }}
                style={ styles.image }            
                />
            </View>
            
        </TouchableOpacity>
    )
}

export default MovieCard

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 15,
    },
    imageContainer: {
        flex:1,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
    }
});
