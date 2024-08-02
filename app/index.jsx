import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '@/components/CustomButton';

import { useGlobalContext } from '@/context/GlobalProvider';

export default function App() {

  const {isLoading, isLogged} = useGlobalContext();

  if(!isLoading && isLogged) return <Redirect href={"/home"}/>;


  return (
    
    <SafeAreaView className='bg-primary h-full' >

    <ScrollView contentContainerStyle={{ height: '100%'}}>

      <View className="w-full justify-center items-center min-h-[85vh] px-4">
        <Image
          source={images.logo}
          className="w-[130px] h-[84px]"
          resizeMode='contain'
        />

        <Image 
          source={images.cards}
          className="max-w-[380px] w-full h-[300px]"
          resizeMode='contain'
        />

        <View>
          <Text className="text-white text-3xl font-bold text-center">
            Discover Endless Possibilities with{' '}
            <Text className="text-secondary-200">
              Xmo
            </Text>

          </Text>

          <Image
              source={images.path}
              className="w-[136px] h-[12px] absolute -bottom-2 -right-8"
              resizeMode='contain'
          />

        </View>

        <Text className="text-gray-100 font-pregular text-sm mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Xmo
        </Text>

        <CustomButton
          title="Countinue with Email"
          handlePress={() => router.push('/sing-in')}
          conatainerStyles="w-full mt-7"
        />

      </View>

    </ScrollView>

    {/* meke ape app eka udin status bar eka ekiyanne time ,battery wage dewal bala gann pulwaun. 
    'deark' karama hidden wenawa */}
    <StatusBar backgroundColor='#161622' style="light" />

    </SafeAreaView>

  );
}

