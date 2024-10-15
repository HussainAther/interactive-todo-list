# app.py
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# In-memory task list
tasks = []

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    task_title = request.form.get('task_title')
    if task_title:
        tasks.append({'title': task_title, 'completed': False})
    return redirect(url_for('index'))

@app.route('/remove/<int:task_id>')
def remove_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks.pop(task_id)  # Remove the task by index
    return redirect(url_for('index'))

@app.route('/complete/<int:task_id>')
def complete_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks[task_id]['completed'] = True  # Mark the task as completed
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(port=3000)

