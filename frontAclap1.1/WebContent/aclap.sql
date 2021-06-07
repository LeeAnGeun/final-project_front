--------------------선양 DB 테스트-------------------------------

	SELECT CLASSNUM, INSTRUCTOR, TITLE, IMAGE1, ENDDATE
	FROM (SELECT ROW_NUMBER()OVER(ORDER BY CLASSNUM DESC) AS RNUM, 
				 CLASSNUM, INSTRUCTOR, TITLE, IMAGE1, ENDDATE
		  FROM ONEDAYCLASS 
		  WHERE DEL=0)  
	WHERE RNUM BETWEEN 1 AND 9
	
	SELECT CLASSNUM, INSTRUCTOR, TITLE, IMAGE1, ENDDATE, LIKECOUNT 
	FROM (SELECT ROW_NUMBER()OVER(ORDER BY LIKECOUNT DESC) AS RNUM, 
				 CLASSNUM, INSTRUCTOR, TITLE, IMAGE1, ENDDATE, LIKECOUNT
		  FROM ONEDAYCLASS 
		  WHERE DEL=0)  
	WHERE RNUM BETWEEN 1 AND 9

	SELECT*FROM ACLAPMEMBER
	
SELECT NOCLASSDATE
FROM NOCLASSDATE
WHERE CLASSNUM = 26
	
CREATE TABLE SUNTEST(
	TEXT VARCHAR2(500)
)
SELECT *
FROM ONEDAYCLASS

SELECT *
FROM review

SELECT *
FROM noclassdate

select *
FROM ACLAPMEMBER

select *
FROM LIKES

select COUNT(MEMNUM)
FROM LIKES
WHERE MEMNUM=7


	
	-- 내가 좋아하는 클래스의 CLASSNUM : 5개 
	SELECT CLASSNUM
	FROM LIKES
	WHERE MEMNUM = 7
	
	-- 내가 좋아하는 클래스의 모든 정보 (복수이므로 IN 사용)  
	SELECT *
	FROM ONEDAYCLASS
	WHERE CLASSNUM IN (SELECT CLASSNUM FROM LIKES WHERE MEMNUM=7)
		  
	-- 작성자의 프로필이미지, 이메일 주소 가져오기 
	SELECT EMAIL, PROFILEPIC
	FROM ACLAPMEMBER
	WHERE MEMNUM IN (SELECT MASTERNUM
	   				 FROM ONEDAYCLASS
					 WHERE CLASSNUM IN (SELECT CLASSNUM FROM LIKES WHERE MEMNUM=7))	
					 
	-- 두 정보 모두 가져오기 (갯수가 다르니까 작은걸 뒤에 써서 IN)
	SELECT X.CLASSNUM AS CLASSNUM, INSTRUCTOR, TITLE, PRIMARYCATEGORY, PRICE, Y.EMAIL, Y.PROFILEPIC
	FROM (SELECT CLASSNUM, INSTRUCTOR, TITLE, PRIMARYCATEGORY, PRICE, MASTERNUM
		  FROM ONEDAYCLASS
		  WHERE CLASSNUM IN (SELECT CLASSNUM FROM LIKES WHERE MEMNUM=7)) X,
		  ACLAPMEMBER Y
	WHERE Y.MEMNUM IN X.MASTERNUM
	
	
	-- 정렬 추가 
	SELECT X.CLASSNUM AS CLASSNUM, INSTRUCTOR, TITLE, PRIMARYCATEGORY, PRICE, Y.EMAIL, Y.PROFILEPIC, X.STARTDATE
	FROM (SELECT ROW_NUMBER()OVER(ORDER BY STARTDATE) AS RNUM,
	             CLASSNUM, INSTRUCTOR, TITLE, PRIMARYCATEGORY, PRICE, MASTERNUM, STARTDATE
		  FROM ONEDAYCLASS
		  WHERE CLASSNUM IN (SELECT CLASSNUM FROM LIKES WHERE MEMNUM=14)) X,
		  ACLAPMEMBER Y
	WHERE Y.MEMNUM IN X.MASTERNUM AND X.RNUM BETWEEN 1 AND 5
	ORDER BY RNUM
	
	
	  SELECT NVL(TRUNC(AVG(STARPOINT), 1),0) AS AVGPOINT
      FROM REVIEW
      WHERE CLASSNUM = 7 AND NOT MEMNUM=1	
    
      
				
    -- 작성자의 프로필이미지, 이메일 주소 가져오기 
	SELECT INSTRUCTOR, PRIMARYCATEGORY, SECONDARYCATEGORY, TITLE, CONTENT, STARTDATE, ENDDATE, PRICE, INFORMATION, DURATION, LIMITNUM, PREPARATION
		   ABOUTME, IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, LOCATION, NVL(YOUTUBELINK, ' ') AS YOUTUBELINK, EMAIL, PROFILEPIC
	FROM ONEDAYCLASS X, ACLAPMEMBER Y
	WHERE X.MASTERNUM= Y.MEMNUM AND X.CLASSNUM=26
	
	SELECT *
	FROM ONEDAYCLASS
	WHERE CLASSNUM=29
      


	
	
    UPDATE ONEDAYCLASS 
	SET PRIMARYCATEGORY='요리',
		SECONDARYCATEGORY='음료/커피#한식/일식#123', 
		TITLE='테스트 프로그램 수정수정',
		STARTDATE='2021-06-14',
		ENDDATE='2021-06-18',
		PRICE='123', 
		DURATION='50', 
		LIMITNUM='2', 
		PREPARATION='없음', 
		ABOUTME='강사 소개글을 작성해주세요<br>소개소개', 
		CONTENT='수업 시작 시간 : 6PM..<br>소개소개소개', 
		INFORMATION='강사 소개글을 작성해주세요 <br> 소개소개',	
		LAYERSELECT='A',
		LOCATION='서울 특별시 은평구 갈현2동 521-22', 
		YOUTUBELINK=null
	WHERE CLASSNUM = 26
      
