import axios, { type CancelTokenSource, type AxiosRequestConfig } from 'axios'
import type { AxiosError } from 'axios'
import type { AxiosInstance } from 'axios'
import { notification } from 'ant-design-vue';
import Cookies from 'js-cookie';

interface ErrorOfServer{
    description: string
    extra: any
    httpCode: number
}
export class Api{
    public api_url: string
    private source: CancelTokenSource | null
    private settings: AxiosRequestConfig = {
        headers: {
            'Authorization': Cookies.get('AiutaAdminAuth')
        },
        withCredentials: true
    }
    constructor(url: string, path: string, port?: string){
        this.api_url = url + (port ? ':' + port : '') + path
    }

    async get(path: string, data?: { [key:string]: any }): Promise<any>{
        return await axios.post(this.api_url, {
            path: path,
            method: 'get',
            data: data,
        }, this.settings)
    }

    async post(path: string, data?: { [key:string]: any }, is_abort?: boolean): Promise<any>{
        let settings = this.settings
        if(is_abort){
            this.source = axios.CancelToken.source();
            settings['cancelToken'] = this.source.token
        }
        return await axios.post(this.api_url, {
            path: path,
            method: 'post',
            data: data,
        }, settings)
    }

    async delete(path: string, data?: { [key:string]: any }): Promise<any>{
        return await axios.post(this.api_url, {
            path: path,
            method: 'delete',
            data: data,
        }, this.settings)
    }
    abort(): void{
        if(this.source)
            this.source.cancel();
        this.source = null
    }

    static showEror(error: AxiosError<ErrorOfServer>): void{
        if(error.response){
            notification.error({
                message: 'Ошибка: ' + error.response.data.httpCode,
                description: error.response.data.description
            })
        }
    }
}
