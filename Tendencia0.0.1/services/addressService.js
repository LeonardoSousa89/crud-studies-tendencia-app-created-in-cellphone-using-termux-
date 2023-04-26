import knex from '../repositories/repository'
import { 
  all, 
  projection
} from '../projections/addressProjection'

async function insertAddress(req, res){
  
  const cadastro={
    cep: req.body.cep.trim(),
    estado: req.body.estado.trim(),
    cidade: req.body.cidade.trim(),
    rua: req.body.rua.trim()
  }
  
  if(cadastro.cep==''.trim()      || 
     cadastro.estado==''.trim()   ||
     cadastro.cidade==''.trim()   ||
     cadastro.rua==''.trim()      
     ) return res.status(400).json({
       msg: 'Verifique os campos, todos os campos com * são obrigatórios'
  })
  
  const endereco=await knex.insert(cadastro)
            .from('endereco')
            .then(_=>{
              
                return res.status(201).json({
                         msg: 'Endereço inserido com sucesso'
                       })
            })
            .catch(_=>res.status(500).json({
              msg: 'Desculpe, houve um erro com o servidor'
            }))
            
    return endereco
}

async function getAddressById(req, res){
  
  const endereco=await knex.select(projection)
                       .from('endereco')
                       .where('id', req.params.id)
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

async function getAddressByClientId(req, res){
  
  const endereco=await knex.select(all)
                           .from('endereco')
                           .innerJoin('pagamento', 'pagamento.endereco_id', 'endereco.id')
                            .innerJoin('pagamento', 'pagamento.endereco_id', 'endereco.id')
                              .innerJoin('cliente', 'cliente.id', 'pagamento.cliente_id')
                              .where('cliente.id', req.params.id)
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

async function updateAddress(req, res){
  
 const cadastro={
    cep: req.body.cep.trim(),
    estado: req.body.estado.trim(),
    cidade: req.body.cidade.trim(),
    rua: req.body.rua.trim()
  }
  
if(cadastro.cep==''.trim()      || 
  cadastro.estado==''.trim()   ||
  cadastro.cidade==''.trim()   ||
  cadastro.rua==''.trim()      
     ) return res.status(400).json({
       msg: 'Verifique os campos, todos os campos com * são obrigatórios'
  })
  
  const endereco=await knex.update(cadastro)
                       .from('endereco')
                       .where('id', req.params.id)
                       .then(e=>{
                          
                        if(e === 0) return res.status(404).json({
                          msg: 'Dados não encontrados'
                        })
                        
                        return res.status(201).json({
                          msg: 'Endereço atualizado com sucesso'
                        })
                       })
                       .catch(_=>res.status(500).json({
                         msg: 'Desculpe, houve um erro com o servidor'
                       }))
  
  return endereco
}

async function removeAddress(req, res){
  
 const endereco=await knex.delete()
                       .from('endereco')
                       .where('id', req.params.id)
                       .then(e=>{
                          
                        if(e === 0) return res.status(404).json({
                          msg: 'Dados não encontrados'
                        })
                        
                        return res.status(201).json({
                          msg: 'Endereço removido com sucesso'
                        })
                       })
                       .catch(_=>res.status(500).json({
                         msg: 'Desculpe, houve um erro com o servidor'
                       }))
  
  return endereco
}

export { 
  insertAddress, 
  getAddressById,
  getAddressByClientId,
  updateAddress,
  removeAddress
}