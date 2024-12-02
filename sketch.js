let font; // 폰트 로드

let state = 'warning'; // 경고 문구
let warningImage, openingImage;
let startButton;
let startTime;
let buttonX, buttonY, buttonWidth, buttonHeight; // start버튼 위치 및 크기

// 타이핑 관련 변수
let currentSentenceIndex = 0; // 현재 문장의 인덱스
let currentText = ''; // 현재 타이핑된 텍스트
let textIndex = 0; // 현재 문장에서 타이핑 중인 위치
let typingSpeed = 80; // 타이핑 속도 (밀리초 단위)
let lastTypedTime = 0; // 마지막으로 타이핑된 시간 기록
let maxWidth = 700; // 텍스트가 넘어설 최대 너비
let progress = 0; // 진행 상황 변수

let kimkoo;
let mission1;

// 토크박스 위치와 크기
let talkX = 110;
let talkY = 420;
let talkW = 850;
let talkH = 240;
let textBoxImg;

//토크박스 내 텍스트 위치와 크기
let textX = talkX + 60;
let textY = talkY + 100;
let textS = 20;

let inputBox;
let correctAnswer = '보성사';
let showAnswerMessage = false; // 정답 메시지 표시 여부
let answerMessageStartTime; // 정답 메시지 표시 시작 시간

function preload() {
  font = loadFont('/assets/DungGeunMo.otf');
  warningImage = loadImage('/assets/BGwarning.jpg');
  openingImage = loadImage('/assets/BGopening.jpg');
  startButton = loadImage('/assets/startButton.png');

  kimkoo = loadImage('/assets/kimkoo.png');
  textBoxImg = loadImage('/assets/textBox.png');
  mission1 = loadImage('/assets/mission 1.png');
}

function setup() {
  createCanvas(1000, 600);
  startTime = millis(); // 프로그램 시작 시간 기록

  // startButton 기본 설정
  buttonX = width / 2;
  buttonY = height / 2 + 235;
  buttonWidth = 90;
  buttonHeight = 33;

  // 입력 창 생성
  inputBox = createInput('');
  inputBox.position(width / 2 - 100, height / 2 + 250);
  inputBox.size(200, 30);
  inputBox.hide(); // 초기에는 숨김 처리
}

function draw() {
  background(0);

  if (state === 'warning') {
    displayWarning(); // 경고 화면 표시
  } else if (state === 'start') {
    displayStart(); // 시작 화면 표시
  } else if (state === 'opening') {
    displayOpening(); // 오프닝 화면 표시
  } else if (state === 'loading') {
    displayLoadingScreen(); // 로딩 화면 표시
  } else if (state === 'stage1') {
    displayStage1(); // 1단계 화면 표시
  } else if (state === 'loadBosung') {
    displayLoadBosung(); // 2단계 로딩 화면 표시
  } else if (state === 'stage2') {
    displayStage2();
  }
}

function displayWarning() {
  image(warningImage, 0, 0, width, height); // 경고 이미지
  if (millis() - startTime > 5000) {
    // 5초 후 오프닝 화면으로 전환
    state = 'start';
  }
}

function displayStart() {
  image(openingImage, 0, 0, width, height);
  drawStartButton();
}

function drawStartButton() {
  push();
  imageMode(CENTER);
  image(startButton, buttonX, buttonY, buttonWidth, buttonHeight); // 버튼 아이콘

  // 마우스가 버튼 위에 있을 떄 크기 증가
  if (
    mouseX >= buttonX - buttonWidth / 2 &&
    mouseX <= buttonX + buttonWidth / 2 &&
    mouseY >= buttonY - buttonHeight / 2 &&
    mouseY <= buttonY + buttonHeight / 2
  ) {
    image(
      startButton,
      buttonX - 5,
      buttonY - 5,
      buttonWidth + 10,
      buttonHeight + 10
    );
  }
  pop();
}

function mouseClicked() {
  if (
    mouseX > buttonX - buttonWidth / 2 &&
    mouseX < buttonX + buttonWidth / 2 &&
    mouseY > buttonY - buttonHeight / 2 &&
    mouseY < buttonY + buttonHeight
  ) {
    state = 'opening'; // 버튼 클릭 시 게임 시작
  }
}

