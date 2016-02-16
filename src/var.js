const arr = []
const concat = arr.concat
const indexOf = arr.indexOf
const push = arr.push
const slice = arr.slice


const class2type = {}
const hasOwn = class2type.hasOwnProperty
const toString = class2type.toString


const document = window.document
const documentElement = document.documentElement


const pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source
const rcssNum = new RegExp('^(?:([+-])=|)(' + pnum + ')([a-z%]*)$', 'i')
const rnotwhite = (/\S+/g)


const support = {}



export {
    arr, concat, indexOf, push, slice,
    class2type, hasOwn, toString,
    document, documentElement,
    pnum, rcssNum, rnotwhite,
    support
}
