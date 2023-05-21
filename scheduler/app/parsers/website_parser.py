import requests
from bs4 import BeautifulSoup


class WebsiteParser:
    def __init__(self, url):
        self.url = url

    def parse(self):
        try:
            # Get the HTML code of the page
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                              'Chrome/96.0.4664.93 Safari/537.36'
            }
            response = requests.get(self.url, headers=headers)
            response.raise_for_status()  # Check for errors

            # Create a BeautifulSoup object
            soup = BeautifulSoup(response.text, 'html.parser')

            # Find the table on the page
            table = soup.find('table', id='content_table')

            # Find the tbody element
            tbody = table.find('tbody')

            # List to store the values of the first column
            exchange_info = []

            # Iterate over the table rows inside tbody
            for row in tbody.find_all('tr'):
                # Get all cells in the current row
                cells = row.find_all('td')
                if cells:
                    # Find the inner <div> with class 'ca' in the second cell (second column)
                    div = cells[1].find('div', class_='ca')
                    div2 = cells[2].find('div', class_='fs')
                    div3 = cells[2].find('div', class_='fm')
                    if div:
                        # Add the text of the inner <div> to the list
                        first_column = div.text.strip()
                        s = next(div2.strings).strip()

                        iter = div3.strings;
                        fr = next(iter).strip()
                        to = next(iter).strip()
                        data = {
                            'companyName': first_column,
                            'rate': s,
                            'from': fr,
                            'to': to
                        }
                        exchange_info.append(data)
            return exchange_info
        except requests.exceptions.RequestException as e:
            return f'Error parsing the page: {str(e)}'
