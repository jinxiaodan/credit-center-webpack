'use strict';

(function ($, window, document, undefined) {

	var tree = [{
		text: 'Parent1',
		nodes: [{
			text: 'Child1',
			nodes: [{
				text: 'Grandchild1'
			}, {
				text: 'Grandchild2'
			}]
		}, {
			text: 'Child2'
		}]
	}, {
		text: 'Parent2'
	}, {
		text: 'Parent3'
	}, {
		text: 'Parent4'
	}, {
		text: 'Parent5'
	}];
	function getTree() {
		// Some logic to retrieve, or generate tree structure
		return tree;
	}
	$('#viewTree').treeview({ data: getTree(), showBorder: false });
	//绑定树形菜单的点击事件
	$('#viewTree').on('nodeSelected', function (event, node) {
		console.log(node);
		$(this).addTab({ id: node.text, title: node.text, content: node.text + '<br>' + node.text });
	});
	//初始化tab状态
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		e.target; // newly activated tab
		e.relatedTarget; // previous active tab
	});
})(jQuery, window, document);
//# sourceMappingURL=main.js.map
