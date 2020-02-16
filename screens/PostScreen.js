import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView
} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";

const firebase = require("firebase");
require("firebase/firestore");

export default class PostScreen extends React.Component {
  state = {
    image: null,
    food: "",
    address: "",
    time: "",
    name: "testname",
    contact: null
  };

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user.displayName) {
        console.log("username is:" + user.displayName);

        this.setState({ ...this.state, name: user.displayName });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handlePost = () => {
    Fire.shared
      .addPost({
        food: this.state.food.trim(),
        address: this.state.address.trim(),
        time: this.state.time.trim(),
        name: this.state.name,
        contact: this.state.contact,
        localUri: this.state.image
      })
      .then(ref => {
        this.setState({
          image: null,
          food: "",
          address: "",
          time: "",
          name: "testname",
          contact: null
        });
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        alert(error);
      });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <SafeAreaView>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
                style={styles.backButton}
              >
                <Ionicons name="md-close" size={30} color="black"></Ionicons>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.handlePost}
                style={styles.postButton}
              >
                <Text style={{ fontWeight: "500", fontSize: 18 }}>POST</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Brief Description of Food:</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.input}
                placeholder="Types of food?"
                onChangeText={food => this.setState({ food })}
                value={this.state.food}
              />
              <Text style={styles.inputTitle}>Address:</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.input}
                placeholder="Your address please!"
                onChangeText={address => this.setState({ address })}
                value={this.state.address}
              />
              <Text style={styles.inputTitle}>Collection Time:</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.input}
                placeholder="Time for NGO to collect by!"
                onChangeText={time => this.setState({ time })}
                value={this.state.time}
              />
              <Text style={styles.inputTitle}>Your contact number:</Text>

              <TextInput
                numberOfLines={4}
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Your contact number!"
                onChangeText={contact => this.setState({ contact })}
                value={this.state.contact}
              />
            </View>

            <TouchableOpacity
              style={styles.photoButton}
              onPress={this.pickImage}
            >
              <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
            </TouchableOpacity>

            <View
              style={{
                marginHorizontal: 32,
                marginVertical: 20,
                height: 150
              }}
            >
              <Image
                source={{ uri: this.state.image }}
                style={{ width: "100%", height: "100%" }}
              ></Image>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB"
  },
  inputContainer: {
    margin: 22,
    flexDirection: "column",
    flex: 1
  },
  input: {
    flex: 1,
    color: "#161F3D",
    backgroundColor: "#fafafa",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 5
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    marginBottom: 12
  },
  photoButton: {
    alignItems: "center",
    marginHorizontal: 32,
    marginTop: -20
  },
  backButton: {
    alignItems: "center",
    // backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 30
  },
  postButton: {
    alignItems: "center",
    // backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 30
  }
});
