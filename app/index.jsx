import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalContextProvider";

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center justify-center min-h-[85vh] px-4 ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className=" w-[150px] h-[150px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className=" max-w-[400px] h-[280px]"
          />
          <View className="relative my-5 ">
            <Text className="text-white text-3xl font-bold   ">
              &nbsp; &nbsp; &nbsp; Explore endless possibilities with{" "}
              <Text className="text-[#8f3bf0] tracking-widest  ">GifIt</Text>
            </Text>
          </View>
          <Text className="text-white text-lg font-pregular text-center px-2">
            Where creativity meets innovation 🚀
          </Text>
          <CustomButton
            title="Continue with email"
            handlePressable={() => router.push("./signin")}
            textStyle={`text-gray-50`}
            containerStyle="mt-8 px-8 "
          />
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default App;
