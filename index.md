---
layout: false
pageType: cv
status: 'Software engineer · Open to interesting conversations'
name: 'Bùi Minh Hiếu'
headline: 'Software Engineer'
bio: 'Software Engineer focused on backend development, with a solid background in mobile and Flutter. I build and run the backend behind a beauty-services platform with around 200K users, and I care about systems that are performant, highly available, scalable and secure. I also enjoy writing about what I learn along the way.'
location: 'Ho Chi Minh City, Vietnam'
email: 'hieubm1707@gmail.com'
github: 'https://github.com/hieubm1707'
linkedin: 'https://www.linkedin.com/in/bmhieeus/'
avatar: '/images/avatar.png'

highlights:
  - value: '4+ years'
    label: 'Professional experience'
  - value: '200K+'
    label: 'Users on apps I work on'
  - value: '10K'
    label: 'Monthly active users'
  - value: '10+'
    label: 'Projects delivered'

experiences:
  - role: 'Software Engineer (Backend)'
    company: 'NGOC DUNG AESTHETIC CO.,LTD'
    location: 'Ho Chi Minh City'
    period: '04/2024 - Present'
    description: 'Lead backend developer for the Ngoc Dung Beauty app and Zalo Mini App, later taking ownership of the backend for more of the company''s applications.'
    achievements:
      - 'Built loyalty, voucher and mini-game features as microservices communicating over REST APIs.'
      - 'Migrated the backend from JavaScript to TypeScript and from MongoDB to PostgreSQL, significantly improving performance.'
      - 'Optimized a 20M+ row PostgreSQL table with indexing and table partitioning, bringing API response times under ~100 ms for single-record lookups and under ~500 ms for one-year range queries.'
      - 'Used Redis caching and cron jobs to power loyalty workflows.'
      - 'Optimized the FCM push notification flow and set up OpenObserve for server logging and monitoring.'
      - 'Maintained a self-hosted Chatwoot (Ruby) instance and added APIs to integrate chat into the app and web.'
      - 'Built a call center service on top of LiveKit to manage rooms, access tokens and call history, plus a reusable JavaScript calling SDK.'
      - 'Built the Booking Center, a centralized system for recording and storing customer appointments.'
      - 'Currently building The Advance Chat, an Android app forked from open-source Telegram: fixing UI bugs and migrating its transport from MTProto to REST APIs.'
    techs: [TypeScript, Node.js, PostgreSQL, MongoDB, Redis, Microservices, FCM, OpenObserve, Chatwoot, LiveKit, Java]

  - role: 'Mobile Developer'
    company: 'NGOC DUNG AESTHETIC CO.,LTD'
    location: 'Ho Chi Minh City'
    period: '09/2023 - 03/2024'
    description: 'Joined the IT department to develop the Ngoc Dung Beauty app (~200K users, ~10K monthly active users) and related products with Flutter.'
    achievements:
      - 'Owned the appointment booking feature of the Ngoc Dung Beauty app and helped maintain its other features.'
      - 'Owned the booking feature of the Ngoc Dung Zalo Mini App.'
      - 'Built a Flutter web admin portal from scratch to manage content and track metrics for both apps, and kept maintaining it until 09/2025.'
      - 'Delivered the Green Villas backend and CMS single-handedly in one month with Dart Frog, Stormberry, Firebase and Redis.'
    techs: [Flutter, Flutter Web, Dart, React, Zalo Mini App SDK, Dart Frog, Stormberry, Firebase, Redis]

  - role: 'Backend Developer'
    company: 'MLTech Soft'
    period: '06/2023 - 08/2023'
    description: 'Built backend features for the factory signal management system of Unilever Vietnam, which retrieves and analyzes signals from Azure Cloud and reports key information back to the factories.'
    achievements:
      - 'Developed backend features with TypeScript and NestJS to collect and analyze factory signals from Azure Cloud.'
      - 'Maintained existing code, implemented new features and handled deployments.'
    techs: [TypeScript, NestJS, Azure]

  - role: 'Mobile Developer'
    company: 'MLTech Soft'
    period: '03/2022 - 08/2023'
    description: 'Developed and maintained e-commerce and distribution mobile applications with Flutter, from setting up the codebase to releasing on Google Play.'
    achievements:
      - 'Set up the codebase for the Lothashop app and worked with the backend team to design the database and feature workflows.'
      - 'Built product browsing, search, checkout and account management features using the Cubit pattern.'
      - 'Integrated e-wallet payments (MoMo, VNPay), Firebase Cloud Messaging for in-app notifications and Firebase Crashlytics for crash analysis.'
      - 'Released and maintained apps on the Google Play Store.'
      - 'Onboarded teammates to the project structure and helped them fix bugs.'
    techs: [Flutter, Dart, Cubit, Firebase, Kotlin]

skillGroups:
  - category: 'Backend'
    icon: '⚙️'
    items: [TypeScript, JavaScript, Node.js, NestJS, Dart Frog, Ruby (Chatwoot), RESTful APIs, Microservices, Socket.IO, LiveKit, Cron jobs]

  - category: 'Mobile'
    icon: '📱'
    items: [Flutter, Flutter Web, Dart, Java, Kotlin, Android, React, Zalo Mini App SDK, Firebase (FCM, Crashlytics)]

  - category: 'Databases & Caching'
    icon: '🗄️'
    items: [PostgreSQL, MySQL, MongoDB, Redis, Stormberry]

  - category: 'Tools & DevOps'
    icon: '🧰'
    items: [Docker, Git, OpenObserve, Figma]

  - category: 'Soft Skills'
    icon: '🤝'
    items: [Leadership, Teamwork, Research, Communication, Technical English reading]

