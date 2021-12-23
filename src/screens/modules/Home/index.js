import React from 'react';
import { View, StatusBar } from 'react-native';
import JobSearch from './JobSearch';

function Home(props) {
  return <>
    <StatusBar translucent={true} backgroundColor="transparent" />
    <JobSearch />

  </>;
  
}

export default Home;
