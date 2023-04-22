import { TextInput, View } from "react-native";
import React from "react";
import CountryPicker from "react-native-country-picker-modal";
import themes from "../constants/themes";
import useMode from "../hooks/useMode";

const MobileNumberInput = ({
  countryCode,
  setCountryCode,
  phoneNumber,
  setPhoneNumber,
  setCallingCode,
}) => {
  const handleCountryCodeChange = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode);
  };

  const mode = useMode();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: themes[mode].colors.textInputBorderColor,
      }}
    >
      <CountryPicker
        countryCode={countryCode}
        withCallingCode
        withFilter
        onSelect={handleCountryCodeChange}
        withCallingCodeButton
        containerButtonStyle={{ padding: 10 }}
        countryCodes={["IN", "US", "GB", "CA", "AU", "RU", "JP"]}
        theme={{
          fontSize: 14,
          primaryColor: themes[mode].colors.textInputFontColor,
          backgroundColor: themes[mode].colors.background,
          onBackgroundTextColor: themes[mode].colors.textInputFontColor,
          primaryColorVariant: themes[mode].colors.lineColor,
        }}
      />

      <TextInput
        style={{
          flex: 1,
          fontSize: 14,
          padding: 10,
          paddingLeft: 0,
          color: themes[mode].colors.textInputFontColor,
        }}
        placeholder="Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
        keyboardType="numeric"
      />
    </View>
  );
};

export default MobileNumberInput;
