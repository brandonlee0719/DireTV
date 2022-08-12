/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 import { WebView } from 'react-native-webview';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 const Main = () => {
   const isDarkMode = useColorScheme() === 'dark';
   const eventURL = "https://vimeo.com/event/2171363/embed/11f17392b8";
   const showcaseURL = "https://vimeo.com/showcase/9576184/embed";
 
   const backgroundStyle = {
     flex: 1,
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   const getLive = async () => {
     let response = await fetch(
       'https://tv.dire.it/api/Videos/getlivestatus'
     );
     let json = await response.json();
     console.log(json);
     return json.isLive;
   }
   
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
 
       <View style={{ flex: 1, backgroundColor: 'red' }}>
         <WebView source={{ uri: getLive() ? eventURL : showcaseURL }} style={{ flex: 1 }} />
       </View>
 
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default Main;
 