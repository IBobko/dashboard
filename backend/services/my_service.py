from apscheduler.schedulers.background import BackgroundScheduler


def my_task():
    # Ваш код задачи
    print("Задача выполнена!")


def start_scheduler():
    scheduler = BackgroundScheduler(daemon=True)
    scheduler.add_job(my_task, 'interval', minutes=5)  # Запустить задачу каждые 5 минут
    scheduler.start()
