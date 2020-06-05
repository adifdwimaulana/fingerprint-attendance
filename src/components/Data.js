import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


function Data({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tambah Data</Text>
            <View style={styles.imageContainer}>
                <View style={styles.containerMatkul}>
                    <Image source={require('../../assets/mata-kuliah-1.png')} style={styles.imageMatkul} />
                    <TouchableOpacity onPress={() => navigation.navigate('FormMataKuliah')}>
                        <Text style={styles.tambah}>Mata Kuliah</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerDosen}>
                    <Image source={require('../../assets/dosen-1.png')} style={styles.imageDosen} />
                    <TouchableOpacity onPress={() => navigation.navigate('FormDosen')}>
                        <Text style={styles.tambah}>Dosen</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Image
                source={require('../../assets/bot-circle.png')}
                style={styles.botCircle}
            />
        </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerMatkul: {
        width: 160,
        height: 160,
        backgroundColor: '#5047ce',
        position: 'relative',
        marginRight: 20,
        borderRadius: 14,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerDosen: {
        width: 160,
        height: 160,
        backgroundColor: '#d28e8f',
        position: 'relative',
        marginLeft: 20,
        borderRadius: 14,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageMatkul: {
        height: 102
    },
    imageDosen: {
        height: 110,
    },
    tambah: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700',
        letterSpacing: 1.2,
        marginTop: 6
    },
    botCircle: {
        position: "absolute",
        bottom: 0,
        left: 0,
        marginBottom: -100,
        marginLeft: -70
    }
});