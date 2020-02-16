import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Leaderboard from "react-native-leaderboard";

export default class LeaderboardScreen extends React.Component {
  state = {
    data: [
      { userName: "ABC Caterig", highScore: 12 },
      { userName: "DEF Food Pte Ltd", highScore: 10 },
      { userName: "RED Buffet Pte Ltd", highScore: 7 },
      { userName: "Example Buffet Pte LTd", highscore: 3 },
      { userName: "24Hackathon Buffet Pte Ltd", highscore: 2 }
      //...
    ] //can also be an object of objects!: data: {a:{}, b:{}}
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: 24,
            // borderColor: "blue",
            // borderWidth: 1,
            backgroundColor: "#FFF",
            borderRadius: 5,
            marginVertical: 20
          }}
        >
          <ScrollView>
            <View style={{ flex: 1 }}>
              <View style={styles.table}>
                <Text style={styles.headerTitle}>Leaderboard</Text>
              </View>
              <View
                style={{
                  alignItems: "center"
                }}
              >
                <Leaderboard
                  data={this.state.data}
                  sortBy="highScore"
                  labelBy="userName"
                />
              </View>
            </View>
          </ScrollView>
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
  table: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
    marginVertical: 8
    // borderColor: "blue",
    // borderWidth: 1
  },
  entry: {
    textTransform: "uppercase",
    marginVertical: 20
  },
  entryTop: {
    textTransform: "uppercase",
    marginVertical: 20,
    fontSize: 30
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "500",
    marginTop: 20,
    textDecorationLine: "underline",
    justifyContent: "center",
    textAlign: "center"
  }
});
