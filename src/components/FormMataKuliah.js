import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firebase from 'firebase';

const items = [
    { id: 1, name: 'JJ208' },
    { id: 2, name: 'JJ209' },
];

const dayArr = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

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

    handleSubmit(day, matkul, start, end, dosen, ruangan) {
        let roomUrl = ruangan.id;
        let roomName = ruangan.name;
        let dayUrl = String(day);
        dayUrl = dayUrl.toLowerCase();
        console.log(dayUrl);
        console.log(roomUrl);
        let url = '/' + roomUrl + '/matkul/' + dayUrl;
        console.log(url);

        firebase.database().ref(url).push({
            dosen,
            nama: matkul,
            start,
            end,
            ruangan: roomName
        });
    }

    render() {
        const { navigation } = this.props;
        const { day, matkul, start, end, dosen, ruangan } = this.state;
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
                        value={matkul}
                    />
                    <Text style={styles.inputTitle}>Hari</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Senin"
                        onChangeText={day => this.setState({ day })}
                        value={day}
                    />
                    <Text style={styles.inputTitle}>Jam Mulai</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="08:00"
                        onChangeText={start => this.setState({ start })}
                        value={start}
                    />
                    <Text style={styles.inputTitle}>Jam Selesai</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="10:30"
                        onChangeText={end => this.setState({ end })}
                        value={end}
                    />
                    <Text style={styles.inputTitle}>Dosen</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Dosen"
                        onChangeText={dosen => this.setState({ dosen })}
                        value={dosen}
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
                        onPress={() => this.handleSubmit(day, matkul, start, end, dosen, ruangan)} >
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