define('phone-joiner/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('phone-joiner/tests/controllers/phone-joiner.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/phone-joiner.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/phone-joiner.js should pass jshint.');
  });
});
define('phone-joiner/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('phone-joiner/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('phone-joiner/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'phone-joiner/tests/helpers/start-app', 'phone-joiner/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _phoneJoinerTestsHelpersStartApp, _phoneJoinerTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _phoneJoinerTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _phoneJoinerTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('phone-joiner/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('phone-joiner/tests/helpers/resolver', ['exports', 'phone-joiner/resolver', 'phone-joiner/config/environment'], function (exports, _phoneJoinerResolver, _phoneJoinerConfigEnvironment) {

  var resolver = _phoneJoinerResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _phoneJoinerConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _phoneJoinerConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('phone-joiner/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('phone-joiner/tests/helpers/start-app', ['exports', 'ember', 'phone-joiner/app', 'phone-joiner/config/environment'], function (exports, _ember, _phoneJoinerApp, _phoneJoinerConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _phoneJoinerConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _phoneJoinerApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('phone-joiner/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('phone-joiner/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('phone-joiner/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('phone-joiner/tests/routes/phone-joiner.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/phone-joiner.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/phone-joiner.js should pass jshint.');
  });
});
define('phone-joiner/tests/test-helper', ['exports', 'phone-joiner/tests/helpers/resolver', 'ember-qunit'], function (exports, _phoneJoinerTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_phoneJoinerTestsHelpersResolver['default']);
});
define('phone-joiner/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('phone-joiner/tests/unit/controllers/phone-joiner-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:phone-joiner', 'Unit | Controller | phone joiner', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('phone-joiner/tests/unit/controllers/phone-joiner-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/phone-joiner-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/phone-joiner-test.js should pass jshint.');
  });
});
define('phone-joiner/tests/unit/routes/phone-joiner-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:phone-joiner', 'Unit | Route | phone joiner', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('phone-joiner/tests/unit/routes/phone-joiner-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/phone-joiner-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/phone-joiner-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('phone-joiner/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map