/**
 * 类型校验工具类
 * @summary 用于检查数据类型
 * @author Bruce Song <recall4056@gmail.com>
 * @license MIT
 */
export class IsUtils {
  /**
   * 判断类型
   * @param type 类型
   * @returns 返回一个函数，用于判断传入的值是否是指定的类型
   * @example
   * ```ts
   * this.#isType('Array')([]) // true
   * ```
   */
  static #isType =
    (
      type:
        | 'Array'
        | 'Object'
        | 'Function'
        | 'String'
        | 'Number'
        | 'Null'
        | 'Undefined'
        | 'Map'
        | 'Set'
        | 'RegExp'
    ) =>
    (value: any) =>
      Object.prototype.toString.call(value) === `[object ${type}]`

  /**
   * 判断是否定义
   * @description `null` 和 `undefined` 都会返回 `false`
   * @param value
   * @returns 返回一个布尔值，用于判断传入的值是否是定义
   * @example
   * ```ts
   * IsUtils.isDef('') // true
   * ```
   */
  static isDef<T>(value: T): value is NonNullable<T> {
    return value !== undefined && value !== null
  }

  /**
   * 是否是数字
   * @param value
   * @returns 返回一个布尔值，用于判断传入的值是否是数字
   * @example
   * ```ts
   * IsUtils.isNumber(0) // true
   * ```
   */
  static isNumber(value: any): value is number {
    return this.#isType('Number')(value)
  }

  /**
   * 是否是数组
   * @param value
   * @returns 返回一个布尔值，用于判断传入的值是否是数组
   * @example
   * ```ts
   * IsUtils.isArray([]) // true
   * ```
   */
  static isArray<T>(value: T[]): value is T[] {
    return this.#isType('Array')(value)
  }

  /**
   * 是否是对象
   * @param value
   * @returns 返回一个布尔值，用于判断传入的值是否是对象
   * @example
   * ```ts
   * IsUtils.isObject({}) // true
   * ```
   */
  static isObject<T>(value: T): value is T {
    return this.#isType('Object')(value)
  }

  /**
   * 是否是函数
   * @param value
   * @returns 返回一个布尔值，用于判断传入的值是否是函数
   * @example
   * ```ts
   * IsUtils.isFunction(() => {}) // true
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static isFunction(value: any): value is Function {
    return this.#isType('Function')(value)
  }

  /**
   * 是否是 Promise
   * @param value
   * @returns 返回一个布尔值，用于判断传入的值是否是 Promise
   * @example
   * ```ts
   * IsUtils.isPromise(Promise.resolve()) // true
   * ```
   */
  static isPromise<T = any>(value: any): value is Promise<T> {
    return this.isDef(value) && this.isFunction(value.then) && this.isFunction(value.catch)
  }

  /**
   * 是否是假值
   * @description `''`, `undefined`, `null`, `false`, `0`, `NaN` 都会返回 `true`
   * @param value
   * @returns 返回一个布尔值，用于判断传入的值是否是假值
   * @example
   * ```ts
   * IsUtils.isFalsy('') // true
   * ```
   */
  static isFalsy(value: any): boolean {
    return ['', undefined, null, false, 0, NaN].includes(value)
  }
}