--------------------------DB (table)--------------------------
--DB는 각자 컴퓨터에 각자 만드세여--
--어드민, //샘플 강의 2개// 샘플 문의 2개 //샘플 맴버2
--------------------------member--------------------------
DROP TABLE ACLAPMEMBER
CASCADE CONSTRAINTS;

DROP SEQUENCE SEQ_MEMBER;

CREATE TABLE ACLAPMEMBER(
    MEMNUM NUMBER PRIMARY KEY,
    EMAIL VARCHAR2(50) NOT NULL UNIQUE,
    PWD VARCHAR2(50) NOT NULL,
    USERNAME VARCHAR2(50) NOT NULL,
    NICKNAME VARCHAR2(50) NOT NULL UNIQUE,
    PHONENUM VARCHAR2(50) NULL,
    INTEREST1 VARCHAR2(50) NULL,
    INTEREST2 VARCHAR2(50) NULL,
    INTEREST3 VARCHAR2(50) NULL,
    PROFILEPIC VARCHAR2(50) NULL,
    AUTH NUMBER(1) NOT NULL, -- 3일반 9어드민
    CLASSMASTER NUMBER(1) NOT NULL, --0일반 1강사
    MYPOINT NUMBER NOT NULL
);

UPDATE ACLAPMEMBER SET MYPOINT = MYPOINT + 200000 
WHERE MEMNUM = 8;

select * from aclapmember;
CREATE SEQUENCE SEQ_MEMBER
START WITH 1
INCREMENT BY 1;

ALTER TABLE ACLAPMEMBER
MODIFY PROFILEPIC VARCHAR2(500);

INSERT INTO ACLAPMEMBER (MEMNUM, EMAIL, PWD, USERNAME, NICKNAME, PHONENUM, INTEREST1, INTEREST2, INTEREST3, PROFILEPIC, AUTH, CLASSMASTER, MYPOINT)
VALUES(SEQ_MEMBER.NEXTVAL, 'admin@gmail.com', 'admin', 'admin', 'admin', 1111, '음악', NULL, NULL, NULL, 9, 1, 5000);

INSERT INTO ACLAPMEMBER (MEMNUM, EMAIL, PWD, USERNAME, NICKNAME, PHONENUM, INTEREST1, INTEREST2, INTEREST3, PROFILEPIC, AUTH, CLASSMASTER, MYPOINT)
VALUES(SEQ_MEMBER.NEXTVAL, 'AAA@AAA.COM', 1111, '1111', '1111', 1111, '아웃도어스포츠', '자격증', NULL, NULL, 3, 0, 0);

INSERT INTO ACLAPMEMBER (MEMNUM, EMAIL, PWD, USERNAME, NICKNAME, PHONENUM, INTEREST1, INTEREST2, INTEREST3, PROFILEPIC, AUTH, CLASSMASTER, MYPOINT)
VALUES(SEQ_MEMBER.NEXTVAL, 'BBB@AAA.COM', 2222, '2222', '2222', 2222, '자격증', '양식', NULL, NULL, 3, 0, 0);

INSERT INTO ACLAPMEMBER (MEMNUM, EMAIL, PWD, USERNAME, NICKNAME, PHONENUM, INTEREST1, INTEREST2, INTEREST3, PROFILEPIC, AUTH, CLASSMASTER, MYPOINT)
VALUES(SEQ_MEMBER.NEXTVAL, 'CCC@AAA.COM', 1234, '홍길동', '홍길동', 1234, '미술', 'front-end', NULL, NULL, 3, 1, 0);

select * from ACLAPMEMBER;
--------------------------onedayClass--------------------------
DROP TABLE ONEDAYCLASS
CASCADE CONSTRAINTS;

DROP SEQUENCE SEQ_CLASS;

