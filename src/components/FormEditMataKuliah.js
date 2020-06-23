import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firebase from 'firebase';

const items = [
    { id: 1, name: 'M105' },
    { id: 2, name: 'M205' },
];

const dayArr = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

let dosenArr = [];

class FormMataKuliah extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: '',
            matkul: '',
            start: '',
            end: '',
            dosenList: [],
            dosen: null,
            ruangan: ''
        }
    }

    static navigationOptions = { header: null }

    handleSubmit(day, matkul, start, end, dosen, ruangan) {
        let roomUrl = ruangan.id;
        let roomName = ruangan.name;
        let dayUrl = String(day);
        dayUrl = dayUrl.toLowerCase();
        console.log(dayUrl);

        let key = this.props.navigation.getParam('key', '')
        String(key);
        console.log(key)
        let url = '/' + roomUrl + '/matkul/' + dayUrl + '/' + key;
        console.log(url);

        firebase.database().ref(url).update({
            dosen,
            nama: matkul,
            start,
            end,
            ruangan: roomName
        })
            .then(() => {
                this.setState({ day: '', matkul: '', start: '', end: '', dosen: '', ruangan: '' })
                alert('Data berhasil di Edit');
                this.props.navigation.navigate('Home');
            })
    }

    handleRuangan(item) {
        console.log(item);
        this.setState({ ruangan: item })
        let roomId = item.id;
        let dosenUrl = '/' + roomId + '/dosen';
        let objectDosen;

        firebase.database().ref(dosenUrl).on('value', (snap) => {
            dosenArr = [];
            snap.forEach((item) => {
                let itemVal = item.val();
                let itemKey = item.key;
                objectDosen = {
                    id: itemVal.id,
                    name: itemVal.nama
                }

                dosenArr.push(objectDosen);
                this.setState({ dosenList: dosenArr });
            })
        })
    }

    render() {
        const { navigation } = this.props;
        const { day, matkul, start, end, dosen, ruangan, dosenList } = this.state;
        console.log(dosenArr);
        return (
            <ScrollView
                keyboardShouldPersistTaps='always'
                style={styles.container}>
                <Text style={styles.title}>Edit Data Mata Kuiah</Text>
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Mata Kuliah</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder={navigation.getParam('nama', '')}
                        onChangeText={matkul => this.setState({ matkul })}
                        value={matkul}
                    />
                    <Text style={styles.inputTitle}>Hari</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder={navigation.getParam('day', '')}
                        onChangeText={day => this.setState({ day })}
                        value={day}
                    />
                    <Text style={styles.inputTitle}>Jam Mulai</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder={navigation.getParam('start', '')}
                        onChangeText={start => this.setState({ start })}
                        value={start}
                    />
                    <Text style={styles.inputTitle}>Jam Selesai</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder={navigation.getParam('end', '')}
                        onChangeText={end => this.setState({ end })}
                        value={end}
                    />
                    <Text style={styles.inputTitle}>Ruangan</Text>
                    <SearchableDropdown
                        onTextChange={text => console.log(text)}
                        // onItemSelect={item => alert(JSON.stringify(item))}
                        // onItemSelect={item => this.setState({ ruangan: item })}
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
                        defaultIndex={2}
                        placeholder={navigation.getParam('ruangan', '')}
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                    <Text style={styles.inputTitleDosen}>Dosen</Text>
                    <SearchableDropdown
                        onTextChange={text => console.log(text)}
                        // onItemSelect={item => alert(JSON.stringify(item))}
                        // onItemSelect={item => console.log(item)}
                        onItemSelect={item => this.setState({ dosen: item })}
                        textInputStyle={{
                            borderBottomColor: "#000",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                        itemStyle={styles.itemStyle}
                        itemTextStyle={{
                            color: '#222',
                        }}
                        items={dosenArr}
                        defaultIndex={2}
                        placeholder={navigation.getParam('dosen', '')}
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={() => this.handleSubmit(day, matkul, start, end, dosen, ruangan)} >
                        <Text style={styles.submitText}>
                            Edit
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
    inputTitleDosen: {
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

export default FormMataKuliah;