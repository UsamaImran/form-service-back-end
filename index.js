/** @format */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(isAuth)

app.use(
    '/graphql',
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
    })
)

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected')
        app.listen(process.env.PORT || 8000)
    })
    .catch((err) => {
        console.log(err)
    })

// console.log(process.env.MONGO_URL)
// mongoose
//   .connect('mongodb+srv://Developer:Xrh7iJNMAZTblChd@ngn42v1.7ittf.mongodb.net/ngn42v1?retryWrites=true&w=majority', { useNewUrlParser: true }
//   )
//   .then(() => {
//     console.log("Connected")
//     app.listen(8000);
//   })
//   .catch(err => {
//     console.log(err);
//   });
