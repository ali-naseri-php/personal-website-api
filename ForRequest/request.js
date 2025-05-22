const fetch = require('node-fetch'); // برای ارسال درخواست HTTP
const url = 'http://localhost:3000/auth/register'; // آدرس سرور

const data = {
    email: 'alin۱۲۳aseriiii@gmail.com',
    password: 'echo test',
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
    .then(async response => {
        const status = response.status; // دریافت استتوس کد
        const jsonData = await response.json(); // دریافت محتوای پاسخ
        console.log('✅ Response:', { status, ...jsonData });
    })
    .catch(error => console.error('❌ Error:', error));
