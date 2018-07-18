export function* fetchServer (put , select){
    var { ownerSorter } = yield select((state) => state.ownerFilter);
    var { ownerPagination } = yield select((state) => state.ownerFilter)
    var {keyword} = yield select((state) => state.ownerFilter)

    var {results,total} = yield fetch(`/owner?order=${ownerSorter.order}&field=${ownerSorter.field}&current=${ownerPagination.current}&pageSize=${ownerPagination.pageSize}&keyword=${keyword}`).then(data=>data.json());
    if(results == null){
      results = []
    }
    yield put({"type":"changeOwners","owners":results});
    yield put({"type" : "setPage" , total})
}
