import { createStore } from 'redux';

const initialState = {
  tables: [], // an array to store all tables
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TABLE':
      return {
        ...state,
        tables: [...state.tables, action.payload],
      };
    case 'REMOVE_TABLE':
      return {
        ...state,
        tables: state.tables.filter((table) => table.id !== action.payload),
      };
    case 'UPDATE_TABLE':
      return {
        ...state,
        tables: state.tables.map((table) =>
          table.id === action.payload.id ? action.payload : table
        ),
      };
    case 'SET_TABLES':
      return {
        ...state,
        tables: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;