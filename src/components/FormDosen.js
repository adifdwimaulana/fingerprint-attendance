import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import fireabse from 'firebase';

class FormDosen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            nama: '',
            nip: ''
        }
    }

    static navigationOptions = { header: null }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Input Data Dosen</Text>
                <View style={styles.form}>
                    {this.state.id &&
                        <Text style={styles.id}>ID Dosen Terbaru : {this.state.id}
                        </Text>}
                    <Text style={styles.inputTitle}>Nama Dosen</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Nama Lengkap"
                        onChangeText={nama => this.setState({ nama })}
                        value={this.state.nama}
                    />
                    <Text style={styles.inputTitle}>NIP</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="NIP"
                        onChangeText={nip => this.setState({ nip })}
                        value={this.state.nip}
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
        marginBottom: 30,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1,
        color: '#000'
    },
    id: {
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

export default FormDosen;