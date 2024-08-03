import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState} from 'react'
import * as Animatable from 'react-native-animatable'

import { icons } from '@/constants';

import { ResizeMode, Video } from "expo-av";

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrandingItem = ({ activeItem, item }) => {

    console.log(activeItem, item.$id)

    const [play, setPlay] = useState(false);

    return (
        <Animatable.View
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={700}
            // iterationCount={Infinity}
            className={`mr-5 text-white`}
        >
            {
                play ? (
                    <Video
                        source={{ uri: item.video }}
                        className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        shouldPlay
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                            setPlay(false);
                            }
                        }}
                        onError={(err) => {
                            console.log(err)
                        }}
                    />
                ) : (
                    <TouchableOpacity key={item.$id} className={`relative justify-center items-center`}
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                    >

                        <ImageBackground
                            source={{ uri: item.thumbnail }}
                            className={`w-52 h-72 rounded-[35px] my-2 overflow-hidden shadow-lg shadow-black/40`}
                            resizeMode='cover'
                        >
                            
                        </ImageBackground>

                        <Image 
                            source={icons.play} 
                            className={`w-12 h-12 absolute`}
                        />

                    </TouchableOpacity>
                )
            }
            
        </Animatable.View>
    )
}

const Trending = ({posts}) => {

    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewableItemsChanged = ({ viewableItems }) => {
        if(viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }

    }

  return (
    <FlatList
        data={posts}
        key={(item) => item.$id}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <TrandingItem  activeItem={activeItem} item={item}/>
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
            itemVisiblePercentThreshold: 70
        }}
        contentOffset={{ x:170 }}
        horizontal
    />
  )
}

export default Trending