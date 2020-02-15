import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

import * as firebase from "firebase";
import Fire from "../Fire";
import "firebase/firestore";

let db = firebase.firestore(); // db is now our database from firestore

export default class HomeScreen extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.unsubscribe = db.collection("posts").onSnapshot(posts => {
      let newPosts = [];
      posts.forEach(post => {
        newPosts.push(post.data());
      });
      this.setState({ posts: newPosts });
      console.log("Retrieved posts from firestore!");
    });
  }

  componentWillUnmount() {
    this.unsubscribe(); // to unsubscribe from firebase listener event, else will be bad for app performance
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> HomeScreen with feed of posts </Text>
        <Text>
          {" "}
          The name of the poster for first post is ...{" "}
          {this.state.posts.length > 0 ? this.state.posts[0]["name"] : "NIL"}
        </Text>
        <Text>
          {" "}
          The number of posts in my state is ... {this.state.posts.length}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
