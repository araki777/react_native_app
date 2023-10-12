import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import {
  GestureEvent,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

interface EmojiSticker {
  imageSize: number;
  stickerSource: ImageSourcePropType;
}

export default function EmojiSticker(props: EmojiSticker) {
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const scaleImage = useSharedValue(props.imageSize);
  const AnimatedView = Animated.createAnimatedComponent(View);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onDoubleTap = useAnimatedGestureHandler<
    GestureEvent<TapGestureHandlerEventPayload>
  >({
    onActive: () => {
      if (scaleImage.value !== props.imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    },
  });

  const onDrag = useAnimatedGestureHandler({
    onStart: (_event, context: { translateX: number; translateY: number }) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <AnimatedImage
            source={props.stickerSource}
            resizeMode="contain"
            style={[
              imageStyle,
              { width: props.imageSize, height: props.imageSize },
            ]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
}
