import {StyleSheet, Text, TouchableOpacity} from "react-native"

// @ts-ignore
const ActionButton = ({onPress, title, color, disabled = false, customStyle = {}}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={
                disabled
                    ? {...customStyle, ...styles.button, backgroundColor: "#c8c8c8"}
                    : {...customStyle, ...styles.button, backgroundColor: color}
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

export default ActionButton
