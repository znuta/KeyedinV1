import React from 'react';
import styled from 'styled-components';

// const KButton = props => (
// 	<ButtonContainer
// 		onPress={() => alert('Hi!')}
// 		backgroundColor={props.backgroundColor}
//         disabled={props.disabled}
// 	>
// 		<ButtonText textColor={props.textColor} textTransform={props.textTransform}>{props.text}</ButtonText>
// 	</ButtonContainer>
// );

const KButton = ({
  onPress,
  backgroundColor,
  disabled,
  textColor,
  textTransform,
  text,
}) => {
  return (
    <ButtonContainer
      backgroundColor={backgroundColor}
      disabled={disabled}
      onPress={onPress}>
      <ButtonText textColor={textColor} textTransform={textTransform}>
        {text}
      </ButtonText>
    </ButtonContainer>
  );
};

export default KButton;

const ButtonContainer = styled.TouchableOpacity`
	width: 80%;
	height: 50px
	padding: 5px;
  border-radius: 30px;	
  align-items:center;
  justify-content:center;
	background-color: ${props => props.backgroundColor};
    ${props => (!props.disabled ? `opacity: 1` : `opacity: 0.3`)}
    ${'' /* box-shadow: 0px 5px 10px rgba() */}
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: ${props => props.textColor};
  text-align: center;
  font-weight: bold;
  text-transform: ${props => props.textTransform};
`;
