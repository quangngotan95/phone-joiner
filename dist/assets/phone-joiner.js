"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('phone-joiner/app', ['exports', 'ember', 'phone-joiner/resolver', 'ember-load-initializers', 'phone-joiner/config/environment'], function (exports, _ember, _phoneJoinerResolver, _emberLoadInitializers, _phoneJoinerConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _phoneJoinerConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _phoneJoinerConfigEnvironment['default'].podModulePrefix,
    Resolver: _phoneJoinerResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _phoneJoinerConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('phone-joiner/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'phone-joiner/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _phoneJoinerConfigEnvironment) {

  var name = _phoneJoinerConfigEnvironment['default'].APP.name;
  var version = _phoneJoinerConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('phone-joiner/components/x-file-input', ['exports', 'emberx-file-input/components/x-file-input'], function (exports, _emberxFileInputComponentsXFileInput) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberxFileInputComponentsXFileInput['default'];
    }
  });
});
define('phone-joiner/controllers/phone-joiner', ['exports', 'ember', 'npm:babyparse'], function (exports, _ember, _npmBabyparse) {
  exports['default'] = _ember['default'].Controller.extend({
    range: '',
    csvData: {},
    output: '',
    fileName: '',
    actions: {
      join: function join() {
        var csvData = this.get('csvData');
        var parsed = _npmBabyparse['default'].parse(csvData);
        var rows = parsed.data;
        var head = rows[0];
        var numberArray = [];
        var index = -1;
        for (var i = 0; i < head.length; i++) {
          if (head[i].indexOf('Number') > -1) {
            index = i;
            break;
          }
        }if (index > -1) for (var i = 1; i < rows.length; i++) {
          numberArray.push(rows[i][index]);
        }var output = numberArray.join(',');
        this.set('output', output);
      },

      didSelectFiles: function didSelectFiles(fileArray) {

        var file = fileArray[0];
        this.set('fileName', file.name);
        var reader = new FileReader();
        var self = this;
        reader.onload = function () {
          self.set('csvData', reader.result);
        };
        reader.readAsText(file);
      }
    }
  });
});
define('phone-joiner/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('phone-joiner/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('phone-joiner/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'phone-joiner/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _phoneJoinerConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_phoneJoinerConfigEnvironment['default'].APP.name, _phoneJoinerConfigEnvironment['default'].APP.version)
  };
});
define('phone-joiner/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('phone-joiner/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('phone-joiner/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('phone-joiner/initializers/export-application-global', ['exports', 'ember', 'phone-joiner/config/environment'], function (exports, _ember, _phoneJoinerConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_phoneJoinerConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _phoneJoinerConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_phoneJoinerConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('phone-joiner/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('phone-joiner/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('phone-joiner/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("phone-joiner/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('phone-joiner/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('phone-joiner/router', ['exports', 'ember', 'phone-joiner/config/environment'], function (exports, _ember, _phoneJoinerConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _phoneJoinerConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('phone-joiner', { path: '/' });
  });

  exports['default'] = Router;
});
define('phone-joiner/routes/phone-joiner', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('phone-joiner/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("phone-joiner/templates/phone-joiner", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 9
          }
        },
        "moduleName": "phone-joiner/templates/phone-joiner.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Phone number joiner");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Join");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Output");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("textarea");
        dom.setAttribute(el1, "rows", "5");
        dom.setAttribute(el1, "cols", "100");
        dom.setAttribute(el1, "id", "output");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "class", "btn");
        dom.setAttribute(el1, "data-clipboard-target", "#output");
        var el2 = dom.createTextNode("\n    Copy to clipboard\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [8]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[2] = dom.createElementMorph(element0);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [14]), 0, 0);
        return morphs;
      },
      statements: [["inline", "x-file-input", [], ["name", "files", "multiple", false, "action", ["subexpr", "action", ["didSelectFiles"], [], ["loc", [null, [2, 50], [2, 75]]]], "alt", "Choose a File"], ["loc", [null, [2, 0], [2, 97]]]], ["content", "fileName", ["loc", [null, [3, 0], [3, 12]]]], ["element", "action", ["join"], [], ["loc", [null, [5, 8], [5, 25]]]], ["content", "output", ["loc", [null, [8, 42], [8, 52]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('phone-joiner/config/environment', ['ember'], function(Ember) {
  var prefix = 'phone-joiner';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("phone-joiner/app")["default"].create({"name":"phone-joiner","version":"0.0.0+8a6e7ac2"});
}

/* jshint ignore:end */
//# sourceMappingURL=phone-joiner.map