import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        color: 'black',
        fontWeight: '600',
    },
    picker: {
        height: 40,
        marginBottom: 16,
        alignSelf: 'center',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 8,

    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 16,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    expenseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: 8,
        marginBottom: 8,
        borderRadius: 8,
    },
    expenseText: {
        fontSize: 16,
        color: '#fff',
    },
    expenseActions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 8,
    },
    actionButtonText: {
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
    },
    datepicker: {
        height: 40,
        marginBottom: 16,
        alignSelf: 'center',
        width: '100%',
    },
});

export default styles;