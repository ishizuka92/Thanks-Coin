export interface User{
    user:string;
    assets:number;
}

export const USER: User[] = [
    {user: 's-takamoto', assets: 200},
    {user: 'k-ishizuka', assets: 600000000}
]

export interface HistoryElement {
    timestamp: string;
    sender: string;
    receiver: string;
    amount: number;
    message: string;
  }
  
export const HISTORY_ELEMENT_DATA: HistoryElement[] = [
    {timestamp: '2018-03-01 00:00:00', sender: 'k-ishizuka', receiver: 's-takamoto', amount: 200, message:'no message'},
    {timestamp: '2018-03-02 00:00:00', sender: 'k-ishizuka', receiver: 's-takamoto', amount: 201, message:'Hi'},
    {timestamp: '2018-03-03 00:00:00', sender: 'k-ishizuka', receiver: 's-takamoto', amount: 202, message:'Hi'},
    {timestamp: '2018-03-04 00:00:00', sender: 'k-ishizuka', receiver: 's-takamoto', amount: 203, message:'Hi'},
    {timestamp: '2018-03-05 00:00:00', sender: 'k-ishizuka', receiver: 's-takamoto', amount: 204, message:'Hi'},
    {timestamp: '2018-03-01 00:00:00', sender: 'k-ishizuka', receiver: 'k-aso', amount: 200, message:'Hi'},
    {timestamp: '2018-03-06 00:00:00', sender: 's-takamoto', receiver: 'k-ishizuka', amount: 100, message:'Hi'},
    {timestamp: '2018-03-07 00:00:00', sender: 's-takamoto', receiver: 'k-ishizuka', amount: 101, message:'Hi'},
    {timestamp: '2018-03-08 00:00:00', sender: 's-takamoto', receiver: 'k-ishizuka', amount: 102, message:'Hi'},
    {timestamp: '2018-03-09 00:00:00', sender: 's-takamoto', receiver: 'k-ishizuka', amount: 103, message:'Hi'},
    {timestamp: '2018-03-10 00:00:00', sender: 's-takamoto', receiver: 'k-ishizuka', amount: 104, message:'end'},
];