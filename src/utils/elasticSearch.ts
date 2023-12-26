import {Client} from '@elastic/elasticsearch';
import { UserResponseDto } from '../dtos/createUser.response.dto';

export const client = new Client({
    node: 'http://localhost:9200',
    auth:{username:'elastic',password:'6JA*SH_MRKdYdrhKvy*Q'},
    maxRetries: 5,
    requestTimeout: 60000
  })
export const createDocument = async (index:string, id:any, data:UserResponseDto) => {
  const response = await client.index({
    index, id, body:data
  })
  console.log('[CreateDocument Triggered]...',response);
  return response;
}

export const getDocument = async(index:string, id:any) => {
  const response = await client.get({
    index,id
  })
  console.log('[GetDocument Triggered]...',response._source);
  return response;
}

export const deleteDocument = async(index:string, id:any) => {
  const response = await client.delete({
    index, id
  })
  console.log('[DeleteDocument Triggered]...',response);
  return response;
}

export const searchPartialDocument = async(index:string, search:string) => {
                  await client.indices.refresh({index})
  const response = await client.search({index, query:{
                match_phrase_prefix: {name: `*${search}*`}
            }})
  console.log('[SearchPartialDocument Triggered]...',response.hits.hits.map(doc => doc._source));
  return response
}

export const searchFullDocument = async(index:string) => {
  await client.indices.refresh({index})
  const response = await client.search({
    index,
    query:{
      match_all:{}
    }
  })
  console.log('[SearchFullDocument Triggered]...', response.hits.hits.map(doc => doc._source));
  return response;
}

export const updateDocument = async(index:string,id:any, data:UserResponseDto) => {
  const response = await client.update({
    index,id,doc:data
  })
  console.log('[UpdateDocument Triggered]...', response);
  return response;
}