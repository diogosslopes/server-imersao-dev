import {listPosts, createNewPost, updatePost} from "../models/postsModels.js"
import fs from 'fs'
import gerarDescricaoComGemini from "../services/geminiService.js"


export async function listarPosts (req, res) {
    const posts = await listPosts()
    res.status(200).json(posts)

}

export async function createPost(req, res) {

    const newPost = req.body

    try {
        
        const createdPost = await createNewPost(newPost)
        res.status(200).json(createdPost)

    } catch (error) {

        console.error('Erro ' + error.message)
        res.status(500).json('Erro: Falha na requisição')
        
    }
    
}
export async function uploadImage(req, res) {

    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        
        const createdPost = await createNewPost(newPost)
        const updatedImage = `uploads/${createdPost.insertedId}.png`
        fs.renameSync(req.file.path, updatedImage)
        res.status(200).json(createdPost)

    } catch (error) {

        console.error('Erro ' + error.message)
        res.status(500).json('Erro: Falha na requisição')
        
    }
   
}
export async function updateNewPost(req, res) {

    const id = req.params.id
    const urlImagem = `http://localhost:3000/${id}.png`
    
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imageBuffer)
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        
        const createdPost = await updatePost(id, post)
        res.status(200).json(createdPost)

    } catch (error) {

        console.error('Erro ' + error)
        res.status(500).json('Erro: Falha na requisição')
        
    }
    
}