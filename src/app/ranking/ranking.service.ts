import { Injectable } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Injectable()
export class RankingService {
  constructor() { }

  // 表示カラム取得メソッド
  getDisplayColumns(){
    return ['position', 'name', 'assets']; // 表示するカラム
  }

  // 台帳からデータを取得する
  // 枚数が同じ場合は社員番号の昇順で表示
  getDataSource(){
    // 型宣言
    let dataSource = new MatTableDataSource<Element>(ELEMENT_DATA); //表示するリスト一覧

    let result: boolean = false;
    
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
  position: string;
  name: string;
  assets: number;
}
// モック用 適当な表示用リスト
const ELEMENT_DATA: Element[] = [
  {position: '100001', name: 'TEST12 TARO', assets: 200},
  {position: '000002', name: 'TEST JIRO', assets: 199},
  {position: '000003', name: 'TEST SABU', assets: 198},
  {position: '000004', name: 'TEST SIRO', assets: 197},
  {position: '000005', name: 'TEST GORO', assets: 196},
  {position: '000006', name: 'TEST RORO', assets: 195},
  {position: '000007', name: 'TEST NARO', assets: 194},
  {position: '000008', name: 'TEST YARO', assets: 193},
  {position: '000009', name: 'TEST KURO', assets: 192},
  {position: '000010', name: 'TEST JURO', assets: 191},
  {position: '000011', name: 'TEST 11RO', assets: 190},
  {position: '000012', name: 'TEST 12RO', assets: 189},
  {position: '000013', name: 'TEST 13RO', assets: 189},
  {position: '000014', name: 'TEST 14RO', assets: 189},
  {position: '000015', name: 'TEST 15RO', assets: 189},
  {position: '000016', name: 'TEST 16RO', assets: 189}
];