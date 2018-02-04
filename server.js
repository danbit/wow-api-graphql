import express from 'express'
import expressGraphQL from 'express-graphql'
import schema from './schema'

const app = express()

app.get('/', function (req, res) {
    res.send('Hello WoWrld!')
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Server is running on port 3000...')
})
