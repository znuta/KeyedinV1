import React, { useState, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import styled from "styled-components";

export default function BudgetInput() {

    /* TODO
        [] bring in all methods and state variables from ../home/steps/oldbudget.js
    */



  return (
    <Container>
      <Budget>
        <BudgetWrapper>
          <BudgetControl>
            <BudgetControlButton onPress={() => this.reduceBudgetBy(100)}>
              <Entypo name="minus" size={20} style={styles.budgetButtonText} />
            </BudgetControlButton>
          </BudgetControl>
          <InputWrap>
            <Text style={styles.naira}>&#8358;</Text>
            <TextInput
              style={{
                fontSize: 25,
                color: "#142850",
                fontWeight: "500",
                flex: 1,
                textAlign: "center",
              }}
              placeholderColor={"#dae1e7"}
              placeholder="0"
              ref={(ref) => {
                this._titleinput = ref;
              }}
              autoFocus={true}
              keyboardType="numeric"
              value={this.state.formatBudget}
              name="budget"
              onChangeText={this._handleBudgetUpdate}
            />
          </InputWrap>
          <BudgetControl>
            <BudgetControlButton onPress={() => this.increaseBudgetBy(100)}>
              <Entypo name="plus" size={20} style={styles.budgetButtonText} />
            </BudgetControlButton>
          </BudgetControl>
        </BudgetWrapper>
        {/* <View>
                <PresetBudgets horizontal={true} style={{ maxHeight: 50, width: Layout.window.width }} contentContainerStyle={{ paddingRight: 30 }} showsHorizontalScrollIndicator={false}>
                  <PresetItem onPress={() => this.increaseBudgetBy(200)}>
                    <PresetValue>&#8358; 200</PresetValue>
                  </PresetItem>
                  <PresetItem onPress={() => this.increaseBudgetBy(500)}>
                    <PresetValue>&#8358; 500</PresetValue>
                  </PresetItem>
                  <PresetItem onPress={() => this.increaseBudgetBy(1000)}>
                    <PresetValue>&#8358; 1,000</PresetValue>
                  </PresetItem>
                  <PresetItem onPress={() => this.increaseBudgetBy(5000)}>
                    <PresetValue>&#8358; 5,000</PresetValue>
                  </PresetItem>
                  <PresetItem onPress={() => this.increaseBudgetBy(10000)}>
                    <PresetValue>&#8358; 10,000</PresetValue>
                  </PresetItem>
                </PresetBudgets>
                </View> */}
      </Budget>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const Budget = styled.View`
  flex: 1;
`;

const BudgetWrapper = styled.KeyboardAvoidingView`
  ${"" /* flex: 1; */}
  padding: 10px;
  margin-bottom: 25px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const InputWrap = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-start: 10px;
  margin-end: 10px;
`;

const BudgetControl = styled.View`
  ${"" /* margin-right: 10px; */}
`;

const BudgetControlButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: #f0f0f0;
`;
