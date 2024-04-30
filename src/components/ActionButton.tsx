import {GestureResponderEvent, StyleSheet, Text, TouchableOpacity} from "react-native"

type Props = {
    onPress: (event: GestureResponderEvent) => void
    title: string 
    color: string 
    disabled?: boolean
}

export const ActionButton = ({ onPress, title, color, disabled = false }: Props) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={
                disabled
                    ? {...styles.button, backgroundColor: "#c8c8c8"}
                    : {...styles.button, backgroundColor: color}
            }
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
})
