const cache = {};

const memo = (key, callback) => {
  if (!callback) return cache[key];
  if (cache[key]) {
    console.warn('이미 캐시된 값이 존재합니다.');
    return;
  }

  cache[key] = callback();

  console.log(cache);
};

memo('name', 'tiger');
