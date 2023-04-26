/*
projeção dos dados
em uma query com 
inner join
*/
const joinProjection=[
    'cliente.nome', 
    'cliente.email',
    'endereco.id',
    'endereco.cep', 
    'endereco.estado', 
    'endereco.cidade', 
    'endereco.rua',
    'telefone.id',
    'telefone.fixo',
    'telefone.celular',
    'pedido.id',
    'pedido.tendencia_id',
    'pagamento.id',
    'pagamento.status',
    'pagamento.bandeira',
    'pagamento.titular_cartao',
    'pagamento.numero_cartao',
    'pagamento.csv'
]

/*
construção de una query
com inner join utilizando,
o ORM knex e o javascript
*/
async function innerJoin(req, res){
  
  const cliente=await 
                 knex.select(joinProjection)
                     .from('cliente')
                     .innerJoin('endereco', 'endereco.cliente_id', 'cliente.id')
                     .innerJoin('telefone', 'telefone.cliente_id', 'cliente.id')
                     .innerJoin('pedido', 'pedido.cliente_id', 'cliente.id')
                     .innerJoin('pagamento', 'pagamento.cliente_id', 'cliente.id')
                     .where('cliente.id', req.params.id)
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