function displayOpening() {
  background(0);

  // 오프닝 문구
  let openingText = [
    '1919년 1월, 천도교, 기독교 등 각 종교 지도자들은 경성과 서북지방을 중심으로 독립선언을 준비하였다.',
    '2월 중순부터 두 세력은 서로 연대하여 불교계와 학생들을 준비활동에 끌어들이고, 독립선언서를 제작, 배포함으로써 3월 1일부터 전국 각지에서 독립선언과 만세시위를 일으킬 계획이다.',
    '모든 미션을 완수하여 성공적으로 독립운동을 진행하여라.',
    '그럼, 행운을 빈다.',
  ];

  textFont(font); // 로드한 폰트 사용
  textAlign(CENTER, TOP); // 텍스트 정렬 설정
  fill(255); // 흰색 텍스트 색상
  textSize(20);

  // 현재 문장의 모든 글자가 타이핑되었는지 확인
  if (textIndex < openingText[currentSentenceIndex].length) {
    if (millis() - lastTypedTime > typingSpeed) {
      // 일정 시간 간격으로 글자를 추가
      currentText += openingText[currentSentenceIndex].charAt(textIndex);
      textIndex++;
      lastTypedTime = millis(); // 마지막 타이핑된 시간 기록
    }
  } else {
    // 현재 문장이 끝났으면 다음 문장으로 넘어감
    if (
      currentSentenceIndex < openingText.length - 1 &&
      millis() - lastTypedTime > 1000
    ) {
      currentSentenceIndex++; // 다음 문장으로 넘어감
      currentText = ''; // 현재 문장 초기화
      textIndex = 0; // 텍스트 인덱스 초기화
      lastTypedTime = millis(); // 다음 문장 타이핑 시작 시간 기록
    } else if (
      currentSentenceIndex === openingText.length - 1 &&
      millis() - lastTypedTime > 3000
    ) {
      currentSentenceIndex = 0; // 초기화
      currentText = ''; // 초기화
      textIndex = 0; // 초기화
      state = 'loading'; // 마지막 문장 출력 후 로딩 화면으로 전환
    }
  }

  // 단어 단위로 텍스트 줄 바꿈 (한글 잘림 허용 x)
  let words = currentText.split(' '); // 공백 기준으로 단어 분리
  let line = ''; // 한 줄에 작성할 텍스트
  let y = (height - openingText.length * 20) / 2; // 첫 번째 줄의 y좌표

  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' '; // 현재 줄에 단어를 추가
    let testWidth = textWidth(testLine); // 텍스트 너비 계산

    // 현재 줄 너비 초과시 줄 바꿈
    if (testWidth > maxWidth) {
      // 줄이 최대 너비를 초과하면
      text(line, width / 2, y); // 이전 줄 출력
      line = words[i] + ' '; // 다음 줄에 현재 단어로 시작
      y += 40; // 줄 바꿈 간격
    } else {
      line = testLine; // 줄이 넘치지 않으면 단어를 이어서 추가
    }
  }
  // 마지막 줄 출력
  text(line, width / 2, y);
}

function displayLoadingScreen() {
  background(0);
  fill(255);
  textAlign(CENTER, TOP);
  textSize(20);
  textFont(font);

  let loadingText =
    '“네 소원이 무엇이냐 하고 하느님이 내게 물으시면, 나는 서슴지 않고 ‘내 소원은 대한 독립이오.’하고 대답할 것이오. 또 그다음 소원이 무엇이냐 하는 두 번째 물음에도, 나는 더욱 소리를 높여서 ‘나의 소원은 우리나라 대한의 완전한 자주독립이오.’하고 대답할 것이외다.”';
  let x = width / 2; // 텍스트 시작 X 좌표
  let y = height / 2 - 100; // 텍스트 시작 Y 좌표
  let lineSpacing = 40; // 줄 간격

  let words = loadingText.split(' ');
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    let testLine = currentLine + words[i] + ' ';
    let testWidth = textWidth(testLine);

    if (testWidth > maxWidth) {
      text(currentLine, x, y);
      currentLine = words[i] + ' ';
      y += lineSpacing;
    } else {
      currentLine = testLine;
    }
  }

  text(currentLine, x, y);

  // 상태바
  let barWidth = width * 0.7;
  let barHeight = 20;
  let barX = (width - barWidth) / 2 - 20;
  let barY = height - 100;

  fill(255);
  rect(barX, barY, barWidth, barHeight);

  fill(0, 255, 0);
  rect(barX, barY, barWidth * (progress / 100), barHeight);

  fill(255);
  textAlign(RIGHT, CENTER);
  textSize(18);
  text(`${progress.toFixed(0)}%`, barX + barWidth + 40, barY + barHeight / 2);

  if (progress < 100) {
    progress += 0.5; // 로딩 속도 조절
  } else {
    state = 'stage1'; // 로딩 완료 시 게임 화면으로 전환
  }
}

