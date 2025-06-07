function createStars()
{
    const cosmos = document.getElementById('cosmos');
    for (let i = 0; i < 150; i++)
    {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        cosmos.appendChild(star);
    }
}

function createConstellation()
{
    const cosmos = document.getElementById('cosmos');
    const memories = [
        {
            title: "First Song for You 🎵",
            content: "The first time I sang just for you, I saw your eyes light up with a joy that told me I had found my audience of one. That moment, I knew my voice had found its true purpose."
        },
        {
            title: "Sharing My Deepest Secret 💭",
            content: "When I told you my most guarded secret and you held it with such tenderness, I realized that trust isn't just given - it's nurtured. You became my safe space in this chaotic world."
        },
        {
            title: "Your Artistic Vision 🎨",
            content: "Watching you see beauty where others see ordinary things taught me that love is about seeing the world through each other's eyes. Your artistic soul colors my black and white world."
        },
        {
            title: "Reading Together 📚",
            content: "Every book you recommend, every story you share, becomes a new chapter in our own love story. Your love for books shows me new worlds to explore together."
        },
        {
            title: "Nature's Embrace 🌿",
            content: "Walking with you in nature, I understand why poets write about love and seasons. With you, every season feels like spring - full of new beginnings and endless possibilities."
        },
        {
            title: "Travel Dreams ✈️",
            content: "Every destination you mention becomes a promise in my heart. I want to collect sunsets with you from every corner of the world, creating a gallery of our shared adventures."
        },
        {
            title: "Bagbazar Memories 🏛️",
            content: "At Bagbazar Ganga Ghat, by the sacred waters, I felt our connection deepen beyond words. That place will forever be where our souls recognized each other across lifetimes."
        },
        {
            title: "Forever Promise 💍",
            content: "When I think of forever, I don't think of time - I think of you. Every small moment we share is my way of proposing to you daily, asking you to choose us, again and again."
        }
    ];

    const positions = [
        {x: 20, y: 15}, {x: 35, y: 25}, {x: 55, y: 20}, {x: 70, y: 30},
        {x: 25, y: 45}, {x: 45, y: 55}, {x: 65, y: 45}, {x: 80, y: 60}
    ];

    positions.forEach((pos, index) =>
    {
        const star = document.createElement('div');
        star.className = 'constellation-star';
        star.style.left = pos.x + '%';
        star.style.top = pos.y + '%';
        star.style.position = 'relative';
        star.style.zIndex = '11111111111';
        star.style.pointerEvents = 'auto';
        star.onclick = () => showMemory(memories[index]);
        star.style.animationDelay = (index * 0.5) + 's';
        cosmos.appendChild(star);

        if (index > 0)
        {
            const prevPos = positions[index - 1];
            const line = document.createElement('div');
            line.className = 'constellation-line';

            const dx = pos.x - prevPos.x;
            const dy = pos.y - prevPos.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            line.style.width = length + '%';
            line.style.left = prevPos.x + '%';
            line.style.top = prevPos.y + '%';
            line.style.transform = `rotate(${angle}deg)`;
            line.style.transformOrigin = '0 50%';

            cosmos.appendChild(line);
        }
    });
}

function showMemory(memory)
{
    const popup = document.getElementById('memoryPopup');
    const content = document.getElementById('memoryContent');
    content.innerHTML = `
        <h2 style="color: #ffd700; margin-bottom: 20px;">${memory.title}</h2>
        <p style="line-height: 1.8; font-size: 16px;">${memory.content}</p>
        <div style="text-align: center; margin-top: 25px; padding: 15px; background: rgba(255,215,0,0.1); border-radius: 10px;">
            <p style="font-style: italic; color: #ffd700;">✨ A precious moment in our constellation of love ✨</p>
        </div>
    `;
    popup.classList.add('active');
}

function closeMemory()
{
    document.getElementById('memoryPopup').classList.remove('active');
}

function showSection(sectionName)
{
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(sectionName).classList.add('active');
    event.target.classList.add('active');
}

function createFloatingElements()
{
    const container = document.getElementById('floatingHearts');

    setInterval(() =>
    {
        const elements = ['💖', '✨', '💫', '🎵', '🌟', '💝', '🎶', '💕'];
        const element = document.createElement('div');
        element.className = Math.random() > 0.6 ? 'heart' : 'music-note';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDuration = (Math.random() * 3 + 4) + 's';
        element.style.animationDelay = Math.random() * 2 + 's';

        container.appendChild(element);

        setTimeout(() =>
        {
            if (element.parentNode)
            {
                element.parentNode.removeChild(element);
            }
        }, 8000);
    }, 2000);
}

document.addEventListener('mousemove', (e) =>
{
    const stars = document.querySelectorAll('.constellation-star');
    stars.forEach(star =>
    {
        const rect = star.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
            Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
        );

        if (distance < 100)
        {
            star.style.transform = 'scale(1.3)';
            star.style.boxShadow = '0 0 40px rgba(255, 215, 0, 1)';
        }
        else
        {
            star.style.transform = 'scale(1)';
            star.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
        }
    });
});

document.addEventListener('click', (e) =>
{
    const popup = document.getElementById('memoryPopup');
    if (e.target === popup)
    {
        closeMemory();
    }
});

window.addEventListener('load', () =>
{
    createStars();
    createConstellation();
    createFloatingElements();
});

document.addEventListener('DOMContentLoaded', () =>
{
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach((flower, index) =>
    {
        flower.addEventListener('mouseenter', () =>
        {
            flower.style.background = 'rgba(255, 215, 0, 0.2)';
        });
        flower.addEventListener('mouseleave', () =>
        {
            flower.style.background = 'rgba(255, 215, 0, 0.1)';
        });
    });
});

