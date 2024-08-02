import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';

const Home = () => {

  const { data: posts , refetch} = useAppwrite(getAllPosts)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Fetch data from API and update the state
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className={`bg-primary h-full`}>
      <FlatList
        data={[{ id: 1}]}
        // data={[]}
        key={(item) => item.id}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Text className={'text-3xl text-white'}>
            {item.id}
          </Text>
        )}
        ListHeaderComponent={() => (
          <View className={'my-6 px-4 space-y-6'}>
            <View className={`justify-between items-start flex-row mb-6`}>
              
              <View className={``}>
                <Text className={`font-pmedium text-sm text-gray-100`}>
                  Welcome Back
                </Text>
                <Text className={`text-2xl font-psemibold text-white`}>
                  Tharindu
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

            <View className={`w-full flex-1 pt-3 pb-7`}>

              <Text className={`text-gray-100 text-lg font-pregular mb-3`}>
                Latest Videos
              </Text>

              <Trending 
                posts={[ { id:1 }, { id:2 }, { id:3 } ] ?? []}

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