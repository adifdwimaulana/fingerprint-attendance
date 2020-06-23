import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

function Data({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Tambah Data</Text>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('FormMataKuliah')} style={styles.containerMatkul}>
                    <Image source={require('../../assets/mata-kuliah-1.png')} style={styles.imageMatkul} />
                    <Text style={styles.tambah}>Mata Kuliah</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('FormDosen')} style={styles.containerDosen}>
                    <Image source={require('../../assets/dosen-1.png')} style={styles.imageDosen} />
                    <Text style={styles.tambah}>Dosen</Text>
                </TouchableOpacity>
            </View>
            <Image
                source={require('../../assets/bot-circle.png')}
                style={styles.botCircle}
            />
        </ScrollView>
    )
}

Data['navigationOptions'] = props => ({
    header: null
})

export default Data;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        color: '#333',
        textAlign: 'center',
        marginTop: 40,
        fontWeight: 'bold',
        letterSpacing: 1.4
    },
    imageContainer: {
        marginTop: 35,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerMatkul: {
        width: '70%',
        height: 200,
        backgroundColor: '#5047ce',
        position: 'relative',
        borderRadius: 14,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    containerDosen: {
        width: '70%',
        height: 200,
        backgroundColor: '#d28e8f',
        position: 'relative',
        borderRadius: 14,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    imageMatkul: {
        width: 150
    },
    imageDosen: {
        width: 90,
    },
    tambah: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '700',
        letterSpacing: 1.2,
        marginTop: 6,
        textAlign: 'center'
    },
    botCircle: {
        position: "relative",
        bottom: 0,
        left: 0,
        marginBottom: -100,
        marginLeft: -70
    }
});