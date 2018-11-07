import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authors: [],
  filteredAuthors: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AUTHORS:
      return {
        ...state,
        authors: action.payload,
        filteredAuthors: action.payload,
        loading: false
      };

    case actionTypes.FILTER_AUTHORS:
      return {
        ...state,
        filteredAuthors: state.authors.filter(author => {
          return `${author.first_name} ${author.last_name}`
            .toLowerCase()
            .includes(action.payload);
        })
      };
    case actionTypes.POST_AUTHOR:
      return {
        ...state,
        authors: [action.payload].concat(state.authors),
        filteredAuthors: [action.payload].concat(state.authors)
      };
    default:
      return state;
  }
};

export default reducer;
