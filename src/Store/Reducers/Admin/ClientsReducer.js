import {
    GET_ALL_CLIENTS_FOR_ADMIN_START,
    GET_ALL_CLIENTS_FOR_ADMIN_SUCCESS,
    GET_ALL_CLIENTS_FOR_ADMIN_FAILED,
    DELETE_CLIENT_BY_ID_SUCCESS
} from "../../types";

const initialState = {
    clients: [],
    isLoading: false,
    error: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CLIENTS_FOR_ADMIN_START:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ALL_CLIENTS_FOR_ADMIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                clients: action.payload
            };
        case GET_ALL_CLIENTS_FOR_ADMIN_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case DELETE_CLIENT_BY_ID_SUCCESS:
            return {
                ...state,
                clients: state.clients.filter(client => client.id !== action.payload)
            }
        default:
            return state;
    }
}

export const getAllClientsForAdminStart = () => ({ type: GET_ALL_CLIENTS_FOR_ADMIN_START })
export const getAllClientsForAdminSuccess = (clients) => ({ type: GET_ALL_CLIENTS_FOR_ADMIN_SUCCESS, payload: clients })
export const getAllClientsForAdminFailed = (err) => ({ type: GET_ALL_CLIENTS_FOR_ADMIN_FAILED, payload: err })

export const deleteClientByIdSuccess = (id) => ({ type: DELETE_CLIENT_BY_ID_SUCCESS, payload: id })
