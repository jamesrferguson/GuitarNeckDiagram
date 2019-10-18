from flask import Flask


def createApp():
    app = Flask('guitarApp')
    from guitarAPI import api
    app.register_blueprint(api)
    return app

if __name__ == '__main__':
    app = createApp()
    app.run()