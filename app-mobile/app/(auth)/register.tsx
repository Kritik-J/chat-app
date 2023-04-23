import { StyleSheet, StatusBar, View } from "react-native";
import React from "react";
import useMode from "../../hooks/useMode";
import { useAppDispatch } from "../../hooks/useReduce";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import Typography from "../../components/Typography";
import themes from "../../constants/themes";
import { Link } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import { registerUser } from "../../redux/authSlice";
import useAuth from "../../hooks/useAuth";

const register = () => {
  const mode = useMode();
  const { loading, error } = useAuth();
  const dispatch = useAppDispatch();

  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    if (
      !displayName ||
      !email ||
      !password ||
      displayName.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    )
      return;

    dispatch(registerUser({ displayName, email, password }));
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themes[mode].colors.background,
        },
      ]}
    >
      <Typography variant="h1">
        Welcome to{" "}
        <Typography
          variant="h1"
          style={{ color: themes[mode].colors.highlight }}
        >
          ChatApp
        </Typography>
      </Typography>

      <View style={{ height: 10 }} />

      <Typography variant="h3">
        Create an account to continue to your account
      </Typography>

      <View style={{ height: 30 }} />

      <FormInput
        placeholder="Name"
        value={displayName}
        onChangeText={setDisplayName}
      />

      <View style={{ height: 10 }} />

      <FormInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        inputProps={{ autoCapitalize: "none" }}
      />

      <View style={{ height: 10 }} />

      <FormInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        trailingIcon={
          <Octicons
            name={showPassword ? "eye-closed" : "eye"}
            size={24}
            color={themes[mode].colors.iconColor}
            onPress={toggleShowPassword}
            style={{
              marginRight: 10,
            }}
          />
        }
      />

      <View style={{ height: 20 }} />

      <Button
        title="Register"
        onPress={handleRegister}
        borderRadius={30}
        backgroundColor={themes[mode].colors.highlight}
        fontColor="white"
        spinnerColor="white"
        borderWidth={0}
        loading={loading}
      />

      <View style={{ height: 40 }} />

      <Typography
        variant="body1"
        style={{
          textAlign: "center",
        }}
      >
        Already have an account?{" "}
        <Link href="/login">
          <Typography
            variant="body1"
            style={{ color: themes[mode].colors.link }}
          >
            Login
          </Typography>
        </Link>
      </Typography>
    </View>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: (StatusBar.currentHeight as number) + 10,
  },
});
