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
    rua: req.body.rua.trim(),
    cliente_id: Number(req.body.cliente_id)
  }
  
  if(cadastro.cep==''.trim()      || 
     cadastro.cep==null           ||
     cadastro.estado==''.trim()   ||
     cadastro.estado==null        ||
     cadastro.cidade==''.trim()   ||
     cadastro.cidade==null        ||
     cadastro.rua==''.trim()      ||
     cadastro.rua==null           ||
     !cadastro.cliente_id         ||
     cadastro.cliente_id==null           
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
  
  const endereco=await 
                   knex.select(projection)
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
  
  const endereco=await 
                          knex.select(all)
                              .from('endereco')
                              .where('cliente_id', req.params.id)
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
  
if(  cadastro.cep==''.trim()      || 
     cadastro.cep==null           ||
     cadastro.estado==''.trim()   ||
     cadastro.estado==null        ||
     cadastro.cidade==''.trim()   ||
     cadastro.cidade==null        ||
     cadastro.rua==''.trim()      ||
     cadastro.rua==null           
     ) return res.status(400).json({
       msg: 'Verifique os campos, todos os campos com * são obrigatórios'
  })
  
  const endereco=await 
                   knex.update(cadastro)
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
  
 const endereco=await 
                   knex.delete()
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