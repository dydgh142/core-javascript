/* readyState
  0: uninitalized // 초기화 
  1: loading // 로딩
  2: loaded // 로딩이 완료된 
  3: interactive // 인터랙티브
  4: complete // 완료 
  */

import { typeError } from '../error/typeError.js';

// xhrData 함수 만들기 method, url

//CallBack 방식
export function xhrData({
  url = '',
  method = 'GET',
  body = null,
  onSuccess = null,
  onFail = null,
  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
} = {}) {
  //xhrData(options)로 받아서 const 아래와같이 선언해서 사용해도 됨.
  // const {url,method,body} = options;

  const xhr = new XMLHttpRequest();
  // console.log(xhr);
  // 비동기 통신 오픈
  xhr.open(method, url);

  //header를 key와 value값으로 나누는 작업.
  //entries는 headers 객체를 배열로  forEach는 구조분해할당을 통해 key,value로 받기
  //froEach는 배열메서드라 배열로꼭 바꿔야함. 그것이 entries.
  // Object.entries(headers).forEach(([key,value])=>{
  //   xhr.setRequestHeader(key,value);
  // })

  //readyState는 로딩 상태에 대한 정보를 주는 document 의 속성이다.
  //readyState 속성의 변화를 관찰하는 readystatechange 이벤트를 활용
  xhr.addEventListener('readystatechange', () => {
    // - 200 : 서버에 문서가 존재함.
    // 404 : 서버에 문서가 존재하지 않음.
    const { status, readyState, response } = xhr; // 객체 구조 분해 할당

    if (status >= 200 && status < 400) {
      if (readyState === 4) {
        console.log('통신 성공');

        //status와 redayState 모두 만족하다면 응답받은 response를 파싱해옴.
        // 받을때는 객체화
        onSuccess(JSON.parse(response));
      }
    } else {
      // console.error();
      onFail('통신 실패');
    }
  });

  // 서버에 요청 (요청할때는 문자화)
  xhr.send(JSON.stringify(body));
}

/* 
xhrData({
  url:'https://jsonplaceholder.typicode.com/users/1',
  method:'POST',
  onSuccess: (result)=>{
    console.log(result);
  },
  onFail:(err)=>{
    console.error(err);
  }
})
 */

// shorthand property

//get은 xhrData의 method가 기본값이 get으로 되어있기 때문에 생략가능.
xhrData.get = (url, onSuccess, onFail) => {
  xhrData({
    url,
    onSuccess,
    onFail,
  });
};

//post는 게시하고 성공혹은 실패여부를 받아와야함.
xhrData.post = (url, body, onSuccess, onFail) => {
  xhrData({
    method: 'POST',
    body,
    url,
    onSuccess,
    onFail,
  });
};

xhrData.put = (url, body, onSuccess, onFail) => {
  xhrData({
    method: 'PUT',
    body,
    url,
    onSuccess,
    onFail,
  });
};

xhrData.delete = (url, body, onSuccess, onFail) => {
  xhrData({
    method: 'DELETE',
    url,
    onSuccess,
    onFail,
  });
};

/* 
xhrData.delete(
  'https://jsonplaceholder.typicode.com/users/3',
  (result)=>{
    console.log(result);
  },
  (err)=>{
    console.log(err);
  }
)

 */

/* 
xhrData('POST','https://jsonplaceholder.typicode.com/users',{
  "name": "kindtiger",
  "username": "seonbeom",
  "email": "tiger@euid.dev",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "010-7169-0262",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
})
 */

/* 

let movePage = function (주소,성공,실패){

  // 조건에 따라 조건이 잘 맞으면 성공() || 실패()

  if(주소 === '네이버'){
    성공(주소);
  }else{
    실패();
  }

};

movePage(
  '네이바',
  (주소)=>{
    console.log('3초후 '+ 주소 +'로 이동합니다.');
    setTimeout(() => {
      window.location.href = 'https://www.naver.com/'
    }, 3000);
  }
  ,
  ()=>{
    console.log('잘못된 주소를 입력했습니다.');
  })
 */
const defaultOptions = {
  url: '',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: null,
};

function xhrPromise(options = {}) {
  const xhr = new XMLHttpRequest();

  const { method, url, body, headers } = Object.assign(
    {},
    defaultOptions,
    options
  );

  if (!url) typeError('url 인자는 반드시 필요합니다.');

  xhr.open(method, url);

  xhr.send(body ? JSON.stringify(body) : null);

  return new Promise((resolve, reject) => {
    xhr.addEventListener('readystatechange', () => {
      const { status, readyState, response } = xhr;

      if (status >= 200 && status < 400) {
        if (readyState === 4) {
          resolve(JSON.parse(response));
        }
      } else {
        reject('err');
      }
    });
  });
}

// xhrData.get(
//   'wwww.naver.com',
//   ()=>{}, // success
//   ()=>{} // fail
// )
xhrPromise.get = (url) => {
  return xhrPromise({
    url,
  });
};

xhrPromise.post = (url, body) => {
  return xhrPromise({
    url,
    body,
    method: 'POST',
  });
};

xhrPromise.put = (url, body) => {
  return xhrPromise({
    url,
    body,
    method: 'PUT',
  });
};

xhrPromise.delete = (url) => {
  return xhrPromise({
    url,
    method: 'DELETE',
  });
};

xhrPromise
  .get('https://jsonplaceholder.typicode.com/users/1')
  .then((res) => {
    insertLast(document.body, JSON.stringify(res));
  })
  .catch((err) => {
    console.log(err);
  });
