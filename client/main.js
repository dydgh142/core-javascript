import {
  diceAnimation,
  disableElement,
  enableElement,
  getNode,
  getNodes,
  invisibleElement,
  visibleElement,
  insertLast,
  attr,
  clearContents,
} from './lib/index.js';

/* 
  [주사위 굴리기]
  1. dice 애니매이션 불러오기
  2. bindEvent 유틸 함수 만들기
  3. handleRollingDice 함수 만들고 토글로 애니메이션 제어하기
  4. 변수 보호를 위한 클로저 + IIFE 사용하기
*/

/* 
  [레코트 리스트 보이기]
  1. handleRecord 함수를 만들기
  2. disable 활성 유틸 함수 만들기
  3. handleReset 함수 만들기
  4. visible 활성 유틸 함수 만들기
  5. toggleState 유틸 함수 만들기
*/

// [ 레코드 템플릿 뿌리기 ]
// 1. renderRecordListItem 함수 만들기
// 2. HTML 템플릿 만들기
// 3. 템플릿 뿌리기

// 배열의 구조분해 할당
const [rollingDiceButton, recordButton, resetButton] = getNodes(
  '.buttonGroup > button'
);
const recordListWrapper = getNode('.recordListWrapper');

/* const rollingDiceButton = getNode('.buttonGroup > button:nth-child(1)');
const recordButton = getNode('.buttonGroup > button:nth-child(2)');
const resetButton = getNode('.buttonGroup > button:nth-child(3)'); */
let count = 0;
let total = 0;

function renderRecordListItem() {
  let diceValue = +attr('#cube', 'data-dice');

  let template = `
    <tr>
      <td>${++count}</td>
      <td>${diceValue}</td>
      <td>${(total += diceValue)}</td>
    </tr>
  `;

  insertLast('.recordListWrapper tbody', template);

  //스크롤 밑으로 안내려도되게 길이만큼 내려주기
  recordListWrapper.scrollTop = recordListWrapper.scrollHeight;
}

/* -------------------------------------------------------------------------- */
/*                                    event                                   */
/* -------------------------------------------------------------------------- */

// IIFE 패턴
const handleRollingDice = (() => {
  let isRolling = false;
  let stopAnimation;

  return () => {
    if (!isRolling) {
      stopAnimation = setInterval(diceAnimation, 100);
      disableElement(recordButton);
      disableElement(resetButton);
    } else {
      clearInterval(stopAnimation);
      enableElement(recordButton);
      enableElement(resetButton);
    }

    isRolling = !isRolling;
  };
})();

//기록버튼 누르면 레코드 리스트 hidden=false 와 기록 띄우기
const handleRecord = () => {
  visibleElement(recordListWrapper);
  renderRecordListItem();
};

//초기화 버튼 누르면 invisible 즉 기록 list hidden=true 해버리기
const handleReset = () => {
  invisibleElement(recordListWrapper);

  clearContents('.recordListWrapper tbody');
  count = 0;
  total = 0;
};

rollingDiceButton.addEventListener('click', handleRollingDice);
recordButton.addEventListener('click', handleRecord);
resetButton.addEventListener('click', handleReset);

/* const handlerRollingDice = () =>{
  let isRolling = false;
  let stopAnimation;
  
  return () => {
    if (!isRolling) {
      stopAnimation = setInterval(diceAnimation,100);
      disableElement(recordButton);
    }else{
      clearInterval(stopAnimation);
      enableElement(recordButton);
    }
  
    isRolling = !isRolling;
  }
}
rollingDiceButton.addEventListener('click', handlerRollingDice()) */
// -> 이미 한 번 실행한다!!!
