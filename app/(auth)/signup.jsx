import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import {useGlobalContext} from '../../context/GlobalContextProvider'

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();



  const onSubmit = async () => {
    if (
      form.username.trim() === "" ||
      form.email.trim() === "" ||
      form.password.trim() === ""
    )
      return Alert.alert("Error 🛠️", "Please fill in all fields");

    setIsSubmitting(true);

    try{
      const result = await createUser(form.username, form.email, form.password);

      //set to global context
      setUser(result)
      setIsLoggedIn(true)
      
      router.push("/home");
    }catch(e){
      Alert.alert("Error 🛠️", e.message);
    }finally{
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="w-full flex justify-center min-h-[85vh] px-4  ">
          <Image
            source={images.logo}
            className="w-[150px] h-[150px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white font-psemibold">
            Sign Up to GifIt
          </Text>
          <FormField
            title={"Username"}
            value={form.username}
            handleChange={(e) => setForm({ ...form, username: e })}
            otherStyles={"mt-5"}
            placeholder={"johndoe7"}
            keyboardType={"email-address"}
          />
          <FormField
            title={"Email"}
            value={form.email}
            handleChange={(e) => setForm({ ...form, email: e })}
            otherStyles={"mt-5"}
            placeholder={"johndoe@mail.com"}
            keyboardType={"email-address"}
          />
          <FormField
            title={"Password"}
            value={form.password}
            handleChange={(e) => setForm({ ...form, password: e })}
            otherStyles={"mt-5"}
            placeholder={"Your password"}
          />

          <CustomButton
            title={"Sign Up"}
            containerStyle={"mt-7 "}
            handlePressable={onSubmit}
            isLoading={isSubmitting}
            textStyle={"text-lg text-gray-100 tracking-wider"}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/signin"
              className="text-lg font-psemibold text-secondary "
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
