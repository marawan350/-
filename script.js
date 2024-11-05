document.addEventListener('DOMContentLoaded', async () => {
    // تفعيل القائمة الجانبية
    document.getElementById("toggle").addEventListener("click", function() {
        document.getElementById("sidebar").classList.toggle("show");
    });

    // تفعيل القائمة المنسدلة لكل مادة مع حركة السهم
    document.querySelectorAll(".subject > span").forEach(item => {
        item.addEventListener("click", function() {
            const subMenu = this.nextElementSibling;
            const arrow = this.querySelector(".arrow");
            subMenu.classList.toggle("show");
            arrow.classList.toggle("rotate");

            // إغلاق القوائم الفرعية الأخرى
            document.querySelectorAll(".sub-menu").forEach(menu => {
                if (menu !== subMenu) {
                    menu.classList.remove("show");
                    menu.previousElementSibling.querySelector(".arrow").classList.remove("rotate");
                }
            });
        });
    });

    // التحقق من المتصفح
    function isChromeBrowser() {
        // Check if userAgentData is supported for a more reliable check
        if (navigator.userAgentData) {
            const brands = navigator.userAgentData.brands;
            return brands.some(brand => brand.brand === 'Google Chrome');
        } else {
            // Fallback to userAgent string check if userAgentData is not available
            const userAgent = navigator.userAgent.toLowerCase();
            return userAgent.includes('chrome') && 
                   !userAgent.includes('edg') && 
                   !userAgent.includes('opr') && 
                   !userAgent.includes('brave') && 
                   !userAgent.includes('firefox') && 
                   !userAgent.includes('safari') && 
                   !userAgent.includes('vivaldi') && 
                   !userAgent.includes('ucbrowser') && 
                   !userAgent.includes('duckduckgo') && 
                   !userAgent.includes('yabrowser') && 
                   !userAgent.includes('whale');
        }
    }

    if (!isChromeBrowser()) {
        document.body.innerHTML = `
            <div style="text-align: center; margin-top: 100px;">
                <h2>متصفح غير مدعوم</h2>
                <p style="font-size: 20px; margin-top: 20px; color: #333;">
                  يُرجى فتح هذه الصفحة باستخدام متصفح Google Chrome.
                </p>
            </div>
        `;
        return; // إنهاء السكربت إذا لم يكن المتصفح كروم
    }

    // تحميل FingerprintJS
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    // جلب بصمة الجهاز الحالية
    const currentFingerprint = result.visitorId;
    console.log('Current Fingerprint:', currentFingerprint);

    // قائمة البصمات المسموح بها
    const allowedFingerprints = [
        'dd740041a38520f1892433695e84845c',
        '09ebc4777f2d8d915fb8b093d1cc7d30',
        'a6059e344eeeb44f0b5054277fab0518',
        'a4451d1b96fc0779fade24230883e46a',
        // أضف المزيد من البصمات المسموح بها هنا
    ];

    // التحقق من إذا كانت البصمة الحالية مسموح بها
    if (!allowedFingerprints.includes(currentFingerprint)) {
        document.body.innerHTML = `
            <div class="container" style="text-align: center; margin-top: 100px;">
                <h2>طلب إذن الوصول</h2>
                <a href="https://wa.me/+201154180620" class="request-button" style="
                    display: inline-block;
                    background-color: #4CAF50;
                    color: white;
                    padding: 15px 30px;
                    font-size: 18px;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                ">طلب إذن</a>
                <p style="font-size: 20px; margin-top: 20px; color: #333;">
                  يُرجى النقر على الزر بالأعلى لطلب الإذن.
                </p>
                <p style="font-size: 18px; margin-top: 10px; color: #555;">
                  معرف جهازك الحالي: ${currentFingerprint}
                </p>
            </div>
        `;
        alert(`جهازك ليس لديه إذن وصول.`);
    } else {
        console.log('Access granted');
    }
});
