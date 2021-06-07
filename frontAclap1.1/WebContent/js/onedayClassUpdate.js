$(document).ready(function(){
	
	// classSeq 가져오기
	let urlParams = location.search.split(/[?&]/).slice(1).map(function(paramPair) {
	    return paramPair.split(/=(.+)?/).slice(0, 2);
	}).reduce(function(obj, pairArray) {
	    obj[pairArray[0]] = pairArray[1];
	    return obj;
	}, {});
	$("#_classNum").val(urlParams.seq);
	
	// naviBar, footer load
	$("#naviBar").load("../navibar.html");
	$("#footer").load("../footer.html");
	
	//hide setting
	$(".chapter2").hide();
	$(".chapter3").hide();
	$(".chapter4").hide();
	$(".chapter5").hide();
	
	//----------------------- 저장된 클래스 정보 뿌려주기 -------------------------
	let seq = urlParams.seq;	
	$.ajax({
		url:"http://localhost:3000/onedayClassInfo", 
		type:'post',
		data : {classNum:seq}, 
		success:function( data ){			
			// Primary Category
			$("#_primaryCategory").val(data.primaryCategory);
			// Secondary Category Setting 
			if($("#_primaryCategory").val()=='외국어'){
				$('#_secondaryCategory1').children('option:not(:first)').remove();
				$('#_secondaryCategory2').children('option:not(:first)').remove();
				$("#_secondaryCategory1").append(
			 		"<option value='자격증' hide>&nbsp;자격증</option>" +
			 		"<option value='일상회화'>&nbsp;일상회화</option>"+
					"<option value='비지니스회화'>&nbsp;비지니스 회화</option>"
				);
				$("#_secondaryCategory2").append(
						"<option value='자격증' hide>&nbsp;자격증</option>" +
						"<option value='일상회화'>&nbsp;일상회화</option>"+
						"<option value='비지니스회화'>&nbsp;비지니스 회화</option>"
				);
			}
			else if($("#_primaryCategory").val()=='크리에이티브'){
				$('#_secondaryCategory1').children('option:not(:first)').remove();
				$('#_secondaryCategory2').children('option:not(:first)').remove();
				$("#_secondaryCategory1").append(
						"<option value='음악'>&nbsp;음악</option>"+
						"<option value='미용'>&nbsp;미용</option>"+
						"<option value='미술'>&nbsp;미술</option>"+
						"<option value='공예'>&nbsp;공예</option>"
				);
				$("#_secondaryCategory2").append(
						"<option value='음악'>&nbsp;음악</option>"+
						"<option value='미용'>&nbsp;미용</option>"+
						"<option value='미술'>&nbsp;미술</option>"+
						"<option value='공예'>&nbsp;공예</option>"
				);
			}
			else if($("#_primaryCategory").val()=='요리'){
				$('#_secondaryCategory1').children('option:not(:first)').remove();
				$('#_secondaryCategory2').children('option:not(:first)').remove();
				$("#_secondaryCategory1").append(
						"<option value='디저트'>&nbsp;디저트</option>"+
						"<option value='음료/커피'>&nbsp;음료/커피</option>"+
						"<option value='한식/일식'>&nbsp;한식/일식</option>"+
						"<option value='양식'>&nbsp;양식</option>"
				);
				$("#_secondaryCategory2").append(
						"<option value='디저트'>&nbsp;디저트</option>"+
						"<option value='음료/커피'>&nbsp;음료/커피</option>"+
						"<option value='한식/일식'>&nbsp;한식/일식</option>"+
						"<option value='양식'>&nbsp;양식</option>"
				);
			}
			else if($("#_primaryCategory").val()=='프로그래밍'){
				$('#_secondaryCategory1').children('option:not(:first)').remove();
				$('#_secondaryCategory2').children('option:not(:first)').remove();
				$("#_secondaryCategory1").append(
						"<option value='frontEnd'>&nbsp;front end</option>"+
						"<option value='backEnd'>&nbsp;back end</option>"
				);
				$("#_secondaryCategory2").append(
						"<option value='frontEnd'>&nbsp;front end</option>"+
						"<option value='backEnd'>&nbsp;back end</option>"
				);
			}
			else if($("#_primaryCategory").val()=='스포츠/레저'){
				$('#_secondaryCategory1').children('option:not(:first)').remove();
				$('#_secondaryCategory2').children('option:not(:first)').remove();
				$("#_secondaryCategory1").append(
						"<option value='익스트림'>&nbsp;익스트림</option>"+
						"<option value='아웃도어'>&nbsp;아웃도어</option>"+
						"<option value='라이프스타일'>&nbsp;라이프스타일</option>"
				);
				$("#_secondaryCategory2").append(
						"<option value='익스트림'>&nbsp;익스트림</option>"+
						"<option value='아웃도어'>&nbsp;아웃도어</option>"+
						"<option value='라이프스타일'>&nbsp;라이프스타일</option>"
				);
			}
			
			let SC = data.secondaryCategory;
			let secondary = SC.split('#');
			
			$("#_secondaryCategory1").val(secondary[1]);
			if(secondary[1] != null)
				$("#_secondaryCategory2").val(secondary[2]);
			if(secondary[2] != null)
				$("#_secondaryCategory3").val(secondary[3]);


			// 제목
			$("#_OCtitleInput").val(data.title);
			// 간략한 수업 소개
			$("#_OCinfomation").val(data.information.replaceAll('<br>',''));
			// 이미지
			$("#_layerSelect").val(data.layerSelect);
			if(data.layerSelect=='A'){
				$("#layer1").removeClass('layerBtnNonChoice');
				$("#layer2").removeClass('layerBtnChoice');
				$("#layer3").removeClass('layerBtnChoice');
				$("#layer1").addClass('layerBtnChoice');				
				$("#layer2").addClass('layerBtnNonChoice');				
				$("#layer3").addClass('layerBtnNonChoice');		
				$(".onedayClassImageBoxB").hide();
				$(".onedayClassImageBoxC").hide();
				$("#_ocImgA1").attr('src', data.image1);
				$("#_ocImgA2").attr('src', data.image2);
				$("#_ocImgA3").attr('src', data.image3);
				$("#_ocImgA4").attr('src', data.image4);
				$("#_ocImgA5").attr('src', data.image5);
			}
			else if(data.layerSelect=='B'){
				$("#layer2").removeClass('layerBtnNonChoice');
				$("#layer1").removeClass('layerBtnChoice');
				$("#layer3").removeClass('layerBtnChoice');
				$("#layer2").addClass('layerBtnChoice');				
				$("#layer1").addClass('layerBtnNonChoice');				
				$("#layer3").addClass('layerBtnNonChoice');			
				$(".onedayClassImageBoxA").hide();
				$(".onedayClassImageBoxC").hide();
				$("#_ocImgB1").attr('src', data.image1);
				$("#_ocImgB2").attr('src', data.image2);
				$("#_ocImgB3").attr('src', data.image3);
				$("#_ocImgB4").attr('src', data.image4);
				$("#_ocImgB5").attr('src', data.image5);
			}
			else if(data.layerSelect=='C'){
				$("#layer3").removeClass('layerBtnNonChoice');
				$("#layer1").removeClass('layerBtnChoice');
				$("#layer2").removeClass('layerBtnChoice');
				$("#layer3").addClass('layerBtnChoice');				
				$("#layer1").addClass('layerBtnNonChoice');				
				$("#layer2").addClass('layerBtnNonChoice');				
				$(".onedayClassImageBoxA").hide();
				$(".onedayClassImageBoxB").hide();
				$("#_ocImgC1").attr('src', data.image1);
				$("#_ocImgC2").attr('src', data.image2);
				$("#_ocImgC3").attr('src', data.image3);
				$("#_ocImgC4").attr('src', data.image4);
				$("#_ocImgC5").attr('src', data.image5);
			}
			
			// 수업에 대한 구체적인 설명
			$("#_OCcontent").val(data.content.replaceAll('<br>',''));
			// 강의시간
			$("#_limitNum").val(data.limitNum);
			// 참여인원
			$("#_duration").val(data.duration);
			// 준비물
			$("#_preparation").val(data.preparation);
			// 수강포인트
			$("#_price").val(data.price);
			// 강의 시작일
			$("#_startDate").val(data.startDate.substring(0,10));
			// 강의 종료일
			$("#_endDate").val(data.endDate.substring(0,10));
			// noClassDate
			let noClassDate = data.noClass.split('');
			$("input[name='noClass']").val([noClassDate[0],
										    noClassDate[1], 
										    noClassDate[2],
										    noClassDate[3],
										    noClassDate[4],
										    noClassDate[5],
										    noClassDate[6]]);
			// 수업 장소
			let loc = data.location.split("#");
			$("#_location").val(data.location);
			$("#_locationC").val(loc[0]);
			$("#keyword1").val(loc[0]);
			$("#keyword2").val(loc[1]);
			searchClass();
			
			// 강사 소개
			$(".ocTeacherImg").attr('src', data.profilePic);
			$("#teacherTitle").html(data.instructor + ' 선생님 소개');
			$(".ocTeacherMail").html(data.email);
			$("#_aboutMeInput").val(data.aboutMe.replaceAll('<br>',''));
			
			// 유투브 링크
			$("#_youtubeLinkInput").val(data.youtubeLint);
		},
		
		error:function(){
			alert('onedayClassInfo ajax error');
		}
	});
	
	
	
	//--------------- 사이드바 컨트롤---------------
	$("#OCbtn1").click(function(){
		$("#OCbtn1").css('background-color','gray');
		$("#OCbtn2").css('background-color','white');
		$("#OCbtn3").css('background-color','white');
		$("#OCbtn4").css('background-color','white');
		$("#OCbtn5").css('background-color','white');
		$("#OCbtn1").css('color','white');
		$("#OCbtn2").css('color','black');
		$("#OCbtn3").css('color','black');
		$("#OCbtn4").css('color','black');
		$("#OCbtn5").css('color','black');
		$(".chapter1").show();
		$(".chapter2").hide();
		$(".chapter3").hide();
		$(".chapter4").hide();
		$(".chapter5").hide();
	});
	$("#OCbtn2").click(function(){
		$("#OCbtn2").css('background-color','gray');
		$("#OCbtn1").css('background-color','white');
		$("#OCbtn3").css('background-color','white');
		$("#OCbtn4").css('background-color','white');
		$("#OCbtn5").css('background-color','white');
		$("#OCbtn2").css('color','white');
		$("#OCbtn1").css('color','black');
		$("#OCbtn3").css('color','black');
		$("#OCbtn4").css('color','black');
		$("#OCbtn5").css('color','black');
		$(".chapter2").show();
		$(".chapter1").hide();
		$(".chapter3").hide();
		$(".chapter4").hide();
		$(".chapter5").hide();
	});
	$("#OCbtn3").click(function(){
		$("#OCbtn3").css('background-color','gray');
		$("#OCbtn2").css('background-color','white');
		$("#OCbtn1").css('background-color','white');
		$("#OCbtn4").css('background-color','white');
		$("#OCbtn5").css('background-color','white');
		$("#OCbtn3").css('color','white');
		$("#OCbtn2").css('color','black');
		$("#OCbtn1").css('color','black');
		$("#OCbtn4").css('color','black');
		$("#OCbtn5").css('color','black');
		$(".chapter3").show();
		$(".chapter1").hide();
		$(".chapter2").hide();
		$(".chapter4").hide();
		$(".chapter5").hide();
	});
	$("#OCbtn4").click(function(){
		$("#OCbtn4").css('background-color','gray');
		$("#OCbtn2").css('background-color','white');
		$("#OCbtn3").css('background-color','white');
		$("#OCbtn1").css('background-color','white');
		$("#OCbtn5").css('background-color','white');
		$("#OCbtn4").css('color','white');
		$("#OCbtn2").css('color','black');
		$("#OCbtn3").css('color','black');
		$("#OCbtn1").css('color','black');
		$("#OCbtn5").css('color','black');
		$(".chapter4").show();
		$(".chapter1").hide();
		$(".chapter2").hide();
		$(".chapter3").hide();
		$(".chapter5").hide();
	});
	$("#OCbtn5").click(function(){
		$("#OCbtn5").css('background-color','gray');
		$("#OCbtn2").css('background-color','white');
		$("#OCbtn3").css('background-color','white');
		$("#OCbtn4").css('background-color','white');
		$("#OCbtn1").css('background-color','white');
		$("#OCbtn5").css('color','white');
		$("#OCbtn2").css('color','black');
		$("#OCbtn3").css('color','black');
		$("#OCbtn4").css('color','black');
		$("#OCbtn1").css('color','black');
		$(".chapter5").show();
		$(".chapter1").hide();
		$(".chapter2").hide();
		$(".chapter3").hide();
		$(".chapter4").hide();
	});
	
	
	
	//------------- 업로드 이미지 미리보기 --------------
	$("#_classImgA1").on("change", handleImgFileSelectA1);
	function handleImgFileSelectA1(e) {
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
		        $("#_ocImgA1").attr("src", e.target.result);   
		   }
		   reader.readAsDataURL(f);
		});
	}
	$("#_classImgA2").on("change", handleImgFileSelectA2);
	function handleImgFileSelectA2(e) {
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
				$("#_ocImgA2").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}
	$("#_classImgA3").on("change", handleImgFileSelectA3);
	function handleImgFileSelectA3(e) {
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
				$("#_ocImgA3").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}
	$("#_classImgA4").on("change", handleImgFileSelectA4);
	function handleImgFileSelectA4(e) {
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
				$("#_ocImgA4").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}
	$("#_classImgA5").on("change", handleImgFileSelectA5);
	function handleImgFileSelectA5(e) {
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
				$("#_ocImgA5").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}	
	$("#_classImgB1").on("change", handleImgFileSelectB1);
	function handleImgFileSelectB1(e) {
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
				$("#_ocImgB1").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}
	$("#_classImgB2").on("change", handleImgFileSelectB2);
	function handleImgFileSelectB2(e) {
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
				$("#_ocImgB2").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}
	$("#_classImgB3").on("change", handleImgFileSelectB3);
	function handleImgFileSelectB3(e) {
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
				$("#_ocImgB3").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}
	$("#_classImgB4").on("change", handleImgFileSelectB4);
	function handleImgFileSelectB4(e) {
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
				$("#_ocImgB4").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}	
	$("#_classImgB5").on("change", handleImgFileSelectB5);
	function handleImgFileSelectB5(e) {
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
				$("#_ocImgB5").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}	
	$("#_classImgC1").on("change", handleImgFileSelectC1);
	function handleImgFileSelectC1(e) {
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
				$("#_ocImgC1").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}
	$("#_classImgC2").on("change", handleImgFileSelectC2);
	function handleImgFileSelectC2(e) {
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
				$("#_ocImgC2").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}
	$("#_classImgC3").on("change", handleImgFileSelectC3);
	function handleImgFileSelectC3(e) {
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
				$("#_ocImgC3").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}
	$("#_classImgC4").on("change", handleImgFileSelectC4);
	function handleImgFileSelectC4(e) {
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
				$("#_ocImgC4").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}	
	$("#_classImgC5").on("change", handleImgFileSelectC5);
	function handleImgFileSelectC5(e) {
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
				$("#_ocImgC5").attr("src", e.target.result);   
			}
			reader.readAsDataURL(f);
		});
	}	

	
	//------------------- 카테고리 선택 ---------------
	$("#_primaryCategory").on("change", secondaryCategory);
	function secondaryCategory() {
		if($("#_primaryCategory").val()=='외국어'){
			$('#_secondaryCategory1').children('option:not(:first)').remove();
			$('#_secondaryCategory2').children('option:not(:first)').remove();
			$("#_secondaryCategory1").append(
		 		"<option value='자격증' hide>&nbsp;자격증</option>" +
		 		"<option value='일상회화'>&nbsp;일상회화</option>"+
				"<option value='비지니스회화'>&nbsp;비지니스 회화</option>"
			);
			$("#_secondaryCategory2").append(
					"<option value='자격증' hide>&nbsp;자격증</option>" +
					"<option value='일상회화'>&nbsp;일상회화</option>"+
					"<option value='비지니스회화'>&nbsp;비지니스 회화</option>"
			);
		}
		else if($("#_primaryCategory").val()=='크리에이티브'){
			$('#_secondaryCategory1').children('option:not(:first)').remove();
			$('#_secondaryCategory2').children('option:not(:first)').remove();
			$("#_secondaryCategory1").append(
					"<option value='음악'>&nbsp;음악</option>"+
					"<option value='미용'>&nbsp;미용</option>"+
					"<option value='미술'>&nbsp;미술</option>"+
					"<option value='공예'>&nbsp;공예</option>"
			);
			$("#_secondaryCategory2").append(
					"<option value='음악'>&nbsp;음악</option>"+
					"<option value='미용'>&nbsp;미용</option>"+
					"<option value='미술'>&nbsp;미술</option>"+
					"<option value='공예'>&nbsp;공예</option>"
			);
		}
		else if($("#_primaryCategory").val()=='요리'){
			$('#_secondaryCategory1').children('option:not(:first)').remove();
			$('#_secondaryCategory2').children('option:not(:first)').remove();
			$("#_secondaryCategory1").append(
					"<option value='디저트'>&nbsp;디저트</option>"+
					"<option value='음료/커피'>&nbsp;음료/커피</option>"+
					"<option value='한식/일식'>&nbsp;한식/일식</option>"+
					"<option value='양식'>&nbsp;양식</option>"
			);
			$("#_secondaryCategory2").append(
					"<option value='디저트'>&nbsp;디저트</option>"+
					"<option value='음료/커피'>&nbsp;음료/커피</option>"+
					"<option value='한식/일식'>&nbsp;한식/일식</option>"+
					"<option value='양식'>&nbsp;양식</option>"
			);
		}
		else if($("#_primaryCategory").val()=='프로그래밍'){
			$('#_secondaryCategory1').children('option:not(:first)').remove();
			$('#_secondaryCategory2').children('option:not(:first)').remove();
			$("#_secondaryCategory1").append(
					"<option value='frontEnd'>&nbsp;front end</option>"+
					"<option value='backEnd'>&nbsp;back end</option>"
			);
			$("#_secondaryCategory2").append(
					"<option value='frontEnd'>&nbsp;front end</option>"+
					"<option value='backEnd'>&nbsp;back end</option>"
			);
		}
		else if($("#_primaryCategory").val()=='스포츠/레저'){
			$('#_secondaryCategory1').children('option:not(:first)').remove();
			$('#_secondaryCategory2').children('option:not(:first)').remove();
			$("#_secondaryCategory1").append(
					"<option value='익스트림'>&nbsp;익스트림</option>"+
					"<option value='아웃도어'>&nbsp;아웃도어</option>"+
					"<option value='라이프스타일'>&nbsp;라이프스타일</option>"
			);
			$("#_secondaryCategory2").append(
					"<option value='익스트림'>&nbsp;익스트림</option>"+
					"<option value='아웃도어'>&nbsp;아웃도어</option>"+
					"<option value='라이프스타일'>&nbsp;라이프스타일</option>"
			);
		}
	}

}); // document 끝



