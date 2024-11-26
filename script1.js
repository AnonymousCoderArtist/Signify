document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const translateBtn = document.getElementById('translateBtn');
    const micBtn = document.getElementById('micBtn');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const signVideo = document.getElementById('signVideo');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');

    let recognition;
    let isListening = false;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            isListening = true;
            loadingIndicator.textContent = 'Listening...';
            loadingIndicator.style.display = 'block';
            textInput.placeholder = 'Listening...';
        };

        recognition.onresult = (event) => {
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
            textInput.value = finalTranscript || interimTranscript;
        };

        recognition.onend = () => {
            isListening = false;
            loadingIndicator.style.display = 'none';
            textInput.placeholder = 'Enter text to translate...';
            if (textInput.value.trim()) {
                handleTranslation();
            }
        };

        micBtn.addEventListener('click', () => {
            if (isListening) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                if (isListening) {
                    recognition.stop();
                } else {
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

    async function handleTranslation() {
        const text = textInput.value.trim();
        if (text) {
            loadingIndicator.style.display = 'block';
            videoPlaceholder.style.display = 'none';
            signVideo.style.display = 'none';
            errorMessage.style.display = 'none';

            try {
                console.log("Hit ho gyi API ");
                // const videoData = await eel.translate_to_asl(text)();
                // if (videoData) {
                //     signVideo.src = `data:video/mp4;base64,${videoData}`;
                //     signVideo.style.display = 'block';
                //     videoPlaceholder.style.display = 'none';
                // } else {
                //     throw new Error('Failed to generate video');
                // }
            } catch (error) {
                console.error('Error:', error);
                errorMessage.textContent = 'Error: Failed to generate video';
                errorMessage.style.display = 'block';
                videoPlaceholder.style.display = 'block';
                signVideo.style.display = 'none';
            } finally {
                loadingIndicator.style.display = 'none';
            }
        }
    }
});