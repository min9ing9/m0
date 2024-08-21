const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config(); // 환경 변수를 사용하기 위해 dotenv 패키지 추가
const path = require('path'); // 추가

const app = express();
const port = 4000; // 포트 번호를 4000으로 변경

// MongoDB Atlas 연결
const mongoURI = process.env.MONGO_URI; // 환경 변수에서 MongoDB URI 가져오기
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// 스키마 정의
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

// 모델 생성
const User = mongoose.model('User', userSchema);

// 미들웨어 설정
app.use(express.json()); // express.json() 사용
app.use(express.static(path.join(__dirname, 'public'))); // static files

// JWT 비밀 키
const JWT_SECRET = process.env.JWT_SECRET; // 환경 변수에서 JWT 비밀 키 가져오기

// 로그인 엔드포인트
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Database error' });
    }
});

// 사용자 추가 엔드포인트
app.post('/add-user', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    // 관리자 인증 토큰 확인
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error processing request' });
    }
});

// 로그인 페이지 제공
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
