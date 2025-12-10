// Китайские иероглифы для фона основных экранов
const chineseSymbols = [
    "福", "喜", "愛", "夢", "力", "氣", "龍", "虎", "火", "水",
    "風", "山", "天", "地", "人", "心", "神", "美", "樂", "和",
    "平", "安", "幸", "運", "財", "富", "貴", "祥", "瑞", "壽",
    "春", "夏", "秋", "冬", "日", "月", "星", "辰", "光", "明"
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация загрузки
    initLoader();
    
    // Настройка навигации
    setupNavigation();
    
    // Настройка кнопок назад
    setupBackButtons();
    
    // Инициализация иероглифов после загрузки
    setTimeout(() => {
        createBackgroundSymbols();
    }, 3000);
});

// Функция инициализации загрузки
function initLoader() {
    const loader = document.getElementById('loader');
    const loaderFill = document.querySelector('.loader-fill');
    const mainContent = document.getElementById('main-content');
    const pulsingNickname = document.getElementById('pulsing-nickname');
    
    // Эффект мерцания ника (появляется и пропадает)
    let blinkInterval = setInterval(() => {
        if (pulsingNickname.style.opacity === '0.3' || pulsingNickname.style.opacity === '') {
            pulsingNickname.style.opacity = '1';
        } else {
            pulsingNickname.style.opacity = '0.3';
        }
    }, 600);
    
    // Имитация загрузки
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            clearInterval(blinkInterval);
            
            // Остановка мерцания
            pulsingNickname.style.opacity = '1';
            pulsingNickname.style.animation = 'none';
            
            // Задержка перед скрытием загрузки
            setTimeout(() => {
                loader.classList.add('hidden');
                mainContent.style.display = 'block';
                
                // Показать основной контент
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 800);
        }
        loaderFill.style.width = `${progress}%`;
    }, 80);
}

// Создание фоновых символов для основных экранов
function createBackgroundSymbols() {
    const container = document.querySelector('.background-symbols');
    const symbolCount = 60;
    
    for (let i = 0; i < symbolCount; i++) {
        createFallingSymbol(container);
    }
    
    // Периодически добавлять новые символы
    setInterval(() => {
        if (container.children.length < 100) {
            createFallingSymbol(container);
        }
    }, 1500);
}

// Создание одного падающего символа
function createFallingSymbol(container) {
    const symbol = document.createElement('div');
    symbol.className = 'symbol';
    symbol.textContent = chineseSymbols[Math.floor(Math.random() * chineseSymbols.length)];
    
    // Случайная позиция по горизонтали
    const left = Math.random() * 100;
    
    // Случайный размер
    const size = 20 + Math.random() * 40;
    
    // Случайная скорость падения
    const duration = 15 + Math.random() * 25;
    const delay = Math.random() * 5;
    
    // Случайный оттенок красного
    const redValue = Math.floor(100 + Math.random() * 155);
    const opacity = 0.05 + Math.random() * 0.15;
    const color = `rgba(${redValue}, 0, 0, ${opacity})`;
    
    // Применение стилей
    symbol.style.left = `${left}%`;
    symbol.style.fontSize = `${size}px`;
    symbol.style.color = color;
    symbol.style.animationDuration = `${duration}s`;
    symbol.style.animationDelay = `${delay}s`;
    
    // Случайное начальное вращение
    const rotation = Math.random() * 360;
    symbol.style.transform = `rotate(${rotation}deg)`;
    
    container.appendChild(symbol);
    
    // Удаление символа после завершения анимации
    setTimeout(() => {
        if (symbol.parentNode === container) {
            container.removeChild(symbol);
        }
    }, (duration + delay) * 1000);
}

// Настройка навигации
function setupNavigation() {
    const buttons = document.querySelectorAll('.btn[data-target]');
    const screens = document.querySelectorAll('.screen');
    const mainScreen = document.getElementById('home-screen');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Для ссылок открывать в новом окне
            if (this.tagName === 'A' && this.hasAttribute('target')) {
                return;
            }
            
            e.preventDefault();
            const target = this.getAttribute('data-target');
            
            // Эффект клика
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Скрыть главный экран
            mainScreen.classList.remove('active');
            
            // Скрыть все экраны
            screens.forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Показать целевой экран
            setTimeout(() => {
                const targetScreen = document.getElementById(`${target}-screen`);
                if (targetScreen) {
                    targetScreen.classList.add('active');
                    // Прокрутка наверх
                    targetScreen.scrollTop = 0;
                }
            }, 300);
        });
    });
}

// Настройка кнопок назад
function setupBackButtons() {
    const backButtons = document.querySelectorAll('.back-btn');
    const screens = document.querySelectorAll('.screen');
    const mainScreen = document.getElementById('home-screen');
    
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Эффект клика
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Скрыть все экраны
            screens.forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Показать главный экран
            setTimeout(() => {
                mainScreen.classList.add('active');
            }, 300);
        });
    });
}

// Эффект при наведении на кнопки
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        // Создание эффекта всплеска
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode === this) {
                ripple.remove();
            }
        }, 600);
    });
});

// Добавляем CSS для эффекта ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Параллакс эффект для фона при скролле
window.addEventListener('scroll', function() {
    const symbols = document.querySelectorAll('.symbol');
    const scrollY = window.scrollY;
    const speed = 0.3;
    
    symbols.forEach(symbol => {
        const yPos = -(scrollY * speed);
        // Сохраняем оригинальное преобразование и добавляем параллакс
        const originalTransform = symbol.style.transform || '';
        symbol.style.transform = `${originalTransform} translateY(${yPos}px)`;
    });
});

// Анимация появления элементов при прокрутке
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами с анимацией
    document.querySelectorAll('.price-card, .project-card, .skill').forEach(card => {
        observer.observe(card);
    });
}

// Запускаем анимации при прокрутке после загрузки
setTimeout(setupScrollAnimations, 2000);

// Эффект при клике на социальные ссылки
document.querySelectorAll('.social-link, .project-link, .contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Для внешних ссылок - просто открываем
        if (this.hasAttribute('target') && this.getAttribute('target') === '_blank') {
            return;
        }
        
        // Для внутренних ссылок - анимация
        e.preventDefault();
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Анимация текста приветствия
const welcomeText = document.querySelector('.welcome-text');
const originalText = welcomeText.textContent;

// Создаем эффект мерцания для текста приветствия
setInterval(() => {
    if (Math.random() > 0.7) {
        welcomeText.style.opacity = '0.7';
        setTimeout(() => {
            welcomeText.style.opacity = '1';
        }, 100);
    }
}, 2000);

// Эффект для аватара в профиле
const avatar = document.querySelector('.avatar');
if (avatar) {
    setInterval(() => {
        avatar.style.transform = 'scale(1.1)';
        setTimeout(() => {
            avatar.style.transform = 'scale(1)';
        }, 300);
    }, 5000);
}

// Управление видимостью иероглифов при переключении экранов
function updateSymbolsVisibility() {
    const symbols = document.querySelectorAll('.symbol');
    const homeScreen = document.getElementById('home-screen');
    
    if (homeScreen.classList.contains('active')) {
        symbols.forEach(symbol => {
            symbol.style.display = 'block';
        });
    }
}

// Обновляем видимость символов при переключении экранов
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            updateSymbolsVisibility();
        }
    });
});

// Наблюдаем за изменениями класса у главного экрана
const homeScreen = document.getElementById('home-screen');
if (homeScreen) {
    observer.observe(homeScreen, { attributes: true });
          }
