import React from 'react'
import {Appbar} from 'react-native-paper'

export default Header = props => {
    if(props.back_button){
        return(
            <Appbar.Header style = {{backgroundColor : colors.header_background}}>
                <Appbar.BackAction onPress={props.nav_back} />
                <Appbar.Content title={props.title}/>
            </Appbar.Header>
        )
    }else{
        return(
            <Appbar.Header style = {{backgroundColor : colors.header_background}}>
                <Appbar.Content title={props.title}/>
            </Appbar.Header>
        )
    }
}

const colors = {
    header_background:"#1e4f74",
}