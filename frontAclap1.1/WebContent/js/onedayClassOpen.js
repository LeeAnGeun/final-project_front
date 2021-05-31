$(document).ready(function(){
	// header, footer 열기
	$("#naviBar").load("../navibar.html");
	$("#footer").load("../footer.html");
	
	// 로그인 세션정보 가져오기
	let login = sessionStorage.getItem("login");
	let json = JSON.parse(login); // String -> json	
	
	// 클래스 개설하기 버튼 클릭
	$("#makeClassBtn").click(function(){
		if(json == null){
			alert('로그인이 필요합니다');
			location.href='../loginRegi/loginRegi.html';
		}
		else{
			location.href='onedayClassWrite.html';
		}
	});
	
	// 문의메일 보내기
	$("#contactMailAf").click(function(){
		  let e_RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

		    //빈칸체크
		    if($("#contactName").val()==""){
			   alert('이름을 입력해 주세요');
			   $("#contactName").focus();
		    } 
		    else if($("#contactEmail").val()==""){
			   alert('이메일을 입력해주세요');
			   $("#contactEmail").focus();
		    }
			else if(!e_RegExp.test($("#contactEmail").val())){
				alert('올바른 이메일 주소를 입력해주세요');
				$("#contactEmail").val("");
				$("#contactEmail").focus();
			}
		    else if($("#contactText").val()==""){
			    alert('내용을 입력해주세요');
			    $("#contactText").focus();
		    }
		    else{

		    	$.ajax({
					url:"http://localhost:3000/contactMail", 
					type:'post',
					data:{name:$("#contactName").val(), mail:$("#contactEmail").val(), content:$("#contactText").val()},
					success:function( result ){
						if(result == true){
							alert('성공적으로 메일을 전송하였습니다');
					    	$("#contactName").val("");
					    	$("#contactEmail").val("");
					    	$("#contactText").val("");
						} 
						else{
							alert('Mail send Fail!');
						}
					},
					error:function(){
						alert("contact mail ajax error");
					}
		    	});
		    }
	});
});