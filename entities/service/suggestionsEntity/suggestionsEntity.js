angular.module('glxEntities').factory('glxSuggestionsEntity', function ($resource, glxTransformResponseCollection) {
    var _tagSuggestionsResource = $resource('/api/search/tag/:keyword',
        {keyword: '@keyword', limit: 10},
        {'getTagSuggestions': {
            method: 'POST',
            transformResponse: [
                glxTransformResponseCollection.fromJsonConverter,
                glxTransformResponseCollection.extractData
            ]
        }
    }
    );

    var glxSuggestionsEntity = angular.extend({}, _tagSuggestionsResource);

    return glxSuggestionsEntity;
});