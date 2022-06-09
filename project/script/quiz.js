document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.quiz-list').forEach((quiz_container) => {
      
      quiz_container.setAttribute('quiz-num', 1);
      quiz_container.setAttribute('point-get', '');
                  
      let quiz_count = 1;
    
      quiz_container.querySelectorAll('quiz').forEach((quiz_page) => {
           
        if (quiz_count > 1) quiz_page.style.display = 'none';
        quiz_page.setAttribute('page', quiz_count);
        quiz_count++;
      });

      quiz_container.querySelectorAll('#answer_li').forEach((answer_item) => {
        answer_item.onclick = (event) => {
          let quiz_page = event.target.closest('quiz');
          let quiz_container = quiz_page.parentNode;
          let next = Number(quiz_page.getAttribute('page')) + 1;
          let get_point = String(quiz_container.getAttribute('point-get'));
  
          if (event.target.hasAttribute('point')) {
            get_point += String(event.target.getAttribute('point'));
            quiz_container.setAttribute('point-get', get_point);
          }
          
          if ( next === quiz_count-1 ){
            
            console.log(get_point)

            let iCount = 0
            let nCount = 0
            let tCount = 0
            let jCount = 0

            for(let i=0; i<get_point.length; i++){
              console.log(get_point[i])
              switch(get_point[i]){

                case 'I' : iCount++; break;
                case 'N' : nCount++; break;
                case 'T' : tCount++; break;
                case 'J' : jCount++; break;
              }
            }

            console.log(iCount, nCount, tCount, jCount)

            get_point = ""
            
            get_point += iCount >= 2 ? "I" : "E";
            get_point += nCount >= 2 ? "N" : "S";
            get_point += tCount >= 2 ? "T" : "F";
            get_point += jCount >= 2 ? "J" : "P";
          }

          quiz_container.querySelectorAll('point').forEach((get_str) => {
            
            switch(get_point) {
              
              case "ESFP" : get_point = "<img src='images/esfp.png' width='40%'>"; break;
              case "ESFJ" : get_point = "<img src='images/esfj.png' width='40%'>"; break;
              case "ESTP" : get_point = "<img src='images/estp.png' width='40%'>"; break;
              case "ESTJ" : get_point = "<img src='images/estj.png' width='40%'>"; break;
              case "ENFP" : get_point = "<img src='images/enfp.png' width='40%'>"; break;
              case "ENFJ" : get_point = "<img src='images/enfj.png' width='40%'>"; break;
              case "ENTP" : get_point = "<img src='images/entp.png' width='40%'>"; break;
              case "ENTJ" : get_point = "<img src='images/entj.png' width='40%'>"; break;
              case "ESFP" : get_point = "<img src='images/esfp.png' width='40%'>"; break;
              case "ISFJ" : get_point = "<img src='images/isfj.png' width='40%'>"; break;
              case "ISTP" : get_point = "<img src='images/istp.png' width='40%'>"; break;
              case "ISTJ" : get_point = "<img src='images/istj.png' width='40%'>"; break;
              case "INFP" : get_point = "<img src='images/infp.png' width='40%'>"; break;
              case "INFJ" : get_point = "<img src='images/infj.png' width='40%'>"; break;
              case "INTP" : get_point = "<img src='images/intp.png' width='40%'>"; break;
              case "INTJ" : get_point = "<img src='images/intj.png' width='40%'>"; break;
            }

            get_str.innerHTML = get_point;
          });
                   
          quiz_page.style.display = 'none';
          quiz_container.querySelector(`quiz[page="${next}"]`).style.display = 'block';
          quiz_container.setAttribute('quiz-num', next);
        }
      });
    });
  });