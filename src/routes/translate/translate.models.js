(function() {
'use strict';

angular.module('app')
  .factory('Editor', EditorFactory)

/**
 * @ngInject
 */
function EditorFactory($timeout, $q, ProjectRepository, ResourceRepository, LanguageRepository, TranslationCommitRepository) {

  function Editor(projectSlug) {
    this.projectSlug = projectSlug;
    this.activeTranslation = null;
    this.sourceLocale = null;
    this.targetLocale = null;

    // Public methods
    this.initialize = initialize;
    this.resetTranslations = resetTranslations;
    this.loadMore = loadMore;
    this.activateTranslation = activateTranslation;
    this.selectNextTranslation = selectNextTranslation;
    this.selectPreviousTranslation = selectPreviousTranslation;

    // UI states
    this.sidebarOpen = false
  }

  function initialize() {
    var _this = this;
    var deferred = $q.defer();

    $q.all({
      project: ProjectRepository.findOne(this.projectSlug),
      languages: LanguageRepository.findByProject(this.projectSlug),
      resources: ResourceRepository.findByProject(this.projectSlug),
    }).then(function(data) {

      // Get promise data
      _this.project   = data.project;
      _this.languages = data.languages;
      _this.resources = data.resources;

      // Initialize default attributes
      _this.sourceLocale = _this.project.defaultLocale;
      _this.translationGroups = createTranslationGroups(_this.resources);

      deferred.resolve(_this);
    });

    return deferred.promise;
  }

  function createTranslationGroups(resources) {
    var groups = [];

    for (var i = 0, n = resources.length; i < n; i++) {
      groups.push({
        paging: {
          page: 0,
          perPage: 25,
        },
        resource: {
          expanded: (i < 1), // only expand the N first groups
          pathname: resources[i].pathname,
          id: resources[i].id,
        },
        translations: [],
      });
    }

    return groups;
  }

  function loadMore(translationGroup) {
    if (translationGroup.isComplete || translationGroup.isLoading) {
      return;
    }

    translationGroup.isLoading = true;

    translationGroup.paging.page++;

    var filters = {
      resource: translationGroup.resource.id,
      page: translationGroup.paging.page,
      per_page: translationGroup.paging.perPage,
    };

    TranslationCommitRepository
      .findBy(this.sourceLocale, this.targetLocale, filters)
      .then(function(translationCommits) {
        if (translationCommits.length < translationGroup.paging.perPage) {
          translationGroup.isComplete = true;
        }

        for (var i = 0, m = translationCommits.length; i < m; i++) {
          translationGroup.translations.push(translationCommits[i]);
        }

        $timeout(function() {
          translationGroup.isLoading = false;
        }, 500);
      }, function() {
        translationGroup.isComplete = true;
        translationGroup.isLoading = false;
      })
  }

  function activateTranslation(translation) {
    if (null !== this.activeTranslation) {
      this.activeTranslation.active = false;
      this.activeTranslation = null;
    }

    if (translation) {
      this.activeTranslation = translation;
      this.activeTranslation.active = true;
    }
  }

  function resetTranslations() {
    for (var i = 0, n = this.translationGroups.length; i < n; i++) {
      this.translationGroups[i].translations = [];
      this.translationGroups[i].isComplete = false;
      this.translationGroups[i].isLoading = false;
      this.translationGroups[i].paging.page = 0;
    }
  }

  function selectNextTranslation() {
    var i, j, group, translations, translationCommit;

    if (null === this.activeTranslation) {
      if (this.translationGroups.length > 0 && this.translationGroups[0].translations.length > 0) {
        this.activateTranslation(this.translationGroups[0].translations[0]);
      }

      return;
    }

    for (i = 0; i < this.translationGroups.length; i++) {
      group = this.translationGroups[i];
      translations = group.translations;

      for (j = 0; j < translations.length; j++) {
        translationCommit = translations[j];

        if (this.activeTranslation === translationCommit) {
          if (translations[j + 1]) {
            this.activateTranslation(translations[j + 1]);
          } else if (this.translationGroups[i + 1] && this.translationGroups[i + 1].translations.length > 0) {
            this.activateTranslation(this.translationGroups[i + 1].translations[0]);
          }

          return;
        }
      }
    }
  }

  function selectPreviousTranslation() {
    var i, j, group, translationCommit;

    for (i = 0; i < this.translationGroups.length; i++) {
      group = this.translationGroups[i];

      for (j = 0; j < group.translations.length; j++) {
        translationCommit = group.translations[j];

        if (translationCommit.active) {
          if (j > 0 && group.translations[j - 1]) {
            this.activateTranslation(group.translations[j - 1]);
          } else if (i > 0 && this.translationGroups[i - 1] && this.translationGroups[i - 1].translations.length > 0) {
            var last = this.translationGroups[i - 1].translations.length - 1;
            this.activateTranslation(this.translationGroups[i - 1].translations[last]);
          }

          return;
        }
      }
    }
  }

  return Editor;
}

})();
