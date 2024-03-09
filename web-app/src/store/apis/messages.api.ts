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
        deleteMessage: build.mutation({
            query: (id) => ({
                url: `chats/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Chats', id: 'LIST'}],
        }),
        updateMessage: build.mutation({
            query: ({id, body}) => ({
                url: `chats/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (arg) => [
                { type: 'Chats', id: 'LIST' },
                { type: 'Chats', id: arg.id }
            ],
        })
    })
})

export const {
    useGetMessagesQuery,
    useAddMessageMutation,
    useDeleteMessageMutation,
    useUpdateMessageMutation,
} = messagesApi
