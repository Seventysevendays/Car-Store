import fp from 'lodash/fp'
import { fetchImages, fetchCarLike } from './utils/showCarUtil'

export default {
  "namespace": "showCar",
  "state": {
    nowIndex: 0,
    carImages: [],
    nowId: 0,
    nowAlbum: "view",
    carLike: [],
  },
  "reducers": {
    setCarImages(state, action) {
      return fp.set("carImages", action.carImages, state)
    },
    setNowIndexSync(state, action) {
      return fp.set("nowIndex", action.nowIndex, state)
    },
    setNowAlbumSync(state, action) {
      return fp.set("nowAlbum", action.nowAlbum, state)
    },
    setCarLike(state, action) {
      return fp.set("carLike", action.carLike, state)
    },
    setNowId(state, action) {
      return fp.set("nowId", action.nowId, state)
    }
  },
  "effects": {
    *init({ nowId }, { call, put }) {
      yield put({ "type": "setNowAlbumSync", "nowAlbum": "view" })
      yield put({ "type": "setNowId", "nowId": nowId })
      yield put({ "type": "setNowIndexSync", "nowIndex": 0 })

      const carImages = yield call(fetchImages, nowId);
      yield put({ "type": "setCarImages", carImages });

      const carLike = yield call(fetchCarLike, nowId);
      yield put({ "type": "setCarLike", carLike })

    },
    *changeNowAlbum(action, { put, call }) {
      yield put({ "type": "setNowIndexSync", "nowIndex": 0 });
      yield put({ "type": "setNowAlbumSync", "nowAlbum": action.nowAlbum });
    },
    *changeNowIndex({ nowIndex }, { put, call }) {
      yield put({ "type": "setNowIndexSync", nowIndex })
    },
    *prevPic(action, { put, call, select }) {
      const { nowIndex, nowAlbum, carImages } = yield select((state) => state.showCar);
      const arr = ["view", "inner", "engine", "more"]
      let next = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == nowAlbum) {
          if (i == 0) {
            next = arr[arr.length - 1];
          } else {
            next = arr[i - 1];
          }
        }
      }
      let nextAlbumLength = carImages[next].length;
      if (nowIndex == 0) {
        yield put({ "type": "setNowAlbumSync", "nowAlbum": next });
        yield put({ "type": "setNowIndexSync", "nowIndex": nextAlbumLength - 1 })
      } else {
        yield put({ "type": "setNowIndexSync", "nowIndex": nowIndex - 1 })
      }
    },
    *nextPic(action, { put, call, select }) {
      const arr = ["view", "inner", "engine", "more"];
      const { nowIndex, nowAlbum, carImages } = yield select((state) => state.showCar);
      let next = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == nowAlbum) {
          if (i == arr.length - 1) {
            next = arr[0];
          } else {
            next = arr[i + 1];
          }
        }
      }
      if (nowIndex == carImages[nowAlbum].length - 1) {
        yield put({ "type": "setNowAlbumSync", "nowAlbum": next });
        yield put({ "type": "setNowIndexSync", "nowIndex": 0 })
      } else {
        yield put({ "type": "setNowIndexSync", "nowIndex": nowIndex + 1 })
      }
    },
    *clearCarImages(action , { put , call , select }){
      yield put({"type" : "setCarImages" , "carImages" : {}})
    }
  }
}
