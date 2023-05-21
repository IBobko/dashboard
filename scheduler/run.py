from app import get_app, tasks

app = get_app()

if __name__ == '__main__':
    with app.app_context():
        tasks.start_scheduler()
    app.run()
