/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-entry/justaname
The test was built on Tue Jun 30 2015 19:18:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-entry', function() {
   var htmlFragment = "<p class=\"h-entry\">microformats.org at 7</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-entry"],"properties":{"name":["microformats.org at 7"]}}],"rels":{},"rel-urls":{}};

   it('justaname', function(){
       assert.deepEqual(found, expected);
   });
});
