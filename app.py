from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
applications = [{'application_index': 1}]

@app.route('/api/add_application', methods=['POST'])
def add_application():
    print("adding application")
    data = request.get_json()

    name = data.get('name')
    zipcode = data.get('zipcode')

    application_number = applications[0]['application_index']
    applications[0]['application_index'] += 1
    
    status = data.get('status')
    application = {'app_number':application_number, 'name':name, 'zipcode':zipcode, 'status':status}
    applications.append(application)
    ret = {'outcome':'success', 'message': 'Application added successfully'}
    ret.update(application)

    return jsonify(ret)

@app.route('/api/check_status', methods=['POST'])
def check_status():
    print("Looking for application")
    data = request.get_json()
    number = int(data.get('app_number'))

    for application in applications:
        num = application.get('app_number')
        if num == number:
            ret = {'outcome':'success', 'message': 'Found Your Application'}
            ret.update(application)
            return ret
    return {'outcome':'fail', 'message': 'Didnt find an application with that ID'}
    
@app.route('/api/change_status', methods=['POST'])
def change_status():
    print("Looking for application")
    data = request.get_json()
    number = int(data.get('app_number'))

    for application in applications:
        num = application.get('app_number')
        if num == number:
            application['status'] = data.get('status')
            ret = {'outcome':'success', 'message': 'Found Your Application and changed the status!'}
            ret.update(application)
            return ret
    return {'outcome':'fail', 'message': 'Didnt find an application with that ID'}

# Route to render the index.html page
@app.route('/')
def index():
    return render_template('index.html')
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
