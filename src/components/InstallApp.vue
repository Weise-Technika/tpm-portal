<template>
    <div class="card-install" id="card-install">
        <h1 class="left install-head">ติดตั้งแอพลงบนเครื่องของคุณ</h1>
        <button class="btn btn-warning btn-sm right" id="install-btn">ติดตั้ง <i class="bi bi-arrow-down-circle-fill"></i></button>
    </div>
</template>
<style>
    .card-install {
        background-color: #1f1f20;
        padding: 15px 15px;
        border-radius: 5px;
        margin: 15px 15px 5px;
        color:rgb(255, 255, 255);
        font-family: Kanit;
        height: 65px;
        display: none;
    }
    .right {
        float: right;
    }
    .left {
        float: left;
    }
    .install-head {
        margin-top: 6px;
        font-size: 16px;
        margin-bottom: 0;
    }
</style>

<script>
    import 'bootstrap-icons/font/bootstrap-icons.css'
    export default {
        data() {
            return {
                deferredPrompt: null
            }
        },
        mounted() {
            // ควบคุมปุ่มติดตั้งแอพ
            let deferredPrompt = null;
            const installBtn = document.getElementById('install-btn');
            const installCard = document.getElementById('card-install');

            // ตรวจสอบว่าเบราว์เซอร์รองรับ PWA หรือไม่
            window.addEventListener('beforeinstallprompt', (e) => {
                
                // ป้องกันไม่ให้แสดงแบนเนอร์ติดตั้งของเบราว์เซอร์
                e.preventDefault();
                // เก็บการกระทำสำหรับการติดตั้ง
                deferredPrompt = e;
                // แสดงปุ่ม "Add to Home Screen"
                installCard.style.display = 'block';

                // เมื่อผู้ใช้คลิกปุ่มติดตั้ง
                installBtn.addEventListener('click', () => {
                    // แสดงแบนเนอร์ติดตั้ง PWA
                    deferredPrompt.prompt();
                    // รอการตอบกลับจากผู้ใช้
                    deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    } else {
                        console.log('User dismissed the install prompt');
                    }
                    // ซ่อนปุ่มหลังจากการตอบรับ
                    installCard.style.display = 'none';
                    deferredPrompt = null;
                    });
                });
            });

            // ตรวจสอบว่าเบราว์เซอร์เป็น Safari หรือไม่
            if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
                // Safari ไม่รองรับ beforeinstallprompt event
                // แสดงปุ่มติดตั้งสำหรับ Safari
                installCard.style.display = 'block';
                installBtn.addEventListener('click', () => {
                    alert('To install this app, please use the "Add to Home Screen" option in the Safari share menu.');
                });
            }

            // ตรวจสอบว่า Service Worker พร้อมใช้งานหรือไม่
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/service-worker.js')
                    .then((registration) => {
                        console.log('Service Worker registered with scope:', registration.scope);
                    })
                    .catch((error) => {
                        console.log('Service Worker registration failed:', error);
                    });
                });
            }
        }
    }

    

</script>