CREATE TABLE ONEDAYCLASS(
    CLASSNUM NUMBER PRIMARY KEY,
    MASTERNUM NUMBER NOT NULL,
    INSTRUCTOR VARCHAR2(50) NOT NULL,
    PRIMARYCATEGORY VARCHAR2(50) NOT NULL,
    SECONDARYCATEGORY VARCHAR2(200) NOT NULL,
    TITLE VARCHAR2(200) NOT NULL,
    CONTENT VARCHAR2(4000) NOT NULL,
    STARTDATE DATE NOT NULL,
    ENDDATE DATE NOT NULL,
    PRICE NUMBER NOT NULL,
    INFORMATION VARCHAR2(500) NOT NULL,
    DURATION VARCHAR2(50) NOT NULL,
    LIMITNUM VARCHAR2(50) NOT NULL,
    PREPARATION VARCHAR2(200) NOT NULL,
    ABOUTME VARCHAR2(1000) NOT NULL,
    IMAGE1 VARCHAR2(50) NOT NULL,
    IMAGE2 VARCHAR2(50) NULL,
    IMAGE3 VARCHAR2(50) NULL,
    IMAGE4 VARCHAR2(50) NULL,
    IMAGE5 VARCHAR2(50) NULL,
    LOCATION VARCHAR2(100) NOT NULL,
    YOUTUBELINKE VARCHAR2(200) NULL,
    LIKECOUNT NUMBER(38) NOT NULL,
    DEL NUMBER(1) NOT NULL,
    OLDREGNUM NUMBER NOT NULL,
    NEWREGNUM NUMBER NOT NULL,
    FOREIGN KEY (MASTERNUM) REFERENCES ACLAPMEMBER(MEMNUM)
);

INSERT INTO ONEDAYCLASS (CLASSNUM, MASTERNUM, INSTRUCTOR, PRIMARYCATEGORY, SECONDARYCATEGORY, TITLE, CONTENT, STARTDATE, ENDDATE, PRICE, INFORMATION, DURATION, LIMITNUM, PREPARATION,
                  ABOUTME, IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, LOCATION, YOUTUBELINKE, LIKECOUNT, DEL, OLDREGNUM, NEWREGNUM)
VALUES(SEQ_CLASS.NEXTVAL, 1, 'admin', '취미', '독서', '테스트다요', '독서를 위한 클래스', SYSDATE, SYSDATE, 5000, '테스트다요6', '0', '0', '0', '책 겁나 읽어본 사람', 'http://localhost:3000//upload//1622103470536.png', '0', '0', '0' , '0', '0', '0',20, 0, 0, 0);


CREATE SEQUENCE SEQ_CLASS
START WITH 1
INCREMENT BY 1;


select * from ONEDAYCLASS;

ALTER TABLE ONEDAYCLASS
MODIFY IMAGE1 VARCHAR2(200);
ALTER TABLE ONEDAYCLASS
MODIFY IMAGE2 VARCHAR2(200);
ALTER TABLE ONEDAYCLASS
MODIFY IMAGE3 VARCHAR2(200);
ALTER TABLE ONEDAYCLASS
MODIFY IMAGE4 VARCHAR2(200);
ALTER TABLE ONEDAYCLASS
MODIFY IMAGE5 VARCHAR2(200);

ALTER TABLE ONEDAYCLASS ADD LAYERSELECT VARCHAR2(100)
ALTER TABLE ONEDAYCLASS RENAME COLUMN YOUTUBELINKE TO YOUTUBELINK;

--------------------------noClassDate--------------------------

DROP TABLE NOCLASSDATE
CASCADE CONSTRAINTS;

DROP SEQUENCE SEQ_NOCLASSDATE;

CREATE TABLE NOCLASSDATE(
    NOCLASSDATENUM NUMBER PRIMARY KEY,
    CLASSNUM NUMBER,
    NOCLASSDATE DATE,
    FOREIGN KEY (CLASSNUM) REFERENCES ONEDAYCLASS(CLASSNUM)
);

CREATE SEQUENCE SEQ_NOCLASSDATE
START WITH 1
INCREMENT BY 1;

INSERT INTO ONEDAYCLASS (CLASSNUM, MASTERNUM, INSTRUCTOR, PRIMARYCATEGORY, SECONDARYCATEGORY, TITLE, CONTENT, STARTDATE, ENDDATE, PRICE, INFORMATION, DURATION, LIMITNUM, PREPARATION,
                  ABOUTME, IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, LOCATION, YOUTUBELINKE, LIKECOUNT, DEL, OLDREGNUM, NEWREGNUM)
VALUES(SEQ_CLASS.NEXTVAL, 1, 'admin', '크리에이티브', '라이프스타일/독서', '독서 클래스', '독서를 위한 클래스', '2021-05-24', '2021-08-28', 5000, '독서를 즐기시는 분 같이 책을 읽어요', '3', '4', '책', 
'책 겁나 읽어본 사람', '0', '0', '0', '0' , '0', '분당', '0',0, 0, 0, 0);

