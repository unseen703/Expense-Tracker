import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

// AddTransaction is the component that repesents add new transation part of site
// and it will call  the functoion on submit when we submit the form
// it will set the object new transaction
const AddTransaction = () => {
    const [text, setText] = useState('');
    const[amount, setAmount] = useState(0);

    // function from global provider
    const { addTransaction } = useContext(GlobalContext);

    const onSubmit= e=>{
      e.preventDefault();

      if(text === ""){
        alert("Enter Type of Expenss");
      }
      else if( amount ===  0){
        alert("Enter Valid Amount");
      }
      else{
      const newTransaction = {
        // id: Math.floor(Math.random() * 100000000),
        text, 
        amount: +amount}
        addTransaction(newTransaction);
      }

      //function  that sets value in global provider
      setText("");
      setAmount();
    }
  return (
    <>
       <h3>Add new transaction</h3>
      <form onSubmit={onSubmit} >
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text"  value={text} onChange = { (e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number"  value={amount} onChange = { (e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn" type='submit'>Add transaction</button>
      </form>
    </>
  )
}

export default AddTransaction;
