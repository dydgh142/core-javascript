import { getNode } from './getNode.js';
import { typeError } from '../error/index.js';

export function bindEvent(node, type, handler) {
  if (typeof node === 'string') {
    node = getNode(node);
  }

  if (!/mouseenter|click|mousemove|mouseleave/g.test(type)) {
    typeError(
      'bindEvent 함수의 두 번째 인자는 유효한 이벤트 타입 이어야 합니다.'
    );
  }

  node.addEventListener(type, handler);

  //bindEvent를 호출했응ㄹ때 이벤트를 취소할수 있는 함수가 되도록 함.
  return () => node.removeEventListener(type, handler);
}
