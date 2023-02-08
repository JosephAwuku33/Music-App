import React, {createContext} from "react";
import { Alert, Text, View, StyleSheet }  from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext()

export class AudioProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            audioFiles:[],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2   ),
            playbackObj: null,
            soundObj: null,
            currentAudio: {}
        }
    }

    permissionAlert = () => {
        Alert.alert(" Permission Required", "This app needs to read audio files", [
            {
                text: "I am ready",
                onPress: () => this.getPermission()
            }, {
                text: "Cancel",
                onPress: () => this.permissionAlert()
            }
        ])
    }
    getAudioFiles = async () => {
        const {dataProvider, audioFiles} = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType:'audio'
        });

        media = await MediaLibrary.getAssetsAsync({
            mediaType:'audio',
            first: media.totalCount,
        });

        this.setState({...this.state, dataProvider: dataProvider.cloneWithRows([
            ...audioFiles, ...media.assets]), audioFiles:[...audioFiles, ...media.assets]})
    }
    getPermission = async() => {
        const permission = await MediaLibrary.getPermissionsAsync()
        if (permission.granted){
            // getting all the audio files
            this.getAudioFiles()
        }

        if (!permission.granted && permission.canAskAgain){
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if (status === 'denied' && canAskAgain){
                this.permissionAlert()
            }
        
            if (status === 'granted'){
                this.getAudioFiles() 
            }

            if (status === 'denied' && !canAskAgain){
                this.setState({...this.state, permissionError: true})        
            }
        }
    }

    componentDidMount(){
        this.getPermission()
    }

    updateState = (prevState, newState = {}) => {
        this.setState({...prevState, ...newState})
    }

    render(){
        const {audioFiles, dataProvider, permissionError, soundObj, playbackObj, currentAudio} = this.state
        if (permissionError) {
            return (
            <View style={styles.container}>
                <Text style={styles.errText}>It looks like you haven't accepted </Text>
            </View>
            )
        }
        return(
            <AudioContext.Provider value={{
                audioFiles, 
                dataProvider, 
                soundObj, 
                playbackObj, 
                currentAudio,
                updateState:this.updateState }}>
                {this.props.children}
            </AudioContext.Provider>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },

    errText: {
        fontSize: 30, 
        textAlign: 'center',
        color:'red'
    }
});

export default AudioProvider