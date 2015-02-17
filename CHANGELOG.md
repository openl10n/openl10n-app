# Change Log

All notable changes to this project will be documented in this file.

## Unreleased

Material Design.

- Refactor app using the [angular/material](https://github.com/angular/material) library
- Ability to collapse translation groups for performance reasons
- Use of the [Restangular](https://github.com/mgonto/restangular) library to build an API client
- Add protractor config and a basic test
- Complete country mapping to display new flags

## 0.0.2 - 2014-12-28

- Optimize editor load for project with many resources: translations calls are now done one by one

## 0.0.1 - 2014-12-12

Initial version.

- Auth Basic via login/password form
- Translate page displays source next to target phrase
- Translations are paginated (infinite scroll style)
- Ability to save, approve
- Search with custom text
- Need to limite HTTP requests when there are many resources
