import { View, FlatList, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import EmptyState from '@/components/EmptyState';
import { getUserPosts, logout } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';

import { useGlobalContext } from '@/context/GlobalProvider';
import { icons } from '@/constants';
import InfoBox from '@/components/InfoBox';

import { router } from 'expo-router';

const Profile = () => {

  const { user, setUser, setIsLogged} = useGlobalContext();

  const { data: posts } = useAppwrite(
    () => getUserPosts(user.$id)
  )

  const logOutAction = async () => {
    await logout();
    setIsLogged(false);
    setUser(null);

    router.replace('/sing-in')
  }

  return (
    <SafeAreaView className={`bg-primary h-full`}>
      <FlatList
        data={posts}
        // data={[]}
        key={(item) => item.$id}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          // <Text className={'text-3xl text-white'}>
          //   {item.title}
          // </Text>

          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className={'w-full justify-center items-center mt-6 mb-12 px-4'}>
           {/* Log out button */}
            <TouchableOpacity
              className={`w-full items-end mb-10`}
              onPress={logOutAction}
            >
              <Image 
                source={icons.logout}
                className={`w-6 h-6`}
                resizeMethod='contain'
              />
            </TouchableOpacity>

            {/* Profile image */}
            <View className={`w-16 h-16 border-secondary border rounded-lg justify-center items-center`}>
              <Image
                source={{uri: user?.avatar}}
                className="w-[90%] h-[90%] rounded-md"
                resizeMode='cover'
              />
            </View>

            <InfoBox 
              title={user?.username}
              containerStyles={`mt-5`}
              titleStyle={`text-lg`}
            />

            <View className={`mt-5 flex-row`}>
              <InfoBox 
                title={posts.length || 0}
                subtitle={`Posts`}
                containerStyles={`mr-10`}
                titleStyle={`text-xl`}
              />

          <InfoBox 
              title={'1.2K'}
              subtitle={`Followers`}
              titleStyle={`text-xl`}
            />
            </View>

          </View>
        )}
        // this property helps us to do somthing if list is empty
        ListEmptyComponent={() => (
          <EmptyState
          title="No videos found"
          subtitle="No matched videos to find what you searh for"
          
          />
        )}
        
      />
    </SafeAreaView>
  )
}

export default Profile