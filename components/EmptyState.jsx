import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white my-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Back to explore"
        handlePress={() => router.push("/home")}
        containerStyles="w-full "
        textStyle={" px-5 text-gray-950" }
      />
    </View>
  );
};

export default EmptyState;
