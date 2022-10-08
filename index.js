const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fileUpload = require('express-fileupload');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

const courses = [
  { id: '1', name: 'React JS', price: 299 },
  { id: '2', name: 'Node JS', price: 399 },
  { id: '3', name: 'Next JS', price: 499 },
];

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/v1/hi', (req, res) => {
  res.send('hello world');
});

app.get('/api/v1/object', (req, res) => {
  res.send({
    id: '1',
    name: 'nodejs',
    price: 399,
  });
});

app.get('/api/v1/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/v1/mycourse/:courseId', (req, res) => {
  const myCourse = courses.find((course) => course.id === req.params.courseId);
  res.send(myCourse);
});

app.post('/api/v1/addCourse', (req, res) => {
  console.log(req.body);
  courses.push(req.body);
  res.send(true);
});

app.get('/api/v1/coursequery', (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({ location, device });
});

app.post('/api/v1/fileupload', (req, res) => {
  const file = req.files.file;
  let path = __dirname + '/images/' + Date.now() + '.jpg';

  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(3000, () => console.log(`server running on 3000`));
