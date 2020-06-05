import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import fireabse from 'firebase';

class FormMataKuliah extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: '',
            matkul: '',
            start: '',
            end: ''
        }
    }

    static navigationOptions = { header: null }

    handleSubmit() {
        console.log("Sukses");
        // this.props.navigation.navigate('Data')
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Input Data Mata Kuiah</Text>
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Mata Kuliah</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Mata Kuliah"
                        onChangeText={matkul => this.setState({ matkul })}
                        value={this.state.matkul}
                    />
                    <Text style={styles.inputTitle}>Hari</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Hari"
                        onChangeText={day => this.setState({ day })}
                        value={this.state.day}
                    />
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.handleSubmit} >
                        <Text style={styles.submitText}>
                            Submit
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginTop: 40,
        marginBottom: 40,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1,
        color: '#000'
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
    submitBtn: {
        height: 40,
        backgroundColor: "#6861CF",
        borderRadius: 4,
        marginTop: 6,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    submitText: {
        fontFamily: "Montserrat",
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600",
    },
})

export default FormMataKuliah;