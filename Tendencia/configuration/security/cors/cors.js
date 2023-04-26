import cors from 'cors'
import express from 'express'

const security_policy=express()

security_policy.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods",['GET', 'POST', 'PUT', 'DELETE'])
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
    security_policy.use(cors())
    next()
})

export { security_policy }