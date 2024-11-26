# Signify: 🤝 Bridging the Communication Gap for the Deaf Community ✨

Signify is a real-time sign language translation platform, leveraging AI to empower the deaf community.  This project offers text-to-sign language translation and is currently under development to include sign language-to-text functionality.  Let's make communication more accessible! 🎉


## Project Overview

Millions in India face significant communication barriers due to a lack of certified sign language interpreters.  😢 Signify addresses this critical need by providing a user-friendly platform for seamless translation between spoken and signed languages.  This project aims to foster understanding and inclusion. 🤗

**Key Features:**

* **Text-to-Sign Language Conversion:**  Translates typed text into expressive animated sign language videos.  Currently supports multiple languages.  (See supported languages below). 👍
* **Speech-to-Sign Language Conversion (In Development):**  Coming soon! 🎤 This feature will offer real-time transcription of spoken language into sign language.
* **Intuitive User Interface:**  A clean and easy-to-use design for optimal accessibility.  Designed with user experience in mind! 🧑‍💻
* **Multiple Language Support:** Offers a wide selection of sign languages. 🌎


**Technology Stack:**

* **Frontend:** HTML, CSS, JavaScript (with particles.js for visual effects) ✨
* **Backend:** Python (using Eel for Javascript-Python communication and Playwright for web automation) 🐍
* **Sign Language Data:**  Utilizes data from sign.mt (a third-party sign language translation service). Note:  This project relies on external APIs, and limitations of these APIs will affect Signify's capabilities.


**Supported Sign Languages (Text-to-Sign):**

American, Indian, Australian, German, French, British, International, Swiss-German, Swiss-French, Swiss-Italian, Spanish, Jordanian, Belarusian, Bulgarian, Chinese, Croatian, Czech, Danish, New Zealand, Estonian, Finnish, Austrian, Cypriot, Greek, Icelandic, Italian, Japanese, Latvian, Lithuanian, Persian, Polish, Brazilian, Portuguese, Romanian, Russian, Slovakian, Argentine, Chilean, Cuban, Mexican, Swedish, Turkish, Ukrainian, Pakistan.

(This list is subject to change based on the capabilities of the sign.mt API.)


**Supported Speech Recognition Languages (Speech-to-Sign - in development):**

English (US), Hindi (India), Spanish (Spain), French (France), German (Germany), Chinese (China), Bengali (India), Gujarati (India), Kannada (India), Malayalam (India), Marathi (India), Punjabi (India), Tamil (India), Telugu (India), Odia (India).

(This list is subject to change)


## Project Structure

```
├── 1.html          (Initial HTML file - may be superseded by web/index.html)
├── README.md        (This file)
├── Sign language.zip (Download link for a sign language video dataset - not directly used in the current implementation)
├── T1.py           (Older Python script, likely superseded by app.py)
├── app.py          (Main Python backend script)
├── script1.js       (Older Javascript script, likely superseded by web/script.js)
├── sign_auto.py    (Python script for automated sign language translation using Selenium)
├── style1.css       (Older CSS file, likely superseded by web/style.css)
├── try.html         (Test HTML file)
├── try.js           (Test Javascript file)
└── web
    ├── index.html   (Main HTML file for the web application)
    ├── script.js     (Main Javascript file for the web application)
    └── style.css     (Main CSS file for the web application)
```

## Installation and Setup

1.  **Clone the Repository:**  Let's get started! 🚀

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Install Dependencies:**  All the necessary packages. 📦

    ```bash
    pip install -r requirements.txt
    ```

    **Requirements:**
    * Python 3.x
    * `selenium`
    * `playwright`
    * `eel`
    * `opencv-python` (cv2)
    * `webdriver_manager`


3.  **Run the Application:**  Time to see it in action! 🎬

    ```bash
    python app.py
    ```

    This will start the application. You will need a web browser to access the interface.


## Disclaimer

This project is still under development.  The functionality and supported languages are subject to change.  The project also relies on external APIs, meaning service availability and potential limitations in those APIs will affect the overall function of Signify.


---

**Made with ❤️ by Anonymous Coder/Artist**
