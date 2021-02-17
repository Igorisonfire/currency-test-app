import axios from 'axios'

export const baseAPIUrl = 'https://konuxdata.getsandbox.com'

export const instance: any = axios.create({
    baseURL: baseAPIUrl,
    responseType: 'json'
})