import eel
from playwright.sync_api import Playwright, sync_playwright
import time
import base64
import os

eel.init('web')

browser = None
page = None

def initialize_browser():
    global browser, page
    if browser is None:
        playwright = sync_playwright().start()
        
        # Specify the path to your default Chrome installation
        chrome_path = r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
        app_data_path = os.getenv("LOCALAPPDATA")
        user_data_path = os.path.join(app_data_path, r'Google\Chrome\User Data\Profile 2')
        
        # Launch Chrome in incognito mode
        browser = playwright.chromium.launch_persistent_context(headless=True, user_data_dir=user_data_path, args=["--force-dark-mode"] )
        page = browser.new_page()
        page.goto("https://sign.mt/")
        time.sleep(5)  # Wait for the page to load initially
initialize_browser()
@eel.expose
def translate_to_asl(text, language='Indian'):
    initialize_browser()
    try:
        # Select the language
        language_selector = page.locator("app-language-selector").filter(has_text="American").get_by_label("More Languages")
        language_selector.click()
        time.sleep(1)
        language_option = page.get_by_role("menuitem", name=language)
        language_option.click()
        time.sleep(2)
        
        # Find the input field and enter text
        input_field = page.get_by_label("Spoken Language Text")
        input_field.click()
        input_field.fill(text)
        time.sleep(3)
        input_field.press('Enter')
        time.sleep(5)
        
        # Find the video element
        video_element = page.wait_for_selector('app-signed-language-output video', timeout=15000)
        
        # Use JavaScript to fetch the video blob and convert it to base64
        video_base64 = page.evaluate("""
            async (videoElement) => {
                const response = await fetch(videoElement.src);
                const blob = await response.blob();
                const reader = new FileReader();
                return new Promise((resolve) => {
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
            }
        """, video_element)
        
        # Extract the base64 data part
        video_data = video_base64.split(',')[1]
        
        return video_data
    except Exception as e:
        print(f"Error during translation: {e}")
        return None

@eel.expose
def cleanup():
    global browser, page
    if browser:
        browser.close()
        browser = None
    if page:
        page = None

# Start the eel app
eel.start('index.html', size=(1920, 1080), position=(0, 0), fullscreen=True, callback=cleanup)