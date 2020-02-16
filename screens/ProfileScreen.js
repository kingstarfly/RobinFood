import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import Fire from "../Fire";
export default class ProfileScreen extends React.Component {
    state = {
        email: "",
        displayName: ""
    };
    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
    }
    signOutUser = () => {
        firebase.auth().signOut();
    };

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "200" }}>Hi</Text>
                    <View>
                        <Text style={{ fontWeight: "500", fontSize: 30 }}>
                            {this.state.displayName}{" "}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.signOutUser}
                >
                    <Text
                        style={{
                            color: "#FFF",
                            fontWeight: "500",
                            fontSize: 16,
                            textTransform: "uppercase"
                        }}
                    >
                        Signout
                    </Text>
                </TouchableOpacity>
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
    button: {
        marginHorizontal: 30,
        marginVertical: 30,
        padding: 20,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 24,
        alignItems: "center",
        justifyContent: "center"
    }
});
