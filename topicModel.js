const db=require('./db/connection.js');

exports.selectTopics=()=>{
    const queryString='SELECT * FROM topics;'

    return db
    .query(queryString)
    .then((result)=>{
        return result.rows;
    })
    .catch((err)=>{
        console.log(err);
        return (err);
    })
}