// ----------------- 이미지 프레임 선택 버튼 -----------------
function showLayer1(){
	// 선택된 레이어 저장 
	$("#_layerSelect").val("A");
	
	//레이어 보이기
	$(".onedayClassImageBoxB").hide();
	$(".onedayClassImageBoxC").hide();
	$(".onedayClassImageBoxA").show();
	
	//레이어 선택 버튼 컨트롤
	$("#layer1").removeClass('layerBtnNonChoice');
	$("#layer2").removeClass('layerBtnChoice');
	$("#layer3").removeClass('layerBtnChoice');
	$("#layer1").addClass('layerBtnChoice');				
	$("#layer2").addClass('layerBtnNonChoice');				
	$("#layer3").addClass('layerBtnNonChoice');		

	//선택되지 않은 레이어 이미지 초기화
	$("#_ocImgB1").attr('src','../images/onedayClassImg1.png');
	$("#_ocImgB2").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgB3").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgB4").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgB5").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgC1").attr('src','../images/onedayClassImg1.png');
	$("#_ocImgC2").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgC3").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgC4").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgC5").attr('src','../images/onedayClassImg2.png');
}
function showLayer2(){
	// 선택된 레이어 저장 
	$("#_layerSelect").val("B");
	
	// 레이어 보이기
	$(".onedayClassImageBoxA").hide();
	$(".onedayClassImageBoxC").hide();
	$(".onedayClassImageBoxB").show();

	// 레이어 버튼 컨트롤
	$("#layer2").removeClass('layerBtnNonChoice');
	$("#layer1").removeClass('layerBtnChoice');
	$("#layer3").removeClass('layerBtnChoice');
	$("#layer2").addClass('layerBtnChoice');				
	$("#layer1").addClass('layerBtnNonChoice');				
	$("#layer3").addClass('layerBtnNonChoice');	
	
	// 선택되지 않은 레이어 이미지 초기화
	$("#_ocImgA1").attr('src','../images/onedayClassImg1.png');
	$("#_ocImgA2").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgA3").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgA4").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgA5").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgC1").attr('src','../images/onedayClassImg1.png');
	$("#_ocImgC2").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgC3").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgC4").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgC5").attr('src','../images/onedayClassImg2.png');
}
function showLayer3(){
	// 선택된 레이어 저장 
	$("#_layerSelect").val("C");
	
	// 레이어 보이기
	$(".onedayClassImageBoxA").hide();
	$(".onedayClassImageBoxB").hide();
	$(".onedayClassImageBoxC").show();

	// 레이어버튼 컨트롤
	$("#layer3").removeClass('layerBtnNonChoice');
	$("#layer1").removeClass('layerBtnChoice');		
	$("#layer2").removeClass('layerBtnChoice');
	$("#layer3").addClass('layerBtnChoice');				
	$("#layer1").addClass('layerBtnNonChoice');				
	$("#layer2").addClass('layerBtnNonChoice');		
	
	// 선택되지 않은 레이어 이미지 초기화
	$("#_ocImgA1").attr('src','../images/onedayClassImg1.png');
	$("#_ocImgA2").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgA3").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgA4").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgA5").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgB1").attr('src','../images/onedayClassImg1.png');
	$("#_ocImgB2").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgB3").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgB4").attr('src','../images/onedayClassImg2.png');
	$("#_ocImgB5").attr('src','../images/onedayClassImg2.png');
}



