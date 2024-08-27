import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from 'react-native'
import {Category,Transaction} from '../../types'
// import {AutoSizeText,ResizeTextMode} from "react-native-text-size" 
import Card from '../ui/Card';
import { categoryColors, categoryEmojies } from '@/constants/constants';

type categoryInfo = Category | undefined;

function TransactionsListItem({transaction,categoryInfo}:{transaction:Transaction,categoryInfo:categoryInfo}) {
    // console.log(categoryInfo);
    console.log(transaction);
    const iconName = transaction.type === "Expense"?"minuscircle":"pluscircle";
    const color = transaction.type === "Expense"?"red":"green";
    const categoryColor = categoryColors[categoryInfo?.name ?? "Default"];
    const emoji = categoryEmojies[categoryInfo?.name ?? "Default"];
  return (
        <Card>
            <View style={styles.mainCtn}>
                <View style={styles.ChildFirstCtn}>
                    <View style={styles.AmountComponent}>
                        <AntDesign name={iconName} style={{fontSize:15}} color={color}/>
                        <Text style={[styles.PriceFont]}>{transaction.amount}</Text> 
                    </View>
                    <Text style={[styles.categoryContainer,{backgroundColor:categoryColor+"40"}]}>{emoji}{categoryInfo?.name}</Text>
                </View>
                <View style={[styles.SecondCtn]}>
                    <Text style={{fontSize:20,fontWeight:700}}>{transaction.description}</Text>
                    <Text style={{color:"#a8a29e"}}>
                        {new Date(transaction?.date).toDateString()}
                    </Text>
                </View>
            </View>
        </Card>
  )
}

const styles = StyleSheet.create({
    categoryContainer:{
        paddingHorizontal:10,
        paddingVertical:4,
        borderRadius:10,
        alignSelf: 'baseline'
    },
    mainCtn:{
        flex:1,
        flexDirection: 'row'
    },
    ChildFirstCtn:{
        flex:1,
        flexDirection:'column',
        gap:5,
        minWidth:'40%',
        maxWidth:'40%',
    },
    PriceFont:{
        fontSize:25,
        fontWeight:'bold',
        flex:1,
        flexDirection:'row',
        gap:4
    },
    AmountComponent:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:6
    },
    SecondCtn:{
        flex:1,
        flexDirection:'column',
        width:'auto',
        gap:5
    }
})

export default TransactionsListItem