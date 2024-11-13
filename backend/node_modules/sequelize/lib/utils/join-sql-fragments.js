var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
__export(exports, {
  JoinSQLFragmentsError: () => JoinSQLFragmentsError,
  joinSQLFragments: () => joinSQLFragments
});
function doesNotWantLeadingSpace(str) {
  return /^[;,)]/.test(str);
}
function doesNotWantTrailingSpace(str) {
  return /\($/.test(str);
}
function singleSpaceJoinHelper(parts) {
  return parts.reduce(({ skipNextLeadingSpace, result }, part) => {
    if (skipNextLeadingSpace || doesNotWantLeadingSpace(part)) {
      result += part.trim();
    } else {
      result += ` ${part.trim()}`;
    }
    return {
      skipNextLeadingSpace: doesNotWantTrailingSpace(part),
      result
    };
  }, {
    skipNextLeadingSpace: true,
    result: ""
  }).result;
}
function joinSQLFragments(array) {
  if (array.length === 0)
    return "";
  const truthyArray = array.filter((x) => !!x);
  const flattenedArray = truthyArray.map((fragment) => {
    if (Array.isArray(fragment)) {
      return joinSQLFragments(fragment);
    }
    return fragment;
  });
  for (const fragment of flattenedArray) {
    if (fragment && typeof fragment !== "string") {
      throw new JoinSQLFragmentsError(flattenedArray, fragment, `Tried to construct a SQL string with a non-string, non-falsy fragment (${fragment}).`);
    }
  }
  const trimmedArray = flattenedArray.map((x) => x.trim());
  const nonEmptyStringArray = trimmedArray.filter((x) => x !== "");
  return singleSpaceJoinHelper(nonEmptyStringArray);
}
class JoinSQLFragmentsError extends TypeError {
  constructor(args, fragment, message) {
    super(message);
    __publicField(this, "args");
    __publicField(this, "fragment");
    this.args = args;
    this.fragment = fragment;
    this.name = "JoinSQLFragmentsError";
  }
}
//# sourceMappingURL=join-sql-fragments.js.map
