import requests


def get_current_usdt_trc20_price():
    url = 'https://api.coingecko.com/api/v3/simple/price'

    params = {
        'ids': 'tether',
        'vs_currencies': 'usd',
        'contract_addresses': 'CONTRACT_ADDRESS'
    }

    response = requests.get(url, params=params)
    data = response.json()

    # Обработка полученных данных
    if response.status_code == 200:
        price = data['tether']['usd']
        return price
    else:
        print('Ошибка при получении курса:', data['error'])
        return None


# Пример использования функции для получения текущего курса
usdt_trc20_price = get_current_usdt_trc20_price()
if usdt_trc20_price:
    print(f"Текущий курс USDT-TRC20: ${usdt_trc20_price}")