function displayStage1() {
  background(0);

  if (currentSentenceIndex < 5) {
    // 김구 이미지 표시
    imageMode(CENTER);
    image(kimkoo, width / 2, height / 2, 440, 560);

    imageMode(CORNER);
    let adjustedTalkX = (width - talkW) / 2; // 중앙 정렬
    image(textBoxImg, adjustedTalkX, talkY, talkW, talkH);

    let kimkooText = [
      '1919년 2월 최남선이 기초한 독립선언서가 신문관에서 조판된 뒤 인쇄소로 넘겨졌네.',
      '금일 오후 6시부터 사장 이종일은 공장감독 김홍규, 총무 장효근과 함께 극비리에 독립선언서 인쇄를 완료한 상태네.',
      '자네가 인쇄소에 가서 인쇄된 독립선언서를 찾아 무사히 독립운동이 진행될 수 있도록 전달하세.',
      '인쇄소의 위치는 다음 신문에 나와있네.',
      '그럼, 잘 부탁하네.',
    ];

    textFont(font);
    textAlign(LEFT, TOP);
    fill(0);
    textSize(textS);

    // 타이핑 효과
    if (textIndex < kimkooText[currentSentenceIndex].length) {
      if (millis() - lastTypedTime > typingSpeed) {
        currentText += kimkooText[currentSentenceIndex].charAt(textIndex);
        textIndex++;
        lastTypedTime = millis();
      }
    } else {
      // 한 문장이 끝나면 다음 문장으로
      if (
        currentSentenceIndex < kimkooText.length - 1 &&
        millis() - lastTypedTime > 1000
      ) {
        currentSentenceIndex++;
        currentText = '';
        textIndex = 0;
        lastTypedTime = millis();
      } else if (
        currentSentenceIndex === kimkooText.length - 1 &&
        millis() - lastTypedTime > 3000
      ) {
        // 모든 문장 출력 후 미션 화면으로 전환
        currentSentenceIndex++; // 다음 단계로 진행
        inputBox.show(); // 입력 창 표시
      }
    }

    // 텍스트 줄 바꿈 처리
    let words = currentText.split(' ');
    let line = '';
    let y = textY;

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      let testWidth = textWidth(testLine);

      if (testWidth > talkW - 120) {
        // 토크박스 너비 제한
        text(line, textX, y);
        line = words[i] + ' ';
        y += textS + 10;
      } else {
        line = testLine;
      }
    }

    text(line, textX, y); // 마지막 줄 출력
  } else {
    // 미션 화면
    background(0);

    textFont(font);
    textSize(24);
    fill(255);
    textAlign(CENTER, TOP);
    text(
      '미션 1 : 다음 신문에서 독립선언서가 인쇄되어 있는 장소를 찾아 올바르게 입력하시오.',
      width / 2,
      50
    );

    imageMode(CENTER);
    image(mission1, width / 2, height / 2, 600, 420);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    // Enter 키를 눌렀을 때만 실행
    let userInput = inputBox.value().trim();
    if (userInput === correctAnswer) {
      progress = 0;
      inputBox.hide(); // 입력 창 숨기기
      state = 'loadBosung';
    }
  }
}

function displayLoadBosung() {
  background(0);
  fill(255);
  textAlign(CENTER, TOP);
  textSize(20);
  textFont(font);

  let loadingText =
    '보성사는 1919년 2월 27일에 <기미독립선언서>를 인쇄했던 곳이다.';
  let x = width / 2; // 텍스트 시작 X 좌표
  let y = height / 2 - 100; // 텍스트 시작 Y 좌표
  let lineSpacing = 40; // 줄 간격

  let words = loadingText.split(' ');
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    let testLine = currentLine + words[i] + ' ';
    let testWidth = textWidth(testLine);

    if (testWidth > maxWidth) {
      text(currentLine, x, y);
      currentLine = words[i] + ' ';
      y += lineSpacing;
    } else {
      currentLine = testLine;
    }
  }

  text(currentLine, x, y);

  // 상태바
  let barWidth = width * 0.7;
  let barHeight = 20;
  let barX = (width - barWidth) / 2 - 20;
  let barY = height - 100;

  fill(255);
  rect(barX, barY, barWidth, barHeight);

  fill(0, 255, 0);
  rect(barX, barY, barWidth * (progress / 100), barHeight);

  fill(255);
  textAlign(RIGHT, CENTER);
  textSize(18);
  text(`${progress.toFixed(0)}%`, barX + barWidth + 40, barY + barHeight / 2);

  if (progress < 100) {
    progress += 0.5; // 로딩 속도 조절
  } else {
    state = 'stage2'; // 로딩 완료 시 게임 화면으로 전환
  }
}
