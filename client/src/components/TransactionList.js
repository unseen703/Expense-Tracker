import React , { useContext, useEffect }from 'react'

import Transaction from './Transaction';
import { GlobalContext } from '../context/GlobalState'
const TransactionList = () => {
  const { transactions , getTransaction} = useContext(GlobalContext);
  // console.log(context) 
  useEffect(()=>{
    getTransaction();
    // eslint- disable-next-line react hooks/exhaustive-deps
  },[])
  return (
    <>
       <h3>History</h3>
      <ul id="list" className="list">
      {transactions.map(transaction =>(<Transaction key={ transaction.id } transaction = {transaction}/>))}
        
      </ul>
    </>
  )
}

export default TransactionList
