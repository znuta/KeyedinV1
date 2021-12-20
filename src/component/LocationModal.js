import React from "react";
import { StyleSheet, View, Modal, ActivityIndicator, Text } from "react-native";
import * as Progress from "react-native-progress";
import Layout from "../../constants/Layout";
import { HEADER_HEIGHT, STATUS_BAR_HEIGHT } from "../../constants/Header";
import Colors from "../../constants/Colors";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_PLACES_API_KEY = "AIzaSyDNIaedFDVNy3fNK-Lu1Q4hkxWVVNmKr3E";

const LocationModal = (props) => {
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {
        console.log("close modal");
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.innerWrapper}>
            <View style={styles.header}>
              {/* <Text>Hello world</Text> */}
              <GooglePlacesAutocomplete
                placeholder="Enter Location"
                minLength={2}
                autoFocus={false}
                returnKeyType={"default"}
                fetchDetails={true}
                listViewDisplayed={false}
                enablePoweredByContainer={true}
                onPress={(data, details = null) => console.log(data)}
                styles={{
                  textInputContainer: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: "#5d5d5d",
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb",
                  },
                }}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: "en",
                  components: "country:ng",
                }}
                currentLocation={true}
                currentLocationLabel="Current location"
                autoFocus={true}
              />
            </View>
            <View style={styles.contentContainer}>
              {/* <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                }}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: "en",
                }}
                currentLocation={true}
                currentLocationLabel='Current location'
                predefinedPlaces={["home", "work"]}
                listViewDisplayed='auto'
              /> */}

              {/* <GooglePlacesAutocomplete
                placeholder="Enter Location"
                minLength={2}
                autoFocus={false}
                returnKeyType={"default"}
                fetchDetails={true}
                onPress={(data, details = null) => console.log(data)}
                styles={{
                  textInputContainer: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: "#5d5d5d",
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb",
                  },
                }}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: "en",
                  components: 'country:ng',
                }}
                currentLocation={true}
                currentLocationLabel='Current location'
                autoFocus={true}
              /> */}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default LocationModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  modalContent: {
    flex: 1,
    width: Layout.window.width,
    height: Layout.window.height,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  innerWrapper: {
    flex: 1,
    width: "100%",
  },
  header: {
    height: HEADER_HEIGHT + 50,
    backgroundColor: Colors.primary,
    paddingTop: STATUS_BAR_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
    //   width: 100
  },
  contentContainer: {
    borderWidth: 1,
    flex: 1,
  },
});
