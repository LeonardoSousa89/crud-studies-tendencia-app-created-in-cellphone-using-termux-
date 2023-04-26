const all='*'

const projection=[ 
  'tendencia_id',
  'cliente_id',
  'preco',
  'quantidade'
]

const projectionByClientId=[ 
  'id',
  'tendencia_id',
  'preco',
  'quantidade'
]

export { 
  all, 
  projection,
  projectionByClientId
}