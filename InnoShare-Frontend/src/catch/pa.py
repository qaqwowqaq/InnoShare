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
chromedriver_path = "D:\\chromeDriver\\chromedriver-win64\\chromedriver.exe"  # 替换为你的chromedriver路径
service = Service(chromedriver_path)

# 配置 Selenium 浏览器
options = webdriver.ChromeOptions()
options.binary_location = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"  # 替换为你的 Chrome 浏览器路径
options.add_argument('--headless')  # 后台运行
options.add_argument('--disable-gpu')  # 禁用GPU加速
options.add_argument('--log-level=3')  # 减少ChromeDriver的日志输出
options.add_argument('--no-sandbox')  # 防止某些环境中崩溃
options.add_argument('--disable-dev-shm-usage')  # 防止共享内存问题

# 启动浏览器
driver = webdriver.Chrome(service=service, options=options)
logging.info("Chrome browser launched.")

# 要爬取的专利页面 URL
url = "https://patents.google.com/patent/US11249736B2/en"  # 替换为实际的专利页面链接
logging.info(f"Fetching URL: {url}")
driver.get(url)

try:
    # 等待页面加载完成，最长等待时间 10 秒
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "abstract"))
    )
    logging.info("Abstract section located on the page.")
except Exception as e:
    logging.error(f"Error waiting for abstract section: {e}")
    driver.quit()
    exit()

# 使用 BeautifulSoup 解析页面源代码
logging.info("Fetching page source for parsing.")
soup = BeautifulSoup(driver.page_source, "html.parser")
logging.info("Page source fetched and parsed.")

# 精确查找 Abstract 内容
abstract = ""
try:
    abstract_section = soup.find("section", {"id": "abstract"})  # 定位到 section
    if abstract_section:
        logging.info("Abstract section found in HTML.")
        abstract_div = abstract_section.find("div", {"class": "abstract style-scope patent-text"})
        if abstract_div:
            logging.info("Abstract div found in HTML.")
            abstract = abstract_div.text.strip()
        else:
            logging.warning("Abstract div not found inside the abstract section.")
    else:
        logging.warning("Abstract section not found in HTML.")
except Exception as e:
    logging.error(f"Error parsing abstract content: {e}")

# 输出 Abstract
if abstract:
    logging.info(f"Abstract found: {abstract}")
    print("Abstract:")
    print(abstract)
else:
    logging.warning("Abstract not found.")
    print("Abstract not found.")

# 关闭浏览器
driver.quit()
logging.info("Browser closed.")
