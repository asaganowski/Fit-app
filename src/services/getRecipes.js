import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiHeaders={
    
  'X-RapidAPI-Key': '6d08820bd7msh7730bbfd8f7cba2p1d2bc6jsna047cf55324d',
    'X-RapidAPI-Host': 'yummly2.p.rapidapi.com'
      
}

const request = (url) => ({ url, headers: apiHeaders });

export const recipes = createApi({
  reducerPath: 'recipes',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://yummly2.p.rapidapi.com/' }),
  endpoints: (builder) => ({
    
    getRecipesById:builder.query({
      query: (id) => request(`feeds/list-similarities?limit=1&start=0&id=${id}`),
    }),

    getSimilarRecipesById:builder.query({
      query: (id) => request(`feeds/list-similarities?limit=18&start=0&apiFeedType=moreFrom&authorId=Yummly&id=${id}`),
    }),

    getTags:builder.query({
      query: () => request(`tags/list`),
    }),

    getRecipesByParams:builder.query({
      query: ({ingredient, attribute}) => request(`feeds/search?start=0&maxResult=18&q=${ingredient}&allowedAttribute=${attribute}`),
    }),

    
  }),
})

export const {useGetRecipesByIdQuery, useGetRecipesByParamsQuery, useGetSimilarRecipesByIdQuery, useGetTagsQuery} = recipes