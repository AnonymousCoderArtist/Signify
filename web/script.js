document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const translateBtn = document.getElementById('translateBtn');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const signVideo = document.getElementById('signVideo');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');

    translateBtn.addEventListener('click', async () => {
        const text = textInput.value.trim();
        if (text) {
            loadingIndicator.style.display = 'block';
            videoPlaceholder.style.display = 'none';
            signVideo.style.display = 'none';
            errorMessage.style.display = 'none';

            try {
                const videoData = await eel.translate_to_asl(text)();
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
            }
        }
    });
});