import knex from '../repositories/repository'
import { 
  all, 
  projection
} from '../projections/statusPaymentProjection'

async function insertStatusPayment(req, res){
  
  const operacao={
    status: req.body.status.trim(),
    pedido: Number(req.body.pedido)
  }
  
  if(operacao.status==''.trim()  || 
     !operacao.pedido            ||
     operacao.pedido==null           
     ) return res.status(400).json({
       msg: 'Verifique os campos, todos os campos com * são obrigatórios'
  })
  
  const endereco=await knex.insert(cadastro)
            .from('status_do_pagamento')
            .then(_=>{
              
                return res.status(201).json({
                         msg: 'status de pagamento criado'
                       })
            })
            .catch(_=>res.status(500).json({
              msg: 'Desculpe, houve um erro com o servidor'
            }))
            
    return endereco
}

async function getStatusPaymentByOrderId(req, res){
  
  const endereco=await knex.select(projection)
                       .from('status_do_pagamento')
                       .where('id', req.params.id)
                       .innerJoin('pedido', 'pedido.id', 'status_do_pagamento')
                       .then(e=>{
                          
                          if(e.length === 0) return res.status(404).json({
                            msg: 'Dados não encontrados'
                          })
                          
                          return res.status(200).json(e)
                       })
                       .catch(_=>res.status(500).json({
                         msg: 'Desculpe, houve um erro com o servidor'
                       }))
  
  return endereco
}

async function updateStatusPayment(req, res){
  

}

export { 
  insertStatusPayment, 
  getStatusPaymentByOrderId,
  updateStatusPayment
}