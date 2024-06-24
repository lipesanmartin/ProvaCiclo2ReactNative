import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { create } from './Create.js';

export function Update() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const update = async () => {

        try {
            db = await create();
            let result = await db.runAsync(`UPDATE senhas SET password = ? WHERE login = ?;`, password, login);
            if (result.changes > 0) {
                Alert.alert(
                    'Sucesso!',
                    'Credenciais salvas',
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
            } else alert('Erro ao atualizar senha');
        } catch (error) {
            console.log(error);
        }
    }

    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let password = "";
        for (let i = 0; i < 8; i++) {
            const randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.charAt(randomNumber);
        }
        setPassword(password);
    }

    return (
        <View style={{ backgroundColor: 'white', marginTop: 70, width: "80%" }}>
            <TextInput
                placeholder="Login"
                onChangeText={
                    login => setLogin(login)
                }
                style={{ padding: 10 }}
            />
            <Button
                title="Atualizar Senha"
                onPress={() => generatePassword()}
                style={{ padding: 10 }}
            />

            <Button title="Save" disabled={(login === '' && password === '')} onPress={() => update()} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});