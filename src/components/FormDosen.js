import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firebase from 'firebase';

const items = [
    { id: 1, name: 'M105' },
    { id: 2, name: 'M205' },
];

let idArray = [];
let key = [];
let idx = [];

class FormDosen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            ids: [],
            keys: [],
            nama: '',
            nip: '',
            ruangan: '',
            namaError: null,
            nipError: null
        }
    }

    static navigationOptions = { header: null }

    handleRuangan(item) {
        console.log(item.id);
        let roomId = item.id;
        // Push data id ke aray
        this.setState({ ruangan: item })
        firebase.database().ref('/' + roomId + '/dosen').on('value', (snap) => {
            idArray = []
            key = []
            idx = []
            snap.forEach((item) => {
                let itemVal = item.val();
                let itemKey = item.key;
                // console.log(itemVal);
                // console.log(itemKey);
                Object.assign(itemVal, { name: String(itemVal.id) })
                console.log(itemVal)
                idArray.push(itemVal);
                key.push(itemKey);
                idx.push(item.val().id);
                this.setState({ ids: idArray, keys: key })
            })
        })
    }

    handleSubmit(id, nama, nip, ruangan) {
        let idIdx = idx.indexOf(id)
        let keyUrl = key[idIdx]
        let roomId = ruangan.id

        firebase.database().ref('/' + roomId + '/dosen/' + keyUrl).set({
            id,
            nama,
            nip,
        })
            .then(() => {
                this.setState({ id: null, ids: [], keys: [], nama: '', nip: '', ruangan: '' })
                alert('Data berhasil di Tambahkan');
                this.props.navigation.navigate('Data');
            })
    }

    namaValidation() {
        if (this.state.nama == '') {
            this.setState({ namaError: "Nama Tidak Boleh Kosong !" })
        } else {
            this.setState({ namaError: null })
        }
    }

    nipValidation() {
        if (this.state.nip == '') {
            this.setState({ nipError: "NIP Tidak Boleh Kosong !" })
        } else {
            this.setState({ nipError: null })
        }
    }



    render() {
        const { navigation } = this.props;
        const { ids, keys, id, nama, nip, ruangan, namaError, nipError } = this.state;
        console.log(ids);
        console.log(keys);
        // if (ids == null || keys == null) {
        //     return null;
        // }
        return (
            <ScrollView
                keyboardShouldPersistTaps='always'
                style={styles.container}>
                <Text style={styles.title}>Input Data Dosen</Text>
                <View style={styles.form}>
                    {id &&
                        <Text style={styles.id}>ID Registrasi Dosen : {this.state.id}
                        </Text>}
                    <Text style={styles.inputTitle}>Nama Dosen</Text>
                    <TextInput
                        onBlur={() => this.namaValidation()}
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Nama Lengkap"
                        onChangeText={nama => this.setState({ nama })}
                        value={this.state.nama}
                    />
                    {
                        this.state.namaError ? <Text style={{ fontSize: 12, color: 'red', marginTop: -15, marginBottom: 15 }}>{this.state.namaError}</Text> : null
                    }
                    <Text style={styles.inputTitle}>NIP</Text>
                    <TextInput
                        onBlur={() => this.nipValidation()}
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="NIP"
                        onChangeText={nip => this.setState({ nip })}
                        value={this.state.nip}
                        keyboardType="numeric"
                    />
                    {
                        this.state.nipError ? <Text style={{ fontSize: 12, color: 'red', marginTop: -15, marginBottom: 15 }}>{this.state.nipError}</Text> : null
                    }
                    <Text style={styles.inputTitle}>Device</Text>
                    <SearchableDropdown
                        onTextChange={text => console.log(text)}
                        // onItemSelect={item => alert(JSON.stringify(item))}
                        onItemSelect={item => this.handleRuangan(item)}
                        textInputStyle={{
                            borderBottomColor: "#000",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                        itemStyle={styles.itemStyle}
                        itemTextStyle={{
                            color: '#222',
                        }}
                        items={items}
                        defaultIndex={0}
                        placeholder="Pendaftaran dilakukan di Device"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                    <Text style={styles.inputTitleRegistrasi}>ID Registrasi</Text>
                    <SearchableDropdown
                        onTextChange={text => console.log(text)}
                        // onItemSelect={item => alert(JSON.stringify(item))}
                        onItemSelect={item => this.setState({ id: item.id })}
                        textInputStyle={{
                            borderBottomColor: "#000",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                        itemStyle={styles.itemStyle}
                        itemTextStyle={{
                            color: '#222',
                        }}
                        items={ids}
                        defaultIndex={0}
                        placeholder="1"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                    {
                        namaError || nipError ? null : <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={() => this.handleSubmit(id, nama, nip, ruangan)} >
                            <Text style={styles.submitText}>
                                Submit
                            </Text>
                        </TouchableOpacity>

                    }
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
    inputTitleRegistrasi: {
        color: "#000",
        fontSize: 10,
        textTransform: "uppercase",
        marginTop: 24
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

export default FormDosen;