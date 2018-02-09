import { Injectable } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Injectable()
export class HistoryService {
  constructor() { }

  // 表示カラム取得メソッド
  getDisplayColumns(){
    return ['status',
            'position', 
            'partner',
            'assets',
            'time',
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
  status: string;
  position: string;
  partner: string;
  assets: number;
  time: string;
  message: string;
}
// モック用 適当な表示用リスト
const ELEMENT_DATA: Element[] = [
  {status: 'send',    position: '100001', partner: 'SEND TARO', assets: 200, time: '2018-03-01 00:00:00', message: 'thx!'},
  {status: 'send',    position: '100002', partner: 'SEND JIRO', assets: 200, time: '2018-03-01 00:00:00', message: 'thank you!'},
  {status: 'receive', position: '100003', partner: 'RECV TARO', assets: 300, time: '2018-03-01 00:00:00', message: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよわいをえんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよわいをえんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよわいをえんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよわいをえんあいうえおかきくけこさしすせそたちつてとはひふへほまみむめもやいゆえよわいをえんあいうえおかきくけこさしすせそたちつてとはひふへほまみむめもやいゆえよわ'}, 
  {status: 'seceive', position: '100004', partner: 'RECV JIRO', assets: 300, time: '2018-03-01 00:00:00', message: 'Hoge Hoge Fooo!'}
];