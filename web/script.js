// document.addEventListener('DOMContentLoaded', () => {
//     const textInput = document.getElementById('textInput');
//     const languageSelect = document.getElementById('languageSelect');
//     const speechLanguageSelect = document.getElementById('speechLanguageSelect');
//     const translateBtn = document.getElementById('translateBtn');
//     const micBtn = document.getElementById('micBtn');
//     const videoPlaceholder = document.getElementById('videoPlaceholder');
//     const signVideo = document.getElementById('signVideo');
//     const loadingIndicator = document.getElementById('loadingIndicator');
//     const errorMessage = document.getElementById('errorMessage');

//     let recognition;
//     let isListening = false;

//     if ('webkitSpeechRecognition' in window) {
//         recognition = new webkitSpeechRecognition();
//         recognition.continuous = true;
//         recognition.interimResults = true;
//         recognition.lang = speechLanguageSelect.value; // Initialize with the default language

//         recognition.onstart = () => {
//             isListening = true;
//             loadingIndicator.textContent = 'Listening...';
//             loadingIndicator.style.display = 'block';
//             textInput.placeholder = 'Listening...';
//         };

//         recognition.onresult = async (event) => {
//             let interimTranscript = '';
//             let finalTranscript = '';

//             for (let i = 0; i < event.results.length; i++) {
//                 const transcript = event.results[i][0].transcript;
//                 if (event.results[i].isFinal) {
//                     finalTranscript += transcript;
//                 } else {
//                     interimTranscript += transcript;
//                 }
//             }

//             // Translate the recognized speech to English
//             const translatedText = await translateToEnglish(finalTranscript || interimTranscript);
//             textInput.value = translatedText;
//         };

//         recognition.onend = () => {
//             isListening = false;
//             loadingIndicator.textContent = 'Generating...'; // Set to "Generating..."
//             textInput.placeholder = 'Enter text to translate...';
//             if (textInput.value.trim()) {
//                 handleTranslation();
//             }
//         };

//         micBtn.addEventListener('click', () => {
//             if (isListening) {
//                 recognition.stop();
//             } else {
//                 recognition.lang = speechLanguageSelect.value; // Update the language
//                 recognition.start();
//             }
//         });

//         document.addEventListener('keydown', (event) => {
//             if (event.code === 'Space') {
//                 if (isListening) {
//                     recognition.stop();
//                 } else {
//                     recognition.lang = speechLanguageSelect.value; // Update the language
//                     recognition.start();
//                 }
//             }
//         });
//     } else {
//         micBtn.style.display = 'none';
//         errorMessage.textContent = 'Speech recognition is not supported in this browser.';
//         errorMessage.style.display = 'block';
//     }

//     translateBtn.addEventListener('click', () => {
//         handleTranslation();
//     });

//     async function handleTranslation() {
//         const text = textInput.value.trim();
//         const language = languageSelect.value;
//         if (text) {
//             loadingIndicator.style.display = 'block';
//             videoPlaceholder.style.display = 'none';
//             signVideo.style.display = 'none';
//             errorMessage.style.display = 'none';

//             try {
//                 const videoData = await eel.translate_to_asl(text, language)();
//                 if (videoData) {
//                     signVideo.src = `data:video/mp4;base64,${videoData}`;
//                     signVideo.style.display = 'block';
//                     videoPlaceholder.style.display = 'none';
//                 } else {
//                     throw new Error('Failed to generate video');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 errorMessage.textContent = 'Error: Failed to generate video';
//                 errorMessage.style.display = 'block';
//                 videoPlaceholder.style.display = 'block';
//                 signVideo.style.display = 'none';
//             } finally {
//                 loadingIndicator.style.display = 'none';
//                 textInput.value = ''; // Clear the input field after translation
//             }
//         }
//     }

//     async function translateToEnglish(text) {
//         const fromLanguage = speechLanguageSelect.value.split('-')[0]; // Extract language code
//         const url = `https://oevortex-webscout-api.hf.space/api/google_translate?q=${encodeURIComponent(text)}&from_=${fromLanguage}&to=en`;

//         try {
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'accept': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Translation API request failed');
//             }

//             const data = await response.json();
//             return data.translated;
//         } catch (error) {
//             console.error('Translation error:', error);
//             return text; // Return the original text if translation fails
//         }
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const languageSelect = document.getElementById('languageSelect');
    const speechLanguageSelect = document.getElementById('speechLanguageSelect');
    const translateBtn = document.getElementById('translateBtn');
    const micBtn = document.getElementById('micBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const signVideo = document.getElementById('signVideo');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const settingsModal = document.getElementById('settingsModal');
    const closeModal = document.getElementsByClassName('close')[0];

    let recognition;
    let isListening = false;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = speechLanguageSelect.value; // Initialize with the default language

        recognition.onstart = () => {
            isListening = true;
            loadingIndicator.textContent = 'Listening...';
            loadingIndicator.style.display = 'block';
            textInput.placeholder = 'Listening...';
        };

        recognition.onresult = async (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = 0; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            // Translate the recognized speech to English
            const translatedText = await translateToEnglish(finalTranscript || interimTranscript);
            textInput.value = translatedText;
        };

        recognition.onend = () => {
            isListening = false;
            loadingIndicator.textContent = 'Generating...'; // Set to "Generating..."
            textInput.placeholder = 'Enter text to translate...';
            if (textInput.value.trim()) {
                handleTranslation();
            }
        };

        micBtn.addEventListener('click', () => {
            if (isListening) {
                recognition.stop();
            } else {
                recognition.lang = speechLanguageSelect.value; // Update the language
                recognition.start();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                if (isListening) {
                    recognition.stop();
                } else {
                    recognition.lang = speechLanguageSelect.value; // Update the language
                    recognition.start();
                }
            }
        });
    } else {
        micBtn.style.display = 'none';
        errorMessage.textContent = 'Speech recognition is not supported in this browser.';
        errorMessage.style.display = 'block';
    }

    translateBtn.addEventListener('click', () => {
        handleTranslation();
    });

    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    async function handleTranslation() {
        const text = textInput.value.trim();
        const language = languageSelect.value;
        if (text) {
            loadingIndicator.style.display = 'block';
            videoPlaceholder.style.display = 'none';
            signVideo.style.display = 'none';
            errorMessage.style.display = 'none';

            try {
                const videoData = await eel.translate_to_asl(text, language)();
                if (videoData) {
                    signVideo.src = `data:video/mp4;base64,${videoData}`;
                    signVideo.style.display = 'block';
                    videoPlaceholder.style.display = 'none';
                } else {
                    throw new Error('Failed to generate video');
                }
            } catch (error) {
                console.error('Error:', error);
                errorMessage.textContent = 'Error: Failed to generate video';
                errorMessage.style.display = 'block';
                videoPlaceholder.style.display = 'block';
                signVideo.style.display = 'none';
            } finally {
                loadingIndicator.style.display = 'none';
                textInput.value = ''; // Clear the input field after translation
            }
        }
    }

    async function translateToEnglish(text) {
            const fromLanguage = speechLanguageSelect.value.split('-')[0]; // Extract language code
            const url = `https://oevortex-webscout-api.hf.space/api/google_translate?q=${encodeURIComponent(text)}&from_=${fromLanguage}&to=en`;
    
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Translation API request failed');
                }
    
                const data = await response.json();
                return data.translated;
            } catch (error) {
                console.error('Translation error:', error);
                return text; // Return the original text if translation fails
            }
        }
});