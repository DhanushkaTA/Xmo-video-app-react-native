import { View, Text, FlatList} from 'react-native'
import React, {useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import { getUserPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';

import { useGlobalContext } from '@/context/GlobalProvider';

const Profile = () => {

  const { user, setUser, setIsLogged} = useGlobalContext();

  console.log(user)

  const { data: posts } = useAppwrite(
    () => getUserPosts(user.$id)
  )
  
  console.log(`🥲🥲🥲🥲🥲🥲🥲🥲🥲🥲`)
  console.log(posts)

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
          <View className={'my-6 px-4 space-y-6'}>
           
            <Text className={`font-pmedium text-sm text-gray-100`}>
              Seach result
            </Text>
            <Text className={`text-2xl font-psemibold text-white`}>
              {/* {query} */}
            </Text>

            {/* Search input component */}

            <View className={`mt-6 mb-5`}>
              {/* <SearchInput initialQuery={}/> */}
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