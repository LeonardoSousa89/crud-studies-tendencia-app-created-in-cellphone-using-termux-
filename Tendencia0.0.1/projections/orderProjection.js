const all='*'

const projection=[
  'tendencia.id', 
  'tendencia.preco',
  'tendencia.estoque', 
  'tendencia.peca', 
  'tendencia.categoria', 
  'tendencia.descricao', 
  'tendencia.tamanho', 
  'tendencia.cor', 
  'tendencia.image_url', 
  'pedido.quantidade'
]

const projectionByClientId=[
  'cliente.id', 
  'cliente.nome', 
  'cliente.sobrenome', 
  'cliente.contato',
  'cliente.cpf',
  'tendencia.id', 
  'tendencia.preco',
  'tendencia.estoque', 
  'tendencia.peca', 
  'tendencia.categoria', 
  'tendencia.descricao', 
  'tendencia.tamanho', 
  'tendencia.cor', 
  'tendencia.image_url', 
  'pedido.quantidade',
  'pagamento.id', 
  'pagamento.total_a_pagar'
]

const projectionByTotalToPay=[
   'pedido.id', 
   'tendencia.preco', 
   'pedido.quantidade'
]

export { 
  all, 
  projection,
  projectionByClientId,
  projectionByTotalToPay
}