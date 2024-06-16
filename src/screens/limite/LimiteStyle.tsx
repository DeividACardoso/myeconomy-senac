import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  scrollView: {
    marginTop: 20,
  },
  despesaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  despesaText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonEdit: {
    backgroundColor: "#f0ad4e",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonDelete: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    width: "80%",
    height: 40,
    // backgroundColor: '#4CAF50',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    // flex: 1,
    // textAlign: 'center'
    backgroundColor: "#4CAF50",
  },
  buttonPesquisa: {
    width: "60%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 12,
    textAlign: "center",
    backgroundColor: "#4CAF50",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    alignItems: "center",
    flex: 1,
    textAlign: "center",
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
},
limiteItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#4CAF50',
  padding: 8,
  marginBottom: 8,
  borderRadius: 8,
},
limiteText: {
  fontSize: 16,
  color: '#fff',
},
limitActions: {
  flexDirection: 'row',
},
actionButton: {
  marginLeft: 8,
},
actionButtonText: {
  fontSize: 16,
},
historyTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
},
datepicker: {
  height: 40,
  marginBottom: 16,
  alignSelf: 'center',
  width: '100%',
},
});
