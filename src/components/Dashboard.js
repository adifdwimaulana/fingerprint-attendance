import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';

const dayArray = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
let matkulOneArr = [];
let matkulTwoArr = [];

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: '',
            date: '',
            matkulOne: null,
            matkulTwo: null
        }
    }

    componentDidMount() {
        let day = new Date().getDay();
        let date = new Date().getDate();
        let month = new Date().getMonth();
        const year = new Date().getFullYear();

        if (date < 10) {
            date = '0' + date;
        }

        if (month < 10) {
            month = '0' + month;
        }

        let currentDay = dayArray[day - 1];
        let today = date + '-' + month + '-' + year;
        this.setState({ day: currentDay, date: today })

        let dayUrl = currentDay.toLowerCase();
        console.log(dayUrl);
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

    render() {
        const { day, date, matkulOne, matkulTwo } = this.state;
        console.log("Matkul One: ");
        console.log(matkulOne);
        console.log("Matkul Two: ");
        console.log(matkulTwo);
        return (
            <ScrollView style={styles.container}>
                {/* Title Section */}
                <Text style={styles.title}>Jadwal</Text>
                <Text style={styles.date}>{day}, {date}</Text>
                {/* Jadwal Section */}
                <View style={styles.jadwalContainer}>

                    {matkulOne ?
                        matkulOne.map(item =>
                            <View style={styles.jadwalContainerSatu}>
                                <Text style={styles.jadwalTitle}>{item.nama}</Text>
                                <Text style={styles.jadwalTime}>{item.start} - {item.end} A.M.</Text>
                                <Text style={styles.jadwalRuangan}>{item.ruangan}</Text>
                                <View style={styles.dosenGroup}>
                                    <Icon name='user' size={24} style={styles.icon} />
                                    <Text style={styles.dosen}>{item.dosen}</Text>
                                </View>
                            </View>
                        ) : <View style={styles.noContainerSatu}>
                            <Text style={styles.noKuliah}>Tidak Ada Kuliah</Text>
                            <Text style={styles.noRuangan}>JJ208</Text>
                        </View>
                    }

                    {matkulTwo ?
                        matkulTwo.map(item =>
                            <View style={styles.jadwalContainerDua}>
                                <Text style={styles.jadwalTitle}>{item.nama}</Text>
                                <Text style={styles.jadwalTime}>{item.start} - {item.end} A.M.</Text>
                                <Text style={styles.jadwalRuangan}>{item.ruangan}</Text>
                                <View style={styles.dosenGroup}>
                                    <Icon name='user' size={24} style={styles.icon} />
                                    <Text style={styles.dosen}>{item.dosen}</Text>
                                </View>
                            </View>
                        ) : <View style={styles.noContainerDua}>
                            <Text style={styles.noKuliah}>Tidak Ada Kuliah</Text>
                            <Text style={styles.noRuangan}>JJ209</Text>
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
        height: 160,
        borderRadius: 8,
        elevation: 8,
    },
    jadwalContainerDua: {
        marginHorizontal: 17,
        marginTop: 30,
        backgroundColor: '#6861cf',
        height: 160,
        borderRadius: 8,
        elevation: 8,
    },
    jadwalTitle: {
        fontSize: 20,
        color: '#efefef',
        fontWeight: '700',
        letterSpacing: 1.2,
        marginTop: 16,
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