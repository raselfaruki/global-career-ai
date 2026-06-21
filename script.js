document.getElementById('cvForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('generateBtn');
    const btnText = document.getElementById('btnText');
    const loader = document.getElementById('btnLoader');
    const demoArea = document.getElementById('demoArea');
    const demoText = document.getElementById('demoText');

    const userData = {
        fullName: document.getElementById('fullName').value,
        profession: document.getElementById('profession').value,
        country: document.getElementById('country').value,
        experience: document.getElementById('experience').value
    };

    btn.disabled = true;
    btnText.innerText = "AI is writing your CV...";
    loader.classList.remove('hidden');
    demoArea.classList.add('hidden');

    try {
        // এখানে তোমার n8n-এর Production Webhook URL বসাবে
        const webhookUrl = "https://server3.automationlearners.pro/webhook-test/generate-cv"; 
        
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        const result = await response.json();

        btn.disabled = false;
        btnText.innerText = "Generate Pro CV & Cover Letter";
        loader.classList.add('hidden');

        if(result && result.status === "success") {
            // ফর্ম লুকিয়ে ডেমো দেখানো
            document.getElementById('cvForm').classList.add('hidden');
            demoArea.classList.remove('hidden');
            demoText.innerText = result.preview_text;
            
            // অ্যাড বাটনের কাজ
            document.getElementById('watchAdBtn').onclick = function() {
                alert("এখানে অ্যাডমবের ভিডিও অ্যাড চলবে। অ্যাড শেষের পর পিডিএফ ওপেন হবে!");
                // ভবিষ্যতে এখানে আসল অ্যাড কোড বসবে, আপাতত সরাসরি ডাউনলোড হবে
                setTimeout(() => {
                    window.open(result.download_url, '_blank');
                }, 1500);
            };
        } else {
            alert("দুঃখিত, সিভি জেনারেট করতে সমস্যা হয়েছে।");
        }
    } catch (error) {
        alert("সার্ভার এরর! ইন্টারনেট কানেকশন চেক করুন।");
        btn.disabled = false;
        btnText.innerText = "Generate Pro CV & Cover Letter";
        loader.classList.add('hidden');
    }
});