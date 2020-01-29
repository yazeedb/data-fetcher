export const swapiEndpoint = "https://swapi.co/api/people/?format=json";
export const pokeapiEndpoint = "https://pokeapi.co/api/v2/pokemon";

export const statuses = {
  idle: "idle",
  fetching: "fetching",
  error: "error",
  success: "success"
};

export const createFetcher = () => {
  const actions = {
    init: { type: "INIT" },
    fetch: { type: "FETCH" },
    cancel: { type: "CANCEL" },
    error: message => ({ type: "ERROR", message }),
    success: data => ({ type: "SUCCESS", data })
  };

  const initialState = {
    status: statuses.idle,
    message: null,
    data: []
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actions.init.type:
        return initialState;

      case actions.fetch.type:
        return {
          ...state,
          status: statuses.fetching
        };

      case actions.cancel.type:
        return {
          ...state,
          status: statuses.idle
        };

      case actions.error().type:
        return {
          ...state,
          status: statuses.error,
          message: action.message
        };

      case actions.success().type:
        return {
          ...state,
          status: statuses.success,
          data: action.data
        };

      default:
        return state;
    }
  };

  return {
    actions,
    reducer,
    initialState,
    statuses
  };
};
