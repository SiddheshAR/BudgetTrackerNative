import { Image, StyleSheet, Platform, View, Text, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { Category, Transaction } from '@/types';
import { useSQLiteContext } from 'expo-sqlite';
import TransactionList from '@/components/transactions/TransactionList';

export default  function HomeScreen() {
  const [categories,setCategories] = useState<Category[]>([]);
  const [transactions,setTransactions] =useState<Transaction[]>([]);

  const db = useSQLiteContext();
  async function getData(){
    const result = await db.getAllAsync<Transaction>(`SELECT * FROM Transactions ORDER BY date DESC;`);
    setTransactions(result);
    const CategoryResult  = await db.getAllAsync<Category>(`SELECT * FROM Categories;`)
    setCategories(CategoryResult);
  }
  // console.log(categories);
  useEffect(()=>{
    db.withTransactionAsync(async()=>{
      await getData();
    })
  },[db])
  const deleteTransaction =async (id:number)=>{
    db.withTransactionAsync(async ()=>{
      await db.runAsync(`DELETE FROM Transactions WHERE id = ?;`,[id]);
      await getData();
    })
  }
  return (
    <ScrollView style={styles.container}>
        <Text>Budget App</Text>
        <TransactionList transactions={transactions} categories={categories} deleteTransaction={deleteTransaction}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingVertical:60,
    paddingHorizontal:30
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