//dataformat 함수
function dateFormat(date) {
	let yyyy = date.getFullYear().toString();
	let mm = (date.getMonth()+1).toString();
	let dd  = date.getDate().toString();
	
	let mmChars = mm.charAt('');
	let ddChars = dd.charAt('');
	return yyyy+'-'+(mmChars[1]?mm:"0"+mmChars[0])+'-'+(ddChars[1]?dd:"0"+ddChars[0]);
}

//-------------------- 클래스 수정 완료 --------------------		
function onedayClassWriteAf(){
	
	// Secondary Category 만들기
	let secondaryCategory = "#"+ $("#_secondaryCategory1").val();
	if ($("#_secondaryCategory2").val() != "")
		secondaryCategory += "#"+$("#_secondaryCategory2").val();
	if ($("#_secondaryCategory3").val() != "")
		secondaryCategory += "#"+$("#_secondaryCategory3").val();
		
	// noClasDayOfWeek 만들기
	let arr = []; 
	let noClassStr = "";
	 $("input[name='noClassdayofWeek']:checked").each(function(){
		let chk = $(this).val();
		arr.push(chk);
	 });
	
	for (var i = 0; i < arr.length; i++) {
		noClassStr += arr[i];
	}
		
	// hidden값 넣어주기
	$("#_aboutMe").val($("#_aboutMeInput").val());
	$("#_youtubeLink").val($("#_youtubeLinkInput").val());
	$("#_secondaryCategory").val(secondaryCategory);
	$("#_noClassDayOfWeek").val(noClassStr);
		
	// 오늘 날짜 구하기
	let date = new Date();
	let today = dateFormat(date);
	
	// 숫자 정규식
	let nums = /[^0-9]/g;
	
	// 빈 값 체크 
	if($('#_primaryCategory').val() == ''){
		alert('(Chapter1) Primary Category를 선택하세요');
	}
	else if($('#_secondaryCategory').val() == '//'){
		alert('(Chapter1) Secondary Category를 한 개 이상 선택하세요');
	}
	else if($('#_OCtitleInput').val() == ""){
		alert('(Chapter1) 클래스 제목을 입력하세요');
	}
	else if($('#_OCinfomation').val() == ""){
		alert('(Chapter1) 간략한 수업소개를 작성하세요');
	}
	else if($('#_OCcontent').val() == ''){
		alert('(Chapter3) 수업 소개글을 입력해주세요');
	}	
	else if($('#_duration').val() == ''){
		alert('(Chapter3) 강의시간을 선택해주세요');
	}	
	else if($('#_limitNum').val() == ''){
		alert('(Chapter3) 참여인원을 선택해주세요');
	}	
	else if($('#_preparation').val() == ""){
		alert('(Chapter3) 준비물을 작성해주세요');
	}	
	else if($('#_price').val() == ""){
		alert('(Chapter3) 수강 포인트를 입력해주세요');
	}	
	else if(nums .test($("#_price").val())){
		alert('(Chapter3) 포인트는 숫자만 입력 가능합니다');
	}
	else if($('#_startDate').val() == ""){
		alert('(Chapter3) 수업 시작일을 선택해주세요');
	}	
	else if($('#_endtDate').val() == ""){
		alert('(Chapter3) 수업 종료일을 선택해주세요');
	}	
	else if($('#_starttDate').val() > $('#_endDate').val()){
		alert('(Chapter3) 수업 시작일은 종료일보다 늦을 수 없습니다');
	}	
	else if(today > $('#_startDate').val()){
		alert('(Chapter3) 수업 시작일은 오늘보다 이를 수 없습니다');
	}	
	else if($('#_locationC').val() != $("#keyword1").val() 
			&& $('.placeSav').attr('check') == '0'){
		alert('(Chapter4) 새로운 수업 장소를 저장하세요');
	}	
	else if($('#_aboutMeInput').val()==""){
		alert('(Chapter5) 강사 소개글을 입력해주세요');
	}
	else{
		$.ajax({
			url:"http://localhost:3000/onedayClassUpdate", 
			type:'post',
			data : new FormData($("#onedayClassWriteFrm")[0]), 
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			cache : false,
			success:function( seq ){
				alert(seq);
				if(seq>0){
					alert('성공적으로 수정이 완료 되었습니다');
					location.href= 'onedayClassDetail.html?seq='+seq;
				}
			},
			error:function(){
				alert('onedayClassWrite ajax error');
			}
		});
	}
};