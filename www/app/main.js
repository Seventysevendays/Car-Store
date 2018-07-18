import dva from 'dva'

import showCar from './models/showCar'
import carFilter from './models/carFilter'
import ownerFilter from './models/ownerFilter'
import addCar from './models/addCar'

import router from './router.js'

const app = dva({
    // onAction : logger
})

app.model(showCar);
app.model(carFilter);
app.model(ownerFilter);
app.model(addCar)

app.router(router);
app.start('#app')
