import React from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useFonts } from 'expo-font';


const getThumbnailText = (filename ) => filename[0];

const convertTime = minutes => {
    if (minutes) {
        const hrs = minutes / 60;
        const minute = hrs.toString().split('.')[0];
        const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
        const sec = Math.ceil((60 * percent)/ 100);

        if (parseInt(minute) < 10 && sec < 10){
            return `0${minute}:0${sec}`;
        }
        if (parseInt(minute) < 10){
            return `0${minute}:${sec}`;
        }
        if (sec < 10){
            return `${minute}:0${sec}`;
        }

        return `${minute}:${sec}`;
    }
};




const AudioListItem = ({title, duration, onOptionPress}) => {

    const [fontsLoaded] = useFonts({
        MetropolisMedium: require('../fonts/metropolis.medium.otf'),
        MetropolisThin: require('../fonts/metropolis.thin.otf'),
     });


    if (!fontsLoaded){
        return null;
     }
    

    return(
       <TouchableOpacity onPress={onOptionPress}>
          <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={styles.thumbnail}>
                    <Text style={styles.thumbnailText}>{getThumbnailText(title)}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.title}> {title} </Text>
                    <Text style={styles.timeText}> {convertTime(duration)}</Text>
                </View>
            </View>
        </View>
       </TouchableOpacity>
    )
}
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignSelf:'center',
        width: width - 30,
    },

    leftContainer: {
        flexDirection:'row',
        alignItems:'center',
        flex: 1,
    },

    /*
    rightContainer: {
        flexBasis:50,
        justifyContent:'center',
        alignItems:'center',
        height: 50,
    },
    */

    thumbnail:{
        height:50,
        flexBasis:50,
        backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
    },

    thumbnailText: {
        fontSize: 22,
        fontWeight:'bold',
    },

    titleContainer: {
        width: width - 180,
        paddingLeft: 10,
    },
    
    title:{
        fontSize: 16,
        fontFamily: 'MetropolisMedium',
    },

    timeText: {
        fontSize: 12,
        color:'#222',
        fontFamily: 'MetropolisThin'
    }
})

export default AudioListItem