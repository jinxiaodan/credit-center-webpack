	var tree = [{
		text: "Parent 1",
		nodes: [{
			text: "Child 1",
			nodes: [{
				text: "Grandchild 1"
			}, {
				text: "Grandchild 2"
			}]
		}, {
			text: "Child 2"
		}]
	}, {
		text: "Parent 2"
	}, {
		text: "Parent 3"
	}, {
		text: "Parent 4"
	}, {
		text: "Parent 5"
	}];
	function getTree() {
    // Some logic to retrieve, or generate tree structure
    return tree;
}
	$('#viewTree').treeview({data: getTree(),showBorder:false});
	//绑定树形菜单的点击事件
	$('#viewTree').on('nodeSelected',function(event,data){
		console.log(data);
	})
	//初始化tab状态
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  e.target // newly activated tab
	  e.relatedTarget // previous active tab
	})

	$.fn.extend('addTab',function(opt){
		var option;
		// 传入的参为非对象时，使用默认值
		if(typeof(opt) == "object"){
			option = {
				title: '',
				href: '',
				content: 'blank tab'
			}
		}

		//创建nav_tab
		var tabTitle = option.title;
		var closeIcon = $('<i>',{'class':'glyphicon glyphicon-remove tab-close'});
		var navTab = $('<li>',{'role':'presentation'}).append('<a>',{'href': '#test','role':'tab','data-toggle':'tab'})
						.append(tabTitle,closeIcon);

		//创建tab-content
		var tabContent = $('<div>',{'role':'tabpanel', 'class':'tab-pane','id':'#test'}).append(option.content);
	})