INSERT INTO ONEDAYCLASS (CLASSNUM, MASTERNUM, INSTRUCTOR, PRIMARYCATEGORY, SECONDARYCATEGORY, TITLE, CONTENT, STARTDATE, ENDDATE, PRICE, INFORMATION, DURATION, LIMITNUM, PREPARATION,
                  ABOUTME, IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, LOCATION, YOUTUBELINKE, LIKECOUNT, DEL, OLDREGNUM, NEWREGNUM)
VALUES(SEQ_CLASS.NEXTVAL, 1, 'admin', '크리에이티브', '라이프스타일/독서', '독서 클래스2', '독서를 위한 클래스2', '2021-05-24', '2021-08-28', 5000, '독서를 즐기시는 분 같이 책을 읽어요2', '3', '4', '책', '책 겁나 읽어본 사람', '0', '0', '0', '0' , '0', '당산', '0',0, 0, 0, 0);

INSERT INTO ONEDAYCLASS (CLASSNUM, MASTERNUM, INSTRUCTOR, PRIMARYCATEGORY, SECONDARYCATEGORY, TITLE, CONTENT, STARTDATE, ENDDATE, PRICE, INFORMATION, DURATION, LIMITNUM, PREPARATION,
                  ABOUTME, IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, LOCATION, YOUTUBELINKE, LIKECOUNT, DEL, OLDREGNUM, NEWREGNUM)
VALUES(SEQ_CLASS.NEXTVAL, 1, 'admin', '크리에이티브', '음악/악기/기타', '기타 클래스', '기타를 위한 클래스', '2021-05-28', '2021-09-28', 10000, '기타를 배우보고 싶은 분은 함꼐 해요', '2', '2', '기타', '기타 겁나 처본사람', '0', '0', '0', '0' , '0', '홍대', '0',0, 0, 0, 0);

INSERT INTO ONEDAYCLASS (CLASSNUM, MASTERNUM, INSTRUCTOR, PRIMARYCATEGORY, SECONDARYCATEGORY, TITLE, CONTENT, STARTDATE, ENDDATE, PRICE, INFORMATION, DURATION, LIMITNUM, PREPARATION,
                  ABOUTME, IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, LOCATION, YOUTUBELINKE, LIKECOUNT, DEL, OLDREGNUM, NEWREGNUM)
VALUES(SEQ_CLASS.NEXTVAL, 4, '홍길동', '스포츠레저', '아웃도어스포츠/축구', '축구 클래스', '축구를 위한 클래스', '2021-05-25', '2021-10-28', 3000, '손흥민이 되고싶은 분~', '5', '9', '축구공/축구화', '축구공 좀 차본 사람', '0', '0', '0', '0' , '0', '안산', '0',0, 0, 0, 0);

INSERT INTO ONEDAYCLASS (CLASSNUM, MASTERNUM, INSTRUCTOR, PRIMARYCATEGORY, SECONDARYCATEGORY, TITLE, CONTENT, STARTDATE, ENDDATE, PRICE, INFORMATION, DURATION, LIMITNUM, PREPARATION,
                  ABOUTME, IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, LOCATION, YOUTUBELINKE, LIKECOUNT, DEL, OLDREGNUM, NEWREGNUM)
VALUES(SEQ_CLASS.NEXTVAL, 4, '홍길동', '크리에이티브', '음악/작곡', '작곡 클래스', '작곡을 위한 클래스', '2021-05-21', '2021-06-28', 3000, '코드쿤스트가 되고싶은 사람?', '4', '3', '노트북', '곡작업 좀 해본 사람', '0', '0', '0', '0' , '0', '신촌', '0',0, 0, 0, 0);

select * from ONEDAYCLASS;

select * from onedayclass o, likes l,  r;




--------------------------likes--------------------------
DROP TABLE LIKES
CASCADE CONSTRAINTS;

CREATE TABLE LIKES(
    MEMNUM NUMBER,
    CLASSNUM NUMBER,
    FOREIGN KEY (MEMNUM) REFERENCES ACLAPMEMBER(MEMNUM),
    FOREIGN KEY (CLASSNUM) REFERENCES ONEDAYCLASS(CLASSNUM)
);

INSERT INTO LIKES (MEMNUM, CLASSNUM) VALUES ( 4,1);
UPDATE ONEDAYCLASS SET LIKECOUNT = LIKECOUNT +1 WHERE CLASSNUM = 1;

INSERT INTO LIKES (MEMNUM, CLASSNUM) VALUES ( 2,1);
UPDATE ONEDAYCLASS SET LIKECOUNT = LIKECOUNT +1 WHERE CLASSNUM = 1;

INSERT INTO LIKES (MEMNUM, CLASSNUM) VALUES ( 3,1);
UPDATE ONEDAYCLASS SET LIKECOUNT = LIKECOUNT +1 WHERE CLASSNUM = 1;

