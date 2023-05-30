import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ref, onValue, update, get, set } from "firebase/database";
import { auth, db } from "./Firebase";

const SellScreen = () => {
  const [amount, setAmount] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { coin } = route.params;
  const [currentStück, setCurrentStück] = useState(0); // neue state Variable


  const isNumber = (value) => {
    return /^[0-9].?[0-9]*$/.test(value);
  };

  useEffect(() => {
    const user = auth.currentUser;
    const coinName = coin.symbol;

    if (user) {
      const userId = user.uid;
      const coinsRef = ref(db, `users/${userId}/coins/${coinName}`);

      // Abfrage des aktuellen Bestands des Coins aus der Datenbank
      get(coinsRef).then((snapshot) => {
        const currentStück = snapshot.val()?.Stück || 0;
        setCurrentStück(parseFloat(currentStück));
      });
    }
  }, [coin.symbol]);

  const handleSell = () => {
    const user = auth.currentUser;
    const amountNumber = parseFloat(amount || 0).toFixed(2);
    const totalValue = coin.price.toFixed(6) * amountNumber;
    const coinName = coin.symbol;
    //Kroo@gmail.com
    if (user) {
      const userId = user.uid;
      const coinsRef = ref(db, `users/${userId}/coins/${coinName}`);
      
      get(coinsRef).then((snapshot) => {
        const currentStück = snapshot.val()?.Stück || 0;
        const newStück = parseFloat(currentStück) - parseFloat(amountNumber);
        
        update(coinsRef, {
          Stück: newStück
        });
        
        const totalGewinnRef = ref(db, `users/${userId}/Total Gewinn`);
        get(totalGewinnRef).then((snapshot) => {
          const currentTotalGewinn = snapshot.val() || 0;
          const newTotalGewinn = parseFloat(currentTotalGewinn) + totalValue;
          
          update(totalGewinnRef, newTotalGewinn);
        });
      });
    }

    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell {coin.name} ({coin.symbol})</Text>
      <Text style={styles.label}>Current Price: ${coin.price.toFixed(6)}</Text>
      <Text style={styles.label}>Current Ownership: {currentStück}</Text>
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
        Total Value: ${coin.price.toFixed(6) * parseFloat(amount || 0).toFixed(2)}
      </Text>
      <Pressable style={styles.button} onPress={handleSell}>
        <Text style={styles.buttonText}>Sell</Text>
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
  
  export default SellScreen;

