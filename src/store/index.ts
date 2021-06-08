import { createStore } from 'redux'

const initialState = {
  login: {}
}


function reducer ( state = initialState, {type, payload}:{type: string, payload: any  }) {
  if(type === "SET_LOGIN") {
    return {
      ...state,
      login: payload
    }
  }
  return state
}

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const store = createStore(reducer)

export default store