import dayjs from 'dayjs'

import type { CommonTimeFormatter, LocalTimeFormatter } from '@/types'

/**
 * 时间工具类
 * @summary 用于处理日期、时间
 * @author Bruce Song <recall4056@gmail.com>
 * @license MIT
 */
export class DateUtils {
  /**
   * dayjs
   * @description dayjs 的方法
   */
  static dayjs = dayjs

  /**
   * 格式化时间
   * @description 格式化时间
   * @param time 时间
   * @param format 格式化的格式，默认为 `YYYY-MM-DD HH:mm:ss`
   * @returns 格式化后的时间
   * @example
   * ```ts
   * TimeUtils.formatTime(new Date(), 'YYYY-MM-DD HH:mm:ss')
   * ```
   */
  static formatTime(
    time?: dayjs.ConfigType,
    format: CommonTimeFormatter | LocalTimeFormatter = 'YYYY-MM-DD HH:mm:ss'
  ) {
    return dayjs(time).format(format)
  }

  /**
   * 将时间转化为 dayjs 对象
   * @param time 时间
   * @returns dayjs 对象
   * @example
   * ```ts
   * TimeUtils.convertToDayjs('2023-09-20 00:00:00')
   * ```
   */
  static convertToDayjs(time?: dayjs.ConfigType) {
    return dayjs(time).isValid() ? dayjs(time) : undefined
  }

  /**
   * 获取时间差
   * @param start 开始时间
   * @param end 结束时间
   * @returns 时间差，单位：毫秒
   * @description 该方法的参数可以是 Date 对象，也可以是时间字符串
   * - 如果是字符串，会转换为 Date，然后再转换为时间戳
   * - 如果是 Date 对象，会转换为时间戳
   * @example
   * ```ts
   * TimeUtils.getDuration('2023-09-20 00:00:00', '2023-09-20 23:59:59')
   * ```
   */
  static getDuration(start?: string | number | Date, end?: string | number | Date): number {
    if (!start || !end) return 0
    const startTimestamp =
      typeof start === 'string' || typeof start === 'number'
        ? new Date(start).getTime()
        : start.getTime()
    const endTimestamp =
      typeof end === 'string' || typeof end === 'number' ? new Date(end).getTime() : end.getTime()
    return endTimestamp - startTimestamp
  }

  /**
   * 是否是今年
   * @param time 时间
   * @example
   * ```ts
   * TimeUtils.isCurrentYear('2023-09-20 00:00:00')
   * ```
   */
  static isCurrentYear(time?: dayjs.ConfigType) {
    return dayjs(time).isSame(new Date(), 'year')
  }
}
