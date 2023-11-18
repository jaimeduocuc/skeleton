export const keysToUpperCase = (obj: any) => {
  return Object.keys(obj).reduce((newObj: any, key: any) => {
    newObj[key.toUpperCase()] = obj[key];
    return newObj;
  }, {});
};