SELECT * FROM LIKES;
SELECT * FROM ONEDAYCLASS;
SELECT * FROM ACLAPMEMBER;
--최신순
SELECT * FROM ONEDAYCLASS ORDER BY CLASSNUM DESC; 
--평점순
SELECT O.TITLE, O.INSTRUCTOR, AVGPOINT
FROM (SELECT R.CLASSNUM, AVG(STARPOINT) AS AVGPOINT 
        FROM REVIEW R, ONEDAYCLASS O
        WHERE R.CLASSNUM = O.CLASSNUM AND O.PRIMARYCATEGORY LIKE '%크리에이티브%' 
        GROUP BY R.CLASSNUM) R, ONEDAYCLASS O
WHERE R.CLASSNUM = O.CLASSNUM
ORDER BY AVGPOINT DESC;
--인기순
SELECT LIKECOUNT, TITLE 
FROM ONEDAYCLASS 
WHERE PRIMARYcATEGORY LIKE '%크리에이티브%'
ORDER BY LIKECOUNT DESC;

SELECT O.TITLE, O.INSTRUCTOR, O.INFORMATION, O.DURATION, O.LIMITNUM, O.LIKECOUNT, AVGPOINT, O.STARTDATE, O.ENDDATE
FROM (SELECT R.CLASSNUM, AVG(STARPOINT) AS AVGPOINT
        FROM REVIEW R, ONEDAYCLASS O
        WHERE R.CLASSNUM = O.CLASSNUM AND O.PRIMARYCATEGORY LIKE '%크리에이티브%'
        GROUP BY R.CLASSNUM) R, ONEDAYCLASS O
WHERE R.CLASSNUM = O.CLASSNUM
ORDER BY AVGPOINT DESC;

--------------------------review--------------------------
DROP TABLE REVIEW
CASCADE CONSTRAINTS;

DROP SEQUENCE SEQ_REVIEW;

CREATE TABLE REVIEW(
    REVIEWSEQ NUMBER PRIMARY KEY,
    CLASSNUM NUMBER,
    MEMNUM NUMBER,
    STARPOINT NUMBER NOT NULL,
    RCONTENT VARCHAR2(4000) NOT NULL,
    NAME VARCHAR2(50) NOT NULL,
    CLEANNESS NUMBER(3) NOT NULL,
    SATISFY NUMBER(3) NOT NULL,
    RCOMM NUMBER(3) NOT NULL,
    RLOCATION NUMBER(3) NOT NULL,
    ACCURACY NUMBER(3) NOT NULL,
    DEL NUMBER(1) NOT NULL,
    WDATE VARCHAR2(50) NOT NULL,
    IMAGE1 VARCHAR2(500),
    IMAGE2 VARCHAR2(500),
    IMAGE3 VARCHAR2(500),
    FOREIGN KEY (CLASSNUM) REFERENCES ONEDAYCLASS(CLASSNUM),
    FOREIGN KEY (MEMNUM) REFERENCES ACLAPMEMBER(MEMNUM)
);

SELECT R.REVIEWSEQ, R.CLASSNUM, R.MEMNUM, R.RCONTENT, R.NAME, R.DEL, R.WDATE, R.IMAGE1, R.IMAGE2, R.IMAGE3, A.PROFILEPIC
FROM REVIEW R, ACLAPMEMBER A
WHERE R.MEMNUM = A.MEMNUM AND R.CLASSNUM = 2



CREATE SEQUENCE SEQ_REVIEW
START WITH 1
INCREMENT BY 1;

ALTER TABLE REVIEW ADD(WDATE VARCHAR2(50), IMAGE1 VARCHAR2(50), IMAGE2 VARCHAR2(50), IMAGE2 VARCHAR2(50)) ;

INSERT INTO REVIEW (REVIEWSEQ, CLASSNUM,MEMNUM,STARPOINT,RCONTENT,NAME,CLEANNESS,SATISFY,RCOMM,RLOCATION,ACCURACY,DEL)
VALUES(SEQ_REVIEW.NEXTVAL, 1,4, 4.5, '좋은클래스','홍길동',4.2,4.5,4.7,3.2,4.0,0);

INSERT INTO REVIEW (REVIEWSEQ, CLASSNUM,MEMNUM,STARPOINT,RCONTENT,NAME,CLEANNESS,SATISFY,RCOMM,RLOCATION,ACCURACY,DEL)
VALUES(SEQ_REVIEW.NEXTVAL, 1,2, 5, '좋은클래스','홍길동',4.2,4.5,4.7,3.2,4.0,0);

INSERT INTO REVIEW (REVIEWSEQ, CLASSNUM,MEMNUM,STARPOINT,RCONTENT,NAME,CLEANNESS,SATISFY,RCOMM,RLOCATION,ACCURACY,DEL)
VALUES(SEQ_REVIEW.NEXTVAL, 2,4, 3, '좋은클래스2','홍길동',4.2,4.5,4.7,3.2,4.0,0);

SELECT WDATE, IMAGE1 , IMAGE2, IMAGE3 FROM REVIEW ORDER BY WDATE;

