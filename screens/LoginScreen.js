import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    LayoutAnimation
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        email: "",
        password: "",
        errorMessage: null
    };

    handleLogin = () => {
        const { email, password } = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        LayoutAnimation.easeInEaseOut();

        return (
            <KeyboardAwareScrollView enableOnAndroid>
                <View style={styles.container}>
                    <StatusBar barStyle="light-content"></StatusBar>
                    <Image
                        source={require("../assets/authHeader.png")}
                        style={{ marginTop: -220, marginLeft: -50 }}
                    ></Image>

                    <Image
                        source={require("../assets/robinfood.png")}
                        style={{
                            marginTop: -20,
                            alignSelf: "center",
                            width: 200,
                            height: 200
                        }}
                    ></Image>

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && (
                            <Text style={styles.error}>
                                {this.state.errorMessage}
                            </Text>
                        )}
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            ></TextInput>
                        </View>

                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                autoCapitalize="none"
                                onChangeText={password =>
                                    this.setState({ password })
                                }
                                value={this.state.password}
                            ></TextInput>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleLogin}
                    >
                        <Text style={{ color: "#FFF", fontWeight: "500" }}>
                            Sign in
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ alignSelf: "center", marginTop: 32 }}
                        onPress={() =>
                            this.props.navigation.navigate("Register")
                        }
                    >
                        <Text style={{ color: "#414959", fontSize: 13 }}>
                            New to RobinFood? {":) "}
                            <Text
                                style={{ fontWeight: "500", color: "#E9446A" }}
                            >
                                Sign up
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginTop: -40,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    }
});
