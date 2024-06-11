import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    text: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        textTransform: "uppercase",
        paddingBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.85)',
        textShadowOffset: { width: -1, height: 0 },
        textShadowRadius: 20
    },
    emoji: {
        paddingTop: 80,
        fontSize: 80,
        textAlign: "center",
    },
    button: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        color: 'white'
    },
});