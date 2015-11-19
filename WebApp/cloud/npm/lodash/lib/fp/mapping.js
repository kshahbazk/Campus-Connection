module.exports = {

  /** Used to map method names to their aliases. */
  'aliasMap': {
    'ary': ['nAry'],
    'conj': ['allPass'],
    'disj': ['somePass'],
    'filter': ['whereEq'],
    'flatten': ['unnest'],
    'flow': ['pipe'],
    'flowRight': ['compose'],
    'forEach': ['each'],
    'forEachRight': ['eachRight'],
    'get': ['path'],
    'getOr': ['pathOr'],
    'head': ['first'],
    'includes': ['contains'],
    'initial': ['init'],
    'isEqual': ['equals'],
    'mapValues': ['mapObj'],
    'matchesProperty': ['pathEq'],
    'modArgs': ['useWith'],
    'modArgsSet': ['converge'],
    'omit': ['dissoc', 'omitAll'],
    'pairs': ['toPairs'],
    'pairsIn': ['toPairsIn'],
    'pick': ['pickAll'],
    'property': ['prop'],
    'propertyOf': ['propOf'],
    'rest': ['unapply'],
    'some': ['all'],
    'spread': ['apply'],
    'zipObject': ['zipObj']
  },

  /** Used to map method names to their iteratee ary. */
  'aryIterateeMap': {
    'assignWith': 2,
    'cloneDeepWith': 1,
    'cloneWith': 1,
    'dropRightWhile': 1,
    'dropWhile': 1,
    'every': 1,
    'extendWith': 2,
    'filter': 1,
    'find': 1,
    'findIndex': 1,
    'findKey': 1,
    'findLast': 1,
    'findLastIndex': 1,
    'findLastKey': 1,
    'forEach': 1,
    'forEachRight': 1,
    'forIn': 1,
    'forInRight': 1,
    'forOwn': 1,
    'forOwnRight': 1,
    'isEqualWith': 2,
    'isMatchWith': 2,
    'map': 1,
    'mapKeys': 1,
    'mapValues': 1,
    'partition': 1,
    'reduce': 2,
    'reduceRight': 2,
    'reject': 1,
    'remove': 1,
    'some': 1,
    'takeRightWhile': 1,
    'takeWhile': 1,
    'times': 1,
    'transform': 2
  },

  /** Used to map ary to method names. */
  'aryMethodMap': {
    1: (
      'attempt,ceil,conj,create,curry,disj,floor,fromPairs,iteratee,invert,juxt,' +
      'memoize,method,methodOf,mixin,rest,reverse,round,runInContext,template,trim,' +
      'trimLeft,trimRight,uniqueId,words').split(','),
    2: (
      'add,ary,assign,at,bind,bindKey,cloneDeepWith,cloneWith,concat,countBy,curryN,' +
      'debounce,defaults,defaultsDeep,delay,difference,drop,dropRight,dropRightWhile,' +
      'dropWhile,endsWith,every,extend,filter,find,find,findIndex,findKey,findLast,' +
      'findLastIndex,findLastKey,forEach,forEachRight,forIn,forInRight,forOwn,' +
      'forOwnRight,get,groupBy,includes,indexBy,indexOf,intersection,invoke,isMatch,' +
      'lastIndexOf,map,mapKeys,mapValues,matchesProperty,maxBy,mean,minBy,merge,' +
      'modArgs,modArgsSet,omit,pad,padLeft,padRight,parseInt,partition,pick,pull,' +
      'pullAll,pullAt,random,range,rearg,reject,remove,repeat,result,sampleSize,' +
      'set,some,sortBy,sortByOrder,sortedIndexBy,sortedLastIndexBy,sortedUniqBy,' +
      'startsWith,subtract,sumBy,take,takeRight,takeRightWhile,takeWhile,throttle,' +
      'times,truncate,union,uniqBy,without,wrap,xor,zip,zipObject').split(','),
    3: (
      'assignWith,clamp,differenceBy,extendWith,getOr,inRange,intersectionBy,' +
      'isEqualWith,isMatchWith,mergeWith,omitBy,pickBy,pullAllBy,reduce,' +
      'reduceRight,slice,transform,unionBy,xorBy,zipWith').split(','),
    4:
      ['fill']
  },

  /** Used to map ary to rearg configs by method ary. */
  'aryReargMap': {
    2: [1, 0],
    3: [2, 1, 0],
    4: [3, 2, 0, 1]
  },

  /** Used to map ary to rearg configs by method names. */
  'methodReargMap': {
    'clamp': [2, 0, 1],
    'reduce': [2, 0, 1],
    'reduceRight': [2, 0, 1],
    'slice': [2, 0, 1],
    'transform': [2, 0, 1]
  },

  /** Used to iterate `mapping.aryMethodMap` keys. */
  'caps': [1, 2, 3, 4],

  /** Used to map keys to other keys. */
  'keyMap': {
    'curryN': 'curry',
    'curryRightN': 'curryRight',
    'debounceOpt': 'debounce',
    'fromPairs': 'zipObject',
    'getOr': 'get',
    'throttleOpt': 'throttle'
  },

  /** Used to identify methods which mutate arrays or objects. */
  'mutateMap': {
    'array': {
      'fill': true,
      'pull': true,
      'pullAll': true,
      'pullAllBy': true,
      'pullAt': true,
      'remove': true,
      'reverse': true
    },
    'object': {
      'assign': true,
      'assignWith': true,
      'defaults': true,
      'defaultsDeep': true,
      'extend': true,
      'extendWith': true,
      'merge': true,
      'mergeWith': true
    }
  },

  /** Used to track methods that skip `_.rearg`. */
  'skipReargMap': {
    'difference': true,
    'matchesProperty': true,
    'random': true,
    'range': true,
    'zip': true,
    'zipObject': true
  }
};
