import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import firebase from 'firebase'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()

        this.setState({ currentUser })
    }

    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        const { currentUser } = this.state
        return (
            <View style={styles.container}>
                <Text>
                    Hi {currentUser && currentUser.email}!
                </Text>
                <Button
                    title="Log Out"
                    onPress={this.handleSignOut}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Home;
