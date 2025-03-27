document.addEventListener('DOMContentLoaded', () => {
    console.log('Sarablood project loaded!');
    
    let currentLang = 'th';
    
    let userAnswers = [];
    
    let currentQuestion = 1;
    
    updateUI();
    
    document.getElementById('th-lang').addEventListener('click', () => changeLanguage('th'));
    document.getElementById('en-lang').addEventListener('click', () => changeLanguage('en'));
    
    document.getElementById('prev-btn').addEventListener('click', previousQuestion);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    
    const restartBtnTh = document.getElementById('restart-btn');
    const restartBtnEn = document.getElementById('restart-btn-en');
    
    if (restartBtnTh) {
      restartBtnTh.addEventListener('click', restart);
    }
    
    if (restartBtnEn) {
      restartBtnEn.addEventListener('click', restart);
    }
    
    document.querySelectorAll('.option').forEach(option => {
      option.addEventListener('click', function() {
        const answerText = this.textContent.trim();
        userAnswers[currentQuestion - 1] = answerText;
        
        document.getElementById('next-btn').disabled = false;
        document.getElementById('next-btn').classList.remove('opacity-50', 'cursor-not-allowed');
        
        document.querySelectorAll(`#question-${currentQuestion}-${currentLang} .option`).forEach(opt => {
          opt.classList.remove('bg-blue-300', 'font-bold');
        });
        this.classList.add('bg-blue-300', 'font-bold');
      });
    });
    
    function changeLanguage(lang) {
      currentLang = lang;
      
      document.getElementById('th-lang').className = lang === 'th' ? 
        'px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 transition' : 
        'px-2 py-1 bg-gray-300 rounded mr-2 hover:bg-gray-400 transition';
      document.getElementById('en-lang').className = lang === 'en' ? 
        'px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition' : 
        'px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition';
      
      updateUI();
      
      const prevBtn = document.getElementById('prev-btn');
      const nextBtn = document.getElementById('next-btn');
      const alarmText = document.getElementById('alarm-text');
      
      if (prevBtn) {
        prevBtn.textContent = lang === 'th' ? 'ย้อนกลับ' : 'Back';
      }
      
      if (nextBtn) {
        nextBtn.textContent = lang === 'th' ? 'ถัดไป' : 'Next';
      }
      
      if (alarmText) {
        alarmText.textContent = lang === 'th' ? 'นาฬิกาปลุกของคุณส่งเสียงดัง' : 'Your alarm clock rings loudly';
      }
    }
    
    function previousQuestion() {
      if (currentQuestion > 1) {
        currentQuestion--;
        updateUI();
      }
    }
    
    function nextQuestion() {
      if (currentQuestion < 5) {
        currentQuestion++;
        updateUI();
      } else {
        showResult();
      }
    }
    
    function updateUI() {
      const bgList = ["url('images/bed.jpg')", "url('images/bed.jpg')", "url('images/bed.jpg')",
                      "url('images/hospital-hall.jpg')",
                      "url('images/hospital-bed.jpg')",
                      "url('images/sky.jpg')"]
      document.body.style.backgroundImage = bgList[currentQuestion];

      if (currentQuestion < 3) {
        console.log("see");
        document.body.querySelector(".clock").classList.remove("hidden");
      } else {
        console.log("unsee");
        document.body.querySelector(".clock").classList.add("hidden");
      }
      
      // ซ่อนทุกคำถามในทั้งสองภาษา
      for (let i = 1; i <= 5; i++) {
        const thQuestion = document.getElementById(`question-${i}-th`);
        const enQuestion = document.getElementById(`question-${i}-en`);
        
        if (thQuestion) thQuestion.classList.add('hidden');
        if (enQuestion) enQuestion.classList.add('hidden');
      }
      
      const resultTh = document.getElementById('result-th');
      const resultEn = document.getElementById('result-en');
      
      if (resultTh) resultTh.classList.add('hidden');
      if (resultEn) resultEn.classList.add('hidden');
      
      const currentQuestionElement = document.getElementById(`question-${currentQuestion}-${currentLang}`);
      if (currentQuestionElement) {
        currentQuestionElement.classList.remove('hidden');
        currentQuestionElement.classList.add('animate__animated', 'animate__fadeIn');
      }
      
      
      const prevBtn = document.getElementById('prev-btn');
      if (prevBtn) {
        if (currentQuestion === 1) {
          prevBtn.disabled = true;
          prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          prevBtn.disabled = false;
          prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }
      
      const nextBtn = document.getElementById('next-btn');
      if (nextBtn) {
        if (userAnswers[currentQuestion - 1]) {
          nextBtn.disabled = false;
          nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
          nextBtn.disabled = true;
          nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
      }
      
      if (userAnswers[currentQuestion - 1]) {
        const options = document.querySelectorAll(`#question-${currentQuestion}-${currentLang} .option`);
        options.forEach(option => {
          if (option.textContent.trim().startsWith(userAnswers[currentQuestion - 1].substring(0, 5))) {
            option.classList.add('bg-blue-300', 'font-bold');
          }
        });
      }
    }
    
    function showResult() {
      console.log("show");
      for (let i = 1; i <= 5; i++) {
        const thQuestion = document.getElementById(`question-${i}-th`);
        const enQuestion = document.getElementById(`question-${i}-en`);
        
        if (thQuestion) thQuestion.classList.add('hidden');
        if (enQuestion) enQuestion.classList.add('hidden');
      }
      
      const bloodType = calculateBloodType();
      
      const resultElement = document.getElementById(`result-${currentLang}`);
      if (resultElement) {
        resultElement.classList.remove('hidden');
        resultElement.classList.add('animate__animated', 'animate__fadeIn');
      }
      
      let bloodTypeResultElement;
      
      if (currentLang === 'th') {
        bloodTypeResultElement = document.getElementById('blood-type-result');
      } else {
        bloodTypeResultElement = document.getElementById('blood-type-result-en');
      }
      
      if (bloodTypeResultElement) {
        bloodTypeResultElement.textContent = bloodType;
      }
      
      const prevBtn = document.getElementById('prev-btn');
      const nextBtn = document.getElementById('next-btn');
      const questionCounter = document.querySelector('.text-center.font-medium');
      
      if (prevBtn) prevBtn.classList.add('hidden');
      if (nextBtn) nextBtn.classList.add('hidden');
      if (questionCounter) questionCounter.classList.add('hidden');
    }
    
    function calculateBloodType() {
      console.log("calculate");
      let scores = { A: 0, B: 0, O: 0, AB: 0 };
      
      const answerMap = {
        th: {
          q1: {
            "1. แน่นอน!": ['A', 'AB'],
            "2. ลองเลื่อนโทรศัพท์ซักพักค่อยคิดแล้วกัน": ['B', 'O']
          },
          q2: {
            "1. ใจเย็นๆ เราจะสติหลุดตอนนี้ไม่ได้": ['A'],
            "2. จะต้องรีบไปโรงพยาบาล อย่างอื่นช่างมันก่อนแล้วกัน": ['B'],
            "3. ไปแล้วเราจะช่วยอะไรได้ สิ่งที่ต้องทำใช่ไปโรงพยาบาลจริงเหรอ": ['O'],
            "4. มีข้อมูลอะไรที่ต้องถามเพื่อนเพิ่มไหมนะ": ['AB']
          },
          q3: {
            "1. เดี๋ยวผม/หนู เรียกพยาบาลให้นะครับ/คะ คุณยาย": ['A'],
            "2. ได้เลยครับ/ค่ะ!": ['B'],
            "3. ขอโทษนะครับ/คะ พอดีกำลังรีบ": ['O'],
            "4. ไม่สะดวกจริงๆครับ/ค่ะ พอดีเพื่อนเพึ่งถูกรถชน ขอไปหาเพื่อนก่อนนะครับ/คะ": ['AB']
          },
          q4: {
            "1. บริจาคด้วยตัวเองเลยสิ!": ['B'],
            "2. ไปถามข้อมูลจากคุณหมอให้รอบคอบ ก่อนจะทำอะไร": ['A'],
            "3. พยายามลงโพสต์ในโซเชียลต่างๆ": ['O', 'AB']
          },
          q5: {
            "1. ไม่เอาอะไรไป เพราะไม่แน่ใจว่าเพื่อนกินอะไรได้บ้าง": ['O'],
            "2. ถามเพื่อนว่าอยากกินอะไร": ['A'],
            "3. ทุกอย่างที่คิดออก ผลไม้ น้ำ เกม": ['AB'],
            "4. ของที่เพื่อนชอบ เกม หนังสือการ์ตูน เผื่อจะได้คุยเล่นกัน": ['B']
          }
        },
        en: {
          q1: {
            "1. Of course!": ['A', 'AB'],
            "2. Let me scroll on my phone for a bit before deciding": ['B', 'O']
          },
          q2: {
            "1. Stay calm, I can't lose my composure now": ['A'],
            "2. I need to rush to the hospital, everything else can wait": ['B'],
            "3. What could I really do there? Is going to the hospital really necessary?": ['O'],
            "4. Is there any additional information I should ask my friend?": ['AB']
          },
          q3: {
            "1. Let me call a nurse for you, ma'am": ['A'],
            "2. Of course, I'll help you!": ['B'],
            "3. I'm sorry, I'm in a hurry": ['O'],
            "4. I really can't right now. My friend was just in a car accident, I need to find them first": ['AB']
          },
          q4: {
            "1. I'll donate myself right away!": ['B'],
            "2. I'll consult with the doctor thoroughly before doing anything": ['A'],
            "3. I'll try posting on various social media platforms": ['O', 'AB']
          },
          q5: {
            "1. Nothing, because I'm not sure what they can eat": ['O'],
            "2. I'll ask them what they want to eat": ['A'],
            "3. Everything I can think of - fruits, water, games": ['AB'],
            "4. Things they like - games, comics, so we can chat together": ['B']
          }
        }
      };
      
      userAnswers.forEach((answer, index) => {
        if (!answer) return;
        
        const questionMap = answerMap[currentLang][`q${index + 1}`];
        
        for (const [key, bloodTypes] of Object.entries(questionMap)) {
          if (answer.startsWith(key.substring(0, 5))) {
            bloodTypes.forEach(type => scores[type]++);
            break;
          }
        }
      });
      
      const maxScore = Math.max(scores.A, scores.B, scores.O, scores.AB);
      
      const potentialTypes = [];
      if (scores.A === maxScore) {
        potentialTypes.push("A");
      } else if (scores.B === maxScore) {
        potentialTypes.push("B");
      } else if (scores.O === maxScore) {
        potentialTypes.push("O");
      } else if (scores.AB === maxScore) {
        potentialTypes.push("AB");
      }
      return potentialTypes[Math.floor(Math.random() * potentialTypes.length)];
    }
    
    // ฟังก์ชันเริ่มเกมใหม่
    function restart() {
      console.log('restart');
      currentQuestion = 1;
      userAnswers = [];
      
      const resultTh = document.getElementById('result-th');
      const resultEn = document.getElementById('result-en');
      
      if (resultTh) resultTh.classList.add('hidden');
      if (resultEn) resultEn.classList.add('hidden');
      const prevBtn = document.getElementById('prev-btn');
      const nextBtn = document.getElementById('next-btn');
      const questionCounter = document.querySelector('.text-center.font-medium');
      
      if (prevBtn) prevBtn.classList.remove('hidden');
      if (nextBtn) nextBtn.classList.remove('hidden');
      if (questionCounter) questionCounter.classList.remove('hidden');
      
      updateUI();
    }
  });