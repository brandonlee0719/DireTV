import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    Dimensions,
    View,
} from 'react-native';
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");

const Splash = ({ navigation }) => {

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
        let isLive = false;
        let tickerData = [];
        (async () => {
            isLive = await getLive();
            tickerData = await fetchData();

            console.log("---->", isLive);
            const interval = setInterval(() => {
                navigation.navigate('Main', { isLive: isLive, tickerData: tickerData });
            }, 3000);
            return () => clearInterval(interval);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Video
                source={require("./../assets/splash_background.mp4")}
                style={styles.backgroundVideo}
                muted={true}
                repeat={true}
                resizeMode={"cover"}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
            />
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require("./../assets/logo.png")}
                />
                <Text
                    style={styles.logoText}
                >tv.dire.it</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundVideo: {
        height: height,
        width: width,
        position: "absolute",
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF0',
    },
    logo: {
        height: '30%',
        resizeMode: 'contain',
    },
    logoText: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000'
    }
});

export default Splash;
