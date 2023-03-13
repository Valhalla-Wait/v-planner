import {
    GET_ALL_SERVICE_TYPES_START,
    GET_ALL_SERVICE_TYPES_SUCCESS,
    GET_ALL_SERVICE_TYPES_FAILED,
    GET_GENERAL_SERVICES_BY_SERVICE_TYPE_SUCCESS,
    ADD_SERVICE_TYPE_SUCCESS,
    ADD_GENERAL_SERVICE_SUCCESS,
    EDIT_SERVICE_TYPE_SUCCESS,
    EDIT_GENERAL_SERVICE_SUCCESS,
    DELETE_SERVICE_TYPE_BY_ID_SUCCESS,
    DELETE_GENERAL_SERVICE_BY_ID_SUCCESS,
} from "../../types";

const initialState = {
    serviceTypes: [],
    isLoading: false,
    error: null,
};

export default function servicesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SERVICE_TYPES_START:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ALL_SERVICE_TYPES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                serviceTypes: action.payload
            };
        case GET_ALL_SERVICE_TYPES_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case GET_GENERAL_SERVICES_BY_SERVICE_TYPE_SUCCESS:
            return {
                ...state,
                serviceTypes: state.serviceTypes.map(
                    serviceType => serviceType.id === action.payload.id ? { ...serviceType, generalServices: [...action.payload.generalServices] }
                        : serviceType
                )
            }
        case ADD_SERVICE_TYPE_SUCCESS:
            return {
                ...state,
                serviceTypes: [...state.serviceTypes, action.payload]
            };
        case ADD_GENERAL_SERVICE_SUCCESS:
            return {
                ...state,
                serviceTypes: state.serviceTypes.map(
                    serviceType => serviceType.id === action.payload.id ? { ...serviceType, generalServices: [...serviceType.generalServices, action.payload.generalService] }
                        : serviceType
                )
            };
        case EDIT_SERVICE_TYPE_SUCCESS:
            return {
                ...state,
                serviceTypes: state.serviceTypes.map(
                    serviceType => serviceType.id === action.payload.id ? { ...serviceType, name: action.payload.name }
                        : serviceType
                )
            };
        case EDIT_GENERAL_SERVICE_SUCCESS:
            return {
                ...state,
                serviceTypes: state.serviceTypes.map(
                    serviceType => serviceType.id === action.payload.serviceTypeId ? {
                        ...serviceType, generalServices: serviceType.generalServices.map(
                            generalService => generalService.id === action.payload.generalService.id ? { ...generalService, ...action.payload.generalService }
                                : generalService
                        )
                    }
                        : serviceType
                )
            };
        case DELETE_SERVICE_TYPE_BY_ID_SUCCESS:
            return {
                ...state,
                serviceTypes: state.serviceTypes.filter(serviceType => serviceType.id !== action.payload)
            };
        case DELETE_GENERAL_SERVICE_BY_ID_SUCCESS:
            return {
                ...state,
                serviceTypes: state.serviceTypes.map(
                    serviceType => serviceType.id === action.payload.serviceTypeId ? { ...serviceType, generalServices: serviceType.generalServices.filter(generalService => generalService.id !== action.payload.generalServiceId) }
                        : serviceType
                )
            }
        default:
            return state;
    }
}

export const getAllServiceTypesStart = () => ({ type: GET_ALL_SERVICE_TYPES_START })
export const getAllServiceTypesSuccess = (serviceTypes) => ({ type: GET_ALL_SERVICE_TYPES_SUCCESS, payload: serviceTypes })
export const getAllServiceTypesFailed = (err) => ({ type: GET_ALL_SERVICE_TYPES_FAILED, payload: err })

export const getGeneralServicesByServiceTypeSuccess = (generalServices, id) => ({ type: GET_GENERAL_SERVICES_BY_SERVICE_TYPE_SUCCESS, payload: { generalServices, id } })

export const addServiceTypeSuccess = (serviceType) => ({ type: ADD_SERVICE_TYPE_SUCCESS, payload: serviceType })
export const addGeneralServiceSuccess = (generalService, id) => ({ type: ADD_GENERAL_SERVICE_SUCCESS, payload: { generalService, id } })
export const editServiceTypeSuccess = (serviceType) => ({ type: EDIT_SERVICE_TYPE_SUCCESS, payload: serviceType })
export const editGeneralServiceSuccess = (generalService, serviceTypeId) => ({ type: EDIT_GENERAL_SERVICE_SUCCESS, payload: { generalService, serviceTypeId } })
export const deleteServiceTypeByIdSuccess = (id) => ({ type: DELETE_SERVICE_TYPE_BY_ID_SUCCESS, payload: id })
export const deleteGeneralServiceByIdSuccess = (generalServiceId, serviceTypeId) => ({ type: DELETE_GENERAL_SERVICE_BY_ID_SUCCESS, payload: { generalServiceId, serviceTypeId } })
