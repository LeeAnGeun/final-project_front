// like btn seq 얻기
let likeClassNum = 0;
function likeBtnClick(seq){
	likeClassNum = seq;
}

//디테일뷰로 이동
function goDetail(seq){
//	alert(seq);
	location.href='../onedayClassView/onedayClassDetail.html?seq='+seq;
}



$(document).ready(function(){
	let login = sessionStorage.getItem("login");
	if(login == null){
		$("#recommendClass").hide();
	}
	
	// 최신순 정보 불러오기
	$.ajax({
		url:"http://localhost:3000/getNewestClassList",  
		type:"post",
		success:function( data ){
			$.each(data, function(i, item){
				$("#s_newImg"+i).attr('src', item.image1);
				$("#new_classNum"+i).val(item.classNum);
				$("#s_newTitle"+i).html(item.title);
				$("#s_newTeacher"+i).html(item.instructor +" 선생님");				
 				
				// like 유무 체크
				if(login != null){
					let json = JSON.parse(login); 
					$.ajax({
						url:"http://localhost:3000/checkLike",  
						type:"post",
						data:{memNum:json.memNum, classNum:item.classNum},
						success:function(result){
							if(result){
								let icon = $("<i class='fa fa-heart'>")
								$("#newLikeBtn"+i).html(icon);
								$("#newLikeBtn"+i).css('color', 'red');
								$("#newLikeBtn"+i).css('background-color', 'white');
								$("#newLikeBtn"+i).mouseover(function(){
									$("#newLikeBtn"+i).css('color', 'black');
								});
								$("#newLikeBtn"+i).mouseout(function(){
									$("#newLikeBtn"+i).css('color', 'red');
								});
							}
						},
						error:function(){
							alert("checkLike ajax error");
						}
					});
				}
			});
		},
		error:function(){
			alert('main getNewestClass ajax Error')
		}
	});	
	
	
	
	// 인기순 정보 불러오기
	$.ajax({
		url:"http://localhost:3000/getBestClassList",  
		type:"post",
		success:function( data ){
			
			$.each(data, function(i, item){
								
			 	$("#s_bestImg"+i).attr('src', item.image1);
				$("#best_classNum"+i).val(item.classNum);
				$("#s_bestTitle"+i).html(item.title);
				$("#s_bestTeacher"+i).html(item.instructor +" 선생님");
			
				// like 유무 체크
				if(login != null){
					let json = JSON.parse(login); 
					$.ajax({
						url:"http://localhost:3000/checkLike",  
						type:"post",
						data:{memNum:json.memNum, classNum:item.classNum},
						success:function(result){
							if(result){
								let icon = $("<i class='fa fa-heart'>")
								$("#bestLikeBtn"+i).html(icon);
								$("#bestLikeBtn"+i).css('color', 'red');
								$("#bestLikeBtn"+i).css('background-color', 'white');
								$("#bestLikeBtn"+i).mouseover(function(){
									$("#bestLikeBtn"+i).css('color', 'black');
								});
								$("#bestLikeBtn"+i).mouseout(function(){
									$("#bestLikeBtn"+i).css('color', 'red');
								});
							}
						},
						error:function(){
							alert("checkLike ajax error");
						}
					});
				}
			});
		},
		error:function(){
			alert('main BestList ajax Error')
		}
	});	
	
	
	// 추천 클래스 불러오기 
	if(login != null){
		let json = JSON.parse(login); 
		let int1= sessionStorage.getItem("myInterest1");
		let int2= sessionStorage.getItem("myInterest2");
		let int3= sessionStorage.getItem("myInterest3");
		let input1 = json.interest1;
		let input2 = json.interest2;
		let input3 = json.interest3;
		if(int1 != null){
			input1 = int1;
			input2 = int2;
			input3 = int3;
		}
		$.ajax({
			url:"http://localhost:3000/getRecommendClassList", 
			data:{interest1:input1, interest2:input2, interest3:input3},
			type:"post",
			success:function( data ){
				
				$.each(data, function(i, item){
									
				 	$("#s_recommendImg"+i).attr('src', item.image1);
					$("#recommend_classNum"+i).val(item.classNum);
					$("#s_recommendTitle"+i).html(item.title);
					$("#s_recommendTeacher"+i).html(item.instructor +" 선생님");

					// like 유무 체크
					let json = JSON.parse(login); 
					$.ajax({
						url:"http://localhost:3000/checkLike",  
						type:"post",
						data:{memNum:json.memNum, classNum:item.classNum},
						success:function(result){
							if(result){
								let icon = $("<i class='fa fa-heart'>")
								$("#recommendLikeBtn"+i).html(icon);
								$("#recommendLikeBtn"+i).css('color', 'red');
								$("#recommendLikeBtn"+i).css('background-color', 'white');
								$("#recommendLikeBtn"+i).mouseover(function(){
									$("#recommendLikeBtn"+i).css('color', 'black');
								});
								$("#recommendLikeBtn"+i).mouseout(function(){
									$("#recommendLikeBtn"+i).css('color', 'red');
								});
							}
						},
						error:function(){
							alert("getRecommendClassList ajax error");
						}
					});
				});
			},
			error:function(){
				alert('main BestList ajax Error')
			}
		});	
	}
	
	
	// slider controller hover
	$(".fa-circle").mouseover(function(){
		$(this).css('opacity', '.6');
	});
	$(".fa-circle").mouseout(function(){
		$(this).css('opacity', '1.0');
	});
	

	
	// like 버튼 누르기
	$(".s_likeBtn").click(function(){
		if(login == null){
			alert('로그인이 필요합니다');
		}
		else{
			let json = JSON.parse(login); 
			let memNum = json.memNum;
			if($(this).html() == 'LIKE'){
				
				//view 설정
				let icon = $("<i class='fa fa-heart'>")
				$(this).html(icon);
				$(this).css('color', 'red');
				$(this).css('background-color', 'white');
				$(this).mouseover(function(){
					$(this).css('color', 'black');
				});
				$(this).mouseout(function(){
					$(this).css('color', 'red');
				});
				
				// DB에 저장
				$.ajax({
					url:"http://localhost:3000/addLike",  
					type:"post",
					data:{memNum:memNum, classNum:likeClassNum},
					error:function(){
						alert("addLike ajax error");
					}
				});
			} 
			else {
				//view 설정
				$(this).html('LIKE');
				$(this).css('color', 'white');
				$(this).css('background', 'grey');
				$(this).mouseover(function(){
					$(this).css('color', 'black');
				});
				$(this).mouseout(function(){
					$(this).css('color', 'white');
				});
				
				// DB 수정
				$.ajax({
					url:"http://localhost:3000/delLike",  
					type:"post",
					data:{memNum:memNum, classNum:likeClassNum},
					error:function(){
						alert("delLike ajax error");
					}
				});
			}
		}

	})
});	
