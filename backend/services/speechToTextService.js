const axios = require('axios');

const speechToTextService = {
  convertAudioToText: async (audioBuffer, language = 'en-US') => {
    try {
      // Using Google Cloud Speech-to-Text API or Azure
      // This is a template implementation
      
      const apiKey = process.env.GOOGLE_CLOUD_SPEECH_KEY;
      
      if (!apiKey) {
        throw new Error('Speech-to-Text API key not configured');
      }

      const response = await axios.post(
        `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
        {
          config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: language,
            enableAutomaticPunctuation: true
          },
          audio: {
            content: audioBuffer.toString('base64')
          }
        }
      );

      if (response.data.results && response.data.results.length > 0) {
        let fullTranscript = '';
        response.data.results.forEach(result => {
          result.alternatives.forEach(alternative => {
            fullTranscript += alternative.transcript + ' ';
          });
        });
        return fullTranscript.trim();
      }

      return '';

    } catch (error) {
      console.error('Error converting speech to text:', error);
      throw error;
    }
  }
};

module.exports = speechToTextService;
