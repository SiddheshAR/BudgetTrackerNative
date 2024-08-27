import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {Category,Transaction} from '../../types'
import TransactionsListItem from './TransactionsListItem';
function TransactionList({categories,transactions,deleteTransaction}:{
    categories:Category[];
    transactions:Transaction[];
    deleteTransaction:(id:number)=>Promise<void>;
}) {

    
  return (
    <View>
        <Text>Transactions List</Text>
        {transactions.map((transaction,index)=>{
            // console.log(categories);
            const categoryForCurrentItem = categories.find((item)=>transaction?.category_id == item?.id)
            // const categoryForCurrentItem = undefined;
            return(
                <TouchableOpacity 
                key={index}
                activeOpacity={0.7}
                onLongPress={()=>deleteTransaction(transaction.id)}
                >
                    {/* <Text>{transaction.description} amount: {transaction.amount}</Text> */}
                    <TransactionsListItem categoryInfo={categoryForCurrentItem} transaction={transaction}/>
                </TouchableOpacity>
            )
        })}
    </View>
  )
}

export default TransactionList