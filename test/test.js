// test/test.js
const request = require('supertest');
const express = require('express');
const app = require('../server'); // Adjust this if your server file name is different

describe('To-Do List API', () => {
    beforeEach(() => {
        // Reset the tasks array before each test
        tasks.length = 0;
    });

    it('GET / should return Hello, World!', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', /text/)
            .expect(200, 'Hello, World!', done);
    });

    it('POST /add should add a task', (done) => {
        request(app)
            .post('/add')
            .send({ task_title: 'New Task' })
            .expect(302) // Expect a redirect after adding a task
            .end((err) => {
                if (err) return done(err);
                // Check if the task was added
                expect(tasks).to.have.lengthOf(1);
                expect(tasks[0].title).to.equal('New Task');
                done();
            });
    });

    it('GET /remove/:id should remove a task', (done) => {
        // First, add a task to ensure the list isn't empty
        tasks.push({ title: 'Task to Remove', completed: false });

        request(app)
            .get('/remove/0')
            .expect(302) // Expect a redirect after removing a task
            .end((err) => {
                if (err) return done(err);
                // Check if the task was removed
                expect(tasks).to.have.lengthOf(0);
                done();
            });
    });

    it('GET /complete/:id should mark a task as complete', (done) => {
        // Add a task first
        tasks.push({ title: 'Task to Complete', completed: false });

        request(app)
            .get('/complete/0')
            .expect(302) // Expect a redirect after marking a task as complete
            .end((err) => {
                if (err) return done(err);
                // Check if the task was marked complete
                expect(tasks[0].completed).to.be.true;
                done();
            });
    });
});

