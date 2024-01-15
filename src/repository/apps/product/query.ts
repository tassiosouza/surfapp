import { gql } from '@apollo/client'

export const PRODUCTS_AUTHORS = gql`
  query {
    listUsersWithStoreVendorRole {
      id
      firstName
      lastName
    }
    products(first: 8) {
      nodes {
        id
        name
        image {
          mediaItemUrl
        }
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
