const express = require('express');
const { userRouter } = require('./routes/user.route');
const { sequelize } = require('./models');
const { authRouter } = require('./routes/auth.route');
const { courseRouter } = require('./routes/course.route');
const { lessonRouter } = require('./routes/lesson.route');
const { enrollmentRouter } = require('./routes/enrollment.route');
require("dotenv").config();

APP_PORT = process.env.PORT || 8000;

const app = express();

// Middlewares
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
});

app.get('/',(req,res)=>{
    res.json({
        version: "1.0.0",
        description: "App para la Hackaton 09",
        author: "nelhoesp"
    });
});

app.get('/health',(req,res)=>{
    res.json({ status:true })
});

// Rutas
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/courses', courseRouter);
app.use('/lessons', lessonRouter);
app.use('/enrollments', enrollmentRouter);

// Inicio del servidor
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB conectada');

        app.listen(APP_PORT, () => {
            console.log(`Server Ready on port ${APP_PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar:', error);
    }
};

startServer();