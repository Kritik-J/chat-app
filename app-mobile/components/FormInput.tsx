import { TextInput, View } from "react-native";
import React from "react";
import useMode from "../hooks/useMode";
import themes from "../constants/themes";

type FormInputProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onKeyPress?: (event: any) => void;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  placeholderTextColor?: string;
  fontSize?: number;
  fontWeight?: string;
  fontColor?: string;
  containerStyle?: any;
  inputStyle?: any;
  leadingIcon?: any;
  trailingIcon?: any;
  secureTextEntry?: boolean;
  keyboardType?: any;
  inputProps?: any;
  status?: "error" | "success" | "warning" | "info";
};

const FormInput = (Props: FormInputProps) => {
  const mode = useMode();

  const {
    placeholder,
    leadingIcon,
    trailingIcon,
    borderRadius = 5,
    borderWidth = 1,
    borderColor = themes[mode].colors.textInputBorderColor,
    backgroundColor = "transparent",
    placeholderTextColor = "grey",
    fontSize = 14,
    fontWeight = "normal",
    fontColor = themes[mode].colors.textInputFontColor,
    containerStyle,
    inputStyle,
    value,
    onChangeText,
    onKeyPress,
    secureTextEntry = false,
    keyboardType = "default",
    inputProps,
    status,
  } = Props;

  const statusStyle = (status: "error" | "success" | "warning" | "info") => {
    switch (status) {
      case "error":
        return themes[mode].colors.errorColor;
      case "success":
        return themes[mode].colors.successColor;
      case "warning":
        return themes[mode].colors.warningColor;
      case "info":
        return themes[mode].colors.infoColor;
      default:
        return themes[mode].colors.textInputBorderColor;
    }
  };

  return (
    <View
      style={{
        borderRadius,
        alignItems: "center",
        flexDirection: "row",
        borderWidth: borderWidth,
        borderColor: status ? statusStyle(status) : borderColor,
        backgroundColor,
        ...containerStyle,
      }}
    >
      {leadingIcon && leadingIcon}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={{
          padding: 10,
          flex: 1,
          fontSize,
          fontWeight,
          // color: status ? statusStyle(status) : fontColor,
          color: fontColor,
          ...inputStyle,
        }}
        value={value}
        onChangeText={(text: string) => {
          onChangeText && onChangeText(text);
        }}
        onKeyPress={onKeyPress}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        {...inputProps}
      />

      {trailingIcon && trailingIcon}
    </View>
  );
};

export default FormInput;
