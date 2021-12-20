import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};

export const hp = (num) => {
  return heightPercentageToDP((num / 812) * 100);
};

export const wp = (num) => {
  return widthPercentageToDP((num / 375) * 100);
};
