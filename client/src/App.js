import './App.css';
import Header from './components/Header';
import Balance from './components/Balance';
import TransactionList from './components/TransactionList';
import { GlobalProvider } from './context/GlobalState';
import IncomeExpense from './components/IncomeExpense';
import AddTransaction from './components/AddTransaction';
function App() {
  return (
    <GlobalProvider > 

   <Header/>
   <div className="container">
<Balance/>
 <IncomeExpense/>
<TransactionList/>
<AddTransaction/>
   </div>
    </GlobalProvider>
  );
}

export default App;
