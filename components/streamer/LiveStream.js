import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { WebView } from 'react-native';

export default function LiveStream(){
    return (
        <WebView
        originWhitelist={['*']}
        source={{uri: 'http://192.168.3.137:3030/video_feed'}}
          />
    );
}