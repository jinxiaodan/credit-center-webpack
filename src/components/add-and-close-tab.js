(function ($, window, document, undefined){
	/*
	 *  addTab 在标签组件role=tablist,tab-content上增加选项卡
	 *  params opt={id,title,href,content}
	 */
	$.fn.addTab = function(opt){
		var option = opt;
		// 传入的参为非对象时，使用默认值
		if(typeof(opt) != "object"){
			option = {
				id: 'main', //必须 元素ID presentation对应的是id=option.id,  tabpanel 对应的是id=option.id
				title: 'main', // 显示在选 项卡上的名称
				href: '', //
				content: 'blank tab<br>blank tab<br>' //tab内容
			}
		}
		//获取当前tab的id
		var curTabId = $("[role='tablist']").find('.active').attr("id");

		//隐藏之前的tab
		$('.tab-content').find('.active').removeClass("active");
		$("[role='tablist']").find('.active').removeClass("active");
		//如果opt当前不存在，则新增选项卡，否则显示该选项卡
		if(!$("[id='"+option.id+"']").length>0){
			//创建nav_tab
			var tabTitle = option.title;
			var closeIcon = $('<i>',{'class':'glyphicon glyphicon-remove tab-close'});
			var navTab = $('<li>',{'role':'presentation','id':'nav_'+option.id, 'class':'active'}).append($('<a>',{'href': '#' + option.id,'role':'tab','data-toggle':'tab'})
							.append(tabTitle,closeIcon));

			//创建tab-content
			var tabContent = $('<div>',{'role':'tabpanel', 'class':'tab-pane active','id':option.id}).append(option.content);


			//插入新增的 nav_tab和 tab元素
			$("[role='tablist']").append(navTab);
			$('.tab-content').append(tabContent);
		}else{
			$("#"+option.id).addClass("active");
			$("#nav_"+option.id).addClass("active");
		}
		//显示当前的tab
		
		

		//绑定 nav-tab上的 click事件
/*		$(this).find('.nav-tabs').on('click','li',function(){
			console.log('click nav-tabs');
			//如果当前tab 为隐藏状态，则显示当前tab,  隐藏之前显示的
			if(!$(this).is('.active')){
				$('li[role = "presentation"].active').removeClass('active'); 
        		$('div[role = "tabpanel"].active').removeClass('active');
				$(this).siblings('li').each(function(item){
					if($(item).is('.active')){
						$(item).removeClass('.active');
					}
				})
				
			}
		})*/
		//绑定 nav-tab上的 dbClick事件
		$('.nav-tabs').on('dblclick','li',function(){
			console.log('click nav-tabs');

			$(this).closeTab(this);
		})
		//绑定 nav-tab .close-tab 的click事件
		$('.nav-tabs .tab-close').on('click',function(){
			console.log('click nav-tabs');
			var closeTabDom = $(this).parents("li");
			$(this).closeTab(closeTabDom[0]);
		})

	}
	//关闭tab
	$.fn.closeTab = function(dom){
		//根据navId 获取 tabId
		var navId = $(dom).attr('id');
		var navIdSplit = navId.split("nav_");
		var tabId = (navIdSplit.length>1)?navIdSplit[1]:navIdSplit[0];
		//如果关闭的是当前激活的TAB，激活他的前一个TAB
        if ($(dom).is('.active')) {
            $(dom).prev().addClass('active');
            $("#"+tabId).prev().addClass('active');
        }
        //关闭TAB
        $(dom).remove();
        $("#"+tabId).remove();
	};


}(jQuery, window, document))	
