import PersonsChartService from './PersonsChartService';
import update from '../../helpers/update';
export const PERSONS_STARTED = "PERSONS_STARTED";
export const PERSONS_SUCCESS = "PERSONS_SUCCESS";
export const PERSONS_FAILED = "PERSONS_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getPersonsData = (model) => {
    console.log("+++++++++++Response");
    return (dispatch) => {
        dispatch(getListActions.started());
        PersonsChartService.getPersons(model)
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
            type: PERSONS_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: PERSONS_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: PERSONS_FAILED,
            //errors: response.data
        }
    }
  }

export const personsChartReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case PERSONS_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case PERSONS_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);
          console.log("REGISTER_SHEDULE_SUCCESS)", action.payload);

          break;
      }
      case PERSONS_FAILED: {
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