ALTER TABLE REVIEW ADD WDATE VARCHAR2(100)
ALTER TABLE REVIEW ADD IMAGE1 VARCHAR2(500)
ALTER TABLE REVIEW ADD IMAGE2 VARCHAR2(500)
ALTER TABLE REVIEW ADD IMAGE3 VARCHAR2(500)

SELECT * FROM REVIEW WHERE CLASSNUM=1 AND MEMNUM=1

UPDATE REVIEW SET
RCONTENT ='수정크리스탈', CLEANNESS=1.0, SATISFY=1.0, RCOMM =1.0, RLOCATION=1.0, ACCURACY=1.0, IMAGE1='1', IMAGE2='2', IMAGE3='3'   
WHERE REVIEWSEQ=4;

---별점 평균---
SELECT TRUNC(AVG(STARPOINT)) AS AVGPOINT
FROM REVIEW
WHERE CLASSNUM = 1 AND NOT MEMNUM=1

----각 항목에 대한 별점 평균 ------
SELECT TRUNC(AVG(CLEANNESS), 1) AS CL, TRUNC(AVG(SATISFY), 1) AS SA, TRUNC(AVG(RCOMM), 1) AS COMM, TRUNC(AVG(RLOCATION), 1) AS LO, TRUNC(AVG(ACCURACY), 1) AS ACC
FROM REVIEW 
WHERE CLASSNUM =1 AND NOT MEMNUM=1

----수강생 확인 여부
SELECT COUNT(*)
FROM SCHEDULE
WHERE MEMNUM = 5 AND CLASSNUM = 2;

-----리뷰 삭제
UPDATE REVIEW SET
DEL = DEL+1
WHERE REVIEWSEQ = 1

--리뷰 리스트 
SELECT R.REVIEWSEQ, R.CLASSNUM, R.MEMNUM, R.RCONTENT, R.NAME, R.DEL, R.WDATE, R.IMAGE1, R.IMAGE2, R.IMAGE3, A.PROFILEPIC
		FROM REVIEW R, ACLAPMEMBER A
		WHERE R.MEMNUM = A.MEMNUM AND R.CLASSNUM = 1 AND NOT R.MEMNUM =1
		ORDER BY WDATE DESC, REVIEWSEQ DESC 
		
-----유저가 클래스 신청한 날짜 가져오기
SELECT COUNT(*),SYSDATE		
FROM SCHEDULE 
WHERE MEMNUM=5 AND CLASSNUM = 40
	AND RDATE <= SYSDATE


SELECT COUNT(*)
FROM REVIEW
WHERE MEMNUM=5 AND CLASSNUM = 40

--------------------------schedule--------------------------
DROP TABLE SCHEDULE
CASCADE CONSTRAINTS;

DROP SEQUENCE SEQ_SCHEDULE;

CREATE TABLE SCHEDULE(
    SCHEDULENUM NUMBER PRIMARY KEY,
    RDATE VARCHAR2(50) NOT NULL,
    MEMNUM NUMBER NOT NULL,
    CLASSNUM NUMBER,
    DEL NUMBER(1) NOT NULL,
    FOREIGN KEY (MEMNUM) REFERENCES ACLAPMEMBER(MEMNUM),
    FOREIGN KEY (CLASSNUM) REFERENCES ONEDAYCLASS(CLASSNUM)
);
CREATE SEQUENCE SEQ_SCHEDULE
START WITH 1
INCREMENT BY 1;

INSERT INTO SCHEDULE (SCHEDULENUM, RDATE, MEMNUM, CLASSNUM, DEL)
VALUES(SEQ_SCHEDULE.NEXTVAL, '2021-05-21', 2, 1, 0);

INSERT INTO SCHEDULE (SCHEDULENUM, RDATE, MEMNUM, CLASSNUM, DEL)
VALUES(SEQ_SCHEDULE.NEXTVAL,'2021-05-28', 5, 2, 0);

INSERT INTO SCHEDULE (SCHEDULENUM, RDATE, MEMNUM, CLASSNUM, DEL)
VALUES(SEQ_SCHEDULE.NEXTVAL, '2021-05-29', 1, 3, 0);

INSERT INTO SCHEDULE (SCHEDULENUM, RDATE, MEMNUM, CLASSNUM, DEL)
VALUES(SEQ_SCHEDULE.NEXTVAL, '2021-05-30', 1, 3, 0);

INSERT INTO SCHEDULE (SCHEDULENUM, RDATE, MEMNUM, CLASSNUM, DEL)
VALUES(SEQ_SCHEDULE.NEXTVAL,'2021-05-20', 2, 1, 0);

INSERT INTO SCHEDULE (SCHEDULENUM, RDATE, MEMNUM, CLASSNUM, DEL)
VALUES(SEQ_SCHEDULE.NEXTVAL,'2021-05-31', 2, 2, 0);

