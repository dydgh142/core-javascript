/* ---------------------------------------------------------------------- */
/* Array's Methods                                                        */
/* ---------------------------------------------------------------------- */

// Array.isArray
const arr = [10, 100, 1000, 10000];

console.log(typeof arr);
console.log(Array.isArray(arr));

// let letter = Object.prototype.toString.call([]).slice(8, -1).toLowerCase();

function isArray(data) {
  return (
    Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === 'array'
  );
}
function isNull(data) {
  return (
    Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === 'null'
  );
}

console.log(Array.isArray([]));

/* 요소 순환 -------------------------------------------------------------- */

// @@@@@@@@@@@@@    forEach
// $.each(index, item) jQuery 헷갈림주의
const user = {};
arr.forEach(function (item, index) {
  this[index] = item;
}, user);

//스팬 전부 찍어보기
const span = document.querySelectorAll('span');

span.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    console.log((e.target.style.background = 'orange'));
  });
});

/* 원형 파괴 -------------------------------------------------------------- */

// push
// pop
// unshift
// shift
// reverse
// arr.reverse();

// splice
arr.splice(1, 0, 23, 5); //1번째 index부터 시작 / 0개 제거/ 23, 5 추가. -> 10,23,5,100,1000,10000

arr.splice(1, 2); //1번째 index부터 2개 제거

// sort
// arr.reverse();
// arr.sort();

// 반환 값 < 0 : a가 b보다 앞에 있어야 한다
// 반환 값 = 0 : a와 b의 순서를 바꾸지 않는다
// 반환 값 > 0 : b가 a보다 앞에 있어야 한다
arr.sort((a, b) => {
  return a - b;
});

/* 새로운 배열 반환 --------------------------------------------------------- */

// concat
// slice
// map
let newArray = arr.map((item) => item * 2);

let todo = ['밥먹기', '미용실가기', '공부하기'];

let template = todo.map((todoList) => {
  return /* html */ `<li>${todoList}</li>`;
});

template.forEach((item) => {
  document.body.insertAdjacentHTML('beforeend', item);
});

/* 요소 포함 여부 확인 ------------------------------------------------------ */

// indexOf
// lastIndexOf
// includes
console.log(`includes:`, arr.includes(10));

/* 요소 찾기 -------------------------------------------------------------- */
const users = [
  { id: 1, name: '로운' },
  { id: 2, name: '승택' },
  { id: 3, name: '연주' },
];
// find
const find = users.find((item, index) => {
  return item.id < 3;
});
// findIndex
const findIndex = users.findIndex((item) => {
  return item.id === 3;
});

/* 요소 걸러내기 ----------------------------------------------------------- */

// filter
let result = arr.filter((number) => {
  return number < 100;
});
console.log('result', result);

/* 요소별 리듀서(reducer) 실행 ---------------------------------------------- */
const friends = [
  {
    name: '윤보라',
    age: 28,
    job: '작꼬져',
  },
  {
    name: '이로운',
    age: 23,
    job: '배고픈 개발자',
  },
  {
    name: '오승택',
    age: 21,
    job: '물음표살인마',
  },
];
// reduce
let sumAge = friends.reduce((sum, cur) => {
  return sum + cur.age;
}, 0);

console.log('sumAge', sumAge);

let template2 = todo.reduce((acc, cur, index) => {
  return /* html */ acc + `<li>할일${index + 1} : ${cur}의 값</li>`;
}, '');
console.log('template2', template2);

// reduceRight

/* string ←→ array 변환 ------------------------------------------------- */
let str = '성찬 보경 일범 세민 형진 주현';

// split
let nameArray = str.split(' ');
console.log('nameArray', nameArray);

// join : 배열 -> 문자
console.log('nameArray', nameArray.join('/'));
