/**
 * G LAB — Reusable Universal Preloader Engine
 * Ultra-fast GPU accelerated CSS loading animation
 */

(function () {
    // 1. Inject Preloader Styles
    const style = document.createElement('style');
    style.id = 'glab-preloader-style';
    style.textContent = `
        #glabPreloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: #ffffffff;
            background-image: 
                radial-gradient(circle at 50% 30%, rgba(6, 182, 212, 0.18) 0%, transparent 60%),
                radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 60%);
            z-index: 999999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 1;
            visibility: visible;
            transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s ease;
            pointer-events: all;
            user-select: none;
        }

        #glabPreloader.fade-out {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        .preloader-orbit-wrapper {
            position: relative;
            width: 130px;
            height: 130px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
        }

        .orbit-ring-outer {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: #06b6d4;
            border-right-color: #3b82f6;
            animation: glabSpinOuter 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
        }

        .orbit-ring-inner {
            position: absolute;
            inset: 12px;
            border-radius: 50%;
            border: 3px solid transparent;
            border-bottom-color: #6366f1;
            border-left-color: #764ba2;
            animation: glabSpinInner 0.9s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            box-shadow: 0 0 12px rgba(118, 75, 162, 0.4);
        }

        .preloader-logo-badge {
            width: 58px;
            height: 58px;
            background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #6366f1 100%);
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
            font-weight: 800;
            font-size: 1.85rem;
            color: #ffffff;
            box-shadow: 0 8px 25px rgba(6, 182, 212, 0.45);
            animation: glabPulseLogo 2s ease-in-out infinite;
            z-index: 2;
        }

        .preloader-text-group {
            text-align: center;
        }

        .preloader-title {
            font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
            font-size: 1.75rem;
            font-weight: 800;
            letter-spacing: 2px;
            background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 6px;
        }

        .preloader-subtitle {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 0.76rem;
            font-weight: 600;
            color: #94a3b8;
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }

        .preloader-progress-bar {
            width: 140px;
            height: 3px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            margin: 16px auto 0 auto;
            overflow: hidden;
            position: relative;
        }

        .preloader-progress-fill {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #06b6d4, #3b82f6, #6366f1);
            animation: glabProgressSweep 1.5s ease-in-out infinite;
        }

        @keyframes glabSpinOuter {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes glabSpinInner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
        }

        @keyframes glabPulseLogo {
            0%, 100% { transform: scale(1); box-shadow: 0 8px 25px rgba(6, 182, 212, 0.45); }
            50% { transform: scale(1.05); box-shadow: 0 12px 35px rgba(59, 130, 246, 0.65); }
        }

        @keyframes glabProgressSweep {
            0% { left: -100%; }
            50% { left: 0%; }
            100% { left: 100%; }
        }

        @media (max-width: 570px) {
            .preloader-orbit-wrapper {
                width: 110px;
                height: 110px;
            }
            .preloader-logo-badge {
                width: 48px;
                height: 48px;
                font-size: 1.5rem;
            }
            .preloader-title {
                font-size: 1.4rem;
            }
            .preloader-subtitle {
                font-size: 0.7rem;
            }
        }
    `;

    document.head.appendChild(style);

    // 2. Inject Preloader HTML Container
    function createPreloaderHTML() {
        const preloader = document.createElement('div');
        preloader.id = 'glabPreloader';
        preloader.innerHTML = `
            <div class="preloader-orbit-wrapper">
                <div class="orbit-ring-outer"></div>
                <div class="orbit-ring-inner"></div>
                <div class="preloader-logo-badge">G</div>
            </div>
            <div class="preloader-text-group">
                <div class="preloader-title">G LAB</div>
                <div class="preloader-subtitle">HARDWARE EXPERIENCE</div>
                <div class="preloader-progress-bar">
                    <div class="preloader-progress-fill"></div>
                </div>
            </div>
        `;
        return preloader;
    }

    // Insert immediately into DOM body or documentElement
    let preloaderElement = null;

    function initPreloader() {
        if (document.getElementById('glabPreloader')) return;
        preloaderElement = createPreloaderHTML();
        if (document.body) {
            document.body.prepend(preloaderElement);
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                if (!document.getElementById('glabPreloader')) {
                    document.body.prepend(preloaderElement);
                }
            });
        }
    }

    initPreloader();

    // 3. Hide Function
    function hidePreloader() {
        const el = document.getElementById('glabPreloader');
        if (el) {
            el.classList.add('fade-out');
            setTimeout(() => {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            }, 600);
        }
    }

    // Public Helpers
    window.showPreloader = function () {
        let el = document.getElementById('glabPreloader');
        if (!el) {
            el = createPreloaderHTML();
            document.body.prepend(el);
        }
        el.classList.remove('fade-out');
    };

    window.hidePreloader = hidePreloader;

    // Automatic dismissal after 1 second display duration
    const minDisplayDuration = 1000; // 1 second
    const startTime = Date.now();

    function scheduleDismissal() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayDuration - elapsedTime);
        setTimeout(hidePreloader, remainingTime);
    }

    if (document.readyState === 'complete') {
        scheduleDismissal();
    } else {
        window.addEventListener('load', scheduleDismissal);
        // Fallback safety trigger at 1.2s
        setTimeout(hidePreloader, 1200);
    }
})();
