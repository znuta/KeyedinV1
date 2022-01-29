import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import CardDetails from './CardDetails';
import Deposit from './Deposit';

const Index = () => {
  const [steps, setsteps] = useState(0);

  const nextStep = () => {
    setsteps(steps + 1)
  }
  switch (steps) {
    case 0:
      return <Deposit setstep={nextStep} />;

    case 1:
      return <CardDetails />;
  }
};
export default Index;
