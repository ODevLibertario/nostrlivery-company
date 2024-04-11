import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import PurpleButton from "./PurpleButton";
import Toast from "react-native-toast-message";
import { getPublicKey } from 'nostr-tools'
import { finalizeEvent, verifyEvent, nip19 } from 'nostr-tools'

// @ts-ignore
const LoginScreen = ({navigation}) => {
  const [text, onChangeText] = React.useState('');

  const authenticate = () => {
    try {
      let sk = nip19.decode(text)

      let event = finalizeEvent({
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: JSON.stringify({
          eventType: 'LOGIN',
          params: {profile: 'company'}
        }),
      }, sk.data as Uint8Array)

      fetch('http://localhost:3000/entrypoint', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }).then((response) => {
        if(response.ok) {
          navigation.navigate('Profile')
        } else {
          response.json().then(e => {
            Toast.show({
              type: 'error',
              text1: e['error']
            });
          })

        }

      }).catch((error) => {
        Toast.show({
          type: 'error',
          text1: error.message
        })
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message
      })
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your nsec</Text>
      <TextInput style={styles.input} onChangeText={onChangeText} />
      <PurpleButton title={"Enter"} onPress={authenticate}></PurpleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    margin: '2%'
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: '2%'
  },
});

export default LoginScreen;