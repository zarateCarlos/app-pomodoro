import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const options = ["Pomodoro", "Short break", "Long Break"];

export const Header = ({ currentTime, setCurrentTime, setTime }) => {
    function handlePress(index) {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }


    return (
        <View style={styles.container}>
            {
                options.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handlePress(index)}
                        style={[styles.item,
                         currentTime !== index && { borderColor: "transparent" },
                    ]}

                    >
                        <Text style={{ fontWeight: "bold"}}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))
            }


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    item: {
        borderWidth: 3,
        padding: 5,
        width: "33%",
        borderColor: "#fff",
        marginVertical: 20,
        borderRadius: 10,
        alignItems: "center",
        
    }
})