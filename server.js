import express, { json } from 'express'
import routes from './src/routes/postsRoutes.js';

const app = express()
app.use(express.static("uploads"))
routes(app)


function getPost(id) {
    return posts.findIndex((post)=>{
        return post.id === Number(id)
    })

}



app.listen('3000', () => {
    console.log('Rodando')
})

app.get('/', (req, res) => {
    res.status(200).send('Imersão DEV')
})



app.get('/posts/:id', (req, res) => {
    const index = getPost(req.params.id)
    res.status(200).json(posts[index])
})