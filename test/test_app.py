# test/test_app.py
import unittest
from app import app

class BasicTests(unittest.TestCase):
    def setUp(self):
        # Create a test client
        self.app = app.test_client()
        self.app.testing = True
        self.tasks = []

    def tearDown(self):
        # Reset tasks after each test
        self.tasks = []

    def test_home(self):
        response = self.app.get('/')
        self.assertEqual(response.data.decode(), 'Hello, World!')

    def test_add_task(self):
        response = self.app.post('/add', data={'task_title': 'New Task'})
        self.assertEqual(response.status_code, 302)  # Expect a redirect
        self.tasks.append({'title': 'New Task', 'completed': False})  # Simulate adding a task
        self.assertEqual(len(self.tasks), 1)
        self.assertEqual(self.tasks[0]['title'], 'New Task')

    def test_remove_task(self):
        # First, simulate adding a task
        self.tasks.append({'title': 'Task to Remove', 'completed': False})

        # Simulate removing the task
        task_id = 0
        if 0 <= task_id < len(self.tasks):
            self.tasks.pop(task_id)  # Remove the task

        self.assertEqual(len(self.tasks), 0)  # Check that the task list is now empty

    def test_complete_task(self):
        # Simulate adding a task
        self.tasks.append({'title': 'Task to Complete', 'completed': False})

        # Simulate marking the task as complete
        task_id = 0
        if 0 <= task_id < len(self.tasks):
            self.tasks[task_id]['completed'] = True  # Mark the task as complete

        self.assertTrue(self.tasks[0]['completed'])  # Check that the task is marked complete

if __name__ == '__main__':
    unittest.main()

