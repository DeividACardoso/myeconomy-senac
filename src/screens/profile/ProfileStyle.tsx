import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    labelContainer: {
        alignSelf: "stretch",
        paddingStart: "10%",
    },
    label: {
        color: "black",
        fontSize: 16,
        marginBottom: 10,
        textAlign: "left",
        alignSelf: "flex-start",
    },
    buttons: {
        width: "80%",
        gap: 6,
        alignItems: "center",
        paddingBottom: 20,
    },
    margin: {
        marginTop: 20,
    },
    errorText: {
        color: 'red'
    }
});