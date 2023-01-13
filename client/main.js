// 1. 인풋 벨류값 가져오기
// 2. 이벤트 헨들러 연결
// 3. 이벤트 기본동작 차단
// 4. 두 수 합 더하기
// 5. 화면 출력

// 콘솔창에 firstInput.value로 찾을 수 있음.

const firstInput = getNode('#firstNumber'); //첫번째 숫자 노드요소를 받아옴
const secondInput = getNode('#secondNumber'); //두번째 숫자
const done = getNode('#done'); //done버튼

//입력받은 값을 반환해주는 함수
function getInputValue(node) {
  if (typeof node === 'string') node = getNode(node);
  if (node.tagName !== 'INPUT')
    refError('getInputValue 함수는 INPUT 요소만 허용합니다.');
  return node.value;
}

const sum = (valueA, valueB) => valueA + valueB;

function clearContent(node) {
  if (typeof node === 'string') node = getNode(node);
  node.textContent = '';
}

function handler(e) {
  e.preventDefault(); //done버튼을 눌렀을때 숫자들이 초기화되는것을 방지. (기본동작 차단)

  let firstValue = +getInputValue(firstInput);
  let secondValue = +getInputValue(secondInput);
  let total = sum(firstValue, secondValue);

  console.log(total);

  clearContent('.result');
  insertLast('.result', total);
}

done.addEventListener('click', handler);

// 자동으로 계산되는 부분
function inputHandler() {
  let firstValue = +getInputValue(firstInput);
  let secondValue = +getInputValue(secondInput);
  let total = sum(firstValue, secondValue);

  console.log(total);

  clearContent('.result');
  insertLast('.result', total);
}

firstInput.addEventListener('change', inputHandler);
secondInput.addEventListener('change', inputHandler);
