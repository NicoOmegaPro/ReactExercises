import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { FormTransaction } from './components/FormTransaction';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

export default function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <FormTransaction />
      </div>
    </GlobalProvider>
  );
}