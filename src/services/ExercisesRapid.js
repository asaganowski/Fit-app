import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiHeaders= {
  'X-RapidAPI-Key': '21f46cc3e3msh44fa85b96326a24p18bbe2jsnbabc28fc43f6',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
}

const request = (url) => ({ url, headers: apiHeaders });
// Define a service using a base URL and expected endpoints
export const exercisesRapid = createApi({
  reducerPath: 'exercisesRapid',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://exercisedb.p.rapidapi.com/exercises' }),
  endpoints: (builder) => ({
    getExerciseByBodyPart: builder.query({
        query: (name) => request(`/bodyPart/${name}`),
    }),
    
    getExerciseRapid: builder.query({
        query: () => request(),
    }),

  }),
})

export const { useGetExerciseByBodyPartQuery, useGetExerciseRapidQuery} = exercisesRapid 