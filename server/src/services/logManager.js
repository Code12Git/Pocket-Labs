const { logModel } = require("../models");
const { AppError } = require("../utils");
const { NOT_FOUND } = require("../utils/errors");


const getAll = async () => {
    try{
       const logs = await logModel.find()
       if(!logs || logs.length === 0) throw new AppError({...NOT_FOUND,message:'No logs found!'})
       return logs;
    }catch(err){
        throw err;
    }
}

module.exports = {getAll}