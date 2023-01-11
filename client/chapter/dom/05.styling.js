/* ---------------------------------------------------------------------- */
/* DOM Styling                                                            */
/* ---------------------------------------------------------------------- */

const first = getNode('.first');

/* 클래스를 관리할 수 있게 해주는 DOM 프로퍼티 ------------------------------------ */

// - className – 클래스 전체를 문자열 형태로 반환해주는 프로퍼티로 클래스 전체를 관리할 때 유용
// - classList – 클래스 하나를 관리할 수 있게 해주는 메서드로 개별 클래스를 조작할 때 유용

console.log('first.className', first.className);
// first.classList.add('hello');
// first.classList.remove('hello');
console.log(first.classList.contains('is-active')); //true or false

// css.js 에 add, remove, togle 함수 있음.

/* 스타일 변경 방법 --------------------------------------------------------- */

// - style.cssText - "style" 속성 전체에 대응하므로 스타일 전체에 대한 문자열 저장

first.style.transform = 'rotate(360deg)';
first.style.backgroundColor = 'red';

/* 계산된 스타일 읽기 ------------------------------------------------------- */

let size = getComputedStyle(first).fontSize;
console.log('size', size);

// - getComputedStyle(element, [pseudoElement]) `읽기 전용`
