import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, TextComponent } from 'react-native';
import { Header } from "./src/components/Header"
import { useEffect, useState } from 'react';
import { Time } from './src/components/Time';

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

const optionsTimes = {
	0: 25,
	1: 5,
	2: 15,
};

export default function App() {

  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "LONG")
  const [isActive, setIsActive] = useState(false)

useEffect(() =>{
  let interval = null;

  if(isActive) {
    interval = setInterval(() =>{
      setTime(time - 1);
    }, 1000);
  }else {
    clearInterval(interval);
  }

  if (time === 0) {
    setIsActive(false);
    setTime(optionsTimes[currentTime] * 60);
  }
  return () => clearInterval(interval);

},[isActive, time]);

  function handleStarStop() {
    setIsActive(!isActive)
  }

  return (
    <SafeAreaView style={[styles.container,
    { backgroundColor: colors[currentTime] }
    ]}>
      <View style={{
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === "android" && 30
      }} >
        <Text style={styles.texto}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Time time={time} />

        <TouchableOpacity onPress={handleStarStop} style={styles.button}>
          <Text style={styles.buttonText}>
            {
              isActive ? "STOP" : "START"
            }
          </Text>
        </TouchableOpacity>
        <StatusBar Style="auto" />
      </View>
    
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  texto: {
    fontWeight: "bold",
    fontSize: 32,

  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",

  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  }

});
