const port=54321

import { security_policy } from './configuration/security/cors/cors'
import log from 'morgan'
import express from 'express'
import route from './controller/routes'

const app=express()

app.use(log('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', security_policy)
app.use('/', route)

app.listen(port)