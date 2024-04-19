import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StorageService } from "../service/StorageService";

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

  return (
    <View style={styles.profileContainer}>
      <View style={styles.basicInfoContainer}>
        <View style={styles.nameInfo}>
          <Text style={{ fontWeight: "700", fontSize: 25 }}>
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
  },
  profilePicContainer: {
    display: "flex",
    alignItems: "flex-end",
    alignContent: "flex-end",
  },
});
