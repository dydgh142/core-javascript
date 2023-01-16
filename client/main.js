import {
  diceAnimation,
  disableElement,
  enableElement,
  getNode,
  clearContents,
  getNodes,
  insertLast,
  visibleElement,
  invisibleElement,
  memo,
  attr,
} from './lib/index.js';

// [ 주사위 굴리기 ]
// 1. dice 애니메이션 불러오기
// 2. bindEvent 유틸 함수 만들기
// 3. handleRollingDice 함수 만들고 토글로 애니메이션 제어하기
// 4. 변수 보호를 위한 클로저 + IIFE 사용하기

// [ 레코드 리스트 보이기 ]
// 1. handleRecord 함수를 만들기
// 2. disable 활성 유틸 함수 만들기
// 3. handleReset 함수를 만듭니다.
// 4. visible 활성 유틸 함수 만들기
// 5. toggleState 유틸 함수 만들기

// [ 레코드 템플릿 뿌리기 ]
// 1. renderRecordListItem 함수 만들기
// 2. HTML 템플릿 만들기
// 3. 템플릿 뿌리기

// [ 초기화 시키기 ]
// 1. clearContent 로 정보 지우기
// 2. total, count 초기화
// 3. 스크롤 밑으로 보내기
// 4. 메모이제이션 패턴

// 배열의 구조 분해 할당  (세가지 버튼이 있는 곳을 getNodes로 한번에 불러와 배열로 저장.)
const [rollingDiceButton, recordButton, resetButton] = getNodes(
  '.buttonGroup > button'
);

const recordListWrapper = getNode('.recordListWrapper');

memo('@tbody', () => getNode('.recordListWrapper tbody'));

// 특정 대상의 속성값을 가져오거나 / 설정할 수 있는 함수

/* -------------------------------------------------------------------------- */
/* render                                                                     */
/* -------------------------------------------------------------------------- */

let count = 0; //회차를 위한 count
let total = 0; //모든 회차의 기록값을 더하기 위한 변수
// redux
// mobx

// 기록버튼 눌르고 나서 회차, 기록, 합계 등이 보이도록 하는 부분
function renderRecordListItem() {
  // 주사위 굴리고난 기록
  let diceValue = Number(attr(memo('cube'), 'data-dice'));

  let template = /* html */ `
    <tr>
      <td>${++count}</td>   
      <td>${diceValue}</td>
      <td>${(total += diceValue)}</td>
    </tr>
  `;

  //tbody에 템플릿이 없으면 추가, 있으면 그대로 반환하는 함수 => memo.js
  insertLast(memo('@tbody'), template);
  recordListWrapper.scrollTop = recordListWrapper.scrollHeight;
}

/* -------------------------------------------------------------------------- */
/* event                                                                      */
/* -------------------------------------------------------------------------- */

//1번. 주사위 굴리기 버튼
const handleRollingDice = (() => {
  //주사위 굴림을 표현하기위한 변수
  let isRolling = false;
  let stopAnimation;

  return () => {
    // 첫번째 클릭시
    if (!isRolling) {
      // console.log('첫번째 클릭');
      stopAnimation = setInterval(diceAnimation, 100);

      //기록 버튼과 초기화버튼 비활성화 시키기
      disableElement(recordButton);
      disableElement(resetButton);
    }
    // 두번재 클릭시
    else {
      // console.log('두번째 클릭');
      clearInterval(stopAnimation);

      //기록버튼과 초기화버튼 활성화 시키기
      enableElement(recordButton);
      enableElement(resetButton);
    }

    //한번 클릭이 발생한후 -> true or false로 변경하기
    isRolling = !isRolling;
  };
})();

//2번 기록버튼
const handleRecord = () => {
  //recordListWrapper -> hidden을 없애서 기록테이블이 보이도록함.
  visibleElement(recordListWrapper);
  //기록을 보여주는 함수
  renderRecordListItem();
};

//3번 초기화버튼
const handleReset = () => {
  //초기화버튼을 누르면 변수 count 와 total을 초기화 시킴
  count = 0;
  total = 0;

  //hidden을 다시 생기게 해서 기록테이블이 안보이도록 함.
  invisibleElement(recordListWrapper);
  //tbody, 즉. template로 만든 테이블의 내용을 지움.
  clearContents(memo('@tbody'));
};

//배열로 저장된 버튼들 각각 클릭이벤트 발생.
rollingDiceButton.addEventListener('click', handleRollingDice);
recordButton.addEventListener('click', handleRecord);
resetButton.addEventListener('click', handleReset);

// let eventOff = bindEvent(rollingDiceButton,'click',handlerRollingDice);
