from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import logging

# 配置日志
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# ChromeDriver 配置
chromedriver_path = "D:\\chromeDriver\\chromedriver-win64\\chromedriver.exe"
service = Service(chromedriver_path)

# 配置 Selenium 浏览器
options = webdriver.ChromeOptions()
options.binary_location = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
options.add_argument('--headless')  # 后台运行
options.add_argument('--disable-gpu')  # 禁用GPU
driver = webdriver.Chrome(service=service, options=options)
logging.info("Chrome browser launched.")

# 要爬取的专利页面 URL
url = "https://patents.google.com/patent/US11249736B2/en"
logging.info(f"Fetching URL: {url}")
driver.get(url)

# 等待页面完全加载
try:
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "application-timeline"))
    )
    logging.info("Timeline section loaded.")
except Exception as e:
    logging.error(f"Error waiting for timeline section: {e}")
    driver.quit()
    exit()

# 使用 BeautifulSoup 解析页面
soup = BeautifulSoup(driver.page_source, "html.parser")
logging.info("Page source fetched and parsed.")

# 提取 Timeline 数据
timeline_data = []
try:
    # 定位到 timeline 的主区域
    timeline_section = soup.find("application-timeline", {"class": "style-scope patent-result"})
    if timeline_section:
        logging.info("Timeline section found.")
        # 遍历每个事件的容器
        event_divs = timeline_section.find_all("div", {"class": "event layout horizontal style-scope application-timeline"})
        for event in event_divs:
            # 提取第一个 <div> 作为日期（不管 class 名称）
            date_div = event.find("div")
            title_div = event.find("div", {"class": "flex title style-scope application-timeline"})

            date = date_div.text.strip() if date_div else "No Date"
            title = title_div.text.strip() if title_div else "No Title"

            # 记录调试信息
            logging.debug(f"Extracted Event - Date: {date}, Title: {title}")
            timeline_data.append({"Date": date, "Event": title})
    else:
        logging.warning("Timeline section not found in HTML.")
except Exception as e:
    logging.error(f"Error parsing timeline data: {e}")

# 输出 Timeline 数据
if timeline_data:
    logging.info("Timeline events extracted successfully:")
    for item in timeline_data:
        print(f"Date: {item['Date']} - Event: {item['Event']}")
else:
    logging.warning("No timeline events found.")

# 关闭浏览器
driver.quit()
logging.info("Browser closed.")
