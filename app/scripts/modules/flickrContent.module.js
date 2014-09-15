'use strict';

angular.module('flickrReaderApp')

  .service('dataService', function ($http) {
    this.getData = function () {

      // $http() returns a $promise that we are picking up in the ui-state configuration resolve
      return $http({

        // JSONP callback method avoids CORS problems
        method: 'JSONP',
        url: 'http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/javascript'
        }
      });
    }
  })

  .controller('flickrContentCtrl', function ($scope, topics) {

    // our controller is just taking care of business logic and making data available
    $scope.topics = topics.data;
  });