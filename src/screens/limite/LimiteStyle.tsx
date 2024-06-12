import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
},
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  scrollView: {
    marginTop: 20,
  },
  despesaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  despesaText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonEdit: {
    backgroundColor: '#f0ad4e',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonDelete: {
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  buttons: {
    backgroundColor: '#4CAF50'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 20,
},
});