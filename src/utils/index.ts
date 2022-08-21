type nAndS = number | string;
type stringKey = Record<string, any>;

class utils {
  /**
   *
   * 时间戳转换日期
   *
   * @param {String} value 传入的时间戳
   * @param {String} String 返回的时间
   */
  formatDate(value: string) {
    const date = new Date(value);
    const y = date.getFullYear();
    let MM: nAndS = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d: nAndS = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h: nAndS = date.getHours();
    h = h < 10 ? "0" + h : h;
    let m: nAndS = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    let s: nAndS = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
  }

  /**
   * 循环对象
   *
   * @param {Object|Array} obj 传入的值
   * @param {Function} fn 为每个项调用的回调
   */
  forEach(obj: any, fn: any) {
    if (obj === null || typeof obj === "undefined") return;

    // 如果还没有可写的东西，就强制一个数组
    if (typeof obj !== "object") obj = [obj];

    if (this.isArray(obj)) {
      // 数组循环
      for (let i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // 对象循环
      for (const key in obj) {
        /* 是否具有键 */
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }

  /**
   * 确定值是否为数组
   *
   * @param {Object} val 传入的值
   * @returns {boolean} 如果值是数组，则为True，否则为false
   */
  isArray(val: any) {
    return Object.prototype.toString.call(val) === "[object Array]";
  }

  /**
   * 确定值是否为对象
   *
   * @param {Object} obj 传入的对象
   * @returns {String} 返回类型
   */
  getObjClass(obj: any) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }

  /**
   * 深度克隆
   *
   * @param {Object} obj 传入需要克隆的对象
   * @returns {Object} 返回克隆好的对象
   */
  deepClone(obj: any) {
    let result: stringKey;
    const objClass = this.getObjClass(obj);

    if (objClass === "Object") {
      result = {};
    } else if (objClass === "Array") {
      result = [];
    } else {
      return obj; // 如果是其他数据类型不复制，直接将数据返回
    }

    // 遍历目标对象
    for (const key in obj) {
      const value = obj[key];
      result[key] = this.deepClone(value);
    }

    return result;
  }

  /**
   * 递归合并两个对象
   *
   * @param {*} target
   * @param {*} sources
   * @return {*}
   * @memberof Common
   */
  assiginObj(target: any, sources: any) {
    const obj = target;
    if (
      typeof target != "object" ||
      typeof sources != "object" ||
      typeof target
    ) {
      return sources; // 如果其中一个不是对象 就返回sources
    }
    for (const key in sources) {
      if (target.hasOwnProperty(key)) {
        obj[key] = this.assiginObj(target[key], sources[key]);
      } else {
        // 不存在就直接添加
        obj[key] = sources[key];
      }
    }
    return obj;
  }
}

export default new utils();
