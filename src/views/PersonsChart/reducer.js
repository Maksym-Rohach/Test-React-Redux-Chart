
import PersonsChartServices from "./PersonsChartService"


export const ADD_ARTICLE_STARTED = 'addArticle/ADD_ARTICLE_STARTED';
export const ADD_ARTICLE_SUCCESS = 'addArticle/ADD_ARTICLE_SUCCESS';
export const ADD_ARTICLE_FAILED = 'addArticle/ADD_ARTICLE_FAILED';


const initialState = {
    loading: false,
    error: false,
    errorMess: {}
}

export const personsChartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_ARTICLE_STARTED: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case ADD_ARTICLE_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false
            }
        }
        case ADD_ARTICLE_FAILED: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMess: action.error
            }
        }

        default: return state;
    }
}

export const addArticle = (model) => {
    return dispatch => {
        dispatch(addArticleActions.started())
        PersonsChartServices.AddArticle(model)
            .then(() => {
                dispatch(addArticleActions.success())
            })
            .catch((error) => {

                dispatch(addArticleActions.failed(error))
            })
    }

}

export const addArticleActions = {
    started: () => {
        return {
            type: ADD_ARTICLE_STARTED,
        };
    },
    success: () => {
        return {
            type: ADD_ARTICLE_SUCCESS,
            //payload: response,
        };
    },
    failed: (error) => {
        return {
            type: ADD_ARTICLE_FAILED,
            error: error,
        };
    }
}