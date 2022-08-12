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
  Image,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';
import MarqueeView from 'react-native-marquee-view';

const eventURL = '<iframe src="https://vimeo.com/event/2171363/embed/11f17392b8?autoplay=1&loop=1&autopause=0&muted=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>';
const showcaseURL = '<iframe src="https://vimeo.com/showcase/9576184/embed?autoplay=1&loop=1&autopause=0&muted=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>';


const Main = ({ route, navigation }) => {
  const { isLive, tickerData } = route.params;
  console.log(isLive)
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{ html: isLive ? eventURL: showcaseURL }}
      />

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
