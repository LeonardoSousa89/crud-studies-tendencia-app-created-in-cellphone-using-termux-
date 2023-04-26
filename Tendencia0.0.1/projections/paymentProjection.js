const all=[
  'pagamento.id AS id_do_pagamento*',
  'pagamento.bandeira',
  'pagamento.titular_cartao', 
  'pagamento.numero_cartao',
  'pagamento.csv', 
  'pagamento.validade', 
  'total_a_pagar AS total_pago*',
  'cliente.id AS id_do_cliente*', 
  'cliente.nome', 
  'cliente.sobrenome', 
  'cliente.contato', 
  'cliente.cpf',
  'endereco.id AS id_do_endereco*', 
  'endereco.cep', 
  'endereco.estado', 
  'endereco.cidade', 
  'endereco.rua', 
  'telefone.id AS id_do_telefone*', 
  'telefone.fixo', 
  'telefone.celular',
  'pedido.id AS id_do_pedido*', 
  'pedido.quantidade',
  'tendencia.id AS id_do_produto*',
	"tendencia.preco AS preco_unitario",
  "tendencia.estoque",
	"tendencia.peca",
	"tendencia.categoria",
	"tendencia.descricao",
	"tendencia.tamanho",
	"tendencia.cor",
	"tendencia.image_url"
]

const projection=[ 
   'bandeira',
   'titular_cartao',
   'numero_cartao',
   'csv',
   'validade', 
   'total_a_pagar',
   'cliente_id',
   'endereco_id',
   'telefone_id',
   'pedido_id'
]

const projectionByClientId=[
  'cliente.id AS id_do_cliente*', 
  'cliente.nome', 
  'cliente.sobrenome', 
  'cliente.contato', 
  'cliente.cpf',
  'telefone.id AS id_do_telefone*', 
  'telefone.fixo', 
  'telefone.celular',
  'endereco.id AS id_do_endereco*', 
  'endereco.cep', 
  'endereco.estado', 
  'endereco.cidade', 
  'endereco.rua', 
  'pagamento.id AS id_do_pagamento*', 
  'pagamento.bandeira',
  'pagamento.titular_cartao', 
  'pagamento.numero_cartao',
  'pagamento.csv', 
  'pagamento.validade', 
  'total_a_pagar AS total_pago*',
  'pedido.id AS id_do_pedido*', 
  'pedido.quantidade',
  'tendencia.id AS id_do_produto*',
	"tendencia.preco AS preco_unitario*",
  "tendencia.estoque",
	"tendencia.peca",
	"tendencia.categoria",
	"tendencia.descricao",
	"tendencia.tamanho",
	"tendencia.cor",
	"tendencia.image_url"
]

const projectionTotalAPagar=[
  'id',
 'total_a_pagar'
]

export { 
  all, 
  projection,
  projectionByClientId,
  projectionTotalAPagar
}