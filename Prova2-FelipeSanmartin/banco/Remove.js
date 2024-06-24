import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';

export function Remove() {
    const [login, setLogin] = useState('');

    const remove = async () => {

        try {
            db = await create();
            let result = await db.runAsync(`DELETE FROM senhas where login = ?;`, login);
            if (result.changes > 0) {
                Alert.alert(
                    'Sucesso!',
                    'Credenciais removidas',
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
            } else alert('Erro ao remover credenciais');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ flex: 1, width: "80%" }}>
            <TextInput
                placeholder="Login: "
                onChangeText={
                    login => setLogin(login)
                }
                style={{ padding: 2 }}
            />
            <Button title="Delete" onPress={() => remove()} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});
