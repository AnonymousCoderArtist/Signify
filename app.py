import eel
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time
import base64
import os

eel.init('web')

driver = None

def initialize_driver():
    global driver
    if driver is None:
        options = Options()
        options.add_argument("--headless=new")
        user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        options.add_argument(f"user-agent={user_agent}")
        driver = webdriver.Chrome(options=options)
        driver.get("https://sign.mt")
        time.sleep(5)  # Wait for the page to load initially

@eel.expose
def translate_to_asl(text):
    global driver
    initialize_driver()

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

        video_data = blob_data.split(",")[1]
        return video_data

    except Exception as e:
        print(f"Error during translation: {e}")
        return None

@eel.expose
def cleanup():
    global driver
    if driver:
        driver.quit()
        driver = None

eel.start('index.html', size=(1000, 600), callback=cleanup)