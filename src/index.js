import '@babel/polyfill'
import Promise from 'bluebird'

// глобальные стили
import 'normalize.css'
import 'ehrSrc/styles/app.global.scss'

// import createDebug from 'debug'
localStorage.debug = 'ehr:*'

// глобальный Promise bluebird
window.Promise = Promise

require('./render')
