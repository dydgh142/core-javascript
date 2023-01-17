/* 
  readyState
  0 : uninitalized  //초기화  
  1 : loading       //로딩
  2 : loaded        //로딩이 완료됨
  3 : interactive   //인터렉티브
  4 : complete      //완료
*/

function xhrData({
  url = '',
  method = 'GET',
  body = null,
  onSuccess = null,
  onFail = null,
  headers = { 'Content-Type': 'application/json' },
}) {
  // const { method, url, body } = options;
  const xhr = new XMLHttpRequest();

  // .open() + .send() => 항상 세트임!!!!
  // 비동기 통신 오픈
  xhr.open(method, url);

  //키와 value를 반환함.
  //entries는 headers 객체를 배열로  forEach는 구조분해할당을 통해 key,value로 받기
  //froEach는 배열메서드라 배열로꼭 바꿔야함. 그것이 entries.
  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value);
  });

  // 객체 구조 분해 할당
  xhr.addEventListener('readystatechange', () => {
    const { status, readyState, response } = xhr; // 객체 구조 분해 할당

    if (status >= 200 && status < 400) {
      if (readyState === 4) {
        console.log('통신 성공');

        onSuccess(JSON.parse(response));
      }
    } else {
      onFail(JSON.parse('통신실패'));
    }
  });
  // 서버에 요청
  xhr.send(JSON.stringify(body));
}

xhrData.get = (url, onSuccess, onFail) => {
  xhrData({
    url,
    onSuccess,
    onFail,
  });
};

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

// xhrData({
//   url: 'https://jsonplaceholder.typicode.com/users',
//   onSuccess: (result) => {
//     console.log(result);
//   },
//   onFail: (err) => {
//     console.error(err);
//   },
// });

// xhrData('POST', 'https://jsonplaceholder.typicode.com/users', {
//   name: 'MESSI',
//   username: 'GOAT',
//   email: 'goat@messi.psg',
//   address: {
//     street: 'Kulas Light',
//     suite: 'Apt. 556',
//     city: 'Gwenborough',
//     zipcode: '92998-3874',
//     geo: {
//       lat: '-37.3159',
//       lng: '81.1496',
//     },
//   },
//   phone: '1-770-736-8031 x56442',
//   website: 'hildegard.org',
//   company: {
//     name: 'Romaguera-Crona',
//     catchPhrase: 'Multi-layered client-server neural-net',
//     bs: 'harness real-time e-markets',
//   },
// });
