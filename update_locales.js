const fs = require('fs');

const enHomeNew = {
    "trusted": "Trusted by industry leaders",
    "expertise": {
        "title": "Our <span class=\"font-[100]\">Expertise</span>",
        "subtitle": "Comprehensive digital solutions designed to elevate your brand and drive measurable results across all touchpoints.",
        "cards": [
            {
                "title": "Performance Optimization",
                "desc": "Lightning-fast load times and optimized core web vitals to ensure seamless user experiences and better search rankings."
            },
            {
                "title": "Technical SEO",
                "desc": "Deep-dive structural improvements, schema markup, and advanced crawlability enhancements for maximum visibility."
            },
            {
                "title": "E-commerce Solutions",
                "desc": "High-converting online stores built on robust platforms with seamless payment integrations and inventory management."
            },
            {
                "title": "Custom Applications",
                "desc": "Bespoke web and mobile applications tailored to your specific business workflows and customer needs."
            }
        ]
    },
    "strategy": {
        "subtitle": "Strategic Approach",
        "title": "The Path to <span class=\"font-bold\">Digital Excellence</span>",
        "steps": [
            {
                "title": "Discovery",
                "desc": "Deep dive into your brand, audience, and market landscape."
            },
            {
                "title": "Strategy",
                "desc": "Crafting a bespoke roadmap tailored to your specific goals."
            },
            {
                "title": "Execution",
                "desc": "Pixel-perfect design and robust technical implementation."
            },
            {
                "title": "Evolution",
                "desc": "Continuous optimization, scaling, and performance tracking."
            }
        ]
    },
    "work": {
        "subtitle": "Featured Work",
        "title": "Explore Our <span class=\"font-bold\">Digital Dust.</span>",
        "view_all": "View All Projects",
        "projects": [
            {
                "tag1": "Fintech",
                "tag2": "Web App",
                "title": "Nexus Analytics Platform",
                "desc": "Complete UX/UI redesign and frontend architecture for a global financial data provider.",
                "btn": "VIEW CASE STUDY"
            },
            {
                "tag1": "Social",
                "tag2": "Mobile",
                "title": "Vibe Social Network",
                "desc": "Omnichannel marketing campaign and native mobile application development.",
                "btn": "VIEW CASE STUDY"
            }
        ]
    },
    "stats": {
        "s1_num": "200",
        "s1_label": "Projects Delivered",
        "s2_num": "15",
        "s2_label": "Industry Awards",
        "s3_num": "98",
        "s3_label": "Client Retention",
        "s4_num": "10",
        "s4_label": "Years Experience"
    },
    "testimonial": {
        "quote": "\"Apex Digital completely transformed our online presence. Their strategic approach to our web design and SEO resulted in a 300% increase in organic traffic within six months.\"",
        "author": "Sarah Jenkins",
        "role": "CMO, TechFlow Solutions"
    },
    "cta": {
        "title": "Ready to start your<br/>\n<span class=\"font-bold\">digital transformation?</span>",
        "desc": "Let's build something extraordinary together. Our team of experts is ready to take your brand to the next level.",
        "btn_talk": "LET'S TALK",
        "btn_consult": "Book a Consult"
    }
};

const bgHomeNew = {
    "trusted": "Доверени от лидери в индустрията",
    "expertise": {
        "title": "Нашата <span class=\"font-[100]\">Експертиза</span>",
        "subtitle": "Цялостни дигитални решения, предназначени да издигнат вашата марка и да доведат до измерими резултати.",
        "cards": [
            {
                "title": "Оптимизация на производителността",
                "desc": "Светкавично бързо време за зареждане и оптимизиране за безпроблемно потребителско изживяване и по-добро класиране при търсене."
            },
            {
                "title": "Техническо SEO",
                "desc": "Структурни подобрения, маркиране на схеми и усъвършенствана ефективност за максимална видимост."
            },
            {
                "title": "Решения за електронна търговия",
                "desc": "Висококонвертиращи онлайн магазини, изградени на стабилни платформи с безпроблемно плащане."
            },
            {
                "title": "Специализирани приложения",
                "desc": "Специални уеб и мобилни приложения, съобразени с вашите специфични бизнес работни процеси и нужди на клиентите."
            }
        ]
    },
    "strategy": {
        "subtitle": "Стратегически подход",
        "title": "Пътят към <span class=\"font-bold\">Дигитално съвършенство</span>",
        "steps": [
            {
                "title": "Откриване",
                "desc": "Гмурнете се дълбоко във вашата марка, аудитория и пазарен пейзаж."
            },
            {
                "title": "Стратегия",
                "desc": "Създаване на персонализирана пътна карта, съобразена с вашите специфични цели."
            },
            {
                "title": "Изпълнение",
                "desc": "Съвършен дизайн до последния пиксел и стабилна техническа реализация."
            },
            {
                "title": "Еволюция",
                "desc": "Непрекъсната оптимизация, мащабиране и проследяване на производителността."
            }
        ]
    },
    "work": {
        "subtitle": "Избрани проекти",
        "title": "Разгледайте нашата <span class=\"font-bold\">Дигитална следа.</span>",
        "view_all": "Вижте всички проекти",
        "projects": [
            {
                "tag1": "Fintech",
                "tag2": "Уеб приложение",
                "title": "Платформа за Анализи Nexus",
                "desc": "Цялостен редизайн на UX/UI и архитектура на предния край за световен доставчик на финансови данни.",
                "btn": "РАЗГЛЕДАЙ КЕЙС СТЪДИ"
            },
            {
                "tag1": "Social",
                "tag2": "Мобилно",
                "title": "Социална Мрежа Vibe",
                "desc": "Омниканална маркетингова кампания и разработване на мобилни приложения.",
                "btn": "РАЗГЛЕДАЙ КЕЙС СТЪДИ"
            }
        ]
    },
    "stats": {
        "s1_num": "200",
        "s1_label": "Предадени проекти",
        "s2_num": "15",
        "s2_label": "Индустриални награди",
        "s3_num": "98",
        "s3_label": "Запазване на клиенти",
        "s4_num": "10",
        "s4_label": "Години опит"
    },
    "testimonial": {
        "quote": "\"Apex Digital напълно трансформира онлайн присъствието ни. Стратегическият им подход към уеб дизайна и SEO доведе до 300% увеличение на органичния трафик.\"",
        "author": "Сара Дженкинс",
        "role": "CMO, TechFlow Solutions"
    },
    "cta": {
        "title": "Готови ли сте да започнете вашата<br/>\n<span class=\"font-bold\">дигитална трансформация?</span>",
        "desc": "Нека заедно изградим нещо необикновено. Нашият екип от експерти е готов да издигне вашата марка на следващото ниво.",
        "btn_talk": "НЕКА ПОГОВОРИМ",
        "btn_consult": "Резервирай Консултация"
    }
};

let en = JSON.parse(fs.readFileSync('locales/en.json'));
let bg = JSON.parse(fs.readFileSync('locales/bg.json'));

en.home_new = enHomeNew;
bg.home_new = bgHomeNew;

fs.writeFileSync('locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('locales/bg.json', JSON.stringify(bg, null, 2));
console.log('Locales updated successfully!');
