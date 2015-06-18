/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.17 
Mocha integration test from: microformats-v1/hcard/format
The test was built on Mon Jun 15 2015 16:52:46 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hcard', function() {
   var htmlFragment = "<p class=\"vcard\">\n    <span class=\"profile-name fn n\">\n        <span class=\" given-name \">John</span> \n        <span class=\"FAMILY-NAME\">Doe</span> \n    </span>\n</p>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["John \n        Doe"],"given-name":["John"]}}],"rels":{},"rel-urls":{}};

   it('format', function(){
       assert.deepEqual(found, expected);
   });
});
