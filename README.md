# OpenLocalization Angular UI client

[![Build status...](https://img.shields.io/travis/openl10n/openl10n-app.svg?style=flat)](https://travis-ci.org/openl10n/openl10n-app)
[![License MIT](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/openl10n/openl10n-app/blob/master/LICENSE)
[![Release](http://img.shields.io/github/release/openl10n/openl10n-app.svg?style=flat)](https://github.com/openl10n/openl10n-app/releases)

This is an alternative UI client for OpenLocalization built with AngularJS.

## Usage

Copy `src/public/config.example.js` to `src/public/config.js` to initialize the application
configuration.

Make sure you have [NPM](https://www.npmjs.org/) and [Bower](http://bower.io/#install-bower)
installed on your machine.

Install dependencies:

```shell
npm install
bower install
```

Build assets & start server on [localhost:3000](http://localhost:3000):

```shell
gulp
```

## License

OpenLocalization is released under the MIT License. See the [bundled LICENSE file](LICENSE)
for details.


## Notes

```
src/
    app/
        dashboard/
            i18n/
            components/
            tests/
            partials/
            dashboard.state.js
            dashboard.controller.js

        (projects)
        projects.index/ --> redirect  to dashboard?
        projects.show/

        translate/
        translate.source/
        translate.source.target/
        translate.source.target.select/

    components/

    core/
        resources/

        app.js (modules = app, app.services, app.directives)
        bootstrap.js
        routes.js
        config.js

```
