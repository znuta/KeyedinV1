import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../config/colors";

export default function Empty(props) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        flex: 1,
      }}
    >
      <Image
        source={require("../config/images/Layer-12.png")}
        resizeMode={"contain"}
        style={{ height: 150, width: "100%" }}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "70%",
          flex: 1,
        }}
      >
        <Text
          style={{
            color: colors.dark,
            textAlign: "center",
            fontSize: 17,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {props.title}
        </Text>

        <Text
          style={{ color: colors.medium, marginTop: 10, textAlign: "center" }}
        >
          {props.subTitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
