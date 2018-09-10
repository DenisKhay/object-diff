const _ = require('lodash');

module.exports = function (base, target) {

    // history = []

    // base
    // target
    // keys = base.keys
    // currentIdx = 0
    // diffTree = {}

    // step in condition:
    // store all above as history object
    // set base target from two new and to go up

    // step out condition:
    // get last history object and set diffTree[keys[currentIdx]] = diffTree
    // set main refs from history
    // remove last history object and continue


    const history = [];
    let idx = 0;
    let keys = Object.keys(base);
    let diffTree = {};
    while (true) {

        for (let ln = keys.length; ln > idx; idx++) {
            const prop = keys[idx];

            if(_.isEqual(base[prop], target[prop])){
                continue;
            }

            if(_.isObject(base[prop]) && _.isObject(target[prop])) {
                history.push({base, target, keys, idx, diffTree});
                base = base[prop];
                target = target[prop];
                idx = -1;
                keys = Object.keys(base);
                ln = keys.length;
                diffTree = {};
            } else {
                diffTree[prop] = [base[prop], target[prop]];
            }
        }

        if(history.length) {
            const hisOb = history.pop();
            base = hisOb['base'];
            target = hisOb['target'];
            keys = hisOb['keys'];
            const oldDiffTree = hisOb['diffTree'];
            oldDiffTree[keys[hisOb['idx']]] = diffTree;
            diffTree = oldDiffTree;
            idx = hisOb['idx'] + 1;
        } else {
            break;
        }
    }
    return diffTree;
};