import express from "express"
import multer from "multer"
import { listarPosts, createPost, uploadImage, updateNewPost } from "../controllers/postsControllers.js"
import cors from "cors"

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}


const storage = multer.diskStorage({
    destination: function(req, file, cb){
    cb(null, 'uploads/')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
       
    }
    })
    
    const upload = multer({dest:".uploads", storage})

const routes = (app) => {

    app.use(express.json())
    app.use(cors(corsOptions))

    app.get('/posts', listarPosts ) 
    
    app.post('/posts', createPost )

    app.post('/upload', upload.single('image'), uploadImage )

    app.put("/upload/:id", updateNewPost )
    

}

export default routes