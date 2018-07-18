import React from 'react';
import { Router , Route, Switch } from 'dva/router'
import Index from './containers/Index'
import FiltersLay from './components/buy/CarFilter/FiltersLay'
import Sifa from './components/buy/Sifa/Sifa'
import Yunqi from './components/buy/Yunqi/Yunqi'
import Zhuanjia from './components/buy/Zhuanjia/Zhuanjia'
import Gujia from './components/sale/Gujia/Gujia'
import AddCar from './components/sale/AddCar/AddCar'
import Yijian from './components/sale/Yijian/Yijian'
import Zhuanrang from './components/sale/Zhuanrang/Zhuanrang'
import OwnerTable from './components/user/Owner/ownerTable'
import AddList from './components/user/AddList/AddList'
import Admin from './components/Admin/Admin'

export default ({ history, app }) => {
  return <Router history={history}>
    <Switch>
      <Route exact path='/' component={Index} />
      <Route exact path="/buy/filterslay" component={FiltersLay}></Route>
      <Route exact path="/buy/sifa" component={Sifa}></Route>
      <Route exact path="/buy/yunqi" component={Yunqi}></Route>
      <Route exact path="/buy/zhuanjia" component={Zhuanjia}></Route>
      <Route exact path="/sale/addcar" component={AddCar}></Route>
      <Route exact path="/sale/gujia" component={Gujia}></Route>
      <Route exact path="/sale/yijian" component={Yijian}></Route>
      <Route exact path="/sale/zhuanrang" component={Zhuanrang}></Route>
      <Route exact path="/user/ownertable" component={OwnerTable}></Route>
      <Route exact path="/user/addlist" component={AddList}></Route>
      <Route exact path="/admin" component={Admin}></Route>
    </Switch>
  </Router>
}
