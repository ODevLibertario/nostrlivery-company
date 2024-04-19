import React from "react";
import { View, Text } from "react-native";
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
    <View>
      <Text style={{ fontWeight: "700", fontSize: 25 }}>
        {profile["display_name"]}
      </Text>
    </View>
  );
};
