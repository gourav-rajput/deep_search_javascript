class Utils {
  
}

Utils.prototype.isString = function(ele) {
  return ele === "" || typeof ele === "string";
}


Utils.prototype.isNumber = function(ele) {
  return ele === 0 || typeof ele === "number"
}

Utils.prototype.isFunction = function(ele) {
  return ele && typeof ele === "function"
}

Utils.prototype.isArray = function(ele) {
  return ele && Array.isArray(ele) && ele instanceof Array
}

Utils.prototype.isObject = function(ele) {
  return ele && typeof ele === 'object' && Array.isArray(ele) === false;
}

Utils.prototype.ifPrimitive = function(ele) {
  return this.isString(ele) || this.isNumber(ele);
}



const utility = new Utils();


const matchInPrimitive = (data, value, exact) => {
   return exact ? data === value : data == value;
};

matchInArray = (data, value, exact) => {
  let returnValue = false;
  for(let i = 0; i < data.length; i++) {
    if(utility.ifPrimitive(data[i])){
      returnValue = matchInPrimitive(data[i], value, exact);
      if(returnValue) break;
    }
    if(utility.isArray(data[i])) {
      returnValue = matchInArray(data[i], value, exact);
      if(returnValue) break;
    }
    if(utility.isObject(data[i])) {
      returnValue = matchInObject(data[i], value, exact);
      if(returnValue) break;
    }
  }
  return returnValue;
};

matchInObject = (data, value, exact) => {
  let returnValue = false;
  for(let key in data) {
    if(utility.ifPrimitive(data[key])){
      returnValue = matchInPrimitive(data[key], value, exact);
      if(returnValue) break;
    }
    if(utility.isArray(data[key])) {
      returnValue = matchInArray(data[key], value, exact);
      if(returnValue) break;
    }
    if(utility.isObject(data[key])) {
      returnValue = matchInObject(data[key], value, exact);
    }
  }
  return returnValue;
}

const deepSearch = (data, value, exact = false) => {
  let returnValue = false;
  if (utility.isFunction(data)) return "can not match function";
  
  if(utility.ifPrimitive(data)) {
    returnValue = matchInPrimitive(data, value, exact);
  }
  
  if(utility.isArray(data)) {
    returnValue = matchInArray(data, value, exact);
  }
  
  if(utility.isObject(data)) {
    returnValue = matchInObject(data, value, exact);
  }
  
  return returnValue;
  
}

let obj = {
  "someKey": "someValue",
  "someOtherKey": "someOtherValue",
  "someArrayValue": [12,34,56,78],
  "someDeepArray": [
    {"someKeyInDeepArray":"try to change this"},
    {"someDeepArray": [
      {"someKeyInDeepArray": "try to change this"},
      {"someDeepArray": [
        {"someKeyInDeepArray": "try to change this"},
        {"someDeepArray": [
          {"someKeyInDeepArray": "try to change this"},
          {"someDeepArray": [
            {"someKeyInDeepArray": "...run"},
            {"someOtherKeyInDeepArray": "0"}
          ]}
        ]}
      ]}
    ]}
  ]
};

let match = deepSearch(obj, "...run", false);
console.log(match)