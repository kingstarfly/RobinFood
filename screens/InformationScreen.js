import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class InformationScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text
            style={{
              marginBottom: 10,
              fontSize: 24,
              fontFamily: "sans-serif-condensed"
            }}
          >
            To Caterers
          </Text>
          <Text style={styles.text}>
            Have leftover food? Don’t throw them away! Create a posting and
            potentially benefit someone else. Have leftover disposable cutlery
            and napkins? Don’t throw them away! Pass it on to our food
            charities.
          </Text>
        </View>

        <View style={styles.card}>
          <Text
            style={{
              marginBottom: 10,
              fontSize: 24,
              fontFamily: "sans-serif-condensed"
            }}
          >
            To Food Charities
          </Text>
          <Text>
            We make collecting food easier for you! Simply browse the feed and
            select a posting you like! Take note of the time that the caterer
            has requested you to arrive by. Additionally, please bring your own
            containers for food storage! Unused cutlery and napkins will also be
            available to be taken! If they are not going to be used by your
            beneficiaries, we ask of you to please recycle them!
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    borderRadius: 20,
    padding: 30,
    margin: 20,
    backgroundColor: "#a7e07e"
  },
  text: {}
});
