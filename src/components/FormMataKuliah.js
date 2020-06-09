import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import fireabse from 'firebase';

const items = [
    //name key is must.It is to show the text in front
    { id: 1, name: 'JJ208' },
    { id: 2, name: 'JJ209' },
];

class FormMataKuliah extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: '',
            matkul: '',
            start: '',
            end: '',
            dosen: '',
            ruangan: ''
        }
    }

    static navigationOptions = { header: null }

    handleSubmit() {
        console.log("Sukses");
        // this.props.navigation.navigate('Data')
    }

    render() {
        const { navigation } = this.props;
        const { day, matkul, start, end, ruangan } = this.state;
        return (
            <ScrollView
                keyboardShouldPersistTaps='always'
                style={styles.container}>
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
                    <Text style={styles.inputTitle}>Dosen</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Dosen"
                        onChangeText={dosen => this.setState({ dosen })}
                        value={this.state.dosen}
                    />
                    <Text style={styles.inputTitle}>Ruangan</Text>
                    <SearchableDropdown
                        onTextChange={text => console.log(text)}
                        // onItemSelect={item => alert(JSON.stringify(item))}
                        onItemSelect={item => this.setState({ ruangan: item })}
                        textInputStyle={{
                            borderBottomColor: "#000",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                        itemStyle={styles.itemStyle}
                        itemTextStyle={{
                            color: '#222',
                        }}
                        items={items}
                        defaultIndex={2}
                        placeholder="Masukkan Ruangan"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.handleSubmit} >
                        <Text style={styles.submitText}>
                            Submit
                    </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#FAF9F8',
        borderColor: '#bbb',
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})

export default FormMataKuliah;