import {
  getInputValue,
  getNode,
  getRandom,
  insertLast,
  clearContents,
  isNumericString,
  showAlert,
  copy,
  addClass,
  removeClass,
} from './lib/index.js';
import { jujeobData } from './data/data.js';

const submit = getNode('#submit'); //id가 submit인 주접떨기 버튼
const resultArea = getNode('.result'); //결과를 복사하기위한 버튼

function clickSubmitHandler(e) {
  e.preventDefault(); //함수 초기화

  //nameFiled에 들어온 값을 반환하는 getInputValue함수를 이용
  let name = getInputValue('#nameField');
  //미리 주접글이 써있는 data 배열을 list에 저장
  let list = jujeobData(name);
  //그 배열값중 하나를 랜덤으로 고름.
  let pick = list[getRandom(list.length - 1)];

  //만약 이름이 공백이면 로그와 함께 슬라이드 Alert를 보여줌
  if (name === '') {
    console.log('입력해주세요');
    showAlert('.alert-error', '잘못된 정보입니다.', '2000');

    //GSAP
    gsap.fromTo(
      resultArea,
      0.01,
      { x: -5 },
      { x: 5, clearProps: 'x', repeat: 20 }
    );

    // addClass(resultArea, 'shake');
    // setTimeout(() => {
    //   removeClass(resultArea, 'shake');
    // }, 1000);

    return;
  }
  //이름이 숫자로만 이루어져있을때에도 경고문
  if (isNumericString(name)) {
    console.log('제대로된 이름을 입력하세요');
    showAlert('.alert-error', '잘못된 정보입니다.', '2000');
    return;
  }
  //로그에 pick이 제대로 찍혔는지 확인
  console.log(pick);

  //먼저 결과값이 나와야하는 곳의 content를 모두 지우고
  clearContents(resultArea);
  //그리고나서 결과값을(pick)을 넣어서 출력함.
  insertLast(resultArea, pick);
}

submit.addEventListener('click', clickSubmitHandler);

function clickCopyHandler() {
  let text = resultArea.textContent;

  //console.log(copy(text));

  // copy 함수 -> navigator.clipboard.writeText(text)
  copy(text).then(() => {
    //promise 구문 (그냥 문법임)
    showAlert('.alert-success', '클립보드가 복사되었습니다.', 2000);
  });
}

resultArea.addEventListener('click', clickCopyHandler);
