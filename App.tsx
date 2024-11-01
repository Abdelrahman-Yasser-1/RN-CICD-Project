import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Animated,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const icons = [
  {
    name: 'Fastlane',
    icon: 'https://fastlane.tools/favicon.ico',
    link: 'https://fastlane.tools/',
  },
  {
    name: 'Firebase',
    icon: 'https://firebase.google.com/favicon.ico',
    link: 'https://firebase.google.com/',
  },
  {
    name: 'CircleCI',
    icon: 'https://circleci.com/favicon.ico',
    link: 'https://circleci.com/developer/',
  },
];

const screenshots = [
  require('./screenshots/image1.png'),
  require('./screenshots/image3.png'),
  require('./screenshots/image2.png'),
];

function App(): React.JSX.Element {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;

  const handleNext = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % screenshots.length);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [opacity]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext]);

  // const handlePrevious = () => {
  //   Animated.timing(opacity, {
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     setCurrentImageIndex(prevIndex =>
  //       prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1,
  //     );
  //     Animated.timing(opacity, {
  //       toValue: 1,
  //       duration: 500,
  //       useNativeDriver: true,
  //     }).start();
  //   });
  // };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar />
      <Text style={styles.title}>React Native CICD</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>
          Try <Text style={styles.highlightedText}>CICD</Text> for{' '}
          <Text style={styles.highlightedText}>React Native</Text>
          project with <Text style={styles.highlightedText}>
            Fastlane{' '}
          </Text>, <Text style={styles.highlightedText}>Firebase </Text>
          ,and <Text style={styles.highlightedText}>CircleCI</Text>
        </Text>
        <View style={styles.icons}>
          {icons.map(icon => (
            <Pressable
              key={icon.name}
              onPress={() => {
                Linking.openURL(icon.link);
              }}
              style={styles.icon}>
              <Image source={{uri: icon.icon}} style={styles.iconImage} />
              <Text
                style={StyleSheet.compose(styles.text, styles.highlightedText)}>
                {icon.name}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={StyleSheet.compose(styles.text, styles.highlightedText)}>
          Screenshots
        </Text>
        <Animated.Image
          source={screenshots[currentImageIndex]}
          style={[styles.screenshotImage, {opacity}]}
        />
        <View style={styles.indicatorContainer}>
          {screenshots.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentImageIndex && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
        {/* <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handlePrevious}>
            <Text style={styles.buttonText}>Previous</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 20,
    color: 'blue',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40,
  },
  highlightedText: {
    color: 'blue',
  },
  icon: {
    gap: 20,
    alignItems: 'center',
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  icons: {
    flexDirection: 'row',
    margin: 20,
    gap: 30,
  },
  screenshotImage: {
    width: 300,
    height: 150,
    marginTop: 20,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
  activeIndicator: {
    width: 30,
    backgroundColor: 'blue',
  },
});

export default App;
