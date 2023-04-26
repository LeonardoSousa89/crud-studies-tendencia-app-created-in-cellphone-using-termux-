import knex from '../repositories/repository'

import { 
  all, 
  projection,
  projectionByClientId
} from '../projections/orderProjection'

async function insertOrder(req, res){
  
 const operacao={
    tendencia_id: Number(req.body.tendencia_id),
    cliente_id: Number(req.body.cliente_id),
    preco: Number(req.body.preco),
    quantidade: Number(req.body.quantidade)
  }
  
  if(!operacao.tendencia_id       ||
     operacao.tendencia_id==null  ||  
     operacao.tendencia_id==0     ||
     !operacao.cliente_id         ||
     operacao.cliente_id==null    ||    
     operacao.cliente_id==0       ||
    !operacao.preco               ||
     operacao.preco==null         ||    
     operacao.preco==0            ||
    !operacao.quantidade          ||
     operacao.quantidade==null    ||   
     operacao.quantidade==0            
     ) return res.status(400).json({
       msg: 'PROGRAMADOR observe os campos pois ambos devem estar devidamente preenchidos'
  })
  
  const pedido=await knex.insert(operacao)
            .from('pedido')
            .then(p=>{
              
             return res.status(201).json({
                         msg: 'pedido inserido no carrinho'
                       })
            })
            .catch(_=>res.status(500).json({
                       msg: 'Desculpe, houve um erro com o servidor'
            }))
            
    return pedido
}

async function getOrderById(req, res){
  
 const pedido=await knex.select(projection)
                       .from('pedido')
                       .where('id', req.params.id)
                       .then(p=>{
                          
                          if(p.length === 0) return res.status(404).json({
                            msg: 'Dados não encontrados'
                          })
                          
                          return res.status(200).json(p)
                       })
                       .catch(_=>res.status(500).json({
                         msg: 'Desculpe, houve um erro com o servidor'
                       }))
  
  return pedido
}

async function getOrderByClientId(req, res){
  
 const pedido=await knex.select(projectionByClientId)
                       .from('pedido')
                       .where('cliente_id', req.params.id)
                       .then(p=>{
                          
                          if(p.length === 0) return res.status(404).json({
                            msg: 'Dados não encontrados'
                          })
                          
                          return res.status(200).json(p)
                       })
                       .catch(_=>res.status(500).json({
                         msg: 'Desculpe, houve um erro com o servidor'
                       }))
  
  return pedido
}

async function removeOrder(req, res){
  
 const pedido=await knex.delete()
                       .from('pedido')
                       .where('id', req.params.id)
                       .then(p=>{
                          
                        if(p === 0) return res.status(404).json({
                          msg: 'Dados não encontrados'
                        })
                        
                        return res.status(201).json({
                          msg: 'Pedido removido com sucesso'
                        })
                       })
                       .catch(_=>res.status(500).json({
                         msg: 'Desculpe, houve um erro com o servidor'
                       }))
  
  return pedido
}

async function totalToPay(req, res){
  
  const preco=await knex.select('id','preco')
      .from('pedido')
      .where('cliente_id', req.params.id)
      .then(p=>{
           
         if(p.length === 0) return res.status(404).json({
           msg: 'Dados não encontrados'
         })
              
          const initialValue=0
            
          const total_a_pagar=p.map(p=>p.preco).reduce((acumulator, currentValue)=>{
    
        const acumulador=(initialValue + acumulator + currentValue)
    
         return acumulador
         })
            
        return res.status(200)
            .json({ total_a_pagar })
              
        }).catch(_=>res.status(500).json({
          msg: 'Desculpe, houve um erro com o servidor'
        }))
   
   return preco
}


export {
  insertOrder,
  getOrderById,
  getOrderByClientId,
  removeOrder,
  totalToPay
}