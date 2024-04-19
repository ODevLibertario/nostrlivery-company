import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StorageService } from "../service/StorageService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// @ts-ignore
export const ProfileScreen = ({ navigation, route }) => {
  const [profile, setProfile] = React.useState<any>({});
  const storageService = new StorageService();

  storageService.get("profile").then((data) => {
    if (!data) {
      navigation.navigate("Login");
    }
    setProfile(data);
  });

  function navigateToHome() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity style={styles.closeBtn} onPress={navigateToHome}>
        <MaterialCommunityIcons name="close" color={"#000"} size={35} />
      </TouchableOpacity>
      <View style={styles.basicInfoContainer}>
        <View style={styles.nameInfo}>
          <Text style={{ fontWeight: "500", fontSize: 30 }}>
            {profile["display_name"]}
          </Text>
          <Text style={{ fontSize: 15, marginBottom: 10 }}>
            @{profile["name"]}
          </Text>
        </View>
        <View style={styles.profilePicContainer}>
          <View style={{ width: 80, height: 80 }}>
            <Image
              style={{
                borderRadius: 40,
                width: 80,
                height: 80,
                padding: 0,
              }}
              source={{
                uri: profile["picture"],
              }}
              alt="profile_picture"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    paddingTop: 25,
  },
  basicInfoContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    gap: 10,
  },
  nameInfo: {
    display: "flex",
    flexGrow: 3,
    justifyContent: "center",
  },
  profilePicContainer: {
    display: "flex",
    alignItems: "flex-end",
    alignContent: "flex-end",
    paddingTop: 8,
  },
  closeBtn: {
    position: "absolute",
    top: 2,
    right: 20,
  },
});
