export interface User{
    user:string;
    assets:number;
}

export const USER: User[] = [
    {user: 's-takamoto', assets: 200},
    {user: 'k-ishizuka', assets: 600000000}
]

export interface HistoryElement {
    time: string;
    from: string;
    to: string;
    amount: number;
    message: string;
  }
  
export const HISTORY_ELEMENT_DATA: HistoryElement[] = [
    {time: '2018-03-01 00:00:00', from: 'k-ishizuka', to: 's-takamoto', amount: 200, message:'no message'},
    {time: '2018-03-02 00:00:00', from: 'k-ishizuka', to: 's-takamoto', amount: 201, message:'Hi'},
    {time: '2018-03-03 00:00:00', from: 'k-ishizuka', to: 's-takamoto', amount: 202, message:'Hi'},
    {time: '2018-03-04 00:00:00', from: 'k-ishizuka', to: 's-takamoto', amount: 203, message:'Hi'},
    {time: '2018-03-05 00:00:00', from: 'k-ishizuka', to: 's-takamoto', amount: 204, message:'Hi'},
    {time: '2018-03-01 00:00:00', from: 'k-ishizuka', to: 'k-aso', amount: 200, message:'Hi'},
    {time: '2018-03-06 00:00:00', from: 's-takamoto', to: 'k-ishizuka', amount: 100, message:'Hi'},
    {time: '2018-03-07 00:00:00', from: 's-takamoto', to: 'k-ishizuka', amount: 101, message:'Hi'},
    {time: '2018-03-08 00:00:00', from: 's-takamoto', to: 'k-ishizuka', amount: 102, message:'Hi'},
    {time: '2018-03-09 00:00:00', from: 's-takamoto', to: 'k-ishizuka', amount: 103, message:'Hi'},
    {time: '2018-03-10 00:00:00', from: 's-takamoto', to: 'k-ishizuka', amount: 104, message:'end'},
];