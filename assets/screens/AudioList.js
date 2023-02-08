import React from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { LayoutProvider, RecyclerListView } from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import { Audio } from 'expo-av';
import { pause, play, playNext, resume } from '../components/AudioController';

export class AudioList extends React.Component {
    static contextType = AudioContext

    constructor(props){
      super(props);
      this.state = {}
    }
    
    layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
        switch(type){
            case 'audio':
                dim.width = Dimensions.get('window').width;
                dim.height = 80;
                break;
                default:
                    dim.width = 0;
                    dim.height = 0;
        }
      }
    );
  

  

    handleAudio = async (audio) => {
      const {soundObj, playbackObj, currentAudio, updateState} = this.context;
      //playing audio for the first time
      if ( soundObj === null ){
        const playbackObj = new Audio.Sound();
        const status = await play(playbackObj, audio.uri);
        console.log(status)
        return updateState(this.context,  
        { playbackObj: playbackObj, 
        soundObj: status,
        currentAudio: audio} );
    }

    //pause audio
    if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id){
      const status = await pause(playbackObj);
      return updateState(this.context, {soundObj:status})
    }

      //resume audio
    if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id){
      const status = await resume(playbackObj);
      return updateState(this.context, { soundObj: status});

    }

    //select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id){
      const status = await playNext(playbackObj, audio.uri);
      return updateState(this.context, { soundObj: status});
    }

  }

    

    rowRenderer = (type, item) => {
        return (
          <AudioListItem title={item.filename} duration={item.duration} 
          onOptionPress={() =>
            this.handleAudio(item)
          } />
        )
    }
    render(){
        return (
          <AudioContext.Consumer>
            {({dataProvider}) => {
              return(
                <View style={styles.container}>
                     <RecyclerListView 
                    dataProvider={dataProvider} 
                    layoutProvider={this.layoutProvider} 
                    rowRenderer={this.rowRenderer}/>
                </View>
              )
            }}
          </AudioContext.Consumer>
        );
    }
    
  }




const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default AudioList