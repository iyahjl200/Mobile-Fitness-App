// 引入所需的库和模块
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// 创建一个Express应用程序
const app = express();

// 使用中间件解析请求体
app.use(bodyParser.json());

// 模拟一个数据库，用于存储用户数据和健身计划
const users = {};
const workoutPlans = {};

// 路由：用户注册
app.post('/users', (req, res) => {
  const { name, age, weight, height } = req.body;
  const userId = uuidv4();
  const user = { id: userId, name, age, weight, height };
  users[userId] = user;
  res.status(201).json(user);
});

// 路由：创建训练计划
app.post('/workout-plans', (req, res) => {
  const { userId, planName, exercises } = req.body;
  const user = users[userId];
  if (user) {
    const planId = uuidv4();
    const workoutPlan = { id: planId, userId, planName, exercises };
    workoutPlans[planId] = workoutPlan;
    res.status(201).json(workoutPlan);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// 路由：获取用户信息
app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const user
