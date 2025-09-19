/**
 * テーマメインJavaScript
 * 
 * @package MyTheme
 */

// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // Hello World サンプル
    console.log('Hello World from My Theme!');
    
    // テーマが正常に読み込まれていることを確認
    console.log('Theme JavaScript loaded successfully');
    
    // モバイルメニューの切り替え機能
    initMobileMenu();
    
    // スムーススクロール機能
    initSmoothScroll();
    
});

/**
 * モバイルメニューの初期化
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryMenu = document.querySelector('.primary-menu');
    
    if (menuToggle && primaryMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // aria-expanded を切り替え
            this.setAttribute('aria-expanded', !isExpanded);
            
            // メニューの表示/非表示を切り替え
            if (isExpanded) {
                primaryMenu.style.display = 'none';
            } else {
                primaryMenu.style.display = 'flex';
            }
        });
        
        // ウィンドウサイズ変更時にメニューをリセット
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                primaryMenu.style.display = '';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/**
 * スムーススクロールの初期化
 */
function initSmoothScroll() {
    // ページ内リンクにスムーススクロールを適用
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // # のみの場合はページトップへ
            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // ヘッダーの高さを考慮してスクロール
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 画像の遅延読み込み（Intersection Observer使用）
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * ページトップに戻るボタン
 */
function initBackToTop() {
    // ページトップボタンの作成
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'ページトップに戻る');
    document.body.appendChild(backToTopButton);
    
    // スクロール位置に応じてボタンの表示/非表示
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // クリックでページトップに戻る
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 追加機能の初期化（必要に応じて有効化）
// initLazyLoading();
// initBackToTop();