import React from 'react'

const ProductItem = ({product}) => {
  return (
    <View>
        <Text>{product.name}</Text>
        <Text>{product.quantity}</Text>
    </View>
  )
}

export default ProductItem