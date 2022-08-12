/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

const eventURL = "https://vimeo.com/event/2171363/embed/11f17392b8";
const showcaseURL = "https://vimeo.com/showcase/9576184/embed";

const Main = () => {
  const [videoUrl, SetVideoUrl] = useState(eventURL);

  const getLiveURL = async () => {
    let response = await fetch(
      'https://tv.dire.it/api/Videos/getlivestatus'
    );
    let json = response.json();
    let url = json.isLive ? eventURL : showcaseURL;
    return url;
  }

  useEffect(() => {
    SetVideoUrl(getLiveURL());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: videoUrl }} style={{ flex: 1 }} />
    </View>

  );
};

export default Main;
