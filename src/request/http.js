import request from './request.js'

export function getAction(url,params){
  return request({
    url,
    method:'get',
    headers:{
      'content-type':"application/json"
    },
    params
  })
}

export function postAction(url,data){
  return request({
    url,
    method:'post',
    headers:{
      'content-type':"application/json"
    },
    data
  })
}

export function putAction(url,data){
  return request({
    url,
    method:'put',
    headers:{
      'content-type':"application/json"
    },
    data
  })
}

export function deleteAction(url,params,data=''){
  return request({
    url,
    method:'delete',
    headers:{
      'content-type':"application/json"
    },
    params,
    data
  })
}

export function patchAction(url,data){
  return request({
    url,
    method:'patch',
    headers:{
      'content-type':"application/json"
    },
    data
  })
}

export function uploadAction(url,data){
  return request({
    url,
    method:'post',
    headers:{
      'content-type':"multipart/form-data"
    },
    data
  })
}

export function download(url){
  return request({
    url,
    method:'get',
    responseType:'blob'
  })
}