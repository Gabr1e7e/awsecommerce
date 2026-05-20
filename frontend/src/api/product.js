import axios from 'axios'

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

export const getProducts = (params = {}) => {
    return API.get('/products', { params })
}
export const getCategories = () => {
    return API.get('/products/categories')
}

export const getProduct = (productID) => {
    return API.get(`/products/${productID}`)
}

export const getReviews = (productID) => {
    return API.get(`/products/${productID}/reviews`)
}