import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Data from './Data';
import FormMataKuliah from './FormMataKuliah';
import FormDosen from './FormDosen';
import FormEditMataKuliah from './FormEditMataKuliah';

const stack = createStackNavigator({
    Data,
    FormMataKuliah,
    FormDosen,
    FormEditMataKuliah
})

export default createAppContainer(stack);
