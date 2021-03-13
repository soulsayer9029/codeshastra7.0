import React from 'react'
import { ImageBackground, StyleSheet, Text, View , Platform, TouchableOpacity, ScrollView, Keyboard, KeyboardAvoidingView, SafeAreaView} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { Button } from 'react-native-paper';
import ListElementBig from '../components/listElementBig';
export default class inventory extends React.Component {
    state = {  }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Inventory Manager</Text>
                <ListElementBig number={264} text={"Packed"} image = "new_order"/>
                <ListElementBig number={4} text={"Shipped"} image = "shipped"/>
                <ListElementBig number={274} text={"Delivered"} image = "delivered"/>
                <Button mode="contained" style={styles.button} onPress={() => console.log('Pressed')}>
                    View Inventory
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 25,
        backgroundColor: '#0A46BE',
        borderRadius: 20,
        marginBottom: 20,
        width: wp("60%"),
    },  
    container: {
        flex: 1,
        backgroundColor: '#fff2df',
    },
    title: {
        fontSize: hp('4.3%'),
        fontWeight: 'bold',
        fontFamily: 'dosis-regular',
        paddingTop : '5%',
        paddingHorizontal:'10%',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
    },
    switch: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    }
})