import { Transaction } from '../transaction/transaction';

export class Wallet {
  $class: string;
  id: string;
  amount: number;
  owner: string;
  transactions: Transaction[];
}
