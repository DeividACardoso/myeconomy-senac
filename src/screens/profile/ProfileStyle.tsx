import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    labelContainer: {
        alignSelf: "center",
    },
    label: {
        color: "black",
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center",
        alignSelf: "center",
    },
    buttons: {
        width: "80%",
        gap: 6,
        alignItems: "center",
        alignSelf: "center",
        paddingBottom: 20,
    },
    margin: {
        marginTop: 20,
    },
    errorText: {
        color: 'red'
    },
    header: { position: "absolute", 
    top: 0, 
    width: "100%", 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "white", 
    height: 50, 
    zIndex: 1, },

});