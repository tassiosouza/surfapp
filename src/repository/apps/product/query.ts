import { gql } from '@apollo/client'

export const PRODUCTS = gql`
  query {
    products(first: 8) {
      nodes {
        id
        name
        ... on SimpleProduct {
          regularPrice
          salePrice
          metaData(key: "_wcfm_product_author") {
            key
            value
          }
        }
      }
    }
  }
`
