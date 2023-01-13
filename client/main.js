import {
  getInputValue,
  getNode,
  getRandom,
  insertLast,
  clearContents,
  isNumericString,
  showAlert,
} from './lib/index.js';
import { jujeobData } from './data/data.js';

const submit = getNode('#submit');
const result = getNode('.result');

console.log('submit', submit);

getRandom;

function clickSubmitHandler(e) {
  e.preventDefault();

  let name = getInputValue('#nameField');
  let list = jujeobData(name);
  let pick = list[getRandom(list.length - 1)];

  if (name === '') {
    console.log('입력해주세요');

    return;
  }
  if (isNumericString(name)) {
    console.log('제대로된 이름을 입력하세요');
    showAlert('.alert-error', '잘못된 정보입니다.', '2000');
    return;
  }
  console.log(pick);

  clearContents(result);
  insertLast(result, pick);
}

submit.addEventListener('click', clickSubmitHandler);
