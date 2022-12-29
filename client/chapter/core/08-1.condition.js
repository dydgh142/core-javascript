/* ---------------------------------------------------------------------- */
/* Condition                                                              */
/* ---------------------------------------------------------------------- */

// 그 영화 봤니?
//     ↓
// Yes | No
//     | 영화 볼거니?
//           ↓
//       Yes | No

// 영화 봤니?
let didWatchMovie = 'yes';

// 영화 볼거니?
let goingToWatchMovie = 'no';

// if 문(statement)
if (didWatchMovie === 'yes') {
  console.log('그거 재밌떠라');
} else if (goingToWatchMovie === 'yes') {
  console.log('너무 설렌다');
} else {
  console.log('음 난 별루');
}

// 조건부 연산자

// 멀티 조건부 연산자 식

// let number = prompt('숫자를 입력해 주세요', 0);

// if(number > 0){

// }else if(number < 0){

// }else{

// }

// let message = number > 0 ? '1' : number < 0 ? '-1' : '아무것도 아닙니다.';

// console.log(message);
