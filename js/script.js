document.addEventListener('DOMContentLoaded', () => {

    // Typing Animation (Main Homepage)
    const codeElement = document.getElementById('typing-code');
    if (codeElement) {
        const codeSnippet = [
            "<span class='comment'># Initializing Datly AI Core...</span>",
            "<span class='keyword'>import</span> <span class='string'>datly_analytics</span> <span class='keyword'>as</span> <span class='string'>da</span>",
            "<span class='keyword'>import</span> <span class='string'>tensorflow</span> <span class='keyword'>as</span> <span class='string'>tf</span>",
            "",
            "<span class='keyword'>class</span> <span class='function'>BusinessGrowth</span>:",
            "    <span class='keyword'>def</span> <span class='function'>__init__</span>(<span class='function'>self</span>, <span class='function'>data</span>):",
            "        <span class='function'>self</span>.data = data",
            "        <span class='function'>self</span>.model = da.create_model()",
            "",
            "    <span class='keyword'>def</span> <span class='function'>optimize</span>(<span class='function'>self</span>):",
            "        <span class='comment'># Analyze patterns and predict trends</span>",
            "        insights = <span class='function'>self</span>.model.predict(<span class='function'>self</span>.data)",
            "        <span class='keyword'>return</span> insights",
            "",
            "<span class='comment'># Executing Optimization...</span>",
            "<span class='function'>print</span>(<span class='string'>'Transformation Complete.'</span>)"
        ];

        let lineIndex = 0;
        let currentHTML = "";

        function typeCode() {
            if (lineIndex < codeSnippet.length) {
                const line = codeSnippet[lineIndex];
                currentHTML += line + "<br>";
                codeElement.innerHTML = currentHTML + "<span class='cursor'></span>";
                lineIndex++;
                setTimeout(typeCode, 100 + Math.random() * 100);
            } else {
                setTimeout(() => {
                    lineIndex = 0;
                    currentHTML = "";
                    typeCode();
                }, 5000);
            }
        }
        setTimeout(typeCode, 1000);
    }

    // MATRIX RAIN ANIMATION (Light Mode Real Code)
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        // Characters to fall (More code-like)
        const chars = 'const var let function return if else while for import export class => { } [ ] ( ) ; < > / * + -'.split('');
        const fontSize = 14;
        const columns = width / fontSize;

        // Array of drops - one per column
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            // White BG for the trail effect (Light Mode)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = 'bold ' + fontSize + 'px monospace';

            // Loop over drops
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];

                // Color: Dark Grey/Black for contrast
                ctx.fillStyle = Math.random() > 0.95 ? '#000000' : '#555555';

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Sending the drop back to the top randomly after it has crossed the screen
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Increment Y coordinate
                drops[i]++;
            }
        }
        setInterval(draw, 33); // Run at ~30FPS
    }

    // Scroll Reveal Animation (Global)
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // WhatsApp Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get Values
            const name = document.getElementById('fullName').value;
            const phone = document.getElementById('whatsappNumber').value;
            const email = document.getElementById('emailAddress').value;
            const desc = document.getElementById('projectDesc').value;

            // Format Message
            const message = `*New Project Request* %0A%0A` +
                `👤 *Name:* ${name} %0A` +
                `📱 *WhatsApp:* ${phone} %0A` +
                `📧 *Email:* ${email} %0A` +
                `📝 *Description:* ${desc}`;

            // Redirect to WhatsApp
            const whatsappUrl = `https://wa.me/21692312071?text=${message}`;
            window.open(whatsappUrl, '_blank');

            // Show Success Message
            document.getElementById('successMessage').classList.add('active');
        });
    }

});