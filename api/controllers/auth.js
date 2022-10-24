import { db } from "../db.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

export const register=(req,res)=>{
    db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
          req.body.email
        )});`,
        (err, result) => {
          if (result.length) {
            return res.status(409).json("User already exists");
          } else {
        const salt= bcrypt.genSaltSync(10);
        const hash= bcrypt.hashSync(req.body.password,salt)

        const q="INSERT INTO users(`username`,`email`,`password`) VALUES(?)"
        const values=[
                req.body.username,
                req.body.email,
                hash, 
            ]
        db.query(q,[values],(err,data)=>{
                if(err) return res.json("pora mawa")
                return res.status(200).json("User has been created.")
            })
        }
    }
    )
        }
export const login=(req,res)=>{
    db.query(
        `SELECT * FROM users WHERE username = ${db.escape(
          req.body.username
        )};`,
        (err, data) => {
          if (data.length ===0) {
            return res.status(404).json("User not found!");
          } else {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
            if (!isPasswordCorrect){
                return res.status(400).json("Password is invalid")
            }
            else{
                const token= jwt.sign({id:data[0].id},"jwtkey");
                const {password,...other}= data[0]
                res.cookie("access_token",token,{
                    httpOnly:true
                }).status(200).json(other) 

            }
        }
    }
    )
}
export const logout=(req,res)=>{
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been loged out.")
}