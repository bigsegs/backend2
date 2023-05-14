const {fetchUsers}=require('../models/userModel.js')

exports.getAllUsers=(req,res,next)=>{



    fetchUsers().then((result)=>{
        res.status(200).send({users:result});
    })
    .catch((err)=>{
        next(err)
    })
}