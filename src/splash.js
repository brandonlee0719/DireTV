import React, { useEffect } from 'react';
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

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('This will be called every 2 seconds');
            navigation.navigate('Main');
        }, 5000);

        return () => clearInterval(interval);
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
