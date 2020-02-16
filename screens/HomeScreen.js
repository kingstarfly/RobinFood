<<<<<<< HEAD
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
=======
import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import * as firebase from "firebase";
import Fire from "../Fire";
import "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";

let db = firebase.firestore();
let auth = firebase.auth();

// temporary data until we pull from Firebase here...
// posts = [
//     {
//         id: "1",
//         name: "ABC Catering",
//         text:
//             "Time to collect by: 3.00pm\nLocation: 12 Bedok Central Rd (471234)",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage1.jpg")
//     },
//     {
//         id: "2",
//         name: "DEF Catering",
//         text: "Time to collect by: 3.15pm\nLocation: 34 Simei St 2 (421234)",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage2.jpg")
//     },
//     {
//         id: "3",
//         name: "GHI Catering",
//         text:
//             "Time to collect by: 2.40pm\nLocation: 56 Tampines East Rd (471234)",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage3.jpg")
//     },
//     {
//         id: "4",
//         name: "JKL Catering",
//         text: "Time to collect by: 3.05 pm\nLocation: 78 Kembangan Dr (471234)",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage4.jpg")
//     }
// ];

export default class HomeScreen extends React.Component {
  state = {
    posts: [],
    currentUser: null
  };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.unsubscribe = db
      .collection("posts")
      .orderBy("timestamp", "asc")
      .onSnapshot(coll => {
        let newPosts = [];
        coll.forEach(doc => {
          newPosts.push(doc.data());
        });
        let currentUser = auth.currentUser.displayName;

        let orderedPosts = [];

        newPosts.forEach(post => {
          if (post["isAccepted"] == false) {
            orderedPosts.unshift(post);
          } else {
            orderedPosts.push(post);
          }
        });

        if (this._isMounted) {
          this.setState({ posts: orderedPosts, currentUser });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.unsubscribe();
  }
  handleAccept(timestamp) {
    console.log("clicked" + timestamp);
    //Update isAccepted to true
    db.collection("posts")
      .get()
      .then(coll => {
        coll.forEach(post => {
          if (post.data().timestamp === timestamp) {
            console.log("Matched " + timestamp);
            console.log(post.id);
            return db
              .collection("posts")
              .doc(post.id.toString())
              .update({
                isAccepted: true,
                takenBy: this.state.currentUser
              })
              .then(console.log("update success"));
          }
        });
      });
  }

  renderPost = post => {
    return (
      <View style={post.isAccepted ? styles.feedItemAccepted : styles.feedItem}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>

            <Ionicons name="ios-more" size={24} color="#73788B" />
          </View>
          <Text style={styles.post}>
            Available food: {post.food}
            {"\n"}
            Collect by: {post.time}
            {"\n"}
            Address: {post.address}
            {"\n"}
            Contact: {post.contact}
            {"\n"}
            STATUS:{" "}
            {post.isAccepted ? (
              <Text style={{ color: "red" }}>Taken by {post.takenBy}</Text>
            ) : (
              <Text style={{ color: "green" }}>Available</Text>
            )}
          </Text>
          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            {!post.isAccepted && (
              <TouchableOpacity
                onPress={() => {
                  this.handleAccept(post.timestamp);
                }}
                style={{ flex: 1, flexDirection: "row" }}
              >
                <Ionicons
                  name="ios-checkmark-circle-outline"
                  size={24}
                  color="green"
                  style={{ marginRight: 20 }}
                />
                <Text>Confirm This Posting</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {this.state.currentUser
              ? "Hey, " + this.state.currentUser + "!"
              : "Loading"}
          </Text>
        </View>

        <FlatList
          style={styles.feed}
          data={this.state.posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={item => item.timestamp.toString()}
          showsVerticalScrollIndicator={false}
        ></FlatList>
>>>>>>> redid whole project
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    justifyContent: "center",
    alignItems: "center"
=======
    backgroundColor: "#EBECF4"
  },
  header: {
    paddingTop: 44,
    paddingBottom: 24,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4"
    // shadowColor: "#454D65",
    // shadowOffset: { height: 5 },
    // shadowRadius: 15,
    // shadowOpacity: 0.2,
    // zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500"
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 18,
    flexDirection: "row",
    marginVertical: 8
  },
  feedItemAccepted: {
    backgroundColor: "#FFF",
    // opacity: 0.5,
    borderRadius: 5,
    padding: 18,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
>>>>>>> redid whole project
  }
});