INSERT INTO SCHEDULE (SCHEDULENUM, RDATE, MEMNUM, CLASSNUM, DEL)
VALUES(SEQ_SCHEDULE.NEXTVAL,'2021-05-05', 2, 3, 0);

INSERT INTO SCHEDULE (SCHEDULENUM, RDATE, MEMNUM, CLASSNUM, DEL)
VALUES(SEQ_SCHEDULE.NEXTVAL,'2021-06-05', 1, 3, 0);

select * from SCHEDULE;

SELECT S.RDATE as RDATE, S.SCHEDULENUM AS SCHEDULENUM, M.USERNAME AS NAME, S.CLASSNUM AS CLASSNUM, O.TITLE AS TITLE 
FROM SCHEDULE S, ONEDAYCLASS O, ACLAPMEMBER M
WHERE S.CLASSNUM = O.CLASSNUM AND M.MEMNUM = O.INSTRUCTOR;

  SELECT S.RDATE as RDATE, S.SCHEDULENUM AS SCHEDULENUM, M.USERNAME AS NAME, S.CLASSNUM AS CLASSNUM, O.TITLE AS TITLE 
  FROM SCHEDULE S, ONEDAYCLASS O, ACLAPMEMBER M
  WHERE S.CLASSNUM = O.CLASSNUM AND 'admin' = O.INSTRUCTOR AND M.MEMNUM = S.MEMNUM;
  
  commit;

--------------------------receipt--------------------------
DROP TABLE RECEIPT
CASCADE CONSTRAINTS;

DROP SEQUENCE SEQ_RECEIPT;

CREATE TABLE RECEIPT(
    RECEIPTNUM NUMBER PRIMARY KEY,
    NAME VARCHAR2(50) NOT NULL,
    PRICE NUMBER NOT NULL,
    WDATE DATE NOT NULL,
    
    CLASSNUM NUMBER,
    MEMNUM NUMBER,
    DEL NUMBER(1) NOT NULL,
    FOREIGN KEY (MEMNUM) REFERENCES ACLAPMEMBER(MEMNUM),
    FOREIGN KEY (CLASSNUM) REFERENCES ONEDAYCLASS(CLASSNUM)
);
CREATE SEQUENCE SEQ_RECEIPT
START WITH 1
INCREMENT BY 1;

--------------------------noticeBbs--------------------------
DROP TABLE NOTICEBBS
CASCADE CONSTRAINTS;

DROP SEQUENCE SEQ_NOTICEBBS;

CREATE TABLE NOTICEBBS(
    NOTICENUM NUMBER PRIMARY KEY,
    MEMNUM NUMBER,
    NTITLE VARCHAR2(50) NOT NULL,
    NCONTENT VARCHAR2(4000) NULL,
    WDATE DATE NOT NULL,
    NIMG VARCHAR2(50) NULL,
    DEL NUMBER(1) NOT NULL,
    ANSWER NUMBER(1) NOT NULL,
    FOREIGN KEY (MEMNUM) REFERENCES ACLAPMEMBER(MEMNUM)
);

INSERT INTO NOTICEBBS (NOTICENUM, MEMNUM, NTITLE, NCONTENT, WDATE, DEL, ANSWER)
VALUES SEQ_NOTICEBBS, 1, '11111', '12312321', SYSDATE, 0, 0

CREATE SEQUENCE SEQ_NOTICEBBS
START WITH 1
INCREMENT BY 1;

INSERT INTO NOTICEBBS(NOTICENUM, MEMNUM, NTITLE, NCONTENT, WDATE,  DEL, ANSWER)
VALUES (SEQ_NOTICEBBS.NEXTVAL, 2, 'HELLO', 'WORLD', SYSDATE,  0, 0);

INSERT INTO NOTICEBBS(NOTICENUM, MEMNUM, NTITLE, NCONTENT, WDATE, NIMG, DEL, ANSWER)
VALUES (SEQ_NOTICEBBS.NEXTVAL, 5, 'KOREA', 'SEOUL', SYSDATE, NULL, 0, 0);

SELECT * FROM aclapmember A, NOTICEBBS N
WHERE A.MEMNUM = N.MEMNUM;

SELECT NOTICENUM, N.MEMNUM AS MEMNUM, NTITLE, NCONTENT, WDATE, NIMG, DEL, ANSWER, A.USERNAME AS USERNAME, A.EMAIL AS EMAIL
FROM ACLAPMEMBER A, NOTICEBBS N
WHERE A.MEMNUM = N.MEMNUM;

SELECT NOTICENUM, N.MEMNUM AS MEMNUM, NTITLE, NCONTENT, WDATE, NIMG, DEL, ANSWER, A.USERNAME AS USERNAME, A.EMAIL AS EMAIL
FROM ACLAPMEMBER A, NOTICEBBS N
WHERE A.MEMNUM = N.MEMNUM and NOTICENUM=1;

