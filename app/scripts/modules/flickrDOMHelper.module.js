'use strict';

angular.module('flickrReaderApp')


  .directive('flickrImageWithLinkToDetails', function () {
    return {
      restrict: 'E',
      template: '<a ui-sref="flickr.detail({ id: $index})"><img ng-src="{{ item.media.m }}"></a>',

      // use imagefill.js to nicely fill out and center the image container with flickr pic
      link: function (scope, element) {
        $(element).imagefill();
      }
    };
  })

  .directive('photoTitle', function () {
    return {
      restrict: 'A',

      // check if item has a title - otherwise put "Unnamed"
      controller: function ($scope) {
        if ($scope.item && ($scope.item.title === "")) {
          $scope.item.title = "Unnamed"
        };
      },
      template: '{{ item.title }}'
    };
  })

  .directive('authorNameWithLinkToFlickr', function () {
    return {
      restrict: 'E',

      // clean up author name with regex
      controller: function ($scope) {
        var patt = /\((.*)\)/;
        $scope.authorName = patt.exec($scope.item.author)[1];
      },
      template: '<a ng-href="https://www.flickr.com/photos/{{ item.author_id }}"> <u> {{ authorName }}</u></a>'
    };
  })

  .directive('publicationDate', function () {
    return {
      restrict: 'E',

      // prepare publication date with moment.js
      controller: function ($scope) {
        var isoDate = $scope.item.published;
        $scope.publicationDate = moment(isoDate).format('Do MMM YYYY [at] HH[:]mm');
      },
      template: '<span>Published: {{ publicationDate }}</span>'
    };
  })

  .directive('viewOnFlickr', function () {
    return {
      restrict: 'E',
      template: '<a ng-href="{{ item.link }}"><u> View on Flickr </u></a>'
    };
  })

  .directive('tagWithLink', function () {
    return {
      restrict: 'E',

      // split up tags string and provide array to repeat over and make links
      controller: function ($scope) {
        $scope.tags = $scope.item.tags.split(" ");
      },
      template: '<span ng-repeat="tag in tags"><a ng-href="https://www.flickr.com/photos/tags/{{ tag }}"><u>{{ tag }}</u></a></span>'
    };
  })