export const initialState = {
    token:null,
    allPosts:[],
    tab:1
}

export const AdminReducer = (state,action)=>{
    switch(action.type){
        case 'ADMIN':
            return action.payload
        case 'TOKEN':
            return {
                ...state,
                token: action.payload
            }
        case 'ALLPOSTS':
            return {
                ...state,
                allPosts: action.payload
            }
        case 'TABS':
            return {
                ...state,
                tab: action.payload
            }
    }
}