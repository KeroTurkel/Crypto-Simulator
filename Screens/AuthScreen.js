import React, {useState} from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, Button, TouchableOpacity } from 'react-native';
import { db, auth } from './Firebase';
import { ref, set, push, equalTo, orderByChild} from "firebase/database";
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [startCapital, setStartCapital] = useState(0);
  const navigation = useNavigation();

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("MainScreen");
      })//Kroo@gmail.com
      .catch((error) => {
        console.log('Login error', error);
      });
  }

  const handleSignup = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Benutzer erfolgreich registriert
        const user = userCredential.user; //User-UID
        const newUser = {
          startCapital: 25000,
        };
        //User-UID Realtime Database und Authentication gleich
        set(ref(db, `users/${user.uid}`), newUser, error => { 
          if (error) {
            console.log('Insert user error', error);
          } else {
            console.log('User added successfully!');
          }
        });
        setStartCapital(25000); //Startkapital
      })
      .catch((error) => {
        console.log('Signup error', error);
      });
    navigation.navigate("AuthScreen");
  }
  
      
  return(
        
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Cryptocurrency Simulator</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder={"Email"} style={styles.input} value={email} onChangeText={txt => setEmail(txt)} />
        <TextInput placeholder={"Password"} style={styles.input} value={password} onChangeText={txt => setPassword(txt)} secureTextEntry />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, styles.btnOutline]}
        >
          <Text style={styles.btnOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#2E2E2E",
        alignItems: "center",
        justifyContent: "center",
      },


    inputContainer: {
        width: '80%',

    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,

    },
    btnContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,

    },
    button: {
        backgroundColor: '#D37506',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',


    },

    btnOutline: {
        borderColor: '#D37506',
        backgroundColor: 'white',
        borderWidth: 2,
        marginTop: 5,


    },
    btnText: {
        color: 'white',
        fontSize: 15,

    },

    btnOutlineText: {
        color: '#D37506',
        fontSize: 15,
    },
    title: {
        color: "white",
        fontSize: 30,
        marginBottom: 50,
        
      },
});

