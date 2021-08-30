namespace Kojo {
  interface Name {
    ID: string
    EVENT: string
    BRANCH?: string
  }
  const _K = (...ARR) => ["KOJO", ...ARR].join("_")
  const K = ["ID", "EVENT", "BRANCH"]
  export const template = new Map()

  /**
   * 设置口上方法 
   * @date 2021-08-19
   * @param {any} name:(Name|string|string[]
   * @param {Function} callback
   * @returns {Map}
   */
  function hasIDandEVENT(name) {
    return Object.keys(name).includes("ID") && Object.keys(name).includes("EVENT")
  }
  function filterKey(v, i) {
    if (K[i] === "BRANCH" && !v) {
      return false
    }
    if (typeof v === "string" || typeof v === "number") {
      return true
    }
    throw new Error(`请正确输入值 String类型 或者 Number类型 ${K[i]}:${JSON.stringify(v)}`);

  }
  export function set(name: (Name | string | Array<(string | number)>), callback): Map<string, any> {
    const names = Object.prototype.toString.call(name)
    let key: any
    if (names === "[object String]") {
      return template.set(name, callback)
    }
    if (names === "[object Object]" && hasIDandEVENT(name)) {
      key = _K(...K.map(v => name[v]).filter((v, i) => filterKey(v, i)))
      console.log(K, key);
      return template.set(key, callback)

    }
    if (Array.isArray(name)) {
      const keys = name.filter(v => typeof v === "string" || typeof v === "number")
      console.log(K, keys);

      if (keys.length > 1 && keys.length < 4) {
        key = _K(...keys)
        console.log(K, key);
        return template.set(key, callback)
      }

    }
    throw new Error(`请传递正确的值 String类型 或者 Object类型要有 { ID , EVENT , BRANCH? } 或者 Array类型 [ID , EVENT , BRANCH?]. ${JSON.stringify(name)}`);

  }
  export function get(name: (Name | string | Array<(string | number)>), ...args: any[]) {
    const names = Object.prototype.toString.call(name)
    let key
    if (names === "[object String]") {
      return template.get(name)
    }
    if (names === "[object Object]" && hasIDandEVENT(name)) {
      key = _K(...K.map(v => name[v]).filter((v, i) => filterKey(v, i)))
      console.log(K, key);
      return template.get(key)

    }
    if (Array.isArray(name)) {
      const keys = name.filter(v => typeof v === "string" || typeof v === "number")
      console.log(K, keys);

      if (keys.length > 1 && keys.length < 4) {
        key = _K(...keys)
        console.log(K, key);
        return template.get(key)
      }
    }

    throw new Error(`请传递正确的值 String类型 或者 Object类型要有 { ID , EVENT , BRANCH? } 或者 Array类型 [ID , EVENT , BRANCH?]. ${JSON.stringify(name)}`);

  }

  export function has(name: (Name | string | Array<(string | number)>)) {
    const names = Object.prototype.toString.call(name);
    let key;
    if (names === "[object String]") {
      return template.has(name)
    }
    if (names === "[object Object]" && hasIDandEVENT(name)) {
      key = _K(...K.map(v => name[v]).filter((v, i) => filterKey(v, i)))
      console.log(K, key);
      return template.has(key)

    }
    if (Array.isArray(name)) {
      const keys = name.filter(v => typeof v === "string" || typeof v === "number")
      console.log(K, keys);

      if (keys.length > 1 && keys.length < 4) {
        key = _K(...keys)
        console.log(K, key);
        return template.has(key)
      }
    }
    throw new Error(`请传递正确的值 String类型 或者 Object类型要有 { ID , EVENT , BRANCH? } 或者 Array类型 [ID , EVENT , BRANCH?]. ${JSON.stringify(name)}`);

  }


  export function del(name: (Name | string | Array<(string | number)>)) {
    const names = Object.prototype.toString.call(name);
    let key;
    if (names === "[object String]") {
      return template.delete(name)
    }
    if (names === "[object Object]" && hasIDandEVENT(name)) {
      key = _K(...K.map(v => name[v]).filter((v, i) => filterKey(v, i)))
      console.log(K, key);
      return template.delete(key)

    }
    if (Array.isArray(name)) {
      const keys = name.filter(v => typeof v === "string" || typeof v === "number")
      console.log(K, keys);

      if (keys.length > 1 && keys.length < 4) {
        key = _K(...keys)
        console.log(K, key);
        return template.delete(key)
      }
    }
    throw new Error(`请传递正确的值 String类型 或者 Object类型要有 { ID , EVENT , BRANCH? } 或者 Array类型 [ID , EVENT , BRANCH?]. ${JSON.stringify(name)}`);

  }


}

window.Kojo = Kojo;
//   function deepen(modifyString: (source: string) => string) {
//   function modifyObject<T extends unknown>(source: T): T {
//     if (typeof source !== 'object' || !source) return source
//     if (Array.isArray(source)) return source.map(modifyObject) as any
//     const result = {} as any
//     for (const key in source) {
//       result[modifyString(key)] = modifyObject(source[key])
//     }
//     return result as T
//   }

//   return function<T> (source: T): T {
//     if (typeof source === 'string') {
//       return modifyString(source) as any
//     } else {
//       return modifyObject(source)
//     }
//   }
// }

// export const camelCase = deepen(source => source.replace(/[_-][a-z]/g, str => str.slice(1).toUpperCase()))
// export const paramCase = deepen(source => source.replace(/_/g, '-').replace(/(?<!^)[A-Z]/g, str => '-' + str.toLowerCase()))
// export const snakeCase = deepen(source => source.replace(/-/g, '_').replace(/(?<!^)[A-Z]/g, str => '_' + str.toLowerCase()))

// export const camelize = camelCase
// export const hyphenate = paramCase

// export function capitalize(source: string) {
//   return source.charAt(0).toUpperCase() + source.slice(1)
// }

// // eslint-disable-next-line no-new-func
// export const interpolate = new Function('template', 'context', `
//   return template.replace(/\\{\\{[\\s\\S]+?\\}\\}/g, (sub) => {
//     const expr = sub.substring(2, sub.length - 2)
//     try {
//       with (context) {
//         return eval(expr)
//       }
//     } catch {
//       return ''
//     }
//   })
// `) as ((template: string, context: object) => string)

// export function escapeRegExp(source: string) {
//   return source
//     .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
//     .replace(/-/g, '\\x2d')
// }

// export function trimSlash(source: string) {
//   return source.replace(/\/$/, '')
// }

// export function sanitize(source: string) {
//   if (!source.startsWith('/')) source = '/' + source
//   return trimSlash(source)
// }

// export function template(path: string | string[], ...params: any[]) {
//   if (!Array.isArray(path)) path = [path]
//   for (const item of path) {
//     const source = template.get(item)
//     if (typeof source === 'string') {
//       return template.format(source, ...params)
//     }
//   }
//   return path[0]
// }

// function deepAssign(head: any, base: any): any {
//   console.log();

//   Object.entries(base).forEach(([key, value]) => {
//     if (typeof value === 'object' && typeof head[key] === 'object') {
//       head[key] = deepAssign(head[key], value)
//     } else {
//       head[key] = base[key]
//     }
//   })
//   return head
// }



