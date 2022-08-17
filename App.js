/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import {
   StatusBar,
   StyleSheet,
   View,
   Text,
   Image,
   Dimensions,
   Platform
 } from 'react-native';
 import Video from "react-native-video";
 
 // import Splash from './src/splash';
 // import Main from './src/main';
 
 import Orientation from 'react-native-orientation-locker';
 import { WebView } from 'react-native-webview';
 import MarqueeView from 'react-native-marquee-view';
 import FastImage from 'react-native-fast-image'
 
 const { width, height } = Dimensions.get("window");
 const eventURL = '<iframe src="https://vimeo.com/event/2171363/embed/11f17392b8?autoplay=1&loop=1&autopause=0&muted=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>';
 const showcaseURL = '<iframe src="https://vimeo.com/showcase/9576184/embed?autoplay=1&loop=1&autopause=0&muted=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>';
 
 
 Orientation.lockToLandscape();
 
 const App = () => {
 
   console.disableYellowBox = true;
 
   const [isLoading, setIsLoading] = useState(false);
   const [isLive, setIsLive] = useState(true);
   const [tickerData, setTickerData] = useState([]);
 
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
 
   useEffect(() => {
     setIsLoading(true);
     (async () => {
       setIsLive(await getLive());
       setTickerData(await fetchData());
       const interval = setInterval(() => {
         setIsLoading(false);
       }, 5000);
       return () => clearInterval(interval);
     })();
   }, []);
 
   useEffect(() => {
     const interval = setInterval(async () => {
       setIsLive(await getLive());
     }, 60000);
     return () => clearInterval(interval);
   }, [isLive]);
 
   return (
     <>
       <StatusBar hidden={true} />
       <View style={[styles.container, { display: isLoading ? "flex" : "none" }]}>
         <Video
           source={require("./assets/splash_background.mp4")}
           style={styles.backgroundVideo}
           muted={true}
           repeat={true}
           resizeMode={"stretch"}
           posterResizeMode={"stretch"}
           rate={1.0}
           ignoreSilentSwitch={"obey"}
         />
         <View style={styles.logoContainer}>
           <FastImage
             style={styles.logo}
             source={require("./assets/logo.png")}
             resizeMode={FastImage.resizeMode.contain}
           />
           <Text
             style={styles.logoText}
           >tv.dire.it</Text>
         </View>
       </View>
       <View style={[styles.container, { display: isLoading ? "none" : "flex", position: 'relative' }]}>
         <View style={{ width: isLive ? '100%' : '92%', height: isLive ? '100%' : '92%', alignSelf: 'center' }}>
           <WebView
             style={{ backgroundColor: '#000', width: '100%'}}
             source={{ html: isLive ? eventURL : showcaseURL }}
              useWebKit={true}
              originWhitelist={['*']}
              allowsInlineMediaPlayback={true}
           />
         </View>
 
         <View
           style={[styles.tickerContainer, { display: isLive ? "none" : "flex" }]}>
           <Image
             style={styles.tickerLogo}
             source={require("./assets/ticker.png")}
           />
           <View style={[{ backgroundColor: '#fff', height: '100%', width: '86%', justifyContent: 'center', display: 'flex' }]}>
             <MarqueeView delay={0} style={{ backgroundColor: '#FFF', width: '100%', height: '100%' }}>
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
         </View>
         <Image
           style={[styles.whiteLogo, { right: Platform.OS === 'ios' ? isLive ?  '11%': '14%': isLive ? '3%' : '6%' }]}
           source={require("./assets/white_logo.png")}
         />
       </View>
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
     width: Platform.OS === 'ios' ? '75.5%': '92%',
     height: '8%',
     paddingVertical: 2,
     display: 'flex',
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#FFF',
     zIndex: 100
   },
   tickerLogo: {
     height: '90%',
     width: '10%',
     resizeMode: "contain",
     marginHorizontal: '2%'
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
     color: '#000',
     fontSize: 14,
     fontWeight: 'bold',
     marginRight: 10,
     fontFamily: 'RobotoCondensed-Regular'
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
   }
 });
 
 export default App;
 