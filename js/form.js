// 表单模块
!(() => {
    // 获取表单元素
    const $formPages = $('#content'); // 表单
    // const $formPageOne = $('#form-page-one'); // 第一页
    const $radio = $('.x-radiogroup'); // 性别
    const $submit = $('.submit'); // 提交按钮
    const $direction = $('[name=direction]'); // 第一意向部门
    const $option = $('.x-select-item'); // 获取下拉框
    const $formRight = $('.form-right'); // 获取右边单选框
    const $mask = $('.x-window-mask'); // 获取遮罩
    const $triggerBtn = $('.fui_combo'); // 单选框按钮
    const $introdction = $('.f-line .text-area'); // 自我介绍
    const $result = $('.result').children(); // 下拉框结果
    let formData = {
        username: '',
        college: '',
        dormitory: '',
        sex: '',
        number: '',
        WeChat: '',
        introduction: '',
        direction: '',
        QQ: '',
        others: ''
    };
    	//取消默认行为
		document.addEventListener('touchstart',function(event){
			event.preventDefault();
		});

		//解决点透事件
		!(function(){
			var aNodes = document.querySelectorAll('a');
			for (var i=0;i<aNodes.length;i++) {
				aNodes[i].addEventListener('touchstart',function(){
					window.location.href = this.href;
				})
			}
		})();

		//rem适配
		!(function(){
			var styleNode = document.createElement('style');
			var width = document.documentElement.clientWidth;
			styleNode.innerHTML = 'html{font-size: '+ width/16 +'px !important;}';
			document.head.appendChild(styleNode)
		})();
    // 使用事件委托监听输入框的失去焦点事件
    $formPages.on('blur', 'input', function (ev) {
        let match = $(ev.target).attr('name');
        let value = $(ev.target).val();
        switch (match) {
            case "username":
                formData.username = value;
                break;
            case "college":
                formData.college = value;
                break;
            case "dormitory":
                formData.dormitory = value;
                break;
            case "number":
                formData.number = value;
                break;
            case "WeChat":
                formData.WeChat = value;
                break;
            case "QQ":
                formData.QQ = value;
                break;
            case "others":
                formData.others = value;
                break;
            default:
                break;
        }
    })
    // 使用事件委托监听文本域的失去焦点事件
    $introdction.on('blur', function (ev) {
        let value = $(this).text();
        formData.introduction = value;
    })
    // 给性别单选按钮绑定单击响应函数
    $radio.on('click', function (ev) {
        let $sex = $(ev.target).parents('.group-item');
        let sex = $sex.attr('option');
        $sex.children()[0].style.background = '#07190e80';
        $sex.first().siblings().children()[0].style.background = '#fff';
        formData.sex = sex;
    })
  
    // 给单选框按钮绑定点击函数
    $mask.on('click', function (ev) {
        $formRight.hide();
        $mask.hide(100);
        ev.stopPropagation();
    })
    $option.on('click', function (ev) {
        let value = $(ev.target).parents('.x-select-item').text();
	    alert(1);
        if (value != "") {
            $(this).addClass('select');
            $(this).siblings().removeClass('select');
            $formRight.hide();
            $mask.hide(100);
            $direction.val(value);
            $result.text(value);
            $result.addClass('combo-select-result select-single');
            formData.direction = value.trim();
        }
    })
    $triggerBtn.on('click', function() {
        $formRight.show();
        $mask.show(100);
    })
    $submit.on('click', function () {
        if (formData.username == ""
            ||formData.college == ""
            ||formData.dormitory == ""
            ||formData.sex == ""
            ||formData.number == ""
            ||formData.WeChat == ""
            ||formData.direction == ""
            ||formData.QQ == ""
            ||formData.introduction == "") {
                alert("请完整填写表单");
            } else if(formData.direction.trim() == formData.others.trim()){
               alert("第一意向部门和其他意向部门不能重复")
            } else if (!checkNumber()){
                alert("手机号格式错误")
            } else {
                console.log(1)
                $.ajax({
                    type: "post",
                    url: "http://39.108.253.120/RegistrationWebsite/applicant.sign",
                    data: formData,
                    success: function (response) {
                        if (response == "success") {
                            alert("提交成功，请在9月8日晚上七点准时到教二209参加面试");
                            setTimeout(function() {
                                location.reload();
                            }, 2000)
                        } else {
                             alert(response);
                        }

                    }
                });
            }
        console.log(formData)
    })
        /*验证手机号 */
function checkNumber() {
    var reg = /^[1][0-9]{10}$/ig; /* 验证手机号 */
    var id = 'Number';
    return commonInfo(reg, id);
}
let $Number1 = $("#Number");
$Number1.on("blur", () => {
    checkNumber(); 
});
function commonInfo(reg, id) {
    var inputText = document.getElementById(id);
    var inputValue = inputText.value;
    var inputSpan = document.getElementById(id + "Span");
        if (!reg.test(inputValue)) {
            inputSpan.innerHTML = "格式有误！";
            inputSpan.style.color = "red";
            inputSpan.style.background = "none";
            return false;
        } else {
            inputSpan.innerHTML = "";
            return true;
        }
    

}


})();
