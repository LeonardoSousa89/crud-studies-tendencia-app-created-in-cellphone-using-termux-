import knex from '../repositories/repository'
import { attachPaginate } from 'knex-paginate'
import {
   projection, 
   all
}from '../projections/productProjection'

attachPaginate();
 
async function insertData(req, res){
  
  const vestuario={
        preco: req.body.preco,
        peca: req.body.peca,
        categoria: req.body.categoria,
        descricao: req.body.descricao,
        tamanho: req.body.tamanho,
        cor: req.body.cor,
        image_url: req.body.image_url
  }
  
  const moda=await 
            knex.insert(vestuario)
            .from('tendencia')
            .then(_=>res.status(201)
                        .json({
                          msg: 'Item adicionado com sucesso'
                        }))
            .catch(_=>res.status(500)
                         .json({
                           msg: 'Desculpe, houve um erro com o servidor'
            }))
 
  return moda                       
}

async function updateData(req, res){
 
  const vestuario={
        preco: req.body.preco,
        peca: req.body.peca,
        categoria: req.body.categoria,
        descricao: req.body.descricao,
        tamanho: req.body.tamanho,
        cor: req.body.cor,
        image_url: req.body.image_url
  }
 
  const moda=await 
            knex.update(vestuario)
            .from('tendencia')
            .where('id', req.params.id)
            .then(r=>{
              
              if(r === 0) return res.status(404).json({msg:'Dados não encontrados'})
              return res.status(201)
                        .json({
                          msg: 'Item atualizado com sucesso'
                        })
            })
            .catch(_=>res.status(500)
                         .json({
                           msg: 'Desculpe, houve um erro com o servidor'
            }))
                         
  return moda                       
}

async function removeAllData(res){
  
  const moda=await 
            knex.delete()
            .from('tendencia')
            .then(r=>{
              
              if(r === 0) return res.status(404).json({msg:'Dados não encontrados'})
              return res.status(200)
                        .json({
                          msg: 'Itens removidos com sucesso'
                        })
            })
            .catch(_=>res.status(500)
                         .json({
                           msg: 'Desculpe, houve um erro com o servidor'
            }))
                         
  return moda                       
}

async function removeData(req, res){
  
  const moda=await 
            knex.delete()
            .from('tendencia')
            .where('id', req.params.id)
            .then(r=>{
            
             if(r === 0) return res.status(404).json({msg:'Dados não encontrados'})
              return res.status(200)
                        .json({
                          msg: 'Item removido com sucesso'
                        })
            })
            .catch(_=>res.status(500)
                         .json({
                           msg: 'Desculpe, houve um erro com o servidor'
            }))
                         
  return moda                       
}

async function getData(req, res){
  
  const moda=await 
            knex.select(all)
            .from('tendencia')
            .paginate({ 
              perPage: req.query.size, 
              currentPage: req.query.page
            })
            .then(r=>{
              
              if(r.data.length === 0) return res.status(404).json({
                msg: 'Dados não cadastrados'
              })
              return res.status(200)
                        .json(r)
            })
            .catch(_=>res.status(500)
                         .json({
                           msg: 'Desculpe, houve um erro com o servidor'
            }))
                         
  return moda                       
}

async function getDataById(req, res){
  
  const moda=await 
            knex.select(projection)
            .from('tendencia')
            .where('id', req.params.id)
            .then(r=>{
              
              if(r.length === 0) return res.status(404).json({msg:'Dados não encontrados'})
              return res.status(200).json(r)
            })
            .catch(_=>res.status(500)
                         .json({
                           msg: 'Desculpe, houve um erro com o servidor'
            }))
                         
  return moda                       
}

async function getDataBySearchCategory(req, res){
  
  const moda=await 
            knex.select(all)
            .from('tendencia')
            .where('categoria', req.query.categoria)
            .paginate({ 
              perPage: req.query.size, 
              currentPage: req.query.page
            })
            .then(r=>{
          
              if(r.data.length === 0) return res.status(404).json({msg:'Dados não encontrados'})
             return res.status(200).json(r)
            })
            .catch(_=>res.status(500)
                         .json({
                           msg: 'Desculpe, houve um erro com o servidor'
            }))
                         
  return moda                       
}

async function getDataBySearchDescribe(req, res){
  
  const moda=await 
            knex.select(all)
            .from('tendencia')
            .where('descricao', req.query.descricao)
            .paginate({ 
              perPage: req.query.size, 
              currentPage: req.query.page
            })
            .then(r=>{
     
                if(r.data.length === 0) return res.status(404).json({msg:'Dados não encontrados'})
             return res.status(200).json(r)
            })
            .catch(_=>res.status(500)
                         .json({
                           msg: 'Desculpe, houve um erro com o servidor'
            }))
                         
  return moda                       
}

async function getDataBySearchSize(req, res){
  
  const moda=await 
            knex.select(all)
            .from('tendencia')
            .where('tamanho', req.query.tamanho)
            .paginate({ 
              perPage: req.query.size, 
              currentPage: req.query.page
            })
            .then(r=>{
               if(r.data.length === 0) return res.status(404).json({msg:'Dados não encontrados'})
              return res.status(200).json(r)
            })
            .catch(_=>res.status(500)
                         .json({
                           msg: 'Desculpe, houve um erro com o servidor'
            }))
                         
  return moda                       
}

async function getDataBySearchColor(req, res){
  
  const moda=await 
            knex.select(all)
            .from('tendencia')
            .where('cor', req.query.cor)
            .paginate({ 
              perPage: req.query.size, 
              currentPage: req.query.page
            })
            .then(r=>{
              if(r.data.length === 0) return res.status(404).json({msg:'Dados não encontrados'})
             return res.status(200).json(r)
            })
            .catch(_=>res.status(500)
                         .json({
                           msg: 'Desculpe, houve um erro com o servidor'
            }))
                         
  return moda                       
}

async function getDataBySearchPiece(req, res){
  
  const moda=await 
            knex.select(all)
            .from('tendencia')
            .where('peca', req.query.peca)
            .paginate({ 
              perPage: req.query.size, 
              currentPage: req.query.page
            })
            .then(r=>{
             
             if(r.data.length === 0) return res.status(404).json({msg:'Dados não encontrados'})
             return res.status(200).json(r)
            })
            .catch(_=>res.status(500)
                         .json({
                           msg: 'Desculpe, houve um erro com o servidor'
            }))
                         
  return moda                       
}

export { 
  insertData, 
  updateData, 
  removeAllData,
  removeData,
  getData,
  getDataById,
  getDataBySearchCategory,
  getDataBySearchDescribe,
  getDataBySearchSize,
  getDataBySearchColor,
  getDataBySearchPiece
}