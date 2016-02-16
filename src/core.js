import {
    arr, document, slice, concat,
    push, indexOf, class2type, toString, hasOwn, support
} from './var'
import DOMEval from './core/dom_eval'



const version = '@VERSION'



export function jQuery (selector, context) {
    return new jQuery.fn.init(selector, context)
}



jQuery.fn = jQuery.prototype = {


    jquery: version,

    constructor: jQuery,

    length: 0,

    push: push,

    sort: arr.sort,

    splice: arr.splice,



    toArray: function () {
        return slice.call(this)
    },


    get: function (num) {

        return num !== null ?
            this[num + (num < 0 ? this.length : 0)] :
            slice.call(this)
    },



    pushStack: function (elems) {

        const newSet = jQuery.merge(this.constructor(), elems)
        newSet.prevObject = this
        return newSet
    },



    each: function (callback) {
        return jQuery.each(this, callback)
    },



    map: function (callback) {
        return this.pushStack(jQuery.map(this, function (elem, i) {
            return callback.call(elem, i, elem)
        }))
    },



    slice: function () {
        return this.pushStack(slice.apply(this, arguments))
    },



    first: function () {
        return this.eq(0)
    },



    last: function () {
        return this.eq(-1)
    },



    eq: function (i) {
        const count = this.length
        const j = +i + (i < 0 ? count : 0)

        return this.pushStack(j >= 0 && j < count ? [this[j]] : [])
    },



    end: function () {
        return this.prevObject || this.constructor()
    },


}



jQuery.extend = jQuery.fn.extend = function () {
    let options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false


    // Handle a deep copy situation
    if (typeof target === 'boolean') {
        deep = target
        target = arguments[i] || {}
        i++
    }


    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
        target = {}
    }


    // Extend jQuery itself if only one argument is passed
    if (i === length) {
        target = this
        i--
    }


    for (; i < length; i++) {


        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {


            // Extend the base object
            for (name in options) {
                src = target[name]
                copy = options[name]


                // Prevent never-ending loop
                if (target === copy) {
                    continue
                }


                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (jQuery.isPlainObject(copy) ||
                    (copyIsArray = jQuery.isArray(copy)))) {

                    if (copyIsArray) {
                        copyIsArray = false
                        clone = src && jQuery.isArray( src ) ? src : []

                    } else {
                        clone = src && jQuery.isPlainObject( src ) ? src : {}
                    }

                    // Never move original objects, clone them
                    target[name] = jQuery.extend(deep, clone, copy)

                // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy
                }
            }
        }
    }


    return target
}



