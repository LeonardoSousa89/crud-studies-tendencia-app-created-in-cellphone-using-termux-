import knex from '../repositories/repository'

import { 
  all, 
  projection,
  projectionTotalAPagar
} from '../projections/paymentProjection'

async function insertPayment(req, res){
  
  const cadastro={
    bandeira: req.body.bandeira.trim(),
    titular_cartao: req.body.titular_cartao.trim(),
    numero_cartao: req.body.numero_cartao.trim(),
    csv: req.body.csv.trim(),
    validade: req.body.validade.trim(),
    total_a_pagar: Number(req.body.total_a_pagar),
    cliente_id: Number(req.body.cliente_id)
  }
  
  if(cadastro.bandeira==''.trim()       || 
     cadastro.bandeira==null            ||
     cadastro.titular_cartao==''.trim() ||
     cadastro.titular_cartao==null      ||
     cadastro.numero_cartao==''.trim()  ||
     cadastro.numero_cartao==null       ||
     cadastro.csv==''.trim()            ||
     cadastro.csv==null                 ||
     cadastro.validade==''.trim()       ||
     cadastro.validade==null            ||
     !cadastro.total_a_pagar            ||
     cadastro.total_a_pagar==null       ||
     !cadastro.cliente_id               ||
     cadastro.cliente_id==null           
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
             .then(p=>{
               
               if(p.length === 0) return res.status(404).json({
                 msg: 'Não há pagamentos efetuados ainda'
               })
               
               return res.status(200).json(p)
             })
             .catch(_=>res.status(500).json({
               msg: 'Desculpe, houve um erro com o servidor'
             }))
  
  return pagamento
}

async function getPaymentDoneByClientId(req, res){
  
  const pagamento=await knex.select(projectionTotalAPagar)
             .from('pagamento')
             .where('cliente_id', req.params.id)
             .then(p=>{
               
               if(p.length === 0) return res.status(404).json({
                 msg: 'Dados não encontrados'
               })
               
              return res.status(200).json({
                 'valor_pago': p
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