function typeWriter(element, text, speed = 50)
{
    let i = 0;
    element.innerHTML = '';
    function type()
    {
        if (i < text.length)
        {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

let clickCount = 0;
document.addEventListener('click', () =>
{
    clickCount++;
    if (clickCount === 50)
    {
        showSpecialSurprise();
    }
});

function showSpecialSurprise()
{
    const surprise = document.createElement('div');
    surprise.style.position = 'fixed';
    surprise.style.top = '50%';
    surprise.style.left = '50%';
    surprise.style.transform = 'translate(-50%, -50%)';
    surprise.style.background = 'rgba(0, 0, 0, 0.95)';
    surprise.style.border = '2px solid #ffd700';
    surprise.style.borderRadius = '20px';
    surprise.style.padding = '40px';
    surprise.style.textAlign = 'center';
    surprise.style.color = '#ffd700';
    surprise.style.zIndex = '1000';
    surprise.style.maxWidth = '80%';
    surprise.style.animation = 'fadeIn 1s ease-in-out';

    surprise.innerHTML = `
        <h2 style="margin-bottom: 20px; font-size: 2rem;">🎉 Special Surprise! 🎉</h2>
        <p style="font-size: 1.2rem; margin-bottom: 20px;">
            You've discovered the hidden message!
        </p>
        <p style="font-size: 1.5rem; color: #fff; font-style: italic; margin: 20px 0;">
            "Piu, every click, every moment you spend here<br>
            is another reason I fall deeper in love with you.<br>
            You are my universe, my forever." 💖
        </p>
        <button onclick="this.parentElement.remove()" 
                style="background: #ffd700; border: none; padding: 15px 30px; 
                       border-radius: 25px; color: #000; font-size: 16px; 
                       cursor: pointer; margin-top: 20px;">
            Keep This Love Forever ✨
        </button>
    `;

    document.body.appendChild(surprise);
}

window.addEventListener('scroll', () =>
{
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.aurora-wave');
    const speed = 0.5;

    parallax.forEach((element, index) =>
    {
        const yPos = -(scrolled * speed * (index + 1) * 0.1);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

setInterval(() =>
{
    const activeBtn = document.querySelector('.nav-btn.active');
    if (activeBtn)
    {
        activeBtn.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.6)';
        setTimeout(() =>
        {
            activeBtn.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
        }, 1000);
    }
}, 3000);

let sparkles = [];
document.addEventListener('mousemove', (e) =>
{
    if (Math.random() > 0.9)
    {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = '#ffd700';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkleTrail 1s ease-out forwards';

        document.body.appendChild(sparkle);

        setTimeout(() =>
        {
            if (sparkle.parentNode)
            {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
});

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleTrail {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(180deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

function createShootingStar()
{
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.width = '2px';
    star.style.height = '2px';
    star.style.background = 'linear-gradient(45deg, #ffd700, transparent)';
    star.style.borderRadius = '50%';
    star.style.top = Math.random() * 50 + '%';
    star.style.left = '-10px';
    star.style.zIndex = '1';
    star.style.animation = 'shootingStar 3s linear forwards';

    document.body.appendChild(star);

    setTimeout(() =>
    {
        if (star.parentNode)
        {
            star.parentNode.removeChild(star);
        }
    }, 3000);
}

const shootingStarStyle = document.createElement('style');
shootingStarStyle.textContent = `
    @keyframes shootingStar {
        0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
            box-shadow: 0 0 20px #ffd700;
        }
        100% {
            transform: translateX(100vw) translateY(-50px);
            opacity: 0;
            box-shadow: 0 0 40px #ffd700;
        }
    }
`;
document.head.appendChild(shootingStarStyle);

setInterval(createShootingStar, Math.random() * 5000 + 10000);

setInterval(() =>
{
    const title = document.querySelector('.title');
    if (title)
    {
        title.style.transform = 'scale(1.02)';
        setTimeout(() =>
        {
            title.style.transform = 'scale(1)';
        }, 2000);
    }
}, 4000);

if (window.innerWidth <= 768)
{
    setTimeout(() =>
    {
        const mobileMsg = document.createElement('div');
        mobileMsg.style.position = 'fixed';
        mobileMsg.style.bottom = '20px';
        mobileMsg.style.left = '50%';
        mobileMsg.style.transform = 'translateX(-50%)';
        mobileMsg.style.background = 'rgba(255, 215, 0, 0.1)';
        mobileMsg.style.border = '1px solid rgba(255, 215, 0, 0.3)';
        mobileMsg.style.borderRadius = '15px';
        mobileMsg.style.padding = '15px 20px';
        mobileMsg.style.color = '#ffd700';
        mobileMsg.style.fontSize = '14px';
        mobileMsg.style.textAlign = 'center';
        mobileMsg.style.zIndex = '1000';
        mobileMsg.style.animation = 'fadeIn 1s ease-in-out';
        mobileMsg.innerHTML = '📱 Perfect for you, Piu! Enjoy on any device 💖';

        document.body.appendChild(mobileMsg);

        setTimeout(() =>
        {
            mobileMsg.style.animation = 'fadeOut 1s ease-in-out forwards';
            setTimeout(() =>
            {
                if (mobileMsg.parentNode)
                {
                    mobileMsg.parentNode.removeChild(mobileMsg);
                }
            }, 1000);
        }, 5000);
    }, 3000);
}

const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
    }
`;
document.head.appendChild(fadeOutStyle);
