import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer"
import axios from "axios";
// import { getTransaction , deleteTransaction, addTransaction } from "./Actions";
// Initital State
const initialState = {
  transactions: [],
  error: null,
  loading: true
    // { id: 1, text: "Flower", amount: -20 },
    // { id: 2, text: "Salary", amount: +500 },
    // { id: 3, text: "Book", amount: +48 },
    // { id: 4, text: "Cycle", amount: -202 },
  
}
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  const getTransaction =  async ()=>{
    try {
      const res = await axios.get('api/v1/transactions');
    dispatch({
      type: 'GET_TRANSACTIONS',
      payload :res.data.data
    })  ;
  } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload : error.responce.data
      })  
      
    }
  }
  const deleteTransaction =  async(id)=>{
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type:'DELETE_TRANSACTION',
        payload :id
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload : error.responce.data
      })  
    }
    
  }
  
  const addTransaction = async (transaction)=>{
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }
    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);
      // console.log(res);
      dispatch({
        type:'ADD_TRANSACTION',
        payload :res.data.data
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload : error,
      })  
      
    }
   
  }
  
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions, deleteTransaction, addTransaction, getTransaction, loading :state.loading, error: state.error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
