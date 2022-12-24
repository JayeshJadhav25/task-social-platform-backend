const { Validator } = require('node-input-validator');

const validateData = async (getData,checkData) => {
  const validateResult = new Validator(getData,checkData);
  const isMatch = await validateResult.check();

  if(isMatch) {
    return {
      result :validateResult,
      success: true
    };
  } else {
    return {
      error:"PARAMETER ISSUE",
      list:validateResult.errors,
      success: false
    }
  }
}

module.exports = {
    validateData
}