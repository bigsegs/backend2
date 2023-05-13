const {selectTopics}=require('../models/topicModel.js');

exports.getTopics=(req,res)=>{

    

    selectTopics().then((result)=>{
        res.status(200).send({topics:result})
    })
}