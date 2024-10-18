from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
import cv2
import base64
import eel
import os

def translate_to_asl(driver, text):
    try:
        input_field = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/app-root/ion-app/ion-router-outlet/app-main/ion-tabs/div/ion-router-outlet/app-translate/app-translate-desktop/ion-content/div/app-drop-pose-file/div/div/div/app-spoken-to-signed/app-spoken-language-input/div/app-desktop-textarea/textarea"))
        )
        input_field.clear()
        time.sleep(1)
        input_field.send_keys(text)
        time.sleep(3)
        input_field.send_keys(Keys.RETURN)
        time.sleep(5) 
        video_element = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, '/html/body/app-root/ion-app/ion-router-outlet/app-main/ion-tabs/div/ion-router-outlet/app-translate/app-translate-desktop/ion-content/div/app-drop-pose-file/div/div/div/app-spoken-to-signed/app-signed-language-output/video')) 
        )

        blob_data = driver.execute_script("""
            var video = document.querySelector('video');
            var url = video.src;

            return fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);
                    return new Promise(resolve => {
                        reader.onloadend = () => resolve(reader.result);
                    });
                });
        """)

        video_data = blob_data.split(",")[1].encode("utf-8")
        with open("asl_translation.mp4", "wb") as f:
            f.write(base64.b64decode(video_data))

        return "asl_translation.mp4"

    except Exception as e:
        print(f"Error during translation: {e}")
        return None

def play_video(filename):
    cap = cv2.VideoCapture(filename)

    while(cap.isOpened()):
        ret, frame = cap.read()
        if ret == True:
            cv2.imshow('ASL Translation', frame)
            if cv2.waitKey(25) & 0xFF == ord('q'):
                break
        else:
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    options = Options()
    options.add_argument("--headless=new")
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    options.add_argument(f"user-agent={user_agent}")
    driver = webdriver.Chrome(options=options)
    driver.get("https://sign.mt")
    time.sleep(5) 

    while True:
        text_to_translate = input(">> ")
        if text_to_translate.lower() == "exit":
            break 
        video_filename = translate_to_asl(driver, text_to_translate) 
        if video_filename:
            print(f"ASL Translation video downloaded as: {video_filename}")
            play_video(video_filename)
            # os.remove(video_filename)

    driver.quit()
    