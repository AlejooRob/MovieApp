import React, { useRef } from 'react'
import { View, Text, Animated, Button } from 'react-native'
import useFade from '../hooks/useFade'

const FadeScreen = () => {

    const { fadeIn, fadeOut, opacity } = useFade();

    return (
        <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
            <Animated.View
                style={{
                    backgroundColor: '#084F6A',
                    width: 150,
                    height: 150,
                    borderColor: 'white',
                    borderWidth: 10,
                    opacity
                }}
            />
            <Button 
                title='fade In'
                onPress={ () => fadeIn() }
            />
            <Button 
                title='fade Out'
                onPress={ fadeOut }
            />


        </View>
    )
}

export default FadeScreen
