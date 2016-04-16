function validate(){
	this.init();
}

validate.prototype={

	init: function(){
		this.$form = $('.form');
		this.selector = 'input[type=text],input[type=password],input[type=hidden],input[type=checkout],input[type=radio],select,textarea';
		this.$input = this.$form.find(this.selector);
		this.formValid = true;
		this.bind();
	},
	bind: function(){
		var me = this;

		this.$form.on('submit',function(e){
			e.preventDefault();
			$('.error').text('');//清空提示错误信息
			me.getdate();//验证数据
		})

		this.$input.each(function(index, node) {
			$(node).unbind('blur').bind('blur',function(){
				me.proving2(this);
			})
		});

	},
	rules: {
		//验证规则
		username:function(vaule){
			if(vaule.length>=3 && vaule.length<=18){
				return true;
			}
			return false;
		},

		emall: function(vaule){
			var em = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/
			return em.test(vaule);
		},
		phone: function(vaule){
			var rep = /^1\d{10}$/
			return rep.test(vaule);
		},
		pass: function(vaule){
			this.value=vaule;

			if(vaule.length>6 && vaule.length<18){
				return true;
			}
			return false;
		},
		passRepeat: function(vaule){
			if(vaule===this.value){
				return true;
			}else{
				return false;
			}
		}
	},
	messages : {
		username : "长度只能在3-20个字符之间",
		emall : "邮箱格式不正确",
		phone : "格式有误",
		pass: "长度只能在6-20个字符之间",
		passRepeat: "两次输入不一致"
	},

	nullmess:{
		username : "请输入用户名",
		emall : "请输入邮箱",
		phone : "请输入手机",
		pass: "请输入密码",
		passRepeat: "请确认密码"
	},
	
	
	getdate: function(){
		this.namelist = this.$input.map(function(index,node) {
			return $(node).attr('name')
		}).get();
		this.getvaule();//根据name获取value
	},

	getvaule: function(){
		this.Allvaule={};
		for(var i = 0; i<this.namelist.length; i++){
			name = this.namelist[i];
			// if(this.Allvaule[name] !== undefined){
			// 	continue
			// 	//name去重，判断有没有给name赋值，进行下面的操作，如果已赋值，回到循环
			// };
			
			value = this.$form.find('[name='+name+']').val();
			var type = this.$form.find('[name='+name+']').attr('type');
			if(type==='radio'){
				this.value=this.$form.find('[name='+name+']').filter('input:checked').val();
			}
			if(type ==='checkout'){
				this.value = this.$form.find('[name='+name+']').filter('input:checked').map(function(){
					return $(this).val();
				}).get().join(',');
			}
			this.Allvaule[name]=value;//把数据存到对象里	
		}
		this.proving();//验证数据
		
	},
	proving2 : function(el){
		var value =$(el).val();
			name = $(el).attr('name');
			rule = this.rules[name];
			if(value===''){
				return false
				
			}
			if(value==="" || value===undefined){
					this.formValid = false;
					this.errorname = name;
					this.errormessages = this.nullmess[name];

				}
				if(rule(value)===false){
					this.errorname= name;
					this.errorvaule = value;
					this.errormessages = this.messages[name];
				}
				var $d =$(el).parent().next();
					$err= $d.find('.error');

				if(rule(value)===true){
					$err.remove();
					this.formValid=true;
					return false;

				}

			 	if($err.text()===""){
			 		this.append();//显示错误信息
			 	}
				
			

	},

	proving: function(){
		for(var name in this.Allvaule){
			var val = this.Allvaule[name];
				rule = this.rules[name];
				if(!rule){
					
				}
				if(val==="" || val===undefined){
					this.formValid = false;
					this.errorname = name;
					this.errormessages = this.nullmess[name];
					break;
				}
				if(rule(val)===false){
					this.errorname= name;
					this.errorvaule = val;
					this.errormessages = this.messages[name];
					break;
				}
			}
		if(this.formValid == true){
			this.submit();//提交信息
		}
		if(this.formValid == false){
			this.append();//显示错误信息
		}
		

	},

	append: function(){
		var $error =$('<span class="error"></span>').text(this.errormessages);
		this.$form.find('[name='+this.errorname+']').parent().next().append($error);
	},

	submit: function(){
		var me = this;
		console.log(me.$form.serialize());
		$.ajax({
			url: 'post.php',
			type: 'GET',
			dataType: 'josn',
			data: me.$form.serialize(),
			
			success: function(data){
					if(data.staus=='success'){
						var d = $('<div class="ajax-stu">'+data.name+'恭喜你注册成功'+'</div>');
						$('body').append(d);
					}
						    
				},
				
			error: function(){
				 alert('服务器出错了！')
			}

		})
		
		
	}
}



