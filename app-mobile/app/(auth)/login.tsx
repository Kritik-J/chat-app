import { StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import { useAppDispatch } from "../../hooks/useReduce";
import useMode from "../../hooks/useMode";
import themes from "../../constants/themes";
import Typography from "../../components/Typography";
import FormInput from "../../components/FormInput";
import { Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Button from "../../components/Button";
import { clearError, loginUser } from "../../redux/authSlice";
import useAuth from "../../hooks/useAuth";

const login = () => {
  const mode = useMode();
  const dispatch = useAppDispatch();
  const { loading, error } = useAuth();
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({ email: "", password: "" });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLogin = () => {
    const { email, password } = form;

    if (!email || email.trim().length === 0) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }

    if (!password || password.trim().length === 0) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    dispatch(loginUser({ email, password }));
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

      <Typography variant="h3">Login to continue to your account</Typography>

      <View style={{ height: 30 }} />

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

      <View style={{ height: 10 }} />

      <Link href="/forgot-password" style={{ alignSelf: "flex-end" }}>
        <Typography
          variant="body1"
          style={{
            color: themes[mode].colors.link,
          }}
        >
          Forgot Password?
        </Typography>
      </Link>

      <View style={{ height: 20 }} />

      <Button
        title="Login"
        onPress={handleLogin}
        backgroundColor={themes[mode].colors.highlight}
        fontColor="white"
        spinnerColor="white"
        borderWidth={0}
        loading={loading}
        disabled={errors.email || errors.password ? true : false}
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
        Don't have an account?{" "}
        <Link href="/register">
          <Typography
            variant="body1"
            style={{ color: themes[mode].colors.link }}
          >
            Register
          </Typography>
        </Link>
      </Typography>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: (StatusBar.currentHeight as number) + 10,
  },
});
