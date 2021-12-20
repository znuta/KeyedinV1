import {createStore} from 'redux';
import introReducer from '../reducers/IntroReducer';

const store = createStore(introReducer);

export default store;
