import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import React, { useState } from "react";

const FormField = ({
  title,
  value,
  handleChange,
  otherStyles,
  placeholder,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return ( 
    <View className={`space-y-2  ${otherStyles}`}>
      <Text className="text-gray-100 font-pmedium text-base">{title}</Text>
      <View className="w-full h-14 bg-gray-800 border-2 border-gray-600 rounded-2xl  focus:border-secondary items-center flex-row px-2 justify-center">
        <TextInput
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          keyboardType={keyboardType}
          className=" font-psemibold placeholder:font-pregular placeholder:opacity-50 text-gray-50 text-base flex-1 "
          placeholderTextColor={"#6B7280"}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && value!=='' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6 mr-2"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
