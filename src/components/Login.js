import React from 'react'
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import firebase from 'firebase'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMesage: null
        }
    }

    static navigationOptions = { header: null }

    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Home'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/top-circle.png')}
                    style={styles.topCircle}
                />
                <Text style={styles.greeting}>{`Hello again,\nWelcome to Scheduler`}</Text>
                {this.state.errorMessage &&
                    <Text style={styles.errorMessage}>
                        {this.state.errorMessage}
                    </Text>}
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={this.handleLogin} >
                        <Text style={styles.loginText}>
                            Login
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.registerBtn}
                        onPress={() => this.props.navigation.navigate('Register')}
                    >
                        <Text style={styles.registerTop}>Don't have an account?
                            <Text style={styles.registerBot}> Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../assets/bot-circle.png')}
                    style={styles.botCircle}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        color: "#000",
        letterSpacing: 1.2,
        marginTop: 130,
        marginBottom: 30,
        lineHeight: 24
    },
    errorMessage: {
        textAlign: "center",
        marginHorizontal: 30,
        color: "red",
        marginBottom: 20,
        marginTop: -10
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#000",
        fontSize: 10,
        textTransform: "uppercase"
    },
    textInput: {
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F30",
        marginBottom: 24
    },
    loginBtn: {
        height: 40,
        backgroundColor: "#6861CF",
        borderRadius: 4,
        marginTop: -4,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    loginText: {
        fontFamily: "Montserrat",
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600",
    },
    registerBtn: {
        alignSelf: "center", marginTop: 16
    },
    registerTop: {
        color: "#414959",
        fontSize: 14,
        fontFamily: "Montserrat"
    },
    registerBot: {
        color: "#6861CF",
        fontSize: 14,
        fontFamily: "Montserrat",
        fontWeight: "bold"
    },
    topCircle: {
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: -140,
        marginRight: -90
    },
    botCircle: {
        position: "relative",
        bottom: 0,
        left: 0,
        marginBottom: -120,
        marginLeft: -70
    }
});

export default Login;
