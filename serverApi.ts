import express from 'express'
import { Router } from 'express';
import cors from 'cors'
import axios from 'axios'
import cookieParser from 'cookie-parser'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { Response, Request } from 'express'
const layerApi = express()
const port = 3000
interface responseError{
    description: string
    httpCode: number
}

layerApi.use(cookieParser())
layerApi.use(express.json())
layerApi.use(express.static('dist'))

const router = Router()

router.get('/*', (req: Request, res: Response)=>{
    res.sendfile('./dist/index.html')
})

router.use('/api', (req: Request, res: Response, next: Function)=>{
    console.log(req.headers)
    let cookie: string | string[] | undefined = req.headers['authorization']
    if(!cookie){
        let resErr: responseError = {
            description: 'Отсуствует Cookie авторизации',
            httpCode: 403
        }
        res.status(resErr.httpCode)
        res.send(resErr)
    }else{
        next()
    }
})

router.post('/auth', (req: Request, res: Response)=>{
    let path: string = req.body.path
    let method: 'post' | 'get' | 'delete' = req.body.method
    let data: { [key: string]: any } = req.body.data

    let enityRequest: AxiosRequestConfig = {
        url: 'https://steel.aiuta.ru/' + path,
        method: method,
        data: data
    }
    axios(enityRequest).then((response: AxiosResponse)=>{
        res.status(200)
        console.log(response.headers['x-cookie'])
        res.header('Authorization', response.headers['x-cookie'])
        res.send(response.data)
    }).catch((err)=>{
        res.status(err.response.data.httpCode)
        res.send(err.response.data)
    })
})
router.post('/api', (req: Request, res: Response)=>{
    let path: string = req.body.path
    let method: 'post' | 'get' | 'delete' | 'sendFile' = req.body.method
    let data: { [key: string]: any } = req.body.data
    let cookie: string | string[] | undefined = req.headers['authorization']

    let enityRequest: AxiosRequestConfig = {
        url: 'https://steel.aiuta.ru/' + path,
        method: method,
        headers:{
            Cookie: "AiutaAdminAuth=" + cookie
        } 
    }
    if(method == 'post' || method == 'delete')
        enityRequest['data'] = data
    else if(method == 'sendFile'){
        const formData = new FormData();
        formData.append('image', data.image);
        enityRequest['data'] = formData
    }else{
        enityRequest['params'] = data
    }
    console.log(enityRequest)
    axios(enityRequest).then((response: AxiosResponse)=>{
        res.status(200)
        res.send(response.data)
    }).catch((err)=>{
        console.log(err)
        res.status(err.response.data.httpCode)
        res.send(err.response.data)
    })

})
layerApi.use('/',cors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization']
  }), router);

layerApi.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  