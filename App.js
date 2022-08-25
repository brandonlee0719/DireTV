/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState, useRef } from 'react';
 import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';
 import {
   StatusBar,
   StyleSheet,
   View,
   Text,
   Image,
   Dimensions,
   Platform,
   AppState,
   LogBox
 } from 'react-native';
 import Video from "react-native-video";
 
 import Orientation from 'react-native-orientation-locker';
 import { WebView } from 'react-native-webview';
 import MarqueeView from 'react-native-marquee-view';
 import FastImage from 'react-native-fast-image';
 
 const { height } = Dimensions.get("window");
 const eventURL = '<iframe src="https://vimeo.com/event/2171363/embed/11f17392b8?autoplay=1&loop=1&autopause=0&muted=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>';
 const showcaseURL = '<iframe src="https://vimeo.com/showcase/9576184/embed?autoplay=1&loop=1&autopause=0&muted=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>';
 
 
 Orientation.lockToLandscape();
 const videoWidth = height * 0.92 * 16 / 9;
 
 const App = () => {
 
   LogBox.ignoreLogs(['new NativeEventEmitter']);
   LogBox.ignoreAllLogs();
 
   // const appState = useRef(AppState.currentState);
   // const [appStateVisible, setAppStateVisible] = useState(appState.current);
 
   const [isLoading, setIsLoading] = useState(true);
   const [isLive, setIsLive] = useState(true);
   const [tickerData, setTickerData] = useState([]);
   const [videoData, setVideoData] = useState([]);
   const [playIndex, setPlayIndex] = useState(-1);
   const [curTime, setCurTime] = useState("00:00");
 
   const getLive = async () => {
     let response = await fetch(
       'https://tv.dire.it/api/Videos/getlivestatus'
     );
     let json = await response.json();
     return json.isLive;
   }
 
   const fetchData = async () => {
     try {
       let url = "https://www.dire.it/feed/ultimenews";
       let urlWithCorsAnywhere = `https://api.rss2json.com/v1/api.json?rss_url=${url}&api_key=nfrmkxownjdzgy2n5vtuwkhav7w8ivakwqyz6wtj&count=100`;
       let data = await fetch(urlWithCorsAnywhere);
       let json = await data.json();
       if (data.ok) {
         return json.items;
       } else {
         console.log("Error occurred while fetching feed");
       }
     } catch (error) {
       console.log(error.toString());
     }
   }
 
   const fetchVideoData = async () => {
     try {
       let url = "https://tv.dire.it/api/Videos/getallvideos?page=0&size=10&category=all";
       let data = await fetch(url);
       let json = await data.json();
       if (data.ok) {
         return json.videos;
       } else {
         console.log("Error occurred while fetching feed");
       }
     } catch (error) {
       console.log(error.toString());
     }
   }
 
   useEffect(() => {
     setIsLoading(true);
     (async () => {
       setIsLive(await getLive());
       setTickerData(await fetchData());
       setVideoData(await fetchVideoData());
       // const interval = setInterval(() => {
       //   setIsLoading(false);
       // }, 5000);
       // return () => clearInterval(interval);
     })();
   }, []);
 
   useEffect(() => {
     const interval = setInterval(async () => {
       setIsLive(await getLive());
     }, 60000);
     return () => clearInterval(interval);
   }, [isLive]);
 
   useEffect(() => {
     const interval = setInterval(async () => {
       let current = `${makeTwoLength(new Date().getHours())}:${makeTwoLength(new Date().getMinutes())}`;
       setCurTime(current);
     }, 1000);
     return () => clearInterval(interval);
   }, []);
 
   const makeTwoLength = (number) => {
     if (number < 10) {
       return `0${number}`
     } else {
       return `${number}`
     }
   }
 
   // useEffect(() => {
   //   const subscription = AppState.addEventListener("change", nextAppState => {
   //     if (
   //       appState.current.match(/inactive|background/) &&
   //       nextAppState === "active"
   //     ) {
   //       console.log("App has come to the foreground!");
   //     }
 
   //     appState.current = nextAppState;
   //     setAppStateVisible(appState.current);
   //   });
 
   //   return () => {
   //     subscription.remove();
   //   };
   // }, []);
 
   const setNextVideo = () => {
     const index = playIndex + 1 === videoData.length ? 0 : playIndex + 1;
     setPlayIndex(index);
   }
 
   return (
     <>
       <StatusBar hidden={true} />
       <PrefersHomeIndicatorAutoHidden />
       {isLoading && <View style={styles.container}>
         <Video
           source={require("./assets/splash_background.mp4")}
           style={{ height: '100%', width: height * 16 / 9, alignSelf: 'center', }}
           muted={false}
           repeat={false}
           paused={false}
           resizeMode={"contain"}
           posterResizeMode={"contain"}
           rate={1.0}
           ignoreSilentSwitch={"ignore"}
           onEnd={() => setIsLoading(false)}
         />
       </View>}
       {!isLoading &&
         <View style={[styles.container, { display: isLoading ? "none" : "flex", position: 'relative' }]}>
           <View style={{ width: isLive ? '100%' : videoWidth, height: isLive ? '100%' : '92%', alignSelf: 'center' }}>
             {isLive && <WebView
               style={{ backgroundColor: 'transparent', width: '100%' }}
               source={{ html: eventURL }}
               useWebKit={true}
               originWhitelist={['*']}
               allowsInlineMediaPlayback={true}
             />}
             {!isLive && <View style={{ width: '100%', height: '100%' }}>
               {playIndex == -1 && <Video
                 source={require("./assets/dire_tv.mp4")}
                 style={{ width: '100%', height: '100%' }}
                 muted={false}
                 repeat={false}
                 paused={false}
                 resizeMode={"contain"}
                 posterResizeMode={"contain"}
                 rate={1.0}
                 controls={true}
                 ignoreSilentSwitch={"ignore"}
                 onEnd={() => setPlayIndex(0)}
               />}
               {videoData.length !== 0 && videoData.map((video, index) => {
                 return index == playIndex && <Video
                   key={index}
                   source={{ uri: video.mp4url }}
                   style={{ width: '100%', height: '100%', }}
                   muted={false}
                   repeat={false}
                   paused={false}
                   resizeMode={"contain"}
                   posterResizeMode={"contain"}
                   rate={1.0}
                   controls={true}
                   ignoreSilentSwitch={"ignore"}
                   onEnd={() => setNextVideo()}
                 />
               })}
             </View>}
           </View>
 
           {!isLive && <View
             style={styles.tickerContainer}>
             <FastImage
               style={styles.tickerLogo}
               source={require("./assets/ticker.png")}
               resizeMode={FastImage.resizeMode.contain}
             />
             <Text style={styles.time}>{curTime}</Text>
             <View style={[{ backgroundColor: '#blue', height: '100%', width: '95%', justifyContent: 'center', display: 'flex' }]}>
               <MarqueeView
                 style={{ backgroundColor: '#FFF', width: '100%', height: '100%' }}
                 delay={0}
                 speed={0.25}
               >
                 <View style={styles.marqueeContainer}>
                   {tickerData.map((item, index) => {
                     return <View key={index} style={styles.marqueeView}>
                       <View style={styles.marqueeSeperator} />
                       <Text style={styles.marqueeTitle}>{item.title}</Text>
                       <Text style={styles.maqueeDescription}>{item.description}</Text>
                     </View>
                   })}
                 </View>
               </MarqueeView>
             </View>
           </View>}
           <FastImage
             style={[styles.whiteLogo, { right: Platform.OS === 'ios' ? isLive ? '11%' : '14%' : isLive ? '3%' : '6%' }]}
             source={require("./assets/white_logo.png")}
             resizeMode={FastImage.resizeMode.contain}
           />
         </View>}
     </>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#000'
   },
   backgroundVideo: {
     flex: 1,
     position: "absolute",
     top: 0,
     bottom: 0,
     left: 0,
     right: 0
   },
   logoContainer: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#FFF0',
   },
   logo: {
     height: '30%',
     width: '100%',
     resizeMode: 'contain',
   },
   logoText: {
     marginTop: 10,
     fontSize: 22,
     fontWeight: 'bold',
     color: '#000'
   },
   tickerContainer: {
     alignSelf: 'center',
     width: height * 0.92 * 16 / 9,
     height: '8%',
     overflow: 'hidden',
     paddingVertical: 2,
     display: 'flex',
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#FFF',
     marginTop: Platform.OS === "ios" ? -1 : 0,
   },
   tickerLogo: {
     height: '100%',
     width: '5%',
     resizeMode: "contain",
     marginHorizontal: 10
   },
   marqueeContainer: {
     height: '100%',
     width: '100%',
     display: 'flex',
     flexDirection: 'row',
   },
   marqueeView: {
     height: '100%',
     display: 'flex',
     flexDirection: 'row',
     alignItems: 'center'
   },
   marqueeSeperator: {
     width: 8,
     height: 30,
     marginHorizontal: 10,
     backgroundColor: '#FF0000',
   },
   marqueeTitle: {
     fontSize: 14,
     fontWeight: 'bold',
     marginRight: 10,
     fontFamily: 'RobotoCondensed-Regular',
     color: '#000'
   },
   maqueeDescription: {
     fontSize: 14,
     fontFamily: 'RobotoCondensed-Regular'
   },
   whiteLogo: {
     position: 'absolute',
     width: 40,
     height: 40,
     resizeMode: 'contain',
     top: 14,
     opacity: 0.7
   },
   time: {
     fontSize: 14,
     fontWeight: 'bold',
     marginRight: 10,
     color: '#000'
   }
 });
 
 export default App;
 