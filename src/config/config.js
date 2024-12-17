import {MongoClient} from 'mongodb'

export default async function connection(stringConnection) {
    let mongoClient

    try {
        mongoClient = new MongoClient(stringConnection)
        console.log("Conectando ao cluster do banco de dados...")
        await mongoClient.connect()
        console.log("Conexão realizada com sucesso!")

        return mongoClient
        
    } catch (error) {

        console.error('Falha na conexão com o banco!', error)
        process.exit()
        
    }
}