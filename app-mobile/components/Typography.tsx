import useMode from "../hooks/useMode";
import React from "react";
import { Text } from "react-native";
import themes from "../constants/themes";

type TypographyProps = {
  variant: "h1" | "h2" | "h3" | "h4" | "body1" | "body2";
  children: React.ReactNode;
  style?: any;
  textProps?: any;
};

const Typography = ({
  variant,
  children,
  style,
  textProps,
}: TypographyProps) => {
  const mode = useMode();

  let textStyle = {};

  switch (variant) {
    case "h1":
      textStyle = styles.h1;
      break;
    case "h2":
      textStyle = styles.h2;
      break;
    case "h3":
      textStyle = styles.h3;
      break;
    case "h4":
      textStyle = styles.h4;
      break;
    case "body1":
      textStyle = styles.body1;
      break;
    case "body2":
      textStyle = styles.body2;
      break;
    default:
      textStyle = styles.body1;
  }

  return (
    <Text
      style={[
        textStyle,
        {
          color: themes[mode].colors.text,
        },
        style,
      ]}
      {...textProps}
    >
      {children}
    </Text>
  );
};

const styles = {
  h1: {
    fontSize: 32,
    fontWeight: "600",
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
  },
  h3: {
    fontSize: 18,
    fontWeight: "600",
  },
  h4: {
    fontSize: 16,
    fontWeight: "600",
  },
  body1: {
    fontSize: 14,
  },
  body2: {
    fontSize: 12,
  },
};

export default Typography;
