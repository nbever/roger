const resultElem = document.getElementById('results');

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
recognition.continuous = true;
recognition.start();

const addResult = function(text) {
  const newElement = document.createElement('div');
  newElement.innerText = text;
  resultElem.appendChild(newElement);
};

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {

    if (event.results[i].isFinal) {

      const rez = event.results[i][0].transcript.trim();

      console.info(`You said : ${rez}`);
      addResult(rez);
    }
  }
};