SELECT NOTICENUM, MEMNUM, NTITLE, NCONTENT, WDATE, NIMG, DEL, ANSWER, USERNAME, EMAIL
FROM (select ROW_NUMBER()OVER(ORDER BY NOTICENUM ASC) AS RNUM, NOTICENUM, N.MEMNUM AS MEMNUM, NTITLE, NCONTENT, WDATE, NIMG, DEL, ANSWER, A.USERNAME AS USERNAME, A.EMAIL AS EMAIL 
from ACLAPMEMBER A, NOTICEBBS N
WHERE A.MEMNUM = N.MEMNUM 
order by NOTICENUM ASC) where RNUM BETWEEN 1 and 10
ORDER BY ANSWER ASC;

ALTER TABLE NOTICEBBS DROP COLUMN NIMG

select * from NOTICEBBS;

INSERT INTO NOTICEBBS (NOTICENUM, MEMNUM, NTITLE, NCONTENT, WDATE, DEL, ANSWER)
VALUES SEQ_NOTICEBBS, 1, '11111', '12312321', SYSDATE, 0, 0
---------------------------MYSTAMP TABLE--------------------------

DROP TABLE MYSTAMP
CASCADE CONSTRAINTS;

DROP SEQUENCE SEQ_MYSTAMP;

CREATE TABLE MYSTAMP(
    MYSTAMPNUM NUMBER PRIMARY KEY,
    MEMNUM NUMBER,
    CLASSNUM NUMBER,
    PRIMARYCATEGORY VARCHAR2(50) NOT NULL,
    SECONDARYCATEGORY VARCHAR2(200) NOT NULL,
    TITLE VARCHAR2(200) NOT NULL,
    FOREIGN KEY (MEMNUM) REFERENCES ACLAPMEMBER(MEMNUM),
    FOREIGN KEY (CLASSNUM) REFERENCES ONEDAYCLASS(CLASSNUM)
);


CREATE SEQUENCE SEQ_MYSTAMP
START WITH 1
INCREMENT BY 1;

SELECT * FROM MYSTAMP;
----------------------------------------------------


commit;


-----------날짜구하기--------------
--2)두 날짜 사이의 날짜 구하기
--STARTDATE == 220210525
--STARTDATE == SYSDATE
--ENDDATE == 20210628
--수업불가능한날 == 20210621

SELECT YMD FROM(
SELECT TO_DATE ('20210525', 'YYYYMMDD')+(LEVEL - 1) YMD
FROM DUAL
CONNECT BY TO_DATE ('20210525', 'YYYYMMDD')+(LEVEL-1) <=TO_DATE ('20210628', 'YYYYMMDD')) 
WHERE YMD != '20210621';


---------
SELECT YMD FROM(
SELECT TO_DATE ('20210525', 'YYYYMMDD')+(LEVEL - 1) YMD
FROM DUAL
CONNECT BY TO_DATE ('20210525', 'YYYYMMDD')+(LEVEL-1) <=TO_DATE ('20210628', 'YYYYMMDD')) 
WHERE YMD != '20210621' AND YMD != '20210531';

-- WHILE문 만들기랑.. 


select * from ONEDAYCLASS;
--마이클래스에서 내 클래스 뽑아오기
SELECT O.CLASSNUM AS CLASSNUM, O.TITLE AS TITLE, O.INSTRUCTOR AS INSTRUCTOR, O.INFORMATION AS INFORMATION, O.DURATION AS DURATION, O.LIMITNUM AS LIMITNUM, O.LIKECOUNT AS LIKECOUNT, 
AVGPOINT, O.STARTDATE AS STARTDATE, O.ENDDATE AS ENDDATE, O.LOCATION AS LOCATION, O.PRIMARYCATEGORY AS PRIMARYCATEGORY, O.SECONDARYCATEGORY AS SECONDARYCATEGORY, O.PRICE AS PRICE, 
O.IMAGE1 AS IMAGE1
FROM (SELECT R.CLASSNUM, AVG(STARPOINT) AS AVGPOINT
        FROM REVIEW R, ONEDAYCLASS O
        WHERE R.CLASSNUM = O.CLASSNUM AND R.MEMNUM != 1
        GROUP BY R.CLASSNUM) R, ONEDAYCLASS O
WHERE R.CLASSNUM = O.CLASSNUM AND O.MASTERNUM = 1
ORDER BY O.LIKECOUNT DESC 

--마이페이지에서 내클래스 참가자 뽑아오기
SELECT NAME, PRICE AS RPOINT, PAYDATE, CLASSDATE, CLASSNUM, MEMNUM, TITLE, PARTICIPANTS
FROM RECEIPT R, 
	(SELECT TITLE, CLASSNUM  FROM ONEDAYCLASS) O, 
	(SELECT PARTICIPANTS, CLASSNUM FROM SCHEDULE) S
WHERE R.CLASSNUM =1 AND R.CLASSNUM = O.CLASSNUM AND R.CLASSNUM = S.CLASSNUM

SELECT * FROM RECEIPT
SELECT * FROM SCHEDULE
SELECT * FROM SCHEDULE
