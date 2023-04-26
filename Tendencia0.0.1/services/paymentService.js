import knex from '../repositories/repository'

import { 
  all, 
  projection,
  projectionByClientId,
  projectionTotalAPagar,
} from '../projections/paymentProjection'

async function insertPayment(req, res){
  
  const cadastro={
    bandeira: req.body.bandeira.trim(),
    titular_cartao: req.body.titular_cartao.trim(),
    numero_cartao: req.body.numero_cartao.trim(),
    csv: req.body.csv.trim(),
    validade: req.body.validade.trim(),
    total_a_pagar: Number(req.body.total_a_pagar),
    cliente_id: Number(req.body.cliente_id),
    endereco_id: Number(req.body.endereco_id),
    telefone_id: Number(req.body.telefone_id),
    pedido_id: Number(req.body.pedido_id)
  }
  
  if(cadastro.bandeira==''.trim()       || 
     cadastro.titular_cartao==''.trim() ||
     cadastro.numero_cartao==''.trim()  ||
     cadastro.csv==''.trim()            ||
     cadastro.validade==''.trim()       ||
     !cadastro.total_a_pagar            ||
     cadastro.total_a_pagar==null       ||
     !cadastro.cliente_id               ||
     cadastro.cliente_id==null          ||
     !cadastro.endereco_id              ||
     cadastro.endereco_id==null         ||
     !cadastro.telefone_id              ||
     cadastro.telefone_id==null         ||
     !cadastro.pedido_id                ||
     cadastro.pedido_id==null           
     ) return res.status(400).json({
       msg: 'Verifique os campos, todos os campos com * são obrigatórios'
  })
  
  const pagamento=await knex.insert(cadastro)
            .from('pagamento')
            .then(_=>{
              
              return res.status(201)
                   .json({
                      msg: 'pagamento efetuado com sucesso'
                    })
    
            })
            .catch(_=>res.status(500).json({
              msg: 'Desculpe, houve um erro com o servidor'
            }))
            
    return pagamento
}

async function getPayment(res){
  
  const pagamento=await knex.select(all)
             .from('pagamento')
             .innerJoin('cliente', 'cliente.id', 'pagamento.cliente_id')
             .innerJoin('telefone', 'telefone.id', 'pagamento.telefone_id')
             .innerJoin('endereco', 'endereco.id', 'pagamento.endereco_id')
             .innerJoin('pedido', 'pedido.id', 'pagamento.pedido_id')
            .innerJoin('tendencia', 'tendencia.id', 'pedido.tendencia_id')
             .then(p=>{
               
               if(p.length === 0) return res.status(404).json({
                 msg: 'Não há registros pagamento'
               })
               
               return res.status(200).json(p)
             })
             .catch(_=>res.status(500).json({
               msg: 'Desculpe, houve um erro com o servidor'
             }))
  
  return pagamento
}

async function getPaymentDoneByClientId(req, res){
  
  const pagamento=await knex.select(projectionByClientId)
             .from('pagamento')
             .innerJoin('cliente', 'cliente.id', 'pagamento.cliente_id')
             .innerJoin('telefone', 'telefone.id', 'pagamento.telefone_id')
             .innerJoin('endereco', 'endereco.id', 'pagamento.endereco_id')
             .innerJoin('pedido', 'pedido.id', 'pagamento.pedido_id')
            .innerJoin('tendencia', 'tendencia.id', 'pedido.tendencia_id')
             .where('cliente.id', req.params.id)
             .then(p=>{
               
               if(p.length === 0) return res.status(404).json({
                 msg: 'Não há registros de pagamentos'
               })
               
              return res.status(200).json({
                 'compra_efetuada': p
               })
               
             })
             .catch(_=>res.status(500).json({
               msg: 'Desculpe, houve um erro com o servidor'
             }))
  
  return pagamento
}

export {
  insertPayment,
  getPayment,
  getPaymentDoneByClientId
}