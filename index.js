const _ = require('lodash');

module.exports = function (object1, object2) {

    const d = diff({root: object1}, {root: object2});
    return d.root || {};

    function diff(ob0, ob1, rev) {
        const branch = {};
        if (_.isEqual(ob0, ob1)) {
            return branch;
        }
        Object.keys(ob0).forEach((key) => {

            const part0 = ob0[key];
            const part1 = ob1[key];

            if (_.isEqual(part0, part1)) {
                return;
            }

            if (_.isObject(part0) && _.isObject(part1)) {
                branch[key] = diff(part0, part1);
                branch[key] = Object.assign(branch[key], diff(part1, part0, true));
                return;
            }
            if (!rev) {
                branch[key] = [part0, part1];
            } else {
                branch[key] = [part1, part0];
            }
        });
        return branch;
    }
};