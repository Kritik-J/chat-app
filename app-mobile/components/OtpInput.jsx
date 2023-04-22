import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import useMode from "../hooks/useMode";
import themes from "../constants/themes";

const OtpInput = ({ numInputs, onChange }) => {
  const [otp, setOtp] = useState(Array(numInputs).fill(""));

  const inputRef = useRef([]);

  const mode = useMode();

  const handleChange = (index, value) => {
    if (isNaN(+value)) {
      return;
    }

    setOtp((prevOtp) => {
      const otp = [...prevOtp];
      otp[index] = value;

      return otp;
    });

    if (value !== "") {
      if (index !== numInputs - 1) {
        inputRef.current[index + 1]?.focus();
      }
    } else {
      if (index !== 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  function handleFocus(index) {
    for (let i = index - 1; i >= 0; i--) {
      if (otp[i] === "") {
        inputRef.current[i]?.focus();
        return;
      }
    }
  }

  function handleBackspace(index) {
    if (otp[index] === "") {
      if (index !== 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  }

  React.useEffect(() => {
    onChange(otp.join(""));
  }, [otp]);

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRef.current[index] = ref)}
          style={[
            styles.input,
            {
              color: themes[mode].colors.textInputFontColor,
              borderColor: themes[mode].colors.textInputBorderColor,
            },
            otp[index] !== "" && {
              borderColor: "#128C7E",
            },
          ]}
          value={value}
          onChangeText={(text) => handleChange(index, text)}
          maxLength={1}
          keyboardType="numeric"
          onFocus={() => handleFocus(index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleBackspace(index);
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: {
    width: 48,
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: "center",
  },
});

export default OtpInput;
