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
            <Button title="Alterar Texto 1" onPress={altexto1} />
            <Button title="Alterar Texto 2" onPress={altexto2} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});