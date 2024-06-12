import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 12,
},
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    width: "80%",
    backgroundColor: "#bfbbbb",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
    borderColor: "black",
    borderWidth: 1,
    minWidth: 100,
  },
  disabledtext: {
    fontSize: 18,
    textAlign: "center",
    color: "#7f7f7f",
    fontWeight: "bold",
  },
});
