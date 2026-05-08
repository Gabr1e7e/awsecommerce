import axios from 'axios'

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

export const getProducts = (skip = 0, limit = 20, category = '') => {
    return API.get('/products', {
        params: { skip, limit, category }
    })
}

export const getProduct = (productID) => {
    return API.get(`/products/${productID}`)
}

export const getReviews = (productID) => {
    return API.get(`/products/${productID}/reviews`)
}