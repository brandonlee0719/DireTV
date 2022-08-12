/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import { WebView } from 'react-native-webview';
import MarqueeView from 'react-native-marquee-view';

const Main = ({ route, navigation }) => {
  const { videoURL, tickerData } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: videoURL }} style={{ flex: 1 }} />
      <View
        style={{
          width: '100%',
          height: 50,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Image
          style={{
            height: 40,
            width: 100,
            resizeMode: "contain"
          }}
          source={require("./../assets/ticker.png")}
        />
        <View style={{ flex: 1 }}>
          <MarqueeView
            delay={0}
          >
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              {tickerData.map((item, index) => {
                return <View key={index} style={{
                  height: 50,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <View style={{
                    width: 16,
                    height: '80%',
                    backgroundColor: '#F00',
                    marginHorizontal: 10
                  }} />
                  <Text style={{
                    color: '#000',
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginRight: 10
                  }}>{item.title}</Text>
                  <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold'
                  }}>{item.description}</Text>
                </View>
              })}

            </View>
          </MarqueeView>
        </View>
      </View>
    </View>
  );
};

export default Main;
