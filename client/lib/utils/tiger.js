//xhr 통신 간단한 버전 fetch  사용
const defaultOptions = {
  method: 'GET',
  mode: 'cors',
  body: null,
  cache: 'no-cache',
  credential: 'same-origin',
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

export const tiger = async (options = {}) => {
  const { url, ...restOptions } = {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...options.headers },
  };

  let response = await fetch(url, restOptions);

  if (response.ok) {
    response.data = await response.json();
  }

  // console.log(response);

  return response;
};

//get, post......
tiger.get = (url, options) => {
  tiger({ url, ...options });
};

tiger.post = (url, body, options) => {
  tiger({
    method: 'POST',
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

tiger.put = (url, body, options) => {
  tiger({
    method: 'PUT',
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

tiger.delet = (url, options) => {
  tiger({
    method: 'DELETE',
    url,
    ...options,
  });
};
