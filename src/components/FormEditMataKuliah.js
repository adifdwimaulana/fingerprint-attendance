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
            ruangan: null,
            matkulError: null,
            hariError: null,
            startError: null,
            endError: null,
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

    matkulValidation() {
        if (this.state.matkul == '') {
            this.setState({ matkulError: "Form Mata Kuliah Tidak Boleh Kosong !" })
        } else {
            this.setState({ matkulError: null })
        }
    }

    hariValidation() {
        if (this.state.day == '') {
            this.setState({ hariError: "Form Hari Tidak Boleh Kosong !" })
        } else {
            this.setState({ hariError: null })
        }
    }

    startValidation() {
        let reg = new RegExp('^[0-9]+$');
        for (let char = 0; char < this.state.start.length; char++) {
            if (this.state.start[2] != ':' || !this.state.start[0].match(reg) || !this.state.start[1].match(reg) || !this.state.start[3].match(reg) || !this.state.start[4].match(reg)) {
                this.setState({ startError: "Format Jam Harus Sesuai Placeholder !" })
            } else {
                this.setState({ startError: null })
            }
        }
    }

    endValidation() {
        let reg = new RegExp('^[0-9]+$');
        for (let char = 0; char < this.state.end.length; char++) {
            if (this.state.end[2] != ':' || !this.state.end[0].match(reg) || !this.state.end[1].match(reg) || !this.state.end[3].match(reg) || !this.state.end[4].match(reg)) {
                this.setState({ endError: "Format Jam Harus Sesuai Placeholder !" })
            } else {
                this.setState({ endError: null })
            }
        }
    }

    render() {
        const { navigation } = this.props;
        const { day, matkul, start, end, dosen, ruangan, dosenList, matkulError, hariError, startError, endError } = this.state;
        console.log(dosenArr);
        return (
            <ScrollView
                keyboardShouldPersistTaps='always'
                style={styles.container}>
                <Text style={styles.title}>Edit Data Mata Kuiah</Text>
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Mata Kuliah</Text>
                    <TextInput
                        onBlur={() => this.matkulValidation()}
                        style={styles.textInput}
                        autoCapitalize="true"
                        placeholder={navigation.getParam('nama', '')}
                        onChangeText={matkul => this.setState({ matkul })}
                        value={matkul}
                    />
                    <Text style={styles.inputTitle}>Hari</Text>
                    <TextInput
                        onBlur={() => this.hariValidation()}
                        style={styles.textInput}
                        autoCapitalize="true"
                        placeholder={navigation.getParam('day', '')}
                        onChangeText={day => this.setState({ day })}
                        value={day}
                    />
                    <Text style={styles.inputTitle}>Jam Mulai</Text>
                    <TextInput
                        onBlur={() => this.startValidation()}
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder={navigation.getParam('start', '')}
                        onChangeText={start => this.setState({ start })}
                        value={start}
                        maxLength={5}
                    />
                    <Text style={styles.inputTitle}>Jam Selesai</Text>
                    <TextInput
                        onBlur={() => this.endValidation()}
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder={navigation.getParam('end', '')}
                        onChangeText={end => this.setState({ end })}
                        value={end}
                        maxLength={5}
                    />
                    <Text style={styles.inputTitle}>Ruangan</Text>
                    <SearchableDropdown
                        onTextChange={text => console.log(text)}
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
                        placeholder={navigation.getParam('ruangan', '')}
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                    <Text style={styles.inputTitleDosen}>Dosen</Text>
                    <SearchableDropdown
                        onTextChange={text => console.log(text)}
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
                        defaultIndex={0}
                        placeholder={navigation.getParam('dosen', '')}
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />

                    {
                        matkulError || hariError || startError || endError ? null : <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={() => this.handleSubmit(day, matkul, start, end, dosen, ruangan)}
                        >
                            <Text style={styles.submitText}>
                                Edit
                                </Text>
                        </TouchableOpacity>
                    }

                    {/* <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={() => this.handleSubmit(day, matkul, start, end, dosen, ruangan)} >
                        <Text style={styles.submitText}>
                            Edit
                    </Text>
                    </TouchableOpacity> */}
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