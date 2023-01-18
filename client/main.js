import { xhrData, insertLast } from './lib/index.js';

let response = tiger.get('https://jsonplaceholder.typicode.com/users/1');

console.log(response);
/* 

xhrData.get(
  'https://jsonplaceholder.typicode.com/users/1',
  (res)=>{
    insertLast('body',JSON.stringify(res))
  },
  (err)=>{
    insertLast('body','데이터 로딩에 실패했습니다.')
  }
)


 */
