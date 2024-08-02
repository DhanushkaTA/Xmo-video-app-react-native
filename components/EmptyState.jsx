import { View, Text, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { images } from '@/constants'
import CustomButton from './CustomButton'

const EmptyState = ({title , subtitle}) => {
  return (
    <View className={`justify-center items-center px-4`}>
      <Image
       source={images.empty}
       className="w-[270px] h-[215px]"
       resizeMode='contain'
      />

       <Text className={`font-pmedium text-xl text-gray-100`}>
            {title}
        </Text>
        <Text className={`text-sm font-psemibold text-white text-center`}>
            {subtitle}
        </Text>

        <CustomButton
            title={"Upload first video"}
            handlePress={() => router.push('/create')}
            conatainerStyles={"w-full my-5"}
        />
    </View>
  )
}

export default EmptyState