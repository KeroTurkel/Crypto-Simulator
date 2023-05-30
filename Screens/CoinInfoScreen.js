import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue, update, get, set } from "firebase/database";
import { auth, db } from "./Firebase";

const CoinInfoScreen = ({ route }) => {
  const { coin } = route.params;
  const navigation = useNavigation();
  const [totalOwnership, setTotalOwnership] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [nonRealizedReturn, setNonRealizedReturn] = useState(0);
  //const [chartData, setChartData] = useState([]);

  /*useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7`
        );
        const { prices } = response.data;
        setChartData(prices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChartData();
  }, [coin.id]);*/


  useEffect(() => {
    // Userdaten von Realtime Datenbank
    const userId = auth.currentUser.uid;
    const coinsRef = ref(db, `users/${userId}/coins/${coin.symbol}`);
    onValue(coinsRef, (snapshot) => {
      const coinData = snapshot.val();
      if (coinData) {
        const { Stück: stück } = coinData;
        setTotalOwnership(stück);
      }
    });

    //Berechnung Total value vom ausgewählten Coin
    if (totalOwnership > 0) {
      const value = coin.price * totalOwnership;
      setTotalValue(value);
    }



  }, [coin.id, coin.symbol, coin.price, totalOwnership]);

  const handleBuy = () =>{
    navigation.navigate("BuyScreen", {
      coin: coin,
    });
  }

  const handleSell = () => {
    navigation.navigate("SellScreen",{
      coin: coin,
    })
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {coin.name} ({coin.symbol})
      </Text>
      <Text style={styles.title} >${coin.price}</Text>

      <View style={[{ flexDirection: "row", alignItems: "center"} ]}>
        <View style={[styles.btn_buy]}>
            <Pressable  onPress={() => handleBuy()}>
              <Text style={styles.textColor}>Buy</Text>
            </Pressable>
        </View>
        <View style={[styles.btn_sell ]}>
            <Pressable  onPress={() => handleSell()}>
              <Text style={styles.textColor}>Sell</Text>
            </Pressable>
        </View>
      </View>
          

          

        <Text style={styles.textColor}>Attachment</Text>
        <View style={styles.attachement}>
            <Text style={styles.textColor}>Total ownership: {totalOwnership} {coin.symbol}</Text>
            <Text style={styles.textColor}>Total value: ${totalValue.toFixed(2)}</Text>
            <Text style={styles.textColor}>Non-realised return: ${nonRealizedReturn}</Text>
            
        </View>
         
       

        <Text style={styles.textColor}>Statistic</Text>
        <View style={styles.statistic}>
            <Text style={styles.textColor}>Market Cap: ${coin.marketCap}</Text>
            <Text style={styles.textColor}>Circulating Supply: {coin.circulating_supply}</Text>
            <Text style={styles.textColor}>Max Supply: {coin.max_supply || "N/A"}</Text>
            <Text style={styles.textColor}>Rank: #{coin.cmc_rank}</Text>
        </View>
      
    </View>
  );
};

export default CoinInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2E2E",
    alignItems: "center",
    justifyContent: "center",
  },

  textColor: {
    color: "white",
    margin: 8,
  },

  title: {
    color: "white",
    fontSize: 30,
    marginTop: 10,
    
  },

  statistic:{
    backgroundColor: "#585858",
    padding: 10,
    borderRadius: 10,
    color: "white",
    width: "90%",

  },

  attachement:{
    backgroundColor: "#585858",
    padding: 10,
    borderRadius: 10,
    color: "white",
    width: "90%",

  },

  btn_buy: {
    padding: 5,
    width: 100,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 10,
    margin: 10,
  },

  btn_sell: {
    padding: 5,
    width: 100,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 10,
    margin: 10,
  }


});

/*<LineChart
        data={{
          labels: chartData.map((data) => ""),
          datasets: [
            {
              data: chartData.map((data) => data[1]),
            },
          ],
        }}
        width={Dimensions.get("window").width - 32}
        height={220}
        chartConfig={{
          backgroundColor: "#2E2E2E",
          backgroundGradientFrom: "#2E2E2E",
          backgroundGradientTo: "#2E2E2E",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />*/