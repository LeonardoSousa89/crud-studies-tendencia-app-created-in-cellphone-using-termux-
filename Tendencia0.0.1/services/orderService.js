import knex from '../repositories/repository'

import { 
  all, 
  projection,
  projectionByClientId,
  projectionByTotalToPay
} from '../projections/orderProjection'

async function insertOrder(req, res){
  
 const operacao={
    tendencia_id: Number(req.body.tendencia_id),
    quantidade: Number(req.body.quantidade)
  }
  
  if(!operacao.tendencia_id       ||
     operacao.tendencia_id==null  ||  
     operacao.tendencia_id==0     ||
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
            /*.then(_=>{
                
             // insertStatusPayment()
            })*/
            .catch(_=>res.status(500).json({
                       msg: 'Desculpe, houve um erro com o servidor'
            }))
            
    return pedido
}

async function getOrderById(req, res){
  
 const pedido=await knex.select(projection)
                        .from('pedido')
                        .innerJoin('tendencia', 'tendencia.id', 'pedido.tendencia_id')
                        .where('pedido.id', req.params.id)
                       .then(p=>{
                          
                          if(p.length === 0) return res.status(404).json({
                            msg: 'Não há registro de pedidos'
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
                       .innerJoin('tendencia', 'tendencia.id', 'pedido.tendencia_id')
                       .innerJoin('pagamento', 'pagamento.pedido_id', 'pedido.id')
                       .innerJoin('cliente', 'cliente.id', 'pagamento.cliente_id')
                       .where('cliente.id', req.params.id)
                       .then(p=>{
                          
                          if(p.length === 0) return res.status(404).json({
                            msg: 'Não há registro de pedidos'
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
                          msg: 'Não há registro de pedidos'
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
  
  const preco=await knex.select(projectionByTotalToPay)
      .from('pedido')
      .innerJoin('tendencia', 'tendencia.id', 'pedido.tendencia_id')
      .where('pedido.id', req.params.id)
      .then(p=>{
           
         if(p.length === 0) return res.status(404).json({
           msg: 'Não há registro de valores a pagar'
         })
            
          const total_a_pagar=p.map(p=>p.preco * p.quantidade)
          
          return res.status(200).json({ total_a_pagar: total_a_pagar[0].toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' })
          })
              
        })
        .catch(_=>res.status(500).json({
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