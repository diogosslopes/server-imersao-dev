import 'dotenv/config'
import { ObjectId } from "mongodb"
import connection from "../config/config.js"

const conexao = await connection(process.env.STRING_CONEXAO) 


export async function listPosts (){
    const db = conexao.db("instabytes")
    const posts = db.collection("posts")

    return posts.find().toArray()
}

export async function createNewPost(newPost) {
    const db = conexao.db("instabytes")
    const posts = db.collection("posts")
    
    return posts.insertOne(newPost)
    
}
export async function updatePost(id, newPost) {
    console.log(id)
    console.log(newPost)
    const db = conexao.db("instabytes")
    const posts = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)

    
    return posts.updateOne({_id: new ObjectId(objID)}, {$set: newPost} )
    
}