projects:
  - name: 'The Advance Chat'
    period: '06/2026 - Present'
    description: 'A company chat app for Android built on a fork of open-source Telegram, keeping its interface, interactions and performance.'
    highlights:
      - 'Fixing UI bugs in the forked codebase.'
      - 'Migrating the transport layer from MTProto to REST APIs so the app works with our own backend.'
    techs: [Java, Android, REST API]

  - name: 'Booking Center'
    period: '07/2025 - 09/2025'
    description: 'A centralized booking system that records and stores customer appointment information across Ngoc Dung channels.'
    techs: [TypeScript, Node.js, PostgreSQL, Redis, REST API]

  - name: 'Ngoc Dung Beauty - Backend Platform'
    period: '04/2024 - Present'
    description: 'Backend services behind the Ngoc Dung Beauty app and Zalo Mini App, where I have been the lead backend developer since 04/2024.'
    highlights:
      - 'Built loyalty, voucher and mini-game features as microservices communicating over REST APIs.'
      - 'Migrated from JavaScript to TypeScript and from MongoDB to PostgreSQL, significantly improving performance.'
      - 'Indexed and partitioned a 20M+ row table: ~100 ms single-record lookups and ~500 ms one-year range queries at the API level.'
      - 'Ran loyalty workflows with cron jobs, cached data with Redis and optimized the FCM push flow.'
      - 'Monitored servers with OpenObserve.'
    techs: [TypeScript, Node.js, PostgreSQL, Redis, Microservices, FCM, OpenObserve]

  - name: 'Ngoc Dung Beauty App'
    period: '09/2023 - Present'
    description: 'The customer app of Ngoc Dung Aesthetic, with around 200K users and 10K monthly active users.'
    highlights:
      - 'Owned the appointment booking feature and helped maintain other features (09/2023 - 02/2024).'
      - 'Added chat and call features (05/2025 - 06/2025): maintained Chatwoot and wrote new integration APIs for chat; built a LiveKit-based call center service for rooms, tokens and call history, plus a JavaScript calling SDK that can be embedded in multiple products.'
    techs: [Flutter, Dart, JavaScript, Chatwoot, LiveKit]

  - name: 'Green Villas'
    period: '02/2024 - 03/2024'
    description: 'A property management app for apartments and villas, letting owners track and pay their fees.'
    highlights:
      - 'Built the entire backend and CMS on my own in one month.'
      - 'Used Dart Frog for the API, Stormberry for the database layer, Firebase for notifications and Redis for caching.'
    techs: [Dart, Dart Frog, Stormberry, Firebase, Redis]

  - name: 'Ngoc Dung Admin Portal'
    period: '10/2023 - 09/2025'
    description: 'A Flutter web admin portal for managing content of the Ngoc Dung Beauty app and Zalo Mini App, and for tracking app metrics and reports.'
    highlights:
      - 'Built the portal from scratch, then maintained it.'
    techs: [Flutter Web, Dart]

  - name: 'Ngoc Dung Zalo Mini App'
    period: '11/2023 - 12/2023'
    description: 'The Ngoc Dung mini app on Zalo, bringing key services to Zalo users.'
    highlights:
      - 'Owned the appointment booking feature.'
    techs: [React, Zalo Mini App SDK]

  - name: 'Unilever Vietnam - Factory Signal Management'
    period: '06/2023 - 08/2023'
    description: 'A backend system that retrieves and analyzes signals from Azure Cloud and provides essential information back to Unilever Vietnam factories.'
    highlights:
      - 'Developed signal retrieval and analysis features.'
      - 'Maintained existing modules and deployed new releases.'
    techs: [TypeScript, NestJS, Azure]

  - name: 'Lothashop - E-commerce App'
    description: 'A mobile app that lets individuals sell products to customers as authorized agents of LothaMilk.'
    highlights:
      - 'Set up the project codebase from scratch.'
      - 'Designed the database and feature workflows together with the backend team.'
      - 'Integrated MoMo and VNPay payments, push notifications (FCM) and crash reporting (Crashlytics).'
    techs: [Flutter, Dart, Cubit, Firebase]

  - name: 'Totoday - E-commerce App'
    description: 'A mobile app for browsing and purchasing products from the Totoday brand.'
    highlights:
      - 'Built product listing, search, checkout and account management features.'
      - 'Integrated MoMo and VNPay e-wallet payments.'
      - 'Published the app to the Google Play Store.'
    techs: [Flutter, Dart, Cubit]

  - name: 'DMS - Distribution Management System'
    description: 'A mobile app for managing product distribution.'
    highlights:
      - 'Maintained legacy code, implemented new features and handled deployments.'
      - 'Guided teammates through the project structure and bug fixing.'
    techs: [Flutter, Dart]

  - name: 'Lamviettot'
    description: 'An app that encourages good deeds among children aged 5 to 11.'
    highlights:
      - 'Maintained and fixed existing features.'
      - 'Developed new features in Kotlin.'
    techs: [Kotlin, Android]

  - name: 'Personal Blog & Portfolio'
    description: 'This site: a fully static CV and blog where I write about what I learn, with posts managed through a Git-based CMS.'
    github: 'https://github.com/hieubm1707/blogs'
    techs: [Vue 3, VitePress, Decap CMS, TailwindCSS, Netlify]

education:
  - degree: 'Bachelor of Information Technology'
    school: 'University of Information Technology (UIT)'
    period: '2018 - 2022'
    description: 'Vice President of the university Student Association.'

certifications:
  - title: 'TOEIC 665'
    issuer: 'ETS'
---
