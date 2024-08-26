import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {Category,Transaction} from '../../types'
function TransactionList({categories,transactions,deleteTransaction}:{
    categories:Category[];
    transactions:Transaction[];
    deleteTransaction:(id:number)=>Promise<void>;
}) {
  return (
    <View>
        <Text>Transactions List</Text>
        {transactions.map((transaction,index)=>{
            return(
                <TouchableOpacity 
                key={index}
                activeOpacity={0.7}
                onLongPress={()=>deleteTransaction(transaction.id)}
                >
                    <Text>{transaction.description} amount: {transaction.amount}</Text>
                </TouchableOpacity>
            )
        })}
    </View>
  )
}

export default TransactionList