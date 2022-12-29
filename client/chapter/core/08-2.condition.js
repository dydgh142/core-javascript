/* ---------------------------------------------------------------------- */
/* Logical Operators                                                      */
/* ---------------------------------------------------------------------- */
let age = +prompt(alert('나이를 입력해주세요.', 0));

if (age >= 14 && age <= 90) {
  alert('14세 이상 90세 이하입니다.');
}

let a = 10;
let b = '';
let value = Boolean(b);

//{red,3}

// 우선순위는 not / and / or

// 논리곱(그리고) 연산자
let AandB = a && b;

// 논리합(또는) 연산자
let AorB = a || b;

// 부정 연산자
let reverseValue = !value;

// 조건 처리

// 첫번째 Falsy를 찾는 연산 (&&)
let whichFalsy;

// 첫번째 Truthy를 찾는 연산 (||)
let whichTruthy;

let userName = prompt('사용자 아이디를 입력하세요.');

console.log(userName);

if (userName === 'admin') {
  let pw = prompt('비밀번호 입력하세요');

  if (pw === '123') {
    console.log('환영합니다');
  } else {
    console.log('땡');
  }
} else if (userName === '' || userName === null) {
  console.log('취소했습니다.');
} else {
  console.log('인증되지않은 사용자입니다.');
}

console.log(userName);
