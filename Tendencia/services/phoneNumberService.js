import knex from '../repositories/repository'

import {
  all,
  projection
} from '../projections/phoneNumberProjection'

async function insertPhoneNumber(req, res){
  
 const cadastro={
    fixo: req.body.fixo.trim(),
    celular: req.body.celular.trim(),
    cliente_id: Number(req.body.cliente_id)
  }
  
  if(cadastro.celular==''.trim()   ||
     cadastro.celular==null        ||
     !cadastro.cliente_id          ||
     cadastro.cliente_id==null     
     ) return res.status(400).json({
       msg: 'Verifique os campos, todos os campos com * são obrigatórios'
  })
  
  const fone=await knex.insert(cadastro)
                      .from('telefone')
                      .then(_=>{
              
                        return res.status(201).json({
                         msg: 'Telefone inserido com sucesso'
                       })
            })
            .catch(e=>res.status(500).json({
              msg: 'Desculpe, houve um erro com o servidor'
            }))
            
    return fone
}

async function updatePhoneNumber(req, res){
  
 const cadastro={
    fixo: req.body.fixo.trim(),
    celular: req.body.celular.trim()
  }
  
  if(cadastro.celular==''.trim()   ||
     cadastro.celular==null        
     ) return res.status(400).json({
       msg: 'Verifique os campos, todos os campos com * são obrigatórios'
  })
  
  const fone=await 
                knex.update(cadastro)
                    .from('telefone')
                    .where('id', req.params.id)
                    .then(t=>{
              
                      if(t === 0) return res.status(404).json({
                          msg: 'Dados não encontrados'
                        })
                        
                        return res.status(201).json({
                          msg: 'Telefone atualizado com sucesso'
                        })
            })
            .catch(e=>res.status(500).json({
              msg: 'Desculpe, houve um erro com o servidor'
            }))
            
    return fone
}

async function getPhoneNumberById(req, res){
  
 const fone=await knex.select(projection)
    .from('telefone')
    .where('id', req.params.id)
    .then(t=>{
                          
      if(t.length === 0) return res.status(404)
          .json({
                msg: 'Dados não encontrados'
         })
                          
           return res.status(200).json(t)
         })
        .catch(_=>res.status(500)
           .json({
              msg: 'Desculpe, houve um erro com o servidor'
         }))
  
  return fone
}

async function getPhoneNumberByClientId(req, res){
  
 const fone=await  knex.select(all)
   .from('telefone')
   .where('cliente_id', req.params.id)
      .then(t=>{
                          
         if(t.length === 0) return res.status(404)
           .json({
             msg: 'Dados não encontrados'
                 })
                          
          return res.status(200).json(t)
         })
        .catch(_=>res.status(500).json({
             msg: 'Desculpe, houve um erro com o servidor'
         }))
  
  return fone
}

async function removePhoneNumber(req, res){
  
 const fone=await knex.delete()
    .from('telefone')
    .where('id', req.params.id)
    .then(t=>{
                           
     if(t === 0) return res.status(404).json({
           msg: 'Dados não encontrados'
           })
                        
      return res.status(201)
        .json({
           msg: 'Telefone removido com sucesso'
               })
     })
    .catch(_=>res.status(500)
        .json({
           msg: 'Desculpe, houve um erro com o servidor'
     }))
  
  return fone
}

export {
  insertPhoneNumber,
  updatePhoneNumber,
  getPhoneNumberById,
  getPhoneNumberByClientId,
  removePhoneNumber
}