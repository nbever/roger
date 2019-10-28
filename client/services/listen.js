export const listen = (callback) => {
  const recog = new webkitSpeechRecognition();
  recog.continuous = true;
  recog.interimResults = true;
  recog.lang = 'en-US';
  recog.start();
  console.log('Listening...');

  let currentError = null;

  recog.onend = () => {
    if (currentError !== null && currentError === 'no-speech') {
      recog.start();
    }
  };

  recog.onerror = ($e) => {
    console.log($e.error);
    currentError = $e.error;
  };

  recog.onresult = (event) => {
    currentError = 'no-speech';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        callback(event.results[i][0].transcript.trim());
      }
    }
  };

  recog.shutdown = () => {
    currentError = null;
    recog.stop();
  }

  return recog;
};
//
// var recognition = new webkitSpeechRecognition();
// recognition.continuous = true;
// recognition.interimResults = true;
// recognition.lang = "en-US";
// recognition.continuous = true;
// recognition.start();
//
// const addResult = function(text) {
//   const newElement = document.createElement('div');
//   newElement.innerText = text;
//   resultElem.appendChild(newElement);
// };
//
// recognition.onresult = function(event) {
//   for (var i = event.resultIndex; i < event.results.length; ++i) {
//
//     if (event.results[i].isFinal) {
//
//       const rez = event.results[i][0].transcript.trim();
//
//       console.info(`You said : ${rez}`);
//       addResult(rez);
//     }
//   }
// };
