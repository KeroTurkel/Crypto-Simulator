import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ref, onValue, update, get, set } from "firebase/database";
import { auth, db } from "./Firebase";

const BuyScreen = () => {
  const [amount, setAmount] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { coin } = route.params;

  const isNumber = (value) => {
    return /^[0-9].?[0-9]*$/.test(value);
  };

  const handleBuy = () => {
    //User mithilfe Firebase-Authentication aufgerufen
    const user = auth.currentUser; 
    const amountNumber = parseFloat(amount || 0).toFixed(2);
    const totalCost = coin.price.toFixed(6) * amountNumber;
    const coinName = coin.symbol;
    
    if (user) { //
      const userId = user.uid;
      const coinsRef = ref(db, `users/${userId}/coins/${coinName}`);
      
      get(coinsRef).then((snapshot) => {
        const currentStück = snapshot.val()?.Stück || 0;
        const newStück = parseFloat(currentStück) + parseFloat(amountNumber);
        update(coinsRef, {
          Stück: newStück //neuer Stückzahlwert hinzugefügt.
        }); 
        //AKSA@gmail.com
        const totalGewinnRef = ref(db, `users/${userId}/Total Gewinn`);
        get(totalGewinnRef).then((snapshot) => {
          const currentTotalGewinn = snapshot.val() || 0;
          const newTotalGewinn = parseFloat(currentTotalGewinn) - totalCost;    
          update(totalGewinnRef, newTotalGewinn);
        });
      });
    }

    
  
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy {coin.name} ({coin.symbol})</Text>
      <Text style={styles.label}>Current Price: ${coin.price.toFixed(6)}</Text>
      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        keyboardType="decimal-pad"
        onChangeText={(text) => {
          if (isNumber(text)) {
            setAmount(text);
          }
        }}
        value={amount}
      />
      <Text style={styles.label}>
        Total Cost: ${coin.price.toFixed(6) * parseFloat(amount || 0).toFixed(2)}
      </Text>
      <Pressable style={styles.button} onPress={handleBuy}>
        <Text style={styles.buttonText}>Buy</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BuyScreen;
