import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { icons } from "../constants";
import React, { useState } from "react";
import { router, usePathname } from "expo-router";

const SearchInput = () => {
  const pathName = usePathname();
  const [query, setQuery] = useState("");

  return (
    <View className="w-full h-14 bg-gray-800 border-2 border-gray-600 rounded-2xl  focus:border-secondary items-center flex-row px-2 justify-center space-x-4">
      <TextInput
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholder={"Search for a video topic"}
        className="text-base mt-0.5 text-gray-50 flex-1 font-pregular placeholder:text-sm "
        placeholderTextColor={"#6B7280"}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query 🔎",
              "Please enter a search query"
            );
          }
          if (pathName === `/search`) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image
          source={icons.search}
          resizeMode="contain"
          className="w-5 h-5 mr-2"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
