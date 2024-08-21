const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://min9:ghkd1976@cluster0.2wafs.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('Error connecting to MongoDB Atlas', error));

// 여기에 기존 코드가 있을 수 있습니다.
