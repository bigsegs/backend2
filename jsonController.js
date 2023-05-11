
const fs=require('fs/promises');

exports.getJson=(req,res)=>{

    return fs.readFile('./endpoints.json','utf-8').then((data)=>{
        const result=JSON.parse(data);

             res.status(200).send(result)

    })
    .catch((err)=>{
            console.log(err);
            res.status(404).send({error:err})
    })
}