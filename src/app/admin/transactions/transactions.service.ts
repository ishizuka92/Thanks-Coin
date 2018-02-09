import { Injectable } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Injectable()
export class TransactionsService {
  constructor() { }

  // 表示カラム取得メソッド
  getDisplayColumns(){
    return ['sendPosition',
            'sendName', 
            'sendAssets',
            'recePosition',
            'receName',
            'sendTime',
            'message']; // 表示するカラム
  }

  // 台帳からデータを取得する
  // 枚数が同じ場合は社員番号の昇順で表示
  getDataSource(){
    // 型宣言
    let dataSource = new MatTableDataSource<Element>(ELEMENT_DATA); //表示するリスト一覧

    let result: boolean = false;

    // 取得したデータのチェック（0件だったらアラートなど）
    result = checkData(dataSource);

    return dataSource;
  }

}

// 取得したデータをチェックする
function checkData(element:MatTableDataSource<Element>):boolean{
  
    // nullチェック
    if(element == null){
       
      return false;
    }
      return true;
    }

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ここから下はモック用↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//

// リストの項目宣言(台帳から取得してくる項目をここで宣言)
export interface Element {
  sendPosition: string;
  sendName: string;
  sendAssets: number;
  recePosition: string;
  receName: string;
  sendTime: string;
  message: string; // 一時的
}
// モック用 適当な表示用リスト
const ELEMENT_DATA: Element[] = [
  {sendPosition: '100001', sendName: 'TEST TARO', sendAssets: 200, recePosition: '100000', receName: 'TARO',  sendTime: '2018-03-01 00:00:00' , message: 'thx!'},
  {sendPosition: '000002', sendName: 'TEST JIRO', sendAssets: 199, recePosition: '200000', receName: 'JIRO',  sendTime: '2018-03-01 00:00:00', message: 'thank!'},
  {sendPosition: '000003', sendName: 'TEST SABU', sendAssets: 198, recePosition: '300000', receName: 'SABU',  sendTime: '2018-03-01 00:00:00', message: 'HBD!'},
  {sendPosition: '000004', sendName: 'TEST SIRO', sendAssets: 197, recePosition: '400000', receName: 'SIRO',  sendTime: '2018-03-01 00:00:00', message: 'You Got it!'},
  {sendPosition: '000005', sendName: 'TEST GORO', sendAssets: 196, recePosition: '500000', receName: 'GORO',  sendTime: '2018-03-01 00:00:00', message: 'well done!'},
  {sendPosition: '000006', sendName: 'TEST RORO', sendAssets: 195, recePosition: '600000', receName: 'RORO',  sendTime: '2018-03-01 00:00:00', message: 'Surprise!'},
  {sendPosition: '000007', sendName: 'TEST NARO', sendAssets: 194, recePosition: '700000', receName: 'NARO',  sendTime: '2018-03-01 00:00:00', message: 'Good!'},
  {sendPosition: '000008', sendName: 'TEST YARO', sendAssets: 193, recePosition: '800000', receName: 'YARO',  sendTime: '2018-03-01 00:00:00', message: 'Amazing!'},
  {sendPosition: '000009', sendName: 'TEST KURO', sendAssets: 192, recePosition: '900000', receName: 'KURO',  sendTime: '2018-03-01 00:00:00', message: 'Fantastic!'},
  {sendPosition: '000010', sendName: 'TEST JURO', sendAssets: 191, recePosition: '110000', receName: 'JURO',  sendTime: '2018-03-01 00:00:00', message: 'cool!'},
  {sendPosition: '000011', sendName: 'TEST 11RO', sendAssets: 190, recePosition: '120000', receName: '11RO',  sendTime: '2018-03-01 00:00:00', message: 'Awesome!'},
  {sendPosition: '000012', sendName: 'TEST 12RO', sendAssets: 189, recePosition: '130000', receName: '12RO',  sendTime: '2018-03-01 00:00:00', message: 'Good Work!'},
  {sendPosition: '000013', sendName: 'TEST 13RO', sendAssets: 189, recePosition: '140000', receName: '13RO',  sendTime: '2018-03-01 00:00:00', message: 'Nice!'},
  {sendPosition: '000014', sendName: 'TEST 14RO', sendAssets: 189, recePosition: '150000', receName: '14RO',  sendTime: '2018-03-01 00:00:00', message: 'そろそろネタない'},
  {sendPosition: '000015', sendName: 'TEST 15RO', sendAssets: 189, recePosition: '160000', receName: '15RO',  sendTime: '2018-03-01 00:00:00', message: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよわいをえんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよわいをえんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよわいをえんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよわいをえんあいうえおかきくけこさしすせそたちつてとはひふへほまみむめもやいゆえよわいをえんあいうえおかきくけこさしすせそたちつてとはひふへほまみむめもやいゆえよわ'},
  {sendPosition: '000016', sendName: 'TEST 16RO', sendAssets: 189, recePosition: '170000', receName: '16RO',  sendTime: '2018-03-01 00:00:00', message: 'Supercalifragilisticexpialidocious!'}
];