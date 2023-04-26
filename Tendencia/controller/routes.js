import {
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
}from '../services/productService'

import {
   insertClient, 
   getClient,
   getClientById
}from '../services/clientService'

import { 
   insertAddress,
   getAddressById,
   getAddressByClientId,
   updateAddress,
   removeAddress
} from '../services/addressService'

import { 
   insertPhoneNumber,
   updatePhoneNumber,
   getPhoneNumberById,
   getPhoneNumberByClientId,
   removePhoneNumber
} from '../services/phoneNumberService'

import { 
  insertOrder,
  getOrderById,
  getOrderByClientId,
  removeOrder,
  totalToPay
} from '../services/orderService'

import { 
  insertPayment,
  getPayment,
  getPaymentDoneByClientId
} from '../services/paymentService'

import express from 'express'

const server=express.Router()

server.route('/loja/inserir-item').post(function(req, res){
  
      insertData(req, res)
})

server.route('/loja/:id/alterar-item').put(function(req, res){

     updateData(req, res)
})

server.route('/loja/deletar-todos-itens').delete(function(req, res){
  
     removeAllData(res)
})

server.route('/loja/:id/deletar-item').delete(function(req, res){
  
     removeData(req, res)
})

server.route('/loja/itens').get(function(req, res){
  
      getData(req, res)
})

server.route('/loja/:id/item').get(function(req, res){
  
      getDataById(req, res)
})

server.route('/loja/item/checkbox/categoria/busca').get(function(req, res){
  
      getDataBySearchCategory(req, res)
})

server.route('/loja/item/checkbox/descricao/busca').get(function(req, res){
  
      getDataBySearchDescribe(req, res)
})

server.route('/loja/item/checkbox/tamanho/busca').get(function(req, res){
  
      getDataBySearchSize(req, res)
})

server.route('/loja/item/checkbox/cor/busca').get(function(req, res){
  
      getDataBySearchColor(req, res)
})

server.route('/loja/item/barra-de-busca/peca/busca').get(function(req, res){
  
      getDataBySearchPiece(req, res)
})

server.route('/loja/salvar-dados-do-cliente').post(function(req, res){
  
      insertClient(req, res)
})

server.route('/loja/obter-todos-os-cliente').get(function(req, res){
  
      getClient(req, res)
})

server.route('/loja/:id/obter-dados-do-cliente').get(function(req, res){
  
      getClientById(req, res)
})

server.route('/loja/salvar-dados-do-cliente/endereco').post(function(req, res){
  
      insertAddress(req, res)
})

server.route('/loja/:id/obter-dados-do-cliente/endereco').get(function(req, res){
  
    getAddressById(req, res)
})

server.route('/loja/id-do-cliente/:id/obter-dados-do-cliente/endereco').get(function(req, res){
  
    getAddressByClientId(req, res)
})

server.route('/loja/:id/atualizar-dados-do-cliente/endereco').put(function(req, res){
  
    updateAddress(req, res)
})

server.route('/loja/:id/remover-dados-do-cliente/endereco').delete(function(req, res){
  
    removeAddress(req, res)
})

server.route('/loja/salvar-dados-do-cliente/telefone').post(function(req, res){
  
      insertPhoneNumber(req, res)
})

server.route('/loja/:id/atualizar-dados-do-cliente/telefone').put(function(req, res){
  
    updatePhoneNumber(req, res)
})

server.route('/loja/:id/obter-dados-do-cliente/telefone').get(function(req, res){
  
    getPhoneNumberById(req, res)
})

server.route('/loja/id-do-cliente/:id/obter-dados-do-cliente/telefone').get(function(req, res){
  
    getPhoneNumberByClientId(req, res)
})

server.route('/loja/:id/remover-dados-do-cliente/telefone').delete(function(req, res){
  
    removePhoneNumber(req, res)
})

server.route('/loja/salvar-dados-do-cliente/pedido').post(function(req, res){
  
      insertOrder(req, res)
})

server.route('/loja/:id/obter-dados-do-cliente/pedido').get(function(req, res){
  
      getOrderById(req, res)
})

server.route('/loja/id-do-cliente/:id/obter-dados-do-cliente/pedido').get(function(req, res){
  
      getOrderByClientId(req, res)
})

server.route('/loja/:id/remover-dados-do-cliente/pedido').delete(function(req, res){
  
      removeOrder(req, res)
})

server.route('/loja/:id/total-a-pagar').get(function(req, res){
  
      totalToPay(req, res)
})

server.route('/loja/salvar-dados-do-cliente/pagamento').post(function(req, res){
  
      insertPayment(req, res)
})

server.route('/loja/registro-de-pagamentos').get(function(req, res){
  
      getPayment(res)
})

server.route('/loja/:id/obter-dados-do-cliente/pagamento').get(function(req, res){
  
      getPaymentDoneByClientId(req, res)
})

export default server