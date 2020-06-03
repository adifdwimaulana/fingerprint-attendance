import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header({ navigation }) {
    const openMenu = () => {
        navigation.openDrawer();
        console.log("Berhasil");
    }
    return (
        <View style={StyleSheet.header}>
            {/* Icon Menu */}
            <Icon name='bars' size={28} style={styles.icon} onPress={openMenu} />
            <View>
                <Text style={styles.headerText}>Scheduler</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
        textAlign: 'center'
    },
    icon: {
        position: 'absolute',
        left: 8,
        zIndex: 10
    }
})