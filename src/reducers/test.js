
import * as actionTypes from '../actions/actionTypes';

function reducer(state = {
    list: [],
    updateFlag:null,
}, action) {
    switch (action.type) {
        // 列表
        case actionTypes.TEST_LIST:
            return {
                ...state,
                list: action.data
            }
        default:
            return state
    }
}

export default reducer