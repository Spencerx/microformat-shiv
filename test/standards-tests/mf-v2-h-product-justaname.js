/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-product/justaname
The test was built on Tue Jun 30 2015 19:18:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-product', function() {
   var htmlFragment = "<p class=\"h-product\">Raspberry Pi</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-product"],"properties":{"name":["Raspberry Pi"]}}],"rels":{},"rel-urls":{}};

   it('justaname', function(){
       assert.deepEqual(found, expected);
   });
});
