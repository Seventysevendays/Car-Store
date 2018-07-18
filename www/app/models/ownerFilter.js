import fp from 'lodash/fp'
import {fetchServer} from './utils/ownerFilterUtil'

export default {
    "namespace" : "ownerFilter",
    "state" : {
        "owners" : [],
        "ownerSorter" : {
          "order" : undefined,
          "field" : undefined
        },
        "ownerPagination" : {
          "current" : 1,
          "pageSize" : 10,
          "total" : 0
        },
        "keyword" : ""
    },
    "reducers" : {
        changeOwners(state , {owners}){
          return fp.set("owners" , owners , state)
        },
        sort(state , {order , field}){
          return fp.set("ownerSorter" , {order , field} , state);
        },
        setPage(state , {current =state.ownerPagination.current , pageSize = state.ownerPagination.pageSize , total = state.ownerPagination.total}){
          return fp.set("ownerPagination" , {current , pageSize , total} , state)
        },
        changeKeyWord(state , {keyword}){
          return fp.set("keyword" , keyword , state)
        }
    },
    "effects" : {
        *init(action,{put , call , select}){
          yield call(fetchServer , put , select)
        },
        *changeSort({order , field} , {put , call , select}){
          yield put({"type" : "sort" , order , field})
          yield put({"type" : "setPage" , current : 1})
          yield call(fetchServer , put , select)
        },
        *changePagination({current , pageSize} , {put , call , select}){
          yield put({"type" : "setPage" , current , pageSize})
          yield call(fetchServer , put , select)
        },
        *findKey({keyword} , {put , call , select}){
          yield put({"type" : "changeKeyWord" , keyword})
          yield call(fetchServer , put , select)
        }
    }
}
