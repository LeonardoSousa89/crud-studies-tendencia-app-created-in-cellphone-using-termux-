import knex from '../repositories/repository'

import endereco from '../services/addressService'

import { 
  all, 
  projection, 
  joinProjection
} from '../projections/clientProjection'

/*Error: Can't extend QueryBuilder with existing method ('paginate').*/

//https://www.npmjs.com/~felixmosh [fale com ele]

/*
tente: excluir e reinatalar node_modules
*/
/*import { attachPaginate } from 'knex-paginate'

attachPaginate();*/

async function insertClient(req, res){
  
  const cadastro={
    nome: req.body.nome.trim(),
    sobrenome: req.body.sobrenome.trim(),
    contato: req.body.contato.trim(),
    cpf: req.body.cpf.trim(),
  }
  
  if(cadastro.nome==''.trim()      || 
     cadastro.sobrenome==''.trim() ||
     cadastro.contato==''.trim() ||
     cadastro.cpf==''.trim()     
     ) return res.status(400).json({
       msg: 'Verifique os campos, todos os campos com * são obrigatórios'
    })

   const cliente=await 
                 knex.insert(cadastro)
                     .from('cliente')
                     .then(_=>{
                       
                       return res.status(201).json({
                         msg: 'Cliente salvo com sucesso'
                       })
                     })
                     .catch(_=>res.status(500).json({
                       msg: 'Desculpe, houve um erro com o servidor'
                     }))
  return cliente
}

//somente para consulta por admins
async function getClient(req, res){
  
  const cliente=await 
                 knex.select(all)
                     .from('cliente')
                    /* .paginate({ 
                         perPage: req.query.size, 
                         currentPage: req.query.page
                     })*/
                     .then(c=>{
                      
                       if(c.length === 0) return res.status(404).json({
                         msg:'Não há clientes cadastrados'
                       })
                       
                    return res.status(200)
                        .json(c)
                     })
                     .catch(_=>res.status(500).json({
                       msg: 'Desculpe, houve um erro com o servidor'
                     }))
  return cliente
}

async function getClientById(req, res){
  
  const cliente=await 
                 knex.select(projection)
                     .from('cliente')
                     .where('id', req.params.id)
                     .then(c=>{
                      
                       if(c.length === 0) return res.status(404).json({
                         msg:'Cliente não encontrado'
                       })
                       
                    return res.status(200)
                        .json(c)
                     })
                     .catch(e=>res.status(500).json({
                       msg: 'Desculpe, houve um erro com o servidor'
                     }))
  return cliente
}

export { 
  insertClient, 
  getClient, 
  getClientById
}