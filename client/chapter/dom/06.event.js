/* ---------------------------------------------------------------------- */
/* Event Handling                                                         */
/* ---------------------------------------------------------------------- */

/* 이벤트 핸들링 3가지 방법 --------------------------------------------------- */

// 1. HTML 속성 : onclick="handler()"
// 2. DOM 프로퍼티 : element.onclick = handler
// 3. 메서드 : element.addEventListener(event, handler[, phase])

/* 이벤트 추가/제거 --------------------------------------------------------- */

const first = getNode('.first');
const second = getNode('.second');
const ground = getNode('.ground');
const ball = getNode('.ball');

// first.addEventListener('click', function(){
// });

function handler() {
  console.log('hit!');

  css('.second', 'display', 'none');
}
first.addEventListener('click', handler);

// second.addEventListener('click', function () {
//   first.removeEventListener('click', handler);
// });

function bindEvent(node, type, handler) {
  if (typeof node === 'string') {
    node = getNode(node);
  }

  if (!/mouseenter|click|mousemove|mouseleave/g.test(type)) {
    typeError(
      'bindEvent 함수의 두 번째 인자는 유효한 이벤트 타입 이어야 합니다.'
    );
  }

  node.addEventListener(type, handler);

  return () => node.removeEventListener(type, handler);
}

bindEvent('.first', 'click', handler);

const off = bindEvent('.first', 'click', handler);

bindEvent('.second', 'click', off);

//축구공

ground.addEventListener('click', function (e) {
  console.log(e.offsetX, e.offsetY);

  ball.style.transform = `translate(${e.offsetX}px,${e.offsetY}px)`;
});

//resize

// - addEventListener
// - removeEventListener
