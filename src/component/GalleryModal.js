import React, { useState } from "react";
import { View, Modal, TouchableHighlight } from "react-native";
import { Feather } from "@expo/vector-icons";
import Gallery from "react-native-image-gallery";

export default function GalleryModal(props) { //props => {...data}, visible:bool, active:int
  var images = props.data.map((image) => ({ source: { uri: image.src } }));
  const [modalVisible, setModalVisible] = useState(props.visible);
  const [activeItem, setActiveGallery] = useState(props.active = null);

  return (
    <View style={{}}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        // }}
        style={{ backgroundColor: "black" }}
      >
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <View
            style={{ marginTop: 60, alignItems: "flex-end", paddingEnd: 30 }}
          >
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Feather name="x" size={32} color="white" />
            </TouchableHighlight>
          </View>
          <Gallery images={images} initialPage={activeItem} />
        </View>
      </Modal>
    </View>
  );
}
