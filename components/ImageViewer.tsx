import React from "react";
import { StyleSheet, Image, ImageSourcePropType } from "react-native";

interface ImageViewer {
  PlaceholderImageSource: ImageSourcePropType;
  selectedImage: string | null;
}

export default function ImageViewer(props: ImageViewer) {
  const imageSource = props.selectedImage
    ? { uri: props.selectedImage }
    : props.PlaceholderImageSource;
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
