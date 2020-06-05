import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Data from './Data';
import FormMataKuliah from './FormMataKuliah';
import FormDosen from './FormDosen';

const stack = createStackNavigator({
    Data,
    FormMataKuliah,
    FormDosen
})

export default createAppContainer(stack);
