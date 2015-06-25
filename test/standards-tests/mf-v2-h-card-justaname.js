/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-card/justaname
The test was built on Tue Jun 23 2015 16:14:26 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<p class=\"h-card\">Frances Berriman</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Frances Berriman"]}}],"rels":{},"rel-urls":{}};

   it('justaname', function(){
       assert.deepEqual(found, expected);
   });
});