import CommentsChartService from './CommentsChartService';
import update from '../../helpers/update';
export const COMMENTS_STARTED = "COMMENTS_STARTED";
export const COMMENTS_SUCCESS = "COMMENTS_SUCCESS";
export const COMMENTS_FAILED = "COMMENTS_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getCommentsData = (model) => {
    console.log("+++++++++++Response");
    return (dispatch) => {
        dispatch(getListActions.started());
        CommentsChartService.getComments(model)
            .then((response) => {
                console.log("+++++++++++Response", response);
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
                console.log("+++++++++++catch");
              dispatch(getListActions.failed(err.response));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: COMMENTS_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: COMMENTS_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: COMMENTS_FAILED,
            //errors: response.data
        }
    }
  }

export const commentsChartReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case COMMENTS_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case COMMENTS_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);
          console.log("REGISTER_SHEDULE_SUCCESS)", action.payload);

          break;
      }
      case COMMENTS_FAILED: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', true);
          break;
      }
      default: {
          return newState;
      }
  }
  return newState;
}