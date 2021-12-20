// import React from "react";
// import styled from "styled-components";
// import { Animated, TouchableOpacity, Dimensions } from "react-native";
// import { AntDesign } from "@expo/vector-icons";

// import { connect } from "react-redux";


// const screenHeight = Dimensions.get("window").height

// class Modal extends React.Component {
//   state = {
//     top: new Animated.Value(screenHeight),
//   };

//   componentDidMount() {
//     this.toggleModal();
//   }

//   toggleModal = () => {
//     Animated.spring(this.state.top, {
//       toValue: 174,
//     }).start();
//   };

//   closeModal = () => {
//     Animated.spring(this.state.top, {
//       toValue: screenHeight,
//     }).start();
//   };

//   render() {
//     return (
//       <AnimatedContainer>
//         <Header />
//         <TouchableOpacity
//           onPress={this.closeModal}
//           style={{
//             position: "absolute",
//             top: 120,
//             left: "50%",
//             marginLeft: -22,
//             zIndex: 1,
//           }}
//         >
//           <CloseView style={{ elevation: 10 }}>
//             {/* <Icon.Ionicons name="ios-close" size={44} color="blue" /> */}
//             <AntDesign name="close" size={24} color={"pink"} />
//           </CloseView>
//         </TouchableOpacity>
//         <Body />
//       </AnimatedContainer>
//     );
//   }
// }

// const Container = styled.View`
//   position: absolute;
//   background: white;
//   width: 100%;
//   height: 100%;
//   z-index: 100;
// `;

// const AnimatedContainer = Animated.createAnimatedComponent(Container);

// const Header = styled.View`
//   background: #333;
//   height: 150px;
// `;

// const Body = styled.View`
//   background: #eaeaea;
//   height: 900px;
// `;

// const CloseView = styled.View`
//     width: 44px;
//     height: 44px;
//     border-radius: 22px;
//     background: white;
//     justify-content: center;
//     align-items: center;
//     box-shadow: 0 5px 10px rgba(0, 0, 0, 0.09);
// `;

// export default Modal;
