import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const dayArray = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: '',
            date: '',
            data: null
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

        const currentDay = dayArray[day - 1];
        const today = date + '-' + month + '-' + year;
        this.setState({ day: currentDay, date: today })
    }

    render() {
        const { day, date, data } = this.state;
        return (
            <ScrollView style={styles.container}>
                {/* Title Section */}
                <Text style={styles.title}>Jadwal</Text>
                <Text style={styles.date}>{day}, {date}</Text>
                {/* Jadwal Section */}
                <View style={styles.jadwalContainer}>
                    <View style={styles.jadwalContainerSatu}>
                        <Text style={styles.jadwalTitle}>Workshop Pemrograman</Text>
                        <Text style={styles.jadwalTime}>08.00 - 10.00 A.M.</Text>
                        <Text style={styles.jadwalRuangan}>JJ208</Text>
                        <View style={styles.dosenGroup}>
                            <Icon name='user' size={24} style={styles.icon} />
                            <Text style={styles.dosen}>Adif Dwi Maulana</Text>
                        </View>
                    </View>

                    <View style={styles.jadwalContainerDua}>
                        <Text style={styles.jadwalTitle}>Pengantar Mekatronika</Text>
                        <Text style={styles.jadwalTime}>08.00 - 10.00 A.M.</Text>
                        <Text style={styles.jadwalRuangan}>JJ209</Text>
                        <View style={styles.dosenGroup}>
                            <Icon name='user' size={24} style={styles.icon} />
                            <Text style={styles.dosen}>Endra Pitowarno</Text>
                        </View>
                    </View>

                    <View style={styles.jadwalContainerSatu}>
                        <Text style={styles.jadwalTitle}>Workshop Pemrograman</Text>
                        <Text style={styles.jadwalTime}>08.00 - 10.00 A.M.</Text>
                        <Text style={styles.jadwalRuangan}>JJ208</Text>
                        <View style={styles.dosenGroup}>
                            <Icon name='user' size={24} style={styles.icon} />
                            <Text style={styles.dosen}>Adif Dwi Maulana</Text>
                        </View>
                    </View>
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
        left: 200,
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
        letterSpacing: 1.2
    }
})

export default Dashboard;