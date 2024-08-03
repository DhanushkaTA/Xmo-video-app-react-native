import { View, Text, ScrollView, TouchableOpacity , Image} from 'react-native'
import React,{ useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '@/components/FormField'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'

const Create = () => {

  const [uploadig, setUploading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnali: null,
    prompt: "",
  });

  const submitVideo = async () => {

  }

  return (
    <SafeAreaView className={`bg-primary h-full`}>
      <ScrollView className={`px-4 my-6`}>
        <Text className={`text-white text-2xl font-psemibold`}>
          Upload Your Video
        </Text>

        <FormField 
          title={`Video Title`}
          value={form.title}
          placeholder={'Add title for your video...'}
          handleChangeText={(e) => setForm({
            ...form, title:e
          }) }
          otherStyles={`mt-10`}
        />

        <View className={`mt-7 space-y-2`}>
          <Text className={`text-base text-gray-100 font-pmedium`}>
            Upload Video
          </Text>

          <TouchableOpacity>
             {
              form.video ? (
                <Video 
                  source={{uri: form.video.uri}}
                  className="w-full h-64 rounded-xl"
                  resizeMethod={
                    ResizeMode.CONTAIN
                  }
                  useNativeControls
                  isLooping
                />
              ) : (
                <View className={`w-full h-40 px-4 bg-black-100
                 rounded-2xl justify-center items-center`}>
                  <View className={`w-14 h-14 border border-dashed border-secondary items-center justify-center`}>
                    <Image 
                      source={icons.upload}
                      className={`w-1/2 h-12`}
                      resizeMode='contain'
                      
                    />
                  </View>
                </View>
              )
             }
          </TouchableOpacity>
        </View>

        <View className={`mt-7 space-y-2`}>
          <Text className={`text-base text-gray-100 font-pmedium`}>
            Thumbnali Image
          </Text>

          <TouchableOpacity>
             {
              form.thumbnali ? (
                <Image 
                  source={{uri: form.thumbnali.uri}}
                />
              ) : (
                <View className={`w-full h-16 px-4 bg-black-100
                 rounded-2xl justify-center items-center border-2 
                 border-black-200 flex-row space-x-2`}>
                  <Image 
                      source={icons.upload}
                      className={`w-7 h-7`}
                      resizeMode='contain'
                      
                    />
                    
                    <Text className={`text-sm text-gray-100 font-pmedium`}>
                      Choose a file
                    </Text>
                </View>
              )
             }
          </TouchableOpacity>
        </View>

        <FormField 
          title={`Video Promt/Description`}
          value={form.title}
          placeholder={'Add your video description'}
          handleChangeText={(e) => setForm({
            ...form, prompt:e
          }) }
          otherStyles={`mt-7`}
        />

         <CustomButton 
            title={`Punlish Video`}
            handlePress={submitVideo}
            conatainerStyles={`mt-7`}
            isLoading={uploadig}
         />

      </ScrollView>
    </SafeAreaView>
  )
}

export default Create