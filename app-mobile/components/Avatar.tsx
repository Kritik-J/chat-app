import { Image } from "react-native";
import React from "react";

type AvatarProps = {
  uri: string;
  size?: number;
  borderRadius?: number;
  ImageProps?: any;
  style?: any;
};

const Avatar = (props: AvatarProps) => {
  const { uri, size = 50, borderRadius = size / 2, ImageProps, style } = props;

  return (
    <Image
      source={{ uri }}
      style={[style, { width: size, height: size, borderRadius }]}
      {...ImageProps}
    />
  );
};

export default Avatar;
