export function* fetchServer (put , select){
    var { filters } = yield select((state) => state.carFilter);
    var { carSorter } = yield select((state) => state.carFilter);
    var { carPagination } = yield select((state) => state.carFilter)

    var {results,total} = yield fetch("/carsearch",{
        "method":"POST",
        "headers":{'Content-Type':'application/json'},
        "body":JSON.stringify({
            filters,
            carSorter,
            carPagination
        })
    }).then(data=>data.json());
    if(results == null){
      results = []
    }
    yield put({"type":"changeCars","cars":results});
    yield put({"type" : "setPage" , total})
}
