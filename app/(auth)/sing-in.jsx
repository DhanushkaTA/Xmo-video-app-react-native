import { View, Text, ScrollView, Image, Alert  } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router';

import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { getCurrentUser, signIn } from '@/lib/appwrite';

import { useGlobalContext } from '@/context/GlobalProvider';

const SingIn = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const {setIsLogged, setUser} = useGlobalContext();


  const submit = async () => {

    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    console.log(form.email)
        console.log(form.password)

    setSubmitting(true);

    try {

      // set it to globle state

      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true); // set it to globle state

      Alert.alert("Success", "User signin successful.🎉")

      router.replace("/home");
      
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className={'bg-primary h-full'}>
      <ScrollView>
        <View className={`bg-red-400/0 w-full min-h-[85vh]
           justify-center px-4 my-6`}>
          
          <Image 
            source={images.logo}
            resizeMode='contain'
            className={`w-[115px] h-[35px]`}
          />

          <Text className={'text-white text-2xl font-psemibold mt-10'}>
            Log in to Xmo
          </Text>


          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Submite"
            handlePress={submit}
            conatainerStyles={'mt-7'}
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sing-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SingIn