import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import Toast from "react-native-toast-message"
import { NodeService } from "../../service/NodeService"
import { StorageService, StoredKey } from "../../service/StorageService"
import { ActionButton } from "../../components/ActionButton"

export const NodeSelectionScreen = ({ navigation }: any) => {
    const [nodeUrl, onChangeNodeUrl] = useState("")

    const nodeService = new NodeService()
    const storageService = new StorageService()

    const selectNode = () => {
        nodeService
            .getNodeIdentity(nodeUrl)
            .then(() => navigation.navigate("Login"))
            .catch((e) => {
                Toast.show({
                    type: "error",
                    text1: e,
                })
            })
    }

    storageService
        .areValuesPresent(StoredKey.NODE_NPUB, StoredKey.NODE_URL)
        .then((result) => {
            if (result) {
                navigation.navigate("Login")
            }
        })
        .catch((e) => e)

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: "2%" }}>
                Node Selection
            </Text>
            <Text style={styles.label}>
                Enter your Nostrlivery node URL with schema (http:// or https://)
            </Text>
            <TextInput style={styles.input} onChangeText={onChangeNodeUrl} />
            <ActionButton title={"Enter"} color={"purple"} onPress={selectNode} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        margin: "2%",
        marginTop: "25%",
    },
    label: {
        marginBottom: 8,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: "2%",
    },
})