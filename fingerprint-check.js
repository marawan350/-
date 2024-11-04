(async () => {
  // تحميل FingerprintJS
  const fp = await FingerprintJS.load();
  const result = await fp.get();

  // جلب بصمة الجهاز الحالية
  const currentFingerprint = result.visitorId;
  console.log('Current Fingerprint:', currentFingerprint);

  // قائمة البصمات المسموح بها
  const allowedFingerprints = [
      'dd740041a38520f1892433695e84845c',
      'example_fingerprint_2',
      // أضف المزيد من البصمات المسموح بها هنا
  ];

  // التحقق من إذا كانت البصمة الحالية مسموح بها
  if (!allowedFingerprints.includes(currentFingerprint)) {
      document.body.innerHTML = `
          <div class="container" style="text-align: center; margin-top: 100px;">
              <h2>Request Permission</h2>
              <a href="https://wa.me/+201154180620" class="request-button" style="
                  display: inline-block;
                  background-color: #4CAF50;
                  color: white;
                  padding: 15px 30px;
                  font-size: 18px;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s;
              ">Request Permission</a>
              <p style="font-size: 20px; margin-top: 20px; color: #333;">
            يرجى النقر على الزر بالأعلى لطلب الإذن.
              </p>
          </div>
      `;
      alert('جهازك ليس لديه إذن وصول');
  } else {
      console.log('Access granted');
  }
})();
