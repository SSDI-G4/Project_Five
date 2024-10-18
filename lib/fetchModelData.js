// var Promise = require("Promise");

// /**
//   * FetchModel - Fetch a model from the web server.
//   *     url - string - The URL to issue the GET request.
//   * Returns: a Promise that should be filled
//   * with the response of the GET request parsed
//   * as a JSON object and returned in the property
//   * named "data" of an object.
//   * If the request has an error the promise should be
//   * rejected with an object containing the properties:
//   *    status:  The HTTP response status
//   *    statusText:  The statusText from the xhr request
//   */

// function fetchModel(url) {
//   return new Promise(function(resolve, reject) {
//       let xhr = new XMLHttpRequest();

//       xhr.open('GET', url);

//       xhr.onload = function () {
//           if (xhr.status === 200) {
//               try {
//                   let jsonResponse = JSON.parse(xhr.responseText);
//                   resolve({ data: jsonResponse });
//               } catch (error) {
//                   reject({
//                       status: xhr.status,
//                       statusText: 'Failed to parse JSON response'
//                   });
//               }
//           } else {
//               reject({
//                   status: xhr.status,
//                   statusText: xhr.statusText
//               });
//           }
//       };

//       xhr.onerror = function () {
//           reject({
//               status: xhr.status,
//               statusText: 'Network error'
//           });
//       };

//       xhr.send();
//   });
// }

// export default fetchModel;
