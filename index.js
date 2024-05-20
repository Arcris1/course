const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const {courseList, courseSection, courseVideos} = require('./api');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Define an API endpoint to send data
app.get('/api/courses', async (req, res) =>  {
  
    try {
        const courses = await courseList(); 
        res.json(courses);
    } catch (error) {
        console.error(`Error fetching course data: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define an API endpoint to send data
app.get('/api/course/section/:dir', async (req, res) =>  {
    const dir = req.params.dir; 

    console.log(dir);
    try {
        let url  =  `https://s174-254.apntelecom.com/learn/Web-Development/${dir}`;
        const courses = await courseSection(url); 
        res.json(courses); 
    } catch (error) {
        console.error(`Error fetching course data: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define an API endpoint to send data
app.get('/api/course/videos/:course/:section', async (req, res) =>  {
    const course = encodeURIComponent(req.params.course); 
    const section = encodeURIComponent(req.params.section); 

    try {
        let url  =  `https://s174-254.apntelecom.com/learn/Web-Development/${course.replace(/\s/g, '+')}/${section}`;
        const courses = await courseVideos(url); 
        res.json(courses); 
    } catch (error) {
        console.error(`Error fetching course data: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define a route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
