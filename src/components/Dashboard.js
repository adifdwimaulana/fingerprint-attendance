import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';

const dayArray = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const monthArray = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]
let matkulOneArr = [];
let matkulTwoArr = [];

let day = new Date().getDay();
let date = new Date().getDate();
let month = new Date().getMonth();
month = monthArray[month]
const year = new Date().getFullYear();
console.log(month)

if (date < 10) {
    date = '0' + date;
}

if (month < 10) {
    month = '0' + month;
}

let currentDay = dayArray[day];
let today = date + ' ' + month + ' ' + year;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: '',
            date: '',
            matkulOne: null,
            matkulTwo: null,
            refreshing: false
        }
    }

    _onRefresh = () => {
        // Fetching Data
        let dayUrl = currentDay.toLowerCase();
        this.setState({ refreshing: true })
        firebase.database().ref('/1/matkul' + '/' + dayUrl).once('value', (snap) => {
            matkulOneArr = [];
            if (snap.val() != null) {
                snap.forEach((item) => {
                    let itemVal = item.val();
                    let itemKey = item.key;
                    // console.log(itemKey);
                    // console.log(itemVal);
                    Object.assign(itemVal, { key: itemKey })
                    matkulOneArr.push(itemVal);
                    // console.log(matkulOneArr);
                    this.setState({ matkulOne: matkulOneArr })
                })
            } else {
                this.setState({ matkulOne: null })
            }
        }).then(() => {
            this.setState({ refreshing: false })
        })

        firebase.database().ref('/2/matkul' + '/' + dayUrl).once('value', (snap) => {
            matkulTwoArr = [];
            if (snap.val() != null) {
                snap.forEach((item) => {
                    let itemVal = item.val();
                    let itemKey = item.key;
                    // console.log(itemKey);
                    // console.log(itemVal);
                    Object.assign(itemVal, { key: itemKey })
                    matkulTwoArr.push(itemVal);
                    this.setState({ matkulTwo: matkulTwoArr })
                })
            } else {
                this.setState({ matkulTwo: null })
            }
        }).then(() => {
            this.setState({ refreshing: false })
        })
    }

    componentDidMount() {
        this.setState({ day: currentDay, date: today })
        let dayUrl = currentDay.toLowerCase();
        console.log(dayUrl);

        // Fetching Data
        firebase.database().ref('/1/matkul' + '/' + dayUrl).on('value', (snap) => {
            matkulOneArr = [];
            snap.forEach((item) => {
                let itemVal = item.val();
                let itemKey = item.key;
                // console.log(itemKey);
                // console.log(itemVal);
                Object.assign(itemVal, { key: itemKey })
                matkulOneArr.push(itemVal);
                // console.log(matkulOneArr);
                this.setState({ matkulOne: matkulOneArr })
            });
        });

        firebase.database().ref('/2/matkul' + '/' + dayUrl).on('value', (snap) => {
            matkulTwoArr = [];
            snap.forEach((item) => {
                let itemVal = item.val();
                let itemKey = item.key;
                // console.log(itemKey);
                // console.log(itemVal);
                Object.assign(itemVal, { key: itemKey })
                matkulTwoArr.push(itemVal);
                this.setState({ matkulTwo: matkulTwoArr })
            });
        });
    }

    handleDelete(item) {
        console.log(item)
        let roomId;

        if (item.ruangan == "M105") {
            roomId = 1;
        } else {
            roomId = 2;
        }
        console.log(roomId)
        let url = '/' + roomId + '/matkul/' + currentDay.toLowerCase() + '/' + item.key;
        console.log(url)

        Alert.alert(
            //title
            'Hi,',
            //body
            'Are you sure want to delete this item ?',
            [
                {
                    text: 'Yes', onPress: () => firebase.database().ref(url).remove()
                },
                { text: 'No', style: 'cancel' },
            ],
            { cancelable: false }
            //clicking out side of alert will not cancel
        );
    }

    handleEdit(item) {
        console.log(item)
        let roomId;

        if (item.ruangan == "M105") {
            roomId = 1;
        } else {
            roomId = 2;
        }
        console.log(roomId)
        let url = '/' + roomId + '/matkul/' + currentDay.toLowerCase() + '/' + item.key;
        console.log(url)
        this.props.navigation.navigate('FormEditMataKuliah', {
            nama: item.nama,
            day: this.state.day,
            start: item.start,
            end: item.end,
            ruangan: item.ruangan,
            key: item.key,
            dosen: item.dosen.name
        })
    }

    render() {
        const { day, date, matkulOne, matkulTwo, refreshing } = this.state;
        console.log("Matkul One: ");
        console.log(matkulOne);
        console.log("Matkul Two: ");
        console.log(matkulTwo);
        return (
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                {/* Title Section */}
                <Text style={styles.title}>Jadwal</Text>
                <Text style={styles.date}>{day}, {date}</Text>
                {/* Jadwal Section */}
                <View style={styles.jadwalContainer}>

                    {matkulOne ?
                        matkulOne.map(item =>
                            <View style={styles.jadwalContainerSatu}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', position: 'absolute', right: 20, top: 8, zIndex: 20, alignItems: 'center' }}
                                    onPress={() => this.handleDelete(item)}
                                >
                                    <Icon name={'trash'} size={20} style={{ color: '#fff' }} />
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700', marginLeft: 4 }}>DELETE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', position: 'absolute', right: 100, top: 8, zIndex: 20, alignItems: 'center' }}
                                    onPress={() => this.handleEdit(item)}
                                >
                                    <Icon name={'edit'} size={20} style={{ color: '#fff' }} />
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700', marginLeft: 4 }}>EDIT</Text>
                                </TouchableOpacity>
                                <Text style={styles.jadwalTitle}>{item.nama}</Text>
                                <Text style={styles.jadwalTime}>{item.start} - {item.end} A.M.</Text>
                                <Text style={styles.jadwalRuangan}>{item.ruangan}</Text>
                                <View style={styles.dosenGroup}>
                                    <Icon name='user' size={24} style={styles.icon} />
                                    <Text style={styles.dosen}>{item.dosen.name}</Text>
                                </View>
                            </View>
                        ) : <View style={styles.noContainerSatu}>
                            <Text style={styles.noKuliah}>Tidak Ada Kuliah</Text>
                            <Text style={styles.noRuangan}>M105</Text>
                        </View>
                    }

                    {matkulTwo ?
                        matkulTwo.map(item =>
                            <View style={styles.jadwalContainerDua}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', position: 'absolute', right: 20, top: 8, zIndex: 20, alignItems: 'center' }}
                                    onPress={() => this.handleDelete(item)}
                                >
                                    <Icon name={'trash'} size={20} style={{ color: '#fff' }} />
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700', marginLeft: 4 }}>DELETE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', position: 'absolute', right: 100, top: 8, zIndex: 20, alignItems: 'center' }}
                                    onPress={() => this.handleEdit(item)}
                                >
                                    <Icon name={'edit'} size={20} style={{ color: '#fff' }} />
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700', marginLeft: 4 }}>EDIT</Text>
                                </TouchableOpacity>
                                <Text style={styles.jadwalTitle}>{item.nama}</Text>
                                <Text style={styles.jadwalTime}>{item.start} - {item.end} A.M.</Text>
                                <Text style={styles.jadwalRuangan}>{item.ruangan}</Text>
                                <View style={styles.dosenGroup}>
                                    <Icon name='user' size={24} style={styles.icon} />
                                    <Text style={styles.dosen}>{item.dosen.name}</Text>
                                </View>
                            </View>
                        ) : <View style={styles.noContainerDua}>
                            <Text style={styles.noKuliah}>Tidak Ada Kuliah</Text>
                            <Text style={styles.noRuangan}>M205</Text>
                        </View>
                    }

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 16,
        marginLeft: 24,
        letterSpacing: 1,
        color: '#000'
    },
    date: {
        fontSize: 12,
        color: '#333',
        marginTop: 4,
        marginLeft: 24,
        marginBottom: 10,
        fontWeight: "600",
        letterSpacing: 1.5
    },
    jadwalContainer: {
        marginBottom: 50
    },
    jadwalContainerSatu: {
        marginHorizontal: 17,
        marginTop: 30,
        backgroundColor: '#d28e8e',
        height: 180,
        borderRadius: 8,
        elevation: 8,
    },
    jadwalContainerDua: {
        marginHorizontal: 17,
        marginTop: 30,
        backgroundColor: '#6861cf',
        height: 180,
        borderRadius: 8,
        elevation: 8,
    },
    jadwalTitle: {
        fontSize: 20,
        color: '#efefef',
        fontWeight: '700',
        letterSpacing: 1.2,
        marginTop: 36,
        marginLeft: 16
    },
    jadwalTime: {
        fontSize: 14,
        color: '#efefef',
        marginTop: 8,
        marginLeft: 16,
        fontWeight: '600',
        letterSpacing: 1.2
    },
    jadwalRuangan: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 8,
        marginLeft: 16,
        color: '#fff'
    },
    dosenGroup: {
        position: 'absolute',
        bottom: 6,
        left: 185,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: '#fff'
    },
    dosen: {
        fontSize: 14,
        marginLeft: 8,
        color: '#fff',
        fontWeight: '700',
        letterSpacing: 1
    },
    noKuliah: {
        fontSize: 24,
        color: '#efefef',
        fontWeight: '700',
        letterSpacing: 1.2,
        marginTop: 28,
        textAlign: 'center'
    },
    noRuangan: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#fff',
        textAlign: 'center'
    },
    noContainerDua: {
        marginHorizontal: 17,
        marginTop: 30,
        backgroundColor: '#6861cf',
        height: 160,
        borderRadius: 8,
        elevation: 8,
    },
    noContainerSatu: {
        marginHorizontal: 17,
        marginTop: 30,
        backgroundColor: '#d28e8e',
        height: 160,
        borderRadius: 8,
        elevation: 8,
    }
})

export default Dashboard;