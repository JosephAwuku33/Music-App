import React from "react";
import { Alert } from "react-native";

//play audio

export const play = async (playbackObj, uri) => {
    try {
         const status = await playbackObj.loadAsync({uri: uri}, {shouldPlay:true});
         return status;   
    } catch(error){
        console.log('error inside playing', error.message)
        Alert.alert('Error','Error playing sound');
    }
}


//pause audio
export const pause = async (playbackObj) => {
    try {
         const status = await playbackObj.setStatusAsync({shouldPlay:false});
         return status;
    } catch(error){
        console.log('error inside playing', error.message)
        Alert.alert('Error','Error pausing sound');
    }
}

//resume audio
export const resume = async (playbackObj) => {
    try {
         const status = await playbackObj.playAsync();
         return status;
    } catch(error){
        console.log('error inside playing', error.message)
        Alert.alert('Error','Error resuming sound');
    }
}

//select another audio
export const playNext = async (playbackObj, uri) => {
    try {
        await playbackObj.stopAsync();
        await playbackObj.unloadAsync();
        return await play(playbackObj, uri)

    } catch (error) {
        console.log('Error inside playNext method', error.message)
        Alert.alert('Error', 'Unable to play next audio');
    }
}