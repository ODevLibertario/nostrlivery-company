import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import PurpleButton from "./PurpleButton";
import Toast from "react-native-toast-message";
import {NodeService} from "../service/NodeService";
import {StorageService} from "../service/StorageService";

// @ts-ignore
const NodeSelectionScreen = ({navigation}) => {
  const [nodeUrl, onChangeNodeUrl] = React.useState('');

  const nodeService = new NodeService()
  const storageService = new StorageService()

  const selectNode = () => {
    nodeService.getNodeIdentity(nodeUrl).then(result =>
        navigation.navigate('Login')
    ).catch(e => {
      Toast.show({
        type: 'error',
        text1: e
      });
    })
  }

  storageService.areValuesPresent('nodeNpub', 'nodeUrl').then(result => {
    if(result) {
      navigation.navigate("Login")
    }
  }).catch(e => e)

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: '2%'}}>Node Selection</Text>
      <Text style={styles.label}>Enter your Nostrlivery node URL with schema (http:// or https://)</Text>
      <TextInput style={styles.input} onChangeText={onChangeNodeUrl} />
      <PurpleButton title={"Enter"} onPress={selectNode}></PurpleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    margin: '2%',
    marginTop: '25%'
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

export default NodeSelectionScreen;