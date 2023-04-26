const all='*'

const projection=[ 
   'bandeira',
   'titular_cartao',
   'numero_cartao',
   'csv',
   'validade', 
  'total_a_pagar',
   'cliente_id'
]

const projectionTotalAPagar=[
  'id',
 'total_a_pagar'
]

export { 
  all, 
  projection, 
  projectionTotalAPagar
}