const express = require('express');
const path = require('path');
const { courses } = require('./data.js');
const { getCoursesByTermId, getAllTerms } = require('./db.js');
require('dotenv').config();

const CURRENT_TERM_ID = process.env.CURRENT_TERM;

const app = express();

const PORT = 3000;

// getCoursesByTermId(CURRENT_TERM_ID);

app.use('/', express.static('./public'));

app.get('/login', (req, res) => {
  res.status(200).send('Login page');
});

/*app.get('/', (req, res) => {
  res.status(200).send('<h1>Home Page</h1><a href="/api/courses">Courses</a>');
});

app.get('/api/courses/:courseId', (req, res) => {
  const { courseId } = req.params;
  const course = courses.find(course => course.id === Number(courseId));

  if (!course) {
    return res.status(404).send('Course not found.');
  }

  return res.json(course);
}); */

app.get('/api/courses', async (req, res) => {
  const { term } = req.query;

  if (!term) {
    const data = await getCoursesByTermId(CURRENT_TERM_ID);
  }
  console.log(term);
  res.json(data);
});

app.get('/api/terms', async (req, res) => {
  const data = await getAllTerms();
  res.json(data);
});

app.listen(PORT, () => {
  console.log('Server is listening on port ', PORT);
});