// 获取 [min, max] 区间的随机整数
function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

module.exports = getRandom;
