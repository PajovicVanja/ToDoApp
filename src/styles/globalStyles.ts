import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F9',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2C3E50',
        textAlign: 'center',
        marginBottom: 20,
    },
    detailTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#34495E',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 16,
        color: '#7F8C8D',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 12,
        fontSize: 16,
        color: '#2C3E50',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2C3E50',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    dateButton: {
        backgroundColor: '#3498DB',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    dateButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#2ECC71',
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    taskCategory: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    taskDueDate: {
        fontSize: 14,
        color: '#7F8C8D',
    },
    emptyText: {
        fontSize: 16,
        color: '#7F8C8D',
        textAlign: 'center',
        marginTop: 20,
    },
    swipeDeleteContainer: {
        backgroundColor: '#E74C3C',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 10,
        marginVertical: 8,
    },
    swipeDeleteText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default globalStyles;
