import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePressable,
  isLoading = false,
  textStyle,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePressable}
      activeOpacity={0.8}
      disabled={isLoading}
      className={`bg-secondary-100 ${containerStyle} rounded-xl min-h-[55px] justify-center items-center ${
        isLoading ? "opacity-50" : ""
      } `}
    >
      <Text className={`  text-lg text-primary font-psemibold ${textStyle} `}>
        {isLoading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
