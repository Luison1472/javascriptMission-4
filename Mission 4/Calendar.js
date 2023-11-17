 window.onload = function () { buildCalendar(); }    // 웹 페이지가 로드되면 buildCalendar 실행

        let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
        let today = new Date();     // 페이지를 로드한 날짜를 저장
        
        today.setHours(0, 0, 0, 0);    //today 시간 초기화
        const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
        ];


        // 달력 생성 해당 달에 맞춰 테이블,날짜 작성
        function buildCalendar() {

            let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
            let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날
            
            
            let tbody_Calendar = document.querySelector(".Calendar > tbody");
           document.getElementById("calMonth").innerText = monthNames[nowMonth.getMonth()];
            document.getElementById("calYear").innerText = nowMonth.getFullYear();
            calMonth.style.color = "#fff";
            calYear.style.color = "#fff";

            //클릭했을 때 달력이 나오도록
            document.getElementById("datepicker").addEventListener("click", function() {
                document.getElementById("calendar-container").style.display = "block";
                    });

            while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
                tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
            }

            let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

            for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
                let nowColumn = nowRow.insertCell();        // 열 추가
            }

            // 날짜를 클릭했을 때 input에 입력
            function choiceDate(nowColumn) {
                let chosenDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), nowColumn.innerText);
                    chosenDate.setHours(0, 0, 0, 0);
                let formattedDate = chosenDate.getFullYear() + '-' + leftPad(chosenDate.getMonth() + 1) + '-' + leftPad(chosenDate.getDate());
                    document.getElementById("datepicker").value = formattedDate;

                if (document.getElementsByClassName("choiceDay")[0]) {
                 document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");
                 }
                nowColumn.classList.add("choiceDay");
                document.getElementById("calendar-container").style.display = "none";
                }

            for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

                let nowColumn = nowRow.insertCell();        // 새 열을 추가하고
                nowColumn.innerText = leftPad(nowDay.getDate());      // 추가한 열에 날짜 입력

            
                if (nowDay.getDay() == 0) {                 // 일요일인 경우 글자색 빨강으로
                    nowColumn.style.color = "#DC143C";
                }
                if (nowDay.getDay() == 6) {                
                    nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
                }


                if (nowDay < today) {                       // 지난날인 경우
                    nowColumn.className = "pastDay";
                }
                else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
                    nowColumn.className = "today";
                    nowColumn.onclick = function () { choiceDate(this); }
                }
                else {                                      // 미래인 경우
                    nowColumn.className = "futureDay";
                    nowColumn.onclick = function () { choiceDate(this); }
                }
            }
        }
        


        
        // 날짜 선택
        function choiceDate(nowColumn) {
            if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
                document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
            }
            nowColumn.classList.add("choiceDay");           // 선택된 날짜에 "choiceDay" class 추가
        }
        

        // 이전달 버튼 클릭
        function prevCalendar() {
            nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
            buildCalendar();    // 달력 다시 생성
        }
        // 다음달 버튼 클릭
        function nextCalendar() {
            nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
            buildCalendar();    // 달력 다시 생성
        }

        // input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
        function leftPad(value) {
            if (value < 10) {
                value = "0" + value;
                return value;
            }
            return value;
        }
