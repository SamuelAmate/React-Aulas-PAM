import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
    const [texto1, setTexto1] = useState('Texto 1');
    const altexto1 = () => {
        setTexto1('Texto 1 Alterado');
    }
    const [texto2, setTexto2] = useState('Texto 2');
    const altexto2 = () => {    
        setTexto2('Texto 2 Alterado');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{texto1}</Text>
            <Text style={styles.text}>{texto2}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Alterar Texto 1" onPress={altexto1} color="#4CAF50" />
                <Button title="Alterar Texto 2" onPress={altexto2} color="#FF5722" />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        flexDirection: 'column',
    },
    text: {
        fontSize: 20,
        fontFamily: 'Arial',
        color: '#333',
        marginBottom: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
