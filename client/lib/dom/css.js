//CSS 속성 제어
function addClass(node, className) {
  if (typeof node === 'string') {
    node = getNode(node);
  }

  if (typeof className !== 'string') {
    TypeError('addClass 함수의 두번째 인자는 문자 타입이어야 합니다.');
  }

  node.classList.add(className);
}

function removeClass(node, className) {
  if (typeof node === 'string') {
    node = getNode(node);
  }

  if (!className) {
    node.className = '';
    return;
  }

  if (typeof className !== 'string') {
    TypeError('addClass 함수의 두번째 인자는 문자 타입이어야 합니다.');
  }

  node.classList.remove(className);
}

function toggleClass(node, className) {
  if (typeof node === 'string') {
    node = getNode(node);
  }

  if (typeof className !== 'string') {
    TypeError('addClass 함수의 두번째 인자는 문자 타입이어야 합니다.');
  }

  node.classList.toggle(className);
}

// CSS 자체를 제어하는 것
function getCss(node, prop) {
  if (typeof node === 'string') {
    node = getNode(node);
  }

  if (!(prop in document.body.style)) {
    syntaxError('안댐');
  }

  return getComputedStyle(node)[prop];
}

function setCss(node, prop, value) {
  if (typeof node === 'string') {
    node = getNode(node);
  }

  if (!(prop in document.body.style)) {
    syntaxError(
      'setCss 함수의 두번째 인자인 prop은 유효한 css 속성이 아닙니다.'
    );
  }
  if (!value) {
    syntaxError('setCss 함수의 세번째 인자는 필수값 입니다.');
  }

  node.style[prop] = value;
}

function css(node, prop, value) {
  if (!value) {
    return getCss(node, prop);
  } else {
    setCss(node, prop, value);
  }
}