jQuery.extend({

    expando: 'jQuery' + (version + Math.random()).replace( /\D/g, ''),

    isReady: true,

    noop: function () {},

    isArray: Array.isArray,

    guid: 1,

    now: Date.now,

    support: support,


    error: function (message) {
        throw new Error(message)
    },



    isFunction: function (object) {
        return jQuery.type(object) === 'function'
    },



    isWindow: function (object) {
        return object !== null && object === object.window
    },



    isNumeric: function (object) {

        // As of jQuery 3.0, isNumeric is limited to
        // strings and numbers (primitives or objects)
        // that can be coerced to finite numbers (gh-2662)
        const type = jQuery.type(object)

        return (type === 'number' || type === 'string') &&

            // parseFloat NaNs numeric-cast false positives ("")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            !isNaN( obj - parseFloat( obj ) )
    },



    isPlainObject: function (object) {

        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (jQuery.type(object) !== 'object' || obj.nodeType || jQuery.isWindow(object)) {
            return false
        }


        if (object.constructor &&
                !hasOwn.call(object.constructor.prototype, 'isPrototypeOf')) {
            return false
        }


        return true
    },



    isEmptyObject: function (object) {

        for (let name in object) {
            return false
        }

        return true
    },



    type: function (object) {

        if (object == null) {
            return obj + ''
        }

        // Support: Android<4.0 (functionish RegExp)
        return typeof object === 'object' || typeof object === 'function' ?
            class2type[toString.call(object)] || 'object' :
            typeof object
    },



    globalEval: function (code) {
        DOMEval(code)
    },



    // Convert dashed to camelCase; used by the css and data modules
    // Support: IE9-11+
    // Microsoft forgot to hump their vendor prefix (#9572)
    camelCase: function (string) {
        return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase)
    },



    nodeName: function (elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
    },



    each: function (object, callback) {
        let count
        let i = 0


        if (isArrayLike(object)) {
            count = object.length

            for (; i < count; i++) {
                if (callback.call(object[i], i, object[i]) === false) {
                    break
                }
            }
        } else {
            for (i in object) {
                if (callback.call(object[i], i, object[i]) === false) {
                    break
                }
            }
        }

        return object
    },



    // Support: Android<4.1
    trim: function (text) {
        return text == null ? '' : (text + '').replace(rtrim, '')
    },



    makeArray: function (arr, results) {
        let ret = results || []

        if (arr !== null) {
            if (isArrayLike(Object(arr))) {
                jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr)
            } else {
                push.call(ret, arr)
            }
        }

        return ret
    },



    inArray: function (elem, arr, i) {
        return arr === null ? -1 : indexOf.call(arr, elem, i)
    },



    // Support: Android<4.1, PhantomJS<2
    // push.apply(_, arraylike) throws on ancient WebKit
    merge: function (first, second) {
        let len = +second.length,
            j = 0,
            i = first.length

        for (; j < len; j++) {
            first[i++] = second[j]
        }

        first.length = i

        return first
    },



    grep: function (elems, callback, invert) {
        let callbackInverse,
            matches = [],
            i = 0,
            length = elems.length,
            callbackExpect = !invert


        // Go through the array, only saving the items
        // that pass the validator function
        for (; i < length; i++ ) {
            callbackInverse = !callback(elems[i], i)

            if (callbackInverse !== callbackExpect) {
                matches.push(elems[i])
            }
        }

        return matches
    },



    map: function (elems, callback, arg) {
        let length, value,
            i = 0,
            ret = []

        // Go through the array, translating each of the items to their new values
        if (isArrayLike(elems)) {
            length = elems.length
            for (; i < length; i++) {
                value = callback(elems[i], i, arg)

                if (value != null) {
                    ret.push(value)
                }
            }


        // Go through every key on the object,
        } else {
            for (i in elems) {
                value = callback(elems[i], i, arg)

                if (value !== null) {
                    ret.push(value)
                }
            }
        }


        // Flatten any nested arrays
        return concat.apply([], ret)
    },



    // Bind a function to a context, optionally partially applying any
    // arguments.
    proxy: function (fn, context) {
        let tmp, args, proxy

        if (typeof context === 'string') {
            tmp = fn[context]
            context = fn
            fn = tmp
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if (!jQuery.isFunction(fn)) {
            return undefined
        }


        // Simulated bind
        args = slice.call(arguments, 2)
        proxy = function () {
            return fn.apply(context || this, args.concat(slice.call(arguments)))
        }


        // Set the guid of unique handler to the same of original handler, so it can be removed
        proxy.guid = fn.guid = fn.guid || jQuery.guid++


        return proxy
    }

})




if (typeof Symbol === 'function') {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]
}


// Populate the class2type map
const types = 'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ')
jQuery.each(types, function (i, name) {
    class2type['[object ' + name + ']' ] = name.toLowerCase()
})



function isArrayLike (object) {

    // Support: iOS 8.2 (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    const count = !!object && 'length' in object && object.length
    const type = jQuery.type(object)

    if (type === 'function' || jQuery.isWindow(object)) {
        return false
    }

    return type === 'array' || count === 0 ||
        typeof count === 'number' && count > 0 && (count - 1) in object
}
