import { SPEECH_RECOGNITION_LANG } from '../utils/constants';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const speechService = {
  isSupported: () => !!SpeechRecognition,

  startListening: (onResult, onError, onEnd) => {
    if (!SpeechRecognition) {
      onError(new Error('Speech Recognition not supported'));
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = SPEECH_RECOGNITION_LANG;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log('Speech recognition started');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      onResult({
        interim: interimTranscript,
        final: finalTranscript,
        isFinal: event.results[event.results.length - 1]?.isFinal
      });
    };

    recognition.onerror = (event) => {
      // Ignore routine non-critical speech errors (like silence or manual stops)
      if (typeof event.error === 'string' && (event.error === 'aborted' || event.error === 'no-speech')) {
        return;
      }
      onError(new Error(`Speech recognition error: ${event.error}`));
    };

    recognition.onend = () => {
      onEnd();
    };

    recognition.start();
    return recognition;
  },

  stopListening: (recognition) => {
    if (recognition) {
      recognition.stop();
    }
  },

  abortListening: (recognition) => {
    if (recognition) {
      recognition.abort();
    }
  }
};

export default speechService;
