import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { icons } from '@/constants'

import { Video, ResizeMode } from 'expo-av'

import { useGlobalContext } from '@/context/GlobalProvider'

const VideoCard = ({ 
    video : { 
        title, 
        thumbnail, 
        video, 
        creator: {username, avatar}
    }
}) => {

    const { user } = useGlobalContext();
        
    const [play, setPlay] = useState(false);

  return (
    
    <View className={`flex-col items-center px-4 mb-14`}>

        <View className={`flex-row items-start gap-3`}>
            {/* Col 1 : Avatar image & title & username  container */}
            <View className={`flex-1 flex-row justify-center items-center`}>
                {/* Avatar image container */}
                <View className={`w-[46px] h-[46px] border border-secondary rounded-lg
                    justify-center items-center p-0.5`}
                >
                    <Image
                     source={{uri: avatar}}
                     className="w-full h-full rounded-lg"
                     resizeMode='cover' />
                </View>

                {/* Video title container */}
                <View className={`justify-center flex-1 ml-3 gap-y-1`}>
                    <Text className={`text-white text-sm font-psemibold`} numberOfLines={1}>
                        {title}
                    </Text>

                    <Text className={`text-gray-100 text-xs font-pregular`} numberOfLines={1}>
                        {!username ?  user?.username : username }
                    </Text>
                </View>
            </View>
            
            {/* Col 2 : Video option icon container */}
            <View className={`pt-2`}>
                <Image source={icons.menu} className={`w-5 h-5`} resizeMode='contain'/>
            </View>
        </View>

        {/* Video container */}

        {
            play ? (
                    <Video
                        source={{ uri: video }}
                        // source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                        className="w-full h-60 rounded-xl mt-3"
                        resizeMethod={
                            ResizeMode.CONTAIN
                        }
                        useNativeControls
                        shouldPlay
                        onPlaybackStatusUpdate={(status) => {
                            if(status.didJustFinish) {
                                setPlay(false);
                            }
                        }}
                        onError={(err) => {
                            console.log(err)
                        }}
                    />
            ) : (
                <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setPlay(true)}
                    className={`w-full h-60 rounded-xl mt-3 relative justify-center items-center`}
                >
                    <Image 
                        source={{uri: thumbnail}}
                        className={`w-full h-full rounded-xl mt-3`}
                        resizeMethod='cover'
                    />

                    <Image 
                        source={icons.play}
                        className={`w-12 h-12 absolute`}
                        resizeMethod='contain'
                    />

                </TouchableOpacity>
            )
        }
    </View>
  )
}

export default VideoCard