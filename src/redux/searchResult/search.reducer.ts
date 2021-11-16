import { SearchResultItem } from '../../common/types';
import { PageResult } from '../../pages/SearchResultPage/SearchResultPage';
import { ActionType } from './action.types';
import { Action } from './search.actions';

export type SearchPage = {
  fetchData: PageResult;
  isLoading: boolean;
  isError: boolean;
  filters: {
    categoryFilters: any;
    colorFilters: Array<string>;
  };
};

const initState: SearchPage = {
  fetchData: {
    shops: [],
    products: [],
  },
  isLoading: true,
  isError: false,
  filters: {
    categoryFilters: {},
    colorFilters: [],
  },
};

const reducer = (state: SearchPage = initState, action: Action): SearchPage => {
  if (action.type === ActionType.FETCH_BEGIN) {
    return { ...state, isLoading: true, isError: false };
  }
  if (action.type === ActionType.FETCH_SUCCESS) {
    const categories = Array.from(
      new Set(action.payload.products.map((product) => product.category))
    );
    const colors = Array.from(
      new Set(action.payload.products.map((product) => product.color!))
    );
    const init = generateInitValueCategory(categories, action.payload.products);
    return {
      ...state,
      isLoading: false,
      isError: false,
      fetchData: action.payload,
      filters: {
        categoryFilters: init,
        colorFilters: colors,
      },
    };
  }
  if (action.type === ActionType.FETCH_ERORR) {
    return { ...state, isLoading: false, isError: true };
  }
  if (action.type === ActionType.CHANGE_CATEGORY_FILTER_VALUE) {
    const newCategoryFilters = Object.assign({}, state.filters.categoryFilters);
    newCategoryFilters[action.payload.category][action.payload.subcategory] =
      action.payload.newValue;
    return {
      ...state,
      filters: { ...state.filters, categoryFilters: newCategoryFilters },
    };
  }
  if (action.type === ActionType.ADD_FILTER_COLOR) {
    return {
      ...state,
      filters: {
        ...state.filters,
        colorFilters: [...state.filters.colorFilters, action.payload],
      },
    };
  }
  if (action.type === ActionType.REMOVE_FILTER_COLOR) {
    return {
      ...state,
      filters: {
        ...state.filters,
        colorFilters: state.filters.colorFilters.filter(
          (color) => color !== action.payload
        ),
      },
    };
  }
  if (action.type === ActionType.CLEAR) {
    return initState;
  }
  return state;
};

const generateInitValueCategory = (
  categories: Array<string>,
  products: Array<SearchResultItem>
) => {
  let init: any = {};
  categories.forEach((category) => {
    let subcategoriesMap: any = {};
    getSubcategoriesForCategory(category, products).map((subcategory) => {
      subcategoriesMap[subcategory] = true;
    });
    init[category] = subcategoriesMap;
  });
  return init;
};

const getSubcategoriesForCategory = (
  category: string,
  products: Array<SearchResultItem>
) => {
  return Array.from(
    new Set(
      products
        .filter((product) => product.category === category)
        .map((product) => product.subcategory)
    )
  );
};

export default reducer;
