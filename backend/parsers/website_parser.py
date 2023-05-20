from bs4 import BeautifulSoup
import requests



class WebsiteParser:
    def __init__(self, url):
        self.url = url

    def parse(self):
        try:
            # Получение HTML-кода страницы
            response = requests.get(self.url)
            response.raise_for_status()  # Проверка наличия ошибок

            # Создание объекта BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')

            # Находим таблицу на странице
            table = soup.find('table', id='content_table')

            # Находим элемент tbody
            tbody = table.find('tbody')

            # Список для хранения первых столбцов
            first_columns = []

            # Итерация по строкам таблицы внутри tbody
            for row in tbody.find_all('tr'):
                # Получение всех ячеек в текущей строке
                cells = row.find_all('td')
                if cells:
                    # Находим внутренний <div> с классом 'ca' во второй ячейке (втором столбце)
                    div = cells[1].find('div', class_='ca')
                    div2 = cells[2].find('div', class_='fs')
                    div3 = cells[2].find('div', class_='fm')
                    if div:
                        # Добавление текста внутреннего <div> в список
                        first_column = div.text.strip()
                        s = next(div2.strings).strip()

                        iter = div3.strings;
                        fr = next(iter).strip()
                        to = next(iter).strip()
                        data = {
                            'companyName' : first_column,
                            'rate': s,
                            'from': fr,
                            'to': to
                        }
                        first_columns.append(data)

            return first_columns
        except requests.exceptions.RequestException as e:
            return f'Ошибка при парсинге страницы: {str(e)}'