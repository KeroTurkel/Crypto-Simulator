import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import axios  from "axios";


/*const data = [
    {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        price: "0.9567",
        increase: "8.64%",
        marketCap: "949'344'3434",
    },
    {
        id: 2,
        name: "Etherium",
        symbol: "ETH",
        price: "0.9567",
        increase: "8.64%",
        marketCap: "949'344'3434",

    },
    {
        id: 3,
        name: "Polygon",
        symbol: "MATIC",
        price: "0.9567",
        increase: "8.64%",
        marketCap: "949'344'3434",
    },
    {
        id: 4,
        name: "Cardano",
        symbol: "ADA",
        price: "0.9567",
        increase: "8.64%",
        marketCap: "949'344'3434",
    },
    {
        id: 5,
        name: "Riple",
        symbol: "XRP",
        price: "0.9567",
        increase: "8.64%",
        marketCap: "949'344'3434",
    },
    {
        id: 6,
        name: "Fetch.ai",
        symbol: "FET",
        price: "0.9567",
        increase: "8.64%",
        marketCap: "949'344'3434",
    },
    {
        id: 5,
        name: "Riple",
        symbol: "XRP",
        price: "0.9567",
        increase: "8.64%",
        marketCap: "949'344'3434",
    },
    {
        id: 6,
        name: "Fetch.ai",
        symbol: "FET",
        price: "0.9567",
        increase: "8.64%",
        marketCap: "949'344'3434",
    },
  ];*/

const apiKey = 'XXXXXX';
const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}`;

//data: coin.sparkline_in_7d.price,
const MainScreen = ({navigation}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(apiUrl)
        .then(response => {
            const filteredData = response.data.data.map(item => ({
                name: item.name,
                symbol: item.symbol,
                price: item.quote.USD.price,
                marketCap: item.quote.USD.market_cap,
                cmc_rank: item.cmc_rank,
                circulating_supply: item.circulating_supply,
                max_supply: item.max_supply,
                

            }));
            setData(filteredData);

        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const [selectCoin, setSelectedCoin ] = useState(null);

    const handlePress = (coin) => {
        setSelectedCoin(coin);
        navigation.navigate("CoinInfoScreen", {coin: coin});
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cryptocurrency</Text>
            <View>
                <Text></Text>
            </View>
            <View style={{ flex: 1, alignItems: "center", width: "95%", backgroundColor: "#585858", height: "100%", marginTop: 20, borderRadius: 10, marginBottom: 10}}>
                
                <ScrollView style={styles.scrollView}>
                    <View style={{ width: "100%", alignItems: "center", marginTop: 20, marginBottom: 10}}>
                            
                                {data.map(item => (
                                    
                                        <Pressable style={[styles.coinBlocks, styles.shadowStyle]} key={item.symbol} onPress={() => handlePress(item)}>

                                            <View style={styles.containerInsideBlock}>
                                                <View style={{ flex: 1 ,alignItems: "flex-start", justifyContent: "center"}}>
                                                <Text style={styles.textColor}>{item.name} ({item.symbol})</Text>
                                                </View>
                                                <View style={[{flex: 1, alignItems: "flex-end", flexDirection: "column"}]}>
                                                    <Text style={styles.textColor}>{item.price.toFixed(9)} USD</Text>
                                                    
                                                   
                                                </View>
                                                
                                            </View>
                                        </Pressable>
                                ))}
                        
                        </View>  
                </ScrollView>
                
            </View>
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#2E2E2E',
        alignItems: 'center',
        justifyContent: 'center',
    },

    blockConainer:{
        marginTop: "20px",
        backgroundColor: "red",
        minWidth: "100%",
        height: 95,
        
    },

    coinBlocks: {
        marginBottom: 10,
        padding: 20,
        borderRadius: "12px",
        width: "93%",
        backgroundColor: "#8A8A8A",
    },

    scrollView: {
        width: "100%",
        
    },

    textColor:{
        color: "white"
    },

    title:{
        color:"white",
        fontSize: 30,
        marginTop: 30
    },

    containerInsideBlock:{
        display: "flex",
        flexDirection: "row",
        color: "white"
    },

    shadowStyle: {
    shadowRadius: 8,
    shadowOpacity: 0.2,
    shadowColor: "#757575",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    },


  });