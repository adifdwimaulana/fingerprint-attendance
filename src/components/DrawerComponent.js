import React from 'react';
import { ScrollView, StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';


class DrawerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        }
    }

    componentDidMount() {
        const user = firebase.auth().currentUser
        if (user) {
            this.setState({ email: user.email })
        }
    }

    navigateToScreen = (route) => (
        () => {
            const navigateAction = NavigationActions.navigate({
                routeName: route
            })
            this.props.navigation.dispatch(navigateAction)
        }
    )

    render() {
        const { email } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Image source={require('../../assets/dosen-1.png')} style={styles.userImage} />
                </View>
                <Text style={styles.headerText}>Hi, {email}</Text>
                <View style={styles.screenContainer}>
                    <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey == 'Home') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('Home')}>
                        <Icon name={'home'} size={24} style={[styles.screenIconStyle, (this.props.activeItemKey == 'Home') ? styles.selectedIconStyle : null]} onPress={this.navigateToScreen('Home')} />
                        <Text style={[styles.screenTextStyle, (this.props.activeItemKey == 'Home') ? styles.selectedTextStyle : null]} >Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey == 'Data') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('Data')}>
                        <Icon name={'database'} size={24} style={[styles.screenIconStyle, (this.props.activeItemKey == 'Data') ? styles.selectedIconStyle : null]} onPress={this.navigateToScreen('Data')} />
                        <Text style={[styles.screenTextStyle, (this.props.activeItemKey == 'Data') ? styles.selectedTextStyle : null]} >Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey == 'Logout') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('Logout')}>
                        <Icon name={'sign-out'} size={24} style={[styles.screenIconStyle, (this.props.activeItemKey == 'Logout') ? styles.selectedIconStyle : null]} onPress={this.navigateToScreen('Logout')} />
                        <Text style={[styles.screenTextStyle, (this.props.activeItemKey == 'Logout') ? styles.selectedTextStyle : null]} >Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImage: {
        width: 88,
        justifyContent: 'center',
    },
    headerText: {
        color: '#000',
        fontSize: 16,
        paddingLeft: 20,
        fontWeight: '700'
    },
    screenContainer: {
        marginTop: 16,
        width: '100%',
    },
    screenStyle: {
        height: 50,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    screenTextStyle: {
        fontSize: 16,
        marginLeft: 12,
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#fff'
    },
    screenIconStyle: {
        marginLeft: 20,
        textAlign: 'center'
    },
    selectedIconStyle: {
        fontWeight: 'bold',
        color: '#fff'
    },
    activeBackgroundColor: {
        backgroundColor: '#6861CF'
        // backgroundColor: '#737880',
        // opacity: 0.4
    }
});

export default DrawerComponent;