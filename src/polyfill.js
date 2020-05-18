/*
* required polyfills
*/
import "core-js";
import 'core-js/features/set/map';

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es/symbol'
// import 'core-js/es/object'
// import 'core-js/es/function'
// import 'core-js/es/parse-int'
// import 'core-js/es/parse-float'
// import 'core-js/es/number'
// import 'core-js/es/math'
// import 'core-js/es/string'
// import 'core-js/es/date'
// import 'core-js/es/array'
// import 'core-js/es/regexp'
// import 'core-js/es/map'
// import 'core-js/es/weak-map'
// import 'core-js/es/set'
// import 'core-js/es/object'

/** IE10 and IE11 requires the following for the Reflect API. */
// import 'core-js/es/reflect'

/** Evergreen browsers require these. **/
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
// import 'core-js/es/reflect'

// CustomEvent() constructor functionality in IE9, IE10, IE11
(function () {

  if ( typeof window.CustomEvent === "function" ) return false

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    var evt = document.createEvent( 'CustomEvent' )
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail )
    return evt
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
})()
