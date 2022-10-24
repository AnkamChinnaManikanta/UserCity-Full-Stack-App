import {db} from '../db.js'

export const getPosts=(req,res)=>{
    const q=req.query.cat ? "SELECT * FROM posts WHERE cat=?":"SELECT * FROM posts"
    db.query(q,[req.query.cat],(err,data)=>{
        if(data){
            return res.status(200).json(data)
        }
        else{
            return res.send(err).json("Error emo mari")
        }
    })
}


export const getPost=(req,res)=>{
    const q="SELECT * FROM users u JOIN posts p ON u.id=p.id"

    db.query(q,[req.params.id],(err,data)=>{
        if(data){
            return res.status(200).json(data[0])
        }
        else{
            return res.send(err).json("Error emo mari")
        }
    })
}
export const addPost=(req,res)=>{
    res.json("This is comtroller")
}
export const deletePost=(req,res)=>{
    res.json("This is comtroller")
}
export const updatePost=(req,res)=>{
    res.json("This is comtroller")
} 