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
import { clearError, registerUser } from "../../redux/authSlice";
import useAuth from "../../hooks/useAuth";

const register = () => {
  const mode = useMode();
  const { loading, error } = useAuth();
  const dispatch = useAppDispatch();
  const [form, setForm] = React.useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRegister = () => {
    const { displayName, email, password } = form;

    if (!displayName || displayName.trim().length === 0) {
      setErrors((prev) => ({ ...prev, displayName: "Name is required" }));
      return;
    }

    if (!email || email.trim().length === 0) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }

    if (!password || password.trim().length === 0) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    dispatch(registerUser({ displayName, email, password }));
  };

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [error]);

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
        value={form.displayName}
        onChangeText={(text) => handleChange("displayName", text)}
        status={errors.displayName ? "error" : ""}
      />
      {errors.displayName && (
        <Typography
          variant="body2"
          style={{ color: themes[mode].colors.errorColor, marginTop: 5 }}
        >
          {errors.displayName}
        </Typography>
      )}

      <View style={{ height: 10 }} />

      <FormInput
        placeholder="Email Address"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        inputProps={{ autoCapitalize: "none" }}
        status={errors.email ? "error" : ""}
      />
      {errors.email && (
        <Typography
          variant="body2"
          style={{ color: themes[mode].colors.errorColor, marginTop: 5 }}
        >
          {errors.email}
        </Typography>
      )}

      <View style={{ height: 10 }} />

      <FormInput
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
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
        status={errors.password ? "error" : ""}
      />
      {errors.password && (
        <Typography
          variant="body2"
          style={{ color: themes[mode].colors.errorColor, marginTop: 5 }}
        >
          {errors.password}
        </Typography>
      )}

      <View style={{ height: 20 }} />

      <Button
        title="Register"
        onPress={handleRegister}
        backgroundColor={themes[mode].colors.highlight}
        fontColor="white"
        spinnerColor="white"
        borderWidth={0}
        loading={loading}
        disabled={
          errors.displayName || errors.email || errors.password ? true : false
        }
      />

      {error && (
        <Typography
          variant="body1"
          style={{
            color: themes[mode].colors.errorColor,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {error}
        </Typography>
      )}

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
