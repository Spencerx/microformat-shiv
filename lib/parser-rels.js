/*!
	Parser rels
	All the functions that deal with microformats v2 rel structures
	Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
	
	Dependencies  dates.js, domutils.js, html.js, isodate,js, text.js utilities.js
*/


var Modules = (function (modules) {
	
	// check parser module is loaded
	if(modules.Parser){
	
		/**
		 * finds rel=* structures
		 *
		 * @param  {DOM node} rootNode
		 * @param  {Boolean} fromChildren
		 * @return {Object}
		 */
		modules.Parser.prototype.findRels = function(rootNode, fromChildren) {
			var out = {
					'items': [],
					'rels': {},
					'rel-urls': {}
				},
				x,
				i,
				y,
				z,
				relList,
				items,
				item,
				value,
				arr;
	
	
			// get all elements that have a rel attribute
			fromChildren = (fromChildren) ? fromChildren : false; 
			if(fromChildren) {
				arr = modules.domUtils.getNodesByAttribute(rootNode.children, 'rel');
			} else {
				arr = modules.domUtils.getNodesByAttribute(rootNode, 'rel');
			}
	
			x = 0;
			i = arr.length;
			while(x < i) {
				relList = modules.domUtils.getAttribute(arr[x], 'rel');
	
				if(relList) {
					items = relList.split(' ');
					
					
					// add rels
					z = 0;
					y = items.length;
					while(z < y) {
						item = modules.utils.trim(items[z]);
	
						// get rel value
						value = modules.domUtils.getAttrValFromTagList(arr[x], ['a', 'area'], 'href');
						if(!value) {
							value = modules.domUtils.getAttrValFromTagList(arr[x], ['link'], 'href');
						}
	
						// create the key
						if(!out.rels[item]) {
							out.rels[item] = [];
						}
	
						if(typeof this.options.baseUrl === 'string' && typeof value === 'string') {
					
							var resolved = modules.domUtils.resolveUrl(value, this.options.baseUrl);
							// do not add duplicate rels - based on resolved URLs
							if(out.rels[item].indexOf(resolved) === -1){
								out.rels[item].push( resolved );
							}
						}
						z++;
					}
					
					
					var url = null;
					if(modules.domUtils.hasAttribute(arr[x], 'href')){
						url = modules.domUtils.getAttribute(arr[x], 'href');
						if(url){
							url = modules.domUtils.resolveUrl(url, this.options.baseUrl );
						}
					}
	
					
					// add to rel-urls
					var relUrl = this.getRelProperties(arr[x]);
					relUrl.rels = items;
					// // do not add duplicate rel-urls - based on resolved URLs
					if(url && out['rel-urls'][url] === undefined){
						out['rel-urls'][url] = relUrl;
					}
					
					if(relList.toLowerCase().indexOf('alternate') > -1){	
						// if its an alternate add 
						var obj = this.getRelProperties(arr[x]);
						if(url){
							obj.url = url;
						}
	
						if(items.length > 1){
							if(modules.domUtils.hasAttribute(arr[x], 'rel')){
								var clonedRelList = relList;
								obj.rel = modules.utils.trim( clonedRelList.toLowerCase().replace('alternate','') );
							}
						}
						// create the key
						if(!out.alternate) {
							out.alternate = [];
						}
						out.alternate.push( obj );
					}
						
	
					
			
				}
				x++;
			}
			return out;
		};
		
		
		/**
		 * gets the properties of a rel=*
		 *
		 * @param  {DOM node} node
		 * @return {Object}
		 */
		modules.Parser.prototype.getRelProperties = function(node){
			var obj = {};
			
			if(modules.domUtils.hasAttribute(node, 'media')){
				obj.media = modules.domUtils.getAttribute(node, 'media');
			}
			if(modules.domUtils.hasAttribute(node, 'type')){
				obj.type = modules.domUtils.getAttribute(node, 'type');
			}
			if(modules.domUtils.hasAttribute(node, 'hreflang')){
				obj.hreflang = modules.domUtils.getAttribute(node, 'hreflang');
			}
			if(modules.domUtils.hasAttribute(node, 'title')){
				obj.title = modules.domUtils.getAttribute(node, 'title');
			}
			if(modules.utils.trim(this.getPValue(node, false)) !== ''){
				obj.text = this.getPValue(node, false);
			}	
			
			return obj;
		};
		
		
		/**
		 * finds any alt rel=* mappings for a given node/microformat
		 *
		 * @param  {DOM node} node
		 * @param  {String} ufName
		 * @return {String || undefined}
		 */
		modules.Parser.prototype.findRelImpied = function(node, ufName) {
			var out,
				map,
				i;
	
			map = this.getMapping(ufName);
			if(map) {
				for(var key in map.properties) {
					if (map.properties.hasOwnProperty(key)) {
						var prop = map.properties[key],
							propName = (prop.map) ? prop.map : 'p-' + key,
							relCount = 0;
		
						// if property as an alt rel=* mapping run test
						if(prop.relAlt && modules.domUtils.hasAttribute(node, 'rel')) {
							i = prop.relAlt.length;
							while(i--) {
								if(modules.domUtils.hasAttributeValue(node, 'rel', prop.relAlt[i])) {
									relCount++;
								}
							}
							if(relCount === prop.relAlt.length) {
								out = propName;
							}
						}
					}
				}
			}
			return out;
		};
	
		
	}

	return modules;

} (Modules || {}));