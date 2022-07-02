class Vue {
  constructor(options) {
    // 将用户数据绑定到实例的 $data 属性
    this.$data = options.data;
    // 数据监听
    observer(this.$data);
    // 模板编译
    compile(options.el, this);
  }
}

// 数据监听，将 data 属性变成响应式的数据
function observer(data) {
  // 递归出口
  if (!data || typeof data !== 'object') return;

  const dependency = new Dependency();

  // 遍历 data 对象
  Object.keys(data).forEach((key) => {
    let value = data[key];

    // 递归数据
    observer(value);

    // 数据劫持
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      // 拦截属性的 getter 操作
      get() {
        console.log(`获取了属性值 ${value}`);
        // 将 Watcher 实例添加到依赖列表（依赖收集），Dependency.temp 存放的是临时 watcher 实例
        Dependency.temp && dependency.addSub(Dependency.temp);
        return value;
      },
      // 拦截属性的 setter 操作
      set(newVal) {
        console.log(`修改了属性值`);
        value = newVal;
        // 递归，处理将属性修改成新的对象的情况
        observer(newVal);
        // 通知所有依赖（Watch 实例）触发 update 方法，更新模板数据
        dependency.notify();
      },
    });
  });
}

// 模板编译，将文本节点 {{ obj.key }} 替换成 data 里的属性值
function compile(element, vm) {
  // 将 DOM 节点存放到实例的 $el 属性
  vm.$el = document.querySelector(element);

  // 创建文档碎片
  const fragment = document.createDocumentFragment();
  let child;

  // 临时存放所有 DOM 节点
  while ((child = vm.$el.firstChild)) {
    fragment.appendChild(child);
  }

  // 解析文档碎片
  fragmentCompile(fragment);

  function fragmentCompile(node) {
    // 正则用于匹配 {{ obj.key }}，并且捕获 obj.key
    const pattern = /\{\{\s*(\S+)\s*\}\}/;

    // 判断该节点为文本节点
    if (node.nodeType === 3) {
      const texts = node.nodeValue;
      // 执行正则匹配
      const regexResult = pattern.exec(node.nodeValue);
      if (regexResult) {
        // 处理可能存在的 obj.key1.key2 这种深层属性值的情况
        const arr = regexResult[1].split('.');
        // 使用 reduce 获取深层属性值
        const value = arr.reduce((total, current) => total[current], vm.$data);
        // 执行 replace 将 {{ obj.key }} 替换成属性值
        node.nodeValue = texts.replace(pattern, value);
        // 实例化 Watcher
        new Watcher(vm, regexResult[1], (newVal) => {
          node.nodeValue = texts.replace(pattern, newVal);
        });
      }
    }

    if (node.nodeType === 1 && node.nodeName === 'INPUT') {
      const attr = Array.from(node.attributes);

      attr.forEach((item) => {
        if (item.nodeName === 'v-model') {
          const value = item.nodeValue
            .split('.')
            .reduce((total, current) => total[current], vm.$data);
          node.value = value;
          new Watcher(vm, item.nodeValue, (newVal) => {
            node.value = newVal;
          });
          node.addEventListener('input', (e) => {
            const arr1 = item.nodeValue.split('.');
            const arr2 = arr1.slice(0, arr1.length - 1);
            const final = arr2.reduce(
              (total, current) => total[current],
              vm.$data
            );
            final[arr1[arr1.length - 1]] = e.target.value;
          });
        }
      });
    }

    node.childNodes.forEach((child) => fragmentCompile(child));
  }

  vm.$el.appendChild(fragment);
}

class Dependency {
  constructor() {
    this.subscribers = [];
  }
  addSub(sub) {
    this.subscribers.push(sub);
  }
  notify() {
    this.subscribers.forEach((sub) => sub.update());
  }
}

class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.callback = callback;
    Dependency.temp = this;
    key.split('.').reduce((total, current) => total[current], vm.$data);
    Dependency.temp = null;
  }
  update() {
    const value = this.key
      .split('.')
      .reduce((total, current) => total[current], this.vm.$data);
    this.callback(value);
  }
}
