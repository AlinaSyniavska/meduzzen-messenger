import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {MessageDto} from "../types";

const baseUrl = import.meta.env.VITE_API_URL;

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    tagTypes: ['Chats'],
    endpoints: (build) => ({
        getMessages: build.query<MessageDto[], void>({
            query: () => `Chats`,
            providesTags: result =>
                result
                    ? [
                        ...result.map(({id}) => ({type: 'Chats' as const, id})),
                        {type: 'Chats', id: 'LIST'},
                    ]
                    : [{type: 'Chats', id: 'LIST'}],
        }),
        addMessage: build.mutation({
            query: body => ({
                url: 'Chats',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Chats', id: 'LIST' }],
        }),
        /*getCurrentPerson: build.query<IPersonDTO, string>({
            query: (id) => `Persons/${id}`,
            providesTags: (result, error, id) => [{ type: 'Persons', id }],
        }),
        updatePerson: build.mutation({
            query: body => ({
                url: `Persons/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Persons', id: 'LIST' },
                { type: 'Persons', id: arg.id }
            ],
        })*/
    })
})

export const {
    useGetMessagesQuery,
    useAddMessageMutation,
    // useGetCurrentPersonQuery,
    // useUpdatePersonMutation,
} = messagesApi
