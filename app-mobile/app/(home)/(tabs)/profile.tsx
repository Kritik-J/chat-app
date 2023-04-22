import { StyleSheet, View } from "react-native";
import useMode from "../../../hooks/useMode";
import themes from "../../../constants/themes";
import Typography from "../../../components/Typography";
import Avatar from "../../../components/Avatar";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import { IUser } from "../../../types";
import Button from "../../../components/Button";
import { useAppDispatch } from "../../../hooks/useReduce";
import { logoutUser } from "../../../redux/authSlice";

export default function Profile() {
  const mode = useMode();
  const dispatch = useAppDispatch();
  const { user, loading } = useAuth() as { user: IUser; loading: boolean };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themes[mode].colors.background },
      ]}
    >
      {user && (
        <View style={styles.header}>
          <Avatar uri={user.photoURL} size={100} />

          <View style={{ height: 10 }} />

          <Typography variant="h3">{user.displayName}</Typography>

          <View style={{ height: 10 }} />

          <Button
            title="Logout"
            onPress={handleLogout}
            borderRadius={30}
            backgroundColor={themes[mode].colors.highlight}
            fontColor="white"
            spinnerColor="white"
            borderWidth={0}
            loading={loading}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#cccccc",
  },
});
