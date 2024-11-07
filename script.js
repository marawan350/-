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
});
