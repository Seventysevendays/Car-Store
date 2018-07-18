import fp from 'lodash/fp'
import {fetchServer} from './utils/carFilterUtil'

export default {
    "namespace" : "carFilter",
    "state" : {
        "filters" : [],
        "cars" : [],
        "carSorter" : {
          "order" : undefined,
          "field" : undefined
        },
        "carPagination" : {
          "current" : 1,
          "pageSize" : 10,
          "total" : 0
        }
    },
    "reducers" : {
        changeCars(state , {cars}){
          return fp.set("cars" , cars , state)
        },
        freshFilter(state , {k , v}){
          return fp.set("filters" , state.filters.map(item => item.k == k ? fp.set("v" , v , item) : item) , state)
        },
        addFilter(state , {k , v}){
          var _filters = fp.clone(state.filters);
          _filters.push({k , v});
          return fp.set("filters" , _filters , state)
        },
        deleteFilter(state , {k}){
          return fp.set("filters" , state.filters.filter(item => item.k != k) ,state)
        },
        sort(state , {order , field}){
          return fp.set("carSorter" , {order , field} , state);
        },
        setPage(state , {current =state.carPagination.current , pageSize = state.carPagination.pageSize , total = state.carPagination.total}){
          return fp.set("carPagination" , {current , pageSize , total} , state)
        }
    },
    "effects" : {
        *init(action,{put , call , select}){
          yield call(fetchServer , put , select)
        },
        *changeFilters({k , v} , {put , call , select}){
          const {filters} = yield select((state) => state.carFilter)
          var flag = false;
          for(var i = 0; i < filters.length; i ++){
            if(k == filters[i].k){
                flag = true;
            }
          }
          if(flag){
            yield put({"type":"freshFilter" , k , v})
            if( k == "brand"){
              yield put({"type":"deleteFilter",k:"series"});
            }
          }else{
            yield put({"type":"addFilter" , k , v})
          }
          yield put({"type" : "setPage" , current : 1})
          yield put({"type" : "sort" , order : "ascend" , field : "id"})
          yield call(fetchServer , put , select);
        },
        *removeFilter({k} , {put , call , select}){
          if( k == "brand"){
              yield put({"type":"deleteFilter",k:"series"});
          };
          yield put({"type" : "deleteFilter" , k});
          yield put({"type" : "sort" , order : "ascend" , field : "id"})
          yield put({"type" : "setPage" , current : 1})
          yield call(fetchServer , put , select);
        },
        *changeSort({order , field} , {put , call , select}){
          yield put({"type" : "sort" , order , field})
          yield put({"type" : "setPage" , current : 1})
          yield call(fetchServer , put , select)
        },
        *changePagination({current , pageSize} , {put , call , select}){
          yield put({"type" : "setPage" , current , pageSize})
          yield call(fetchServer , put , select)
        }
    }
}
