import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  Platform,
  Pressable,
  ImageURISource,
  ImageSourcePropType,
} from "react-native";
import emoji1 from "../assets/images/emoji1.png";
import emoji2 from "../assets/images/emoji2.png";
import emoji3 from "../assets/images/emoji3.png";
import emoji4 from "../assets/images/emoji4.png";
import emoji5 from "../assets/images/emoji5.png";
import emoji6 from "../assets/images/emoji6.png";

interface EmojiList {
  onSelect: React.Dispatch<React.SetStateAction<ImageSourcePropType | null>>;
  onCloseModal: () => void;
}

export default function EmojiList(props: EmojiList) {
  const [emoji] = useState<ImageSourcePropType[]>([
    emoji1,
    emoji2,
    emoji3,
    emoji4,
    emoji5,
    emoji6,
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              props.onSelect(item);
              props.onCloseModal();
            }}
          >
            <Image source={item} key={index} style={styles.image} />
          </Pressable>
        );
      }}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
