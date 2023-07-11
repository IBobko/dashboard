import asyncio
from telethon.sync import TelegramClient
import os


class TelegramService:
    def __init__(self):
        self.api_id = int(os.environ.get('TELEGRAM_API_ID'))
        self.api_hash = os.environ.get('TELEGRAM_API_HASH')
        self.username = os.environ.get('TELEGRAM_USERNAME')
        self.client = ""

    async def connect(self):
            loop = asyncio.get_event_loop()
            self.client = TelegramClient("session_name", self.api_id, self.api_hash, loop=loop)
            await self.client.connect()
            await self.client.send_code_request(self.username)
            code = input('Введите код подтверждения: ')
            await self.client.sign_in(self.username, code)

    def disconnect(self):
        #self.client.disconnect()
        print(1)

    def get_dialog_names(self):
        dialog_names = []
        # for dialog in self.client.iter_dialogs():
        #     dialog_names.append(dialog.name)
        return dialog_names
