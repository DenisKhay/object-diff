const lo = require('lodash');

module.exports = function(base, target) {
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

  const steps = [];

  let step = {
    index: 0,
    diffTree: {},
    baseObject: base,
    targetObject: target,
  };
  step.keys = Object.keys(step.baseObject);

  do {
    while (step.keys.length > step.index) {
      const key = step.keys[step.index];

      if (lo.isEqual(step.baseObject[key], step.targetObject[key])) {
        step.index++;
        continue;
      }

      if ((lo.isPlainObject(step.baseObject[key]) ||
          (step.baseObject[key] instanceof Array)) &&
          (lo.isPlainObject(step.targetObject[key]) ||
              (step.targetObject[key] instanceof Array)) &&
          !lo.isEmpty(step.baseObject[key]) &&
          !lo.isEmpty(step.baseObject[key])) {
        steps.push(step);
        step = {
          index: 0,
          diffTree: {},
          baseObject: step.baseObject[key],
          targetObject: step.targetObject[key],
        };
        step.keys = Object.keys(step.baseObject);
      } else {
        step.diffTree[key] = [step.baseObject[key], step.targetObject[key]];
        step.index++;
      }
    }

    if (steps.length) {
      const childDiffTree = step.diffTree;
      step = steps.pop();
      if (!lo.isEmpty(childDiffTree)) {
        step.diffTree[step.keys[step.index]] = childDiffTree;
      }
      step.index++;
      continue;
    }

    break;
  } while (true);

  return step.diffTree;
};
