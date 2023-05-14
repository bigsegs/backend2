const db=require('../db/connection.js')



exports.fetchUsers=()=>{
    const queryString = 'SELECT * FROM users;'
   
    return db
        .query(queryString)
        .then((result) => {
            if(result.rows.length===0){
                return Promise.reject({status:404,msg:"No users found"})
            }
            return result.rows
        })
};