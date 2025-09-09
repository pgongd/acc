function viewtitle(title) {
	document.write("<tr><td colspan='8' class='linetitle' ><strong>"+title+"</strong></td></tr>");
}
function viewtitle02(title) {
	document.write("<tr><td colspan='8' class='linetitle02' ><strong>"+title+"</strong></td></tr>");
}

var no = 0;
function viewlist(title, pageid, date, workEnd, workPerson, verWork, writer) {
	no = no + 1;


	//var urlCount = url.split('/'); // APP url
	var pgidCount = pageid.split('/'); // mWeb url

	var _html = '';
		_html += workEnd == 'N' ? "<tr class='del'>" :  "<tr>";
		_html += "<td><center>" + no + "</center></td>";
		_html += "<td>"+title+"</td>";

		if(date == '') {
			_html += "<td class='link'><div class=\"linkItem\"><a href='"+pageid+"' target='_blank' class='disabled'>"+pgidCount[pgidCount.length-1]+"</a></div></td>";
			_html += "<td class='tAlignC'>-</td>";
		}else{
			_html += "<td class='link'>";
			_html += "<div class=\"linkItem\">";
			_html += "<a href='"+pageid+"' target='_blank'>"+pgidCount[pgidCount.length-1]+"</a>";
			_html += "<button class=\"btnViewer\" type=\"button\" data-url=" + pageid + " onclick='viewerOpen(this);'>PREVIEW</button> </div>";
			_html += "</td>";
			_html += "<td class='tAlignC'>" + date + "</td>";
		}

		_html += "<td class='tAlignC workSeq'>" + workEnd + "</td>";
		_html += "<td class='tAlignC'>" + workPerson + "</td>";
		_html += "<td class='tAlignC'>" + verWork + "</td>";
		_html += "<td>" + writer + "</td>";
		_html += "</tr>";

	document.write(_html);
}

function viewlist02(title, pageid, date, workEnd, workPerson, writer) {
	no = no + 1;


	//var urlCount = url.split('/'); // APP url
	var pgidCount = pageid.split('/'); // mWeb url

	var _html = '';
		_html += workEnd == 'N' ? "<tr class='del'>" :  "<tr>";
		_html += "<td><center>" + no + "</center></td>";
		_html += "<td>"+title+"</td>";

		if(date == '') {
			_html += "<td class='link'><div class=\"linkItem\"><a href='"+pageid+"' target='_blank' class='disabled'>"+pgidCount[pgidCount.length-1]+"</a></div></td>";
			_html += "<td class='tAlignC'>-</td>";
		}else{
			_html += "<td class='link'>";
			_html += "<div class=\"linkItem\">";
			_html += "<a href='"+pageid+"' target='_blank'>"+pgidCount[pgidCount.length-1]+"</a>";
			_html += "<button class=\"btnViewer\" type=\"button\" data-url=" + pageid + " onclick='viewerOpen(this);'>PREVIEW</button> </div>";
			_html += "</td>";
			_html += "<td class='tAlignC'>" + date + "</td>";
		}

		_html += "<td class='tAlignC workSeq'>" + workEnd + "</td>";
		_html += "<td class='tAlignC'>" + workPerson + "</td>";
		_html += "<td>" + writer + "</td>";
		_html += "</tr>";

	document.write(_html);
}

var viewerOpen = function(target) {
	var _this = $(target);
	var _url = _this.data('url');
	var _viewerWrap = $('.prevViewerWrap');
	var _viewerFrame = $('#viewerFrame', _viewerWrap);
	var _thisRow = _this.parents('tr');

	_viewerWrap.data('winHeight', window.innerHeight);
	_viewerWrap.show();
	_viewerFrame.attr('src', _url);
	$('tr').removeClass('on')
	_thisRow.addClass('on');
}

var viewerClose = function(target) {
	var _this = $(target);
	var _viewerFrame = $('#viewerFrame', _this);

	_viewerFrame.attr('src', '');
	_this.hide();
}

$(document).ready(function() {
	var table = $('table');
	var tr = $('tr', table);
	var td = $('td', tr);
	var workSeq = $('.workSeq');
	var total1 = workSeq.length;
	var end1 = 0;
	var ing1 = 0;
	var native01 = 0;

	workSeq.each(function(i) {
		var _this = $(this);

		if(_this.text() == 'O' || _this.text() == 'o') {
			end1 += 1;
		} else if(_this.text() == '△') {
			ing1 += 1;
		} else if(_this.text() == 'N') {
			$(this).closest('tr').find('.link a').addClass('disabled');
			end1 += 1;
		} else if(_this.text() == 'del') {
			_this.closest('tr').addClass('del');
			total1 -= 1;
		}
	});

	$('.endNum').text(end1);
	$('.ingNum').text(ing1);
	$('.endRate').text(total1 == 0 ? 0 : parseInt((end1/total1)*100, 10));
	$(document).on('click', 'a.disabled', function(e) {e.preventDefault();});
	$('.totalNum').text(total1);

	var groupNum = 0;
	$('.list_tbl_box tbody tr').each(function() {
		var _this = $(this);
		var _linetitle = $('.linetitle', _this);

		if(_linetitle.length) (groupNum += 1);
		_this.attr('group-name', 'group' + groupNum);
	});

	$('.list_tbl_box .btnFoldAll').on('click', function() {
		var _tblWrap = $('.list_tbl_box');
		var _tr = $('tbody tr', _tblWrap);
		var _linetitle = $('.linetitle', _tr);

		if(_linetitle.parent().hasClass('isClose')) {
			_tr.show();
			_linetitle.parent().removeClass('isClose');
		}else{
			_tr.hide();
			_linetitle.parent().show().addClass('isClose');
		}
	});

	$('.list_tbl_box .linetitle').on('click', function() {
		var _this = $(this);
		var _thisTr = _this.parent();
		var _groupName = '[group-name="' + _thisTr.attr('group-name') + '"]';
		console.log(_groupName);
		if(_thisTr.hasClass('isClose')) {
			$(_groupName).show();
			_thisTr.removeClass('isClose');
		} else {
			$(_groupName).hide();
			_thisTr.show().addClass('isClose');
		}
	});


	var parentDom = window.parent.document;
	var bodyIframe = $('.viewerBox iframe', parentDom);
	// if(bodyIframe.length > 0) {
	// 	var _wrap = $('#wrap');
	// 	var _height = _wrap.outerHeight();
	// 	$('.prevViewerBox', parentDom).css({'height' : _height + 44});
	// }

});

