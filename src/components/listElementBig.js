import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const BUTTON_SIZE = 40;
const bgColor = '#fff2df';
const elementColor = '#0A46BE';
export default class ListElementBig extends Component {
  constructor(props) {
    super(props);
  }

  onPress = () => {
      console.log("pressed");
  }

  render() {
      var image = require('../images/new_order.png');
      if(this.props.image === "new_order"){
        image = require('../images/new_order.png')
      }else if(this.props.image === "shipped"){
        image = require('../images/shipped.png')
      }else if(this.props.image === "delivered"){
        image = require('../images/delivered.png')
      }
    return (
        <View style={{flexDirection: 'row', flex: 1}}>
            <View style={styles.itemContainer}>
                <View style={styles.photo}>
                <Image 
                    style={styles.image}
                    source={image}
                />
                </View>
                <View style={styles.info}>
                    <Text style={styles.number}>{this.props.number}</Text>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
            </View>
            
            <TouchableOpacity onPress={() => this.onPress()} style={[styles.button]}>
                    <Icon name={'arrow-right'} color='#0A46BE' size={BUTTON_SIZE/2} />
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-start',
    backgroundColor: elementColor, 
    height: hp('22%'),
    width: wp('80%'),
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  button:{
    backgroundColor:bgColor,
    position: 'absolute',
    marginLeft: wp('72%'),
    justifyContent:'center',
    alignItems:'center',
    alignSelf: 'center',
    height: hp('8%'),
    width: hp('8%'),
    borderWidth: 5,
    borderRadius:hp("4%"),
    borderColor: elementColor,
  },
  photo: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: bgColor,
    borderRadius: hp('7%'),
    height: hp('14%'),
    width: hp('14%'),
    marginLeft: wp('8%')
  },
  info: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: wp('47%'),
  },
  number: {
      alignSelf: 'center',
      justifyContent: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      color: bgColor,
  },
  text: {
    justifyContent: 'center',
    color: bgColor,
    fontSize: 15,
  },
  image: {
      alignSelf: 'center',
    width: hp("10%"),
    height: hp("10%"),
    backgroundColor: 'transparent'
  }
});
