import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import PurpleButton from "./PurpleButton";
import Toast from "react-native-toast-message";
import { getPublicKey } from 'nostr-tools'
import { finalizeEvent, verifyEvent, nip19 } from 'nostr-tools'

let sk = nip19.decode('nsec1flqhrsshqu2gyn28kfz6mn8644el4dm3auvr82a0qlq5rsmrwwgsp3z954')
let pk = getPublicKey(sk.data) // pk is a hex string

let event = finalizeEvent({
  kind: 1,
  created_at: Math.floor(Date.now() / 1000),
  tags: [],
  content: 'hello',
}, sk.data)

let isGood = verifyEvent(event)


// @ts-ignore
const LoginScreen = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  /*
  TODO This is the simplest way possible to authenticate but it's not safe.
  I don't want to sent the nsec to the node, but it was not possible to use nostr-tools
  to validate that the nsec is valid in react-native so I'm doing this in the backend for now.
   */
  const authenticate = () => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nsec: text,
        profile: 'company'
      }),
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