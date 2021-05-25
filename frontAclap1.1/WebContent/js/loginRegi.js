
//////////////////// 로그인 & 회원가입 버튼 전환 ////////////////////
$(document).ready(function(){	
let check = 0;
$("#logBtn").click(function() {
	if(check == 1){
		check = 0;
		$(".form-signin").toggleClass("form-signin-left");
		$(".form-signup").toggleClass("form-signup-left");
		$(".forgot").toggleClass("forgot-left");
		$(".signin-active").toggleClass("signin-inactive");
		$(".signup-inactive").toggleClass("signup-active");
		$("#regBtn a").css('color', 'rgba(255, 255, 255, .3)');
	}
});
	
$("#regBtn").click(function() {
	if(check == 0){
		check = 1;
		$(".form-signin").toggleClass("form-signin-left");
		$(".form-signup").toggleClass("form-signup-left");
		$(".forgot").toggleClass("forgot-left");
		$(".signin-active").toggleClass("signin-inactive");
		$(".signup-inactive").toggleClass("signup-active");
		$("#regBtn a").css('color', 'white');
	}
});
});

//////////////////////// 로그인 Script ////////////////////////

//이메일 쿠키 저장	
$(document).ready(function(){
	let user_email = $.cookie("user_email");
	if(user_email != null){ 
		$("#_email").val(user_email);
		$("#chk_save_email").attr("checked", "checked"); 
	}
			
	$("#chk_save_email").click(function() {
		if( $("#chk_save_email").is(":checked") ){
			if( $("#_email").val().trim() == ""){
				alert('이메일을 입력해 주십시오');
				$("#chk_save_email").prop("checked", false); 
			} 
			else{
				$.cookie("user_email", $("#_email").val().trim(), { expirese:7, path:'./'}); 
			}
		}
		else{ // 체크가 안되었을 경우
			$.removeCookie("user_email", {path:'./'} );
		}
	});
})


// 일반 로그인
let logMissCount = 1;
$(document).ready(function(){	
	$(".btn-signin").click(function() {
		
		if($("#_email").val()==""){
			alert("이메일을 입력해주세요");
			return;
		}else if($("#_pwd").val()==""){
			alert("패스워드를 입력해주세요");
			return;
		}else{
	        let log= $("#loginFrm").serialize() ;	
			$.ajax({
				url:"http://localhost:3000/login", 
				type:'post',
				data:log,
				success:function( data ){
					
					if(data.email != null){
						sessionSave(data)
						interestCheck(data)
					}
					else{
						loginMiss(logMissCount);				
					} 
				},
				error:function(){
					alert('ajax error');
				}
			});
		}
	});

	// 로그인 실패 
	function loginMiss(count){
		count += 1;
		if(logMissCount < 3){
			alert("이메일 혹은 패스워드가 올바르지 않습니다");
			logMissCount = count;
		} 
		else {
			let checkPw = confirm("로그인 3회 오류. 가입한 정보를 찾으시겠습니까");
			if(checkPw) 
				$("#findPwdModal").modal('show');
			else
				location.href = "taeminNavi.html"; 
		}	
	}
});



// 비밀번호 찾기 
$(document).ready(function(){	
$("#forgotPwdBtn").click(function(){
	$("#findPwdModal").modal('show');
});

$("#findPwdEmailSend").click(function(){
	let e_RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	if($("#findPwdEmail").val() == ""){ 
		alert("이메일을 입력해주세요");
		$("#findPwdEmail").focus();
		return;
	} 
	else if(!e_RegExp.test($("#findPwdEmail").val())){
		alert("올바른 이메일 주소를 입력해주세요");
		$("#findPwdEmail").val("");
		$("#findPwdEmail").focus();
		return; 
	}	
	else{
		$.ajax({
			url:"http://localhost:3000/checkEmail", 
			type:'post',
			data:{email:$("#findPwdEmail").val()},
			success:function( data ){
				if(data == 0){
					alert('본 이메일로 가입된 정보가 없습니다');
					$("#findPwdEmail").val("");
					$("#findPwdEmailCode").val("");
				}else{
					alert('인증번호를 전송했습니다');
		 			emailSend();
				}
		    },
			error:function(){
				alert('email Check ajax error');
			}
		});
	}
});
});


// 인증번호 확인 후 임시 비밀번호 보내기
$(document).ready(function(){	
$("#findPwdEmailCodeCheck").click(function(){

	if($("#findPwdEmailCode").val() == code){
		$.ajax({
			url:"http://localhost:3000/findPwdAfUpdate", 
			type:'post',
			data:{email:$("#findPwdEmail").val()},
			success:function( data ){
				alert('임시 비밀번호를 메일로 전송하였습니다')
		    },
			error:function(){
				alert('email Check ajax error');
			}
		});
	}
	else{
		alert('인증번호가 올바르지 않습니다');
	}
	$("#findPwdEmail").val("");
	$("#findPwdEmailCode").val("");
});
});


//카카오 로그인 버튼 클릭 	
$(document).ready(function(){	
Kakao.init('92928f9e601c2b81c37ec8882d4901ac')
$(".btn-kakaoSignin").click(function(){
	Kakao.Auth.login({
		scope: 'profile, account_email', 
		success: function(data) {
			Kakao.API.request({
				url:'/v2/user/me',
				success: function(res) {
					let email = res.kakao_account['email'];
					let userName = res.kakao_account.profile['nickname'];
					Google_Kakao_Log(email, userName, userName, ""); 						
				}
			}); 
		}
   });
});   
});

// 구글 로그인 버튼 클릭 
let googleUser = {};
let startApp = function() {
    gapi.load('auth2', function(){
      auth2 = gapi.auth2.init({
        client_id: '189030899072-d7v2f5dim7mancugto6i0jv87o21uca2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      attachSignin(document.getElementById('customBtn'));
    });
};

function attachSignin(element) {
	auth2.attachClickHandler(element, {}, function(googleUser) {
		let nickName = googleUser.getBasicProfile().getName();
		let email = googleUser.getBasicProfile().getEmail();
		let profilePic = googleUser.getBasicProfile().getImageUrl();
		Google_Kakao_Log(email, nickName, nickName, profilePic);
    });
}


// 구글 & 카카오 로그인 
function Google_Kakao_Log(email, userName, nickName, profilePic){
	$.ajax({
		url:"http://localhost:3000/googleKakaoLogin", 
		type:'post',
		data:{email:email},
		success:function( data ){
			
			if(data.email != null){
				sessionSave(data);
				interestCheck(data);			
			} 
			else {
				Google_Kakao_Regi(email, userName, nickName, profilePic);
			}
		},
		error:function(){
			alert("Google_Kakao_Log ajax Error");
		}
	});
}


// 구글 & 카카오 회원 가입 
function Google_Kakao_Regi(email, userName, nickName, profilePic){
	if (profilePic == "")
		profilePic = "http://localhost:3000//upload//sample.png";
	$.ajax({
		url:"http://localhost:3000/googleKakaoRegi", 
		type:'post',
		data : {email:email, userName:userName, nickName:nickName, profilePic:profilePic},
		success:function( data ){			
			sessionSave(data);
			interestCheck(data);			
		},
		error:function(){
			alert("Google_Kakao_Regi ajax Error");
		}
	});
}


// 선호도 조사 유무 체크
function interestCheck(data){
	if(data.interest1 == null)
		location.href = "getInterest.html"; // 선호도 조사뷰로 이동
	//	location.href = "mypage.html";  
	else 
		location.href = "taeminNavi.html"; // 메인뷰로 이동
}

// 로그인 세션 저장
function sessionSave(data){
	let item = JSON.stringify(data);       // json -> string
	sessionStorage.setItem("login", item); // 세션 저장
}
		
	

// Email 인증번호 전송
let code = 0;
function emailSend(){

	let makeNum = Math.floor(Math.random() * 100000) + 100000;
	if(makeNum > 100000) 
		makeNum = makeNum - 10000; 
	code = makeNum
 
	 let mail = $("#_remail").val();
	 if(mail == "")
	 	mail = $("#findPwdEmail").val();
	  
	$.ajax({
		url:"http://localhost:3000/emailSend",
		type:'post',
		data:{email:mail, num:code},
		error:function(){
			alert('emailSend ajax error');
		}
	});
}




//////////////////////// 회원가입 Script ////////////////////////
$(document).ready(function(){	
// 프로필 사진 미리보기
$("#_profilePic").on("change", handleImgFileSelect);
function handleImgFileSelect(e) {
	
	let files = e.target.files;
	let filesArr = Array.prototype.slice.call(files);
	filesArr.forEach(function(f) {
	   if(!f.type.match("image.*")) {
	       alert("이미지만 업로드 가능합니다.");
	       return;
	   }
	   sel_file = f;
	   let reader = new FileReader();
	   reader.onload = function(e) {
	        $("#profilePic").attr("src", e.target.result);   
	        $("#profilePic").css("height", '150px');  
	        $("#profilePic").css("width", '150px');  
	   }
	   reader.readAsDataURL(f);
	});
}


// Email 체크
$("#_checkEmail").change(function() {
	let e_RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	if($("#_remail").val() == ""){ 
		alert("이메일을 입력해주세요");
		$("input:checkbox[id='_checkEmail']").prop('checked', false);
		$("#_remail").focus();
		return;
	} 
	else if(!e_RegExp.test($("#_remail").val())){
		alert("올바른 이메일 주소를 입력해주세요");
		$("input:checkbox[id='_checkEmail']").prop('checked', false);
		$("#_remail").val("");
		$("#_remail").focus();
		return; 
	}	
	else{	
		let email = $("#_remail").val();
		
		$.ajax({
			url:"http://localhost:3000/checkEmail", 
			type:'post',
			data:{email:email},
			success:function( data ){
				if(data == 0){
					emailSend();
					$('#emailModal').modal('show');
				}else{
					alert("사용중인 이메일 입니다.");
					$("input:checkbox[id='_checkEmail']").prop('checked', false);
					$("#_remail").val("");
					$("#_remail").focus();
				}
		    },
			error:function(){
				alert('email Check ajax error');
			}
		});
	}
});


// 회원가입 Email 인증번호 확인 
$("#emailNumChAf").click(function(){
		
	if($("#emailNumCh").val() == code){
		$("#emailNumCh").val("");
		$("input:checkbox[id='_checkEmail']").prop('checked', true);
	}
	else{
		$("input:checkbox[id='_checkEmail']").prop('checked', false);
		alert('인증번호가 올바르지 않습니다');
		$("#emailNumCh").val("");
		$("#_remail").val("");
		$("#_remail").focus();
	}
});


// Nickname 중복체크
$("#_checkNickName").change(function() {
	if($("#_nickName").val() == ""){ 
		alert("닉네임을 입력해주세요");
		$("input:checkbox[id='_checkNickName']").prop('checked', false);
	}
	else{	
		let nickName = $("#_nickName").val();
		
		$.ajax({
			url:"http://localhost:3000/checkNickName", 
			type:'post',
			data:{nickName:nickName},
			success:function( data ){
				if(data == 0){
					$("input:checkbox[id='_checkNickName']").prop('checked', true);
				}
				else{
					alert("사용중인 닉네임 입니다.");
					$("input:checkbox[id='_checkNickName']").prop('checked', false);
					$("#_nickName").val("");
					$("#_nickName").focus();
				}
			},
			error:function(){
				alert('nickName Check ajax error');
			}
		});
	}
});


// 회원가입 버튼 
$(".btn-signup").click(function() {
	
	let pwdCheck = /^[a-zA-Z0-9]{4,12}$/; // pwassword 정규식
	let phoneCheck = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/; // 휴대전화 정규식
	
	if($("#_myName").val() == ""){
		alert("이름을 입력하세요");
		$("#_myName").focus();
		return;
	}
	else if($("#_checkEmail").is(':checked') == false){
		alert("이메일 중복체크를 해주세요");
		return;
	}
	else if($("#_rpwd").val() == ""){
		alert("패스워드를 입력하세요");
		$("#_pwd").focus();
		return;
	}
	else if($("#_rpwd").val() != $("#_cpwd").val()){
		alert("패스워드가 동일하지 않습니다");
		$("#_rpwd").val("");
		$("#_rpwd").focus();
		$("input:checkbox[id='_checkPwd']").prop('checked', false);
		return;
	}
	else if(!pwdCheck.test($("#_rpwd").val())){
		alert("패스워드는 4~12자의 영문 대소문자와 숫자만 가능합니다");
		$("#_rpwd").val("");
		$("#_rpwd").focus();
		$("input:checkbox[id='_checkPwd']").prop('checked', false);
		return;
	}
	else if($("#_phoneNumber").val() == ""){
		alert("전화번호를 입력하세요");
		$("#_phoneNumber").focus();
		return;
	}
	else if(!phoneCheck.test($("#_phoneNumber").val())){
		alert("전화번호를 올바르게 입력하세요");
		$("#_phoneNumber").val("");
		$("#_phoneNumber").focus();
		return;
	}
	else if($("#_checkNickName").is(':checked') == false){
		alert("닉네임 중복체크를 해주세요");
		return;
	}
	else{
		$.ajax({
			url:"http://localhost:3000/addMember", 
			type:'post',
			data : new FormData($("#regiFrm")[0]), 
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			cache : false,
			success:function( data ){
				if(data){
					alert('성공적으로 가입되었습니다');
					location.reload();               
					return;
				}
				else{
					alert("가입 실패");
				}
			},
			error:function(){
				alert('Register ajax error');
			}
		});
	}
});
});