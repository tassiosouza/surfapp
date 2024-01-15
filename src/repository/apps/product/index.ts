import { PRODUCTS_AUTHORS } from './query'
import authApolloClient from '../../auth-apollo-client'

export const productImgs = [
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20240105060302/surfpic1-scaled.jpeg',
  'https://surfshotsd.s3.amazonaws.com/20240105060238/surfpic2-scaled.jpeg',
  'https://surfshotsd.s3.amazonaws.com/20231231060625/surf3-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20240105060132/surfpic4-scaled.jpeg',
  'https://surfshotsd.s3.amazonaws.com/20240105055959/surfpic5-scaled.jpeg',
  'https://surfshotsd.s3.amazonaws.com/20240105055949/surfpic6-scaled.jpeg',
  'https://surfshotsd.s3.amazonaws.com/20240105055804/surffpic7-scaled.jpeg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg',
  'https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg'
]

export interface ProductVariant {
  id: number
  name: string
  thumbnail?: string
  color?: string
  featuredImage: string
}

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  tags: string[]
  link: '/product-detail/'
  variants?: ProductVariant[]
  variantType?: 'color' | 'image'
  sizes?: string[]
  allOfSizes?: string[]
  status?: 'New in' | 'limited edition' | 'Sold Out' | '50% Discount'
}

const DEMO_VARIANTS: ProductVariant[] = [
  {
    id: 1,
    name: 'Black',
    thumbnail: '/images/products/v6.jpg',
    featuredImage: productImgs[0]
  },
  {
    id: 2,
    name: 'White',
    thumbnail: '/images/products/v2.jpg',
    featuredImage: productImgs[1]
  },
  {
    id: 3,
    name: 'Orange',
    thumbnail: '/images/products/v3.jpg',
    featuredImage: productImgs[2]
  },
  {
    id: 4,
    name: 'Sky Blue',
    thumbnail: '/images/products/v4.jpg',
    featuredImage: productImgs[3]
  },
  {
    id: 5,
    name: 'Natural',
    thumbnail: '/images/products/v5.jpg',
    featuredImage: productImgs[4]
  }
]

export const getProducts = async () => {
  let combinedResponse: any = null
  let message = 'Internal server error'

  try {
    // Make a single request for both users and products
    combinedResponse = await authApolloClient.query({
      query: PRODUCTS_AUTHORS
    })

    message = 'Success'
  } catch (error: any) {
    console.error('Error fetching combined data:', error)
    message = error.message || 'Internal server error'
  }

  // Log relevant information for the combined response
  console.log('Combined response status:', combinedResponse ? combinedResponse.status : 'N/A')
  console.log(
    'Users data length:',
    combinedResponse ? combinedResponse.data.listUsersWithStoreVendorRole.length : 'N/A'
  )
  console.log('Products data length:', combinedResponse ? combinedResponse.data.products.nodes.length : 'N/A')
  let returnData = null
  if (combinedResponse) {
    // Map vendor information to each product
    returnData = combinedResponse.data.products.nodes.map(
      (product: { metaData: any[]; id: any; name: any; regularPrice: any; salePrice: any; image: any }) => {
        const vendorId = product.metaData.find((meta: { key: string }) => meta.key === '_wcfm_product_author')?.value
        const vendor = combinedResponse.data.listUsersWithStoreVendorRole.find(
          (user: { id: any }) => user.id === vendorId
        )

        return {
          // id: product.id,
          // name: product.name,
          // regularPrice: product.regularPrice,
          // salePrice: product.salePrice,
          id: product.id,
          name: product.name,
          description: vendor?.firstName || null + ' ' + vendor?.lastName || null,
          price: product.salePrice
            ? parseInt(product.salePrice.replace('$', ''))
            : parseInt(product.regularPrice.replace('$', '')),
          image: product.image.mediaItemUrl,
          category: 'Category 1',
          tags: ['tag1', 'tag2'],
          link: '/product-detail/',
          variants: DEMO_VARIANTS,
          variantType: 'image',
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          allOfSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
          status: 'New in',
          vendor: {
            id: vendor?.id || null,
            firstName: vendor?.firstName || null,
            lastName: vendor?.lastName || null
          }
        }
      }
    )
  }

  return {
    error: !message.includes('success'),
    message: message,
    data: returnData
  }
}
