import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';

import { useGlobalContext } from '@/context/GlobalProvider';

const Home = () => {

  const { user} = useGlobalContext();

  const { data: posts , refetch} = useAppwrite(getAllPosts)

  const { data: latestPosts } = useAppwrite(getLatestPosts)

  const [refreshing, setRefreshing] = useState(false);

  console.log(user.username)

  const onRefresh = async () => {
    setRefreshing(true);
    // Fetch data from API and update the state when page is reloaded/refreshing
    await refetch();
    setRefreshing(false);
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
          <View className={'my-6 px-4 space-y-6'}>
            <View className={`justify-between items-start flex-row mb-6`}>
              
              <View className={``}>
                <Text className={`font-pmedium text-sm text-gray-100`}>
                  Welcome Back,
                </Text>
                <Text className={`text-2xl font-psemibold text-white`}>
                  {user?.username}
                </Text>
              </View>

              <View className={``}>
                <Image 
                  source={images.logoSmall}
                  className={`w-9 h-10`}
                  resizeMethod='contain'
                />
              </View>

            </View>

            {/* Search input component */}

            <SearchInput />

             {/* Video section */}

            <View className={`w-full flex-1 pt-3 pb-7`}>

               {/* Tranding video section/component */}

              <Text className={`text-gray-100 text-lg font-pregular mb-3`}>
                Latest Videos
              </Text>

              <Trending 
                posts={latestPosts ?? []}

              />

            </View>

          </View>
        )}
        // this property helps us to do somthing if list is empty
        ListEmptyComponent={() => (
          <EmptyState
          title="No videos found"
          subtitle="It seems like there are no videos available at the moment.Be a first one."
          
          />
        )}
        // this property helps us to do somthing if pagae refresh
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      />
    </SafeAreaView>
  )
}

export default Home