---
layout: false
pageType: cv
status: 'Software engineer · Sẵn sàng cho những cuộc trò chuyện thú vị'
name: 'Bùi Minh Hiếu'
headline: 'Software Engineer'
bio: 'Kỹ sư phần mềm tập trung vào backend, với nền tảng vững về mobile và Flutter. Tôi xây dựng và vận hành backend cho các ứng dụng khách hàng của một công ty dịch vụ làm đẹp, và luôn quan tâm đến những hệ thống hiệu năng cao, sẵn sàng cao, dễ mở rộng và an toàn. Tôi cũng thích viết lại những gì mình học được trên hành trình đó.'
location: 'TP. Hồ Chí Minh, Việt Nam'
email: 'hieubm1707@gmail.com'
github: 'https://github.com/hieubm1707'
linkedin: 'https://www.linkedin.com/in/bmhieeus/'
avatar: '/images/avatar.png'

highlights:
  - value: '4+ năm'
    label: 'Kinh nghiệm làm việc'
  - value: '20M+'
    label: 'Dòng dữ liệu trong bảng tôi đã tối ưu'
  - value: '~100 ms'
    label: 'Thời gian truy vấn API sau tối ưu'
  - value: '10+'
    label: 'Dự án đã triển khai'

experiences:
  - role: 'Software Engineer (Backend)'
    company: 'NGOC DUNG AESTHETIC CO.,LTD'
    location: 'TP. Hồ Chí Minh'
    period: '04/2024 - Hiện tại'
    description: 'Phụ trách chính backend cho ứng dụng Ngọc Dung Beauty và Zalo Mini App, sau đó mở rộng sang phụ trách backend cho nhiều ứng dụng khác của công ty.'
    achievements:
      - 'Xây dựng các tính năng loyalty, voucher và mini game theo kiến trúc microservices giao tiếp qua REST API.'
      - 'Chuyển đổi backend từ JavaScript sang TypeScript và từ MongoDB sang PostgreSQL, cải thiện hiệu năng đáng kể.'
      - 'Tối ưu bảng PostgreSQL hơn 20 triệu dòng bằng index và table partitioning, đưa thời gian phản hồi API xuống dưới ~100 ms khi truy vấn một bản ghi và dưới ~500 ms khi truy vấn dữ liệu một năm.'
      - 'Dùng Redis cache và cron job để xử lý các nghiệp vụ loyalty.'
      - 'Tối ưu luồng gửi thông báo đẩy FCM và dựng OpenObserve để quản lý log và giám sát server.'
      - 'Bảo trì Chatwoot (Ruby) tự host và viết thêm API để tích hợp chat vào app và web.'
      - 'Xây dựng hệ thống call center trên LiveKit để quản lý room, access token và lịch sử cuộc gọi, kèm JavaScript calling SDK dùng lại được ở nhiều nơi.'
      - 'Xây dựng Booking Center, hệ thống tập trung ghi nhận và lưu trữ lịch hẹn của khách hàng.'
      - 'Đang phát triển The Advance Chat, ứng dụng Android fork từ Telegram mã nguồn mở: sửa lỗi giao diện và chuyển tầng giao tiếp từ MTProto sang REST API.'
    techs: [TypeScript, Node.js, PostgreSQL, MongoDB, Redis, Microservices, FCM, OpenObserve, Chatwoot, LiveKit, Java]

  - role: 'Mobile Developer'
    company: 'NGOC DUNG AESTHETIC CO.,LTD'
    location: 'TP. Hồ Chí Minh'
    period: '09/2023 - 03/2024'
    description: 'Gia nhập phòng IT để phát triển ứng dụng Ngọc Dung Beauty và các sản phẩm liên quan bằng Flutter.'
    achievements:
      - 'Phụ trách chính tính năng đặt lịch của ứng dụng Ngọc Dung Beauty và hỗ trợ bảo trì các tính năng khác.'
      - 'Phụ trách chính tính năng đặt lịch của Ngọc Dung Zalo Mini App.'
      - 'Xây dựng từ đầu trang quản trị bằng Flutter web để quản lý nội dung và theo dõi số liệu cho cả hai ứng dụng, tiếp tục bảo trì đến 09/2025.'
      - 'Một mình hoàn thành backend và CMS của Green Villas trong một tháng với Dart Frog, Stormberry, Firebase và Redis.'
    techs: [Flutter, Flutter Web, Dart, React, Zalo Mini App SDK, Dart Frog, Stormberry, Firebase, Redis]

  - role: 'Backend Developer'
    company: 'MLTech Soft'
    period: '06/2023 - 08/2023'
    description: 'Phát triển tính năng backend cho hệ thống quản lý tín hiệu nhà máy của Unilever Việt Nam, hệ thống lấy và phân tích tín hiệu từ Azure Cloud rồi trả thông tin cần thiết về cho các nhà máy.'
    achievements:
      - 'Phát triển tính năng backend bằng TypeScript và NestJS để thu thập và phân tích tín hiệu nhà máy từ Azure Cloud.'
      - 'Bảo trì code cũ, phát triển tính năng mới và triển khai (deploy).'
    techs: [TypeScript, NestJS, Azure]

  - role: 'Mobile Developer'
    company: 'MLTech Soft'
    period: '03/2022 - 08/2023'
    description: 'Phát triển và bảo trì các ứng dụng mobile thương mại điện tử và phân phối bằng Flutter, từ dựng codebase đến phát hành lên Google Play.'
    achievements:
      - 'Dựng codebase cho ứng dụng Lothashop và phối hợp với team backend thiết kế database cùng luồng nghiệp vụ.'
      - 'Xây dựng các tính năng xem, tìm kiếm, mua sản phẩm và quản lý tài khoản theo mô hình Cubit.'
      - 'Tích hợp thanh toán ví điện tử (MoMo, VNPay), Firebase Cloud Messaging cho thông báo trong app và Firebase Crashlytics để phân tích lỗi crash.'
      - 'Phát hành và bảo trì ứng dụng trên Google Play Store.'
      - 'Hướng dẫn đồng nghiệp làm quen cấu trúc dự án và hỗ trợ sửa lỗi.'
    techs: [Flutter, Dart, Cubit, Firebase, Kotlin]

skillGroups:
  - category: 'Backend'
    icon: '⚙️'
    items: [TypeScript, JavaScript, Node.js, NestJS, Dart Frog, Ruby (Chatwoot), RESTful APIs, Microservices, Socket.IO, LiveKit, Cron jobs]

  - category: 'Mobile'
    icon: '📱'
    items: [Flutter, Flutter Web, Dart, Java, Kotlin, Android, React, Zalo Mini App SDK, Firebase (FCM, Crashlytics)]

  - category: 'Cơ sở dữ liệu & Caching'
    icon: '🗄️'
    items: [PostgreSQL, MySQL, MongoDB, Redis, Stormberry]

  - category: 'Công cụ & DevOps'
    icon: '🧰'
    items: [Docker, Git, OpenObserve, Figma]

  - category: 'Kỹ năng mềm'
    icon: '🤝'
    items: [Lãnh đạo, Làm việc nhóm, Nghiên cứu, Giao tiếp, Đọc tài liệu kỹ thuật tiếng Anh]

projects:
  - name: 'The Advance Chat'
    period: '06/2026 - Hiện tại'
    description: 'Ứng dụng chat Android của công ty, xây dựng trên bản fork của Telegram mã nguồn mở, giữ nguyên giao diện, thao tác và hiệu năng.'
    highlights:
      - 'Sửa lỗi giao diện trên codebase đã fork.'
      - 'Chuyển tầng giao tiếp từ MTProto sang REST API để ứng dụng chạy với backend của công ty.'
    techs: [Java, Android, REST API]

  - name: 'Booking Center'
    period: '07/2025 - 09/2025'
    description: 'Hệ thống đặt lịch tập trung, ghi nhận và lưu trữ thông tin lịch hẹn của khách hàng từ các kênh của Ngọc Dung.'
    techs: [TypeScript, Node.js, PostgreSQL, Redis, REST API]

  - name: 'Ngoc Dung Beauty - Backend Platform'
    period: '04/2024 - Hiện tại'
    description: 'Các dịch vụ backend phía sau ứng dụng Ngọc Dung Beauty và Zalo Mini App, nơi tôi phụ trách chính backend từ 04/2024.'
    highlights:
      - 'Xây dựng các tính năng loyalty, voucher và mini game dưới dạng microservices giao tiếp qua REST API.'
      - 'Chuyển từ JavaScript sang TypeScript và từ MongoDB sang PostgreSQL, cải thiện hiệu năng đáng kể.'
      - 'Đánh index và partition cho bảng hơn 20 triệu dòng: ~100 ms khi truy vấn một bản ghi và ~500 ms khi truy vấn dữ liệu một năm (đo ở tầng API).'
      - 'Chạy nghiệp vụ loyalty bằng cron job, cache dữ liệu bằng Redis và tối ưu luồng push FCM.'
      - 'Giám sát server bằng OpenObserve.'
    techs: [TypeScript, Node.js, PostgreSQL, Redis, Microservices, FCM, OpenObserve]

  - name: 'Ngoc Dung Beauty App'
    period: '09/2023 - Hiện tại'
    description: 'Ứng dụng dành cho khách hàng của Thẩm mỹ Ngọc Dung để đặt lịch và quản lý dịch vụ làm đẹp.'
    highlights:
      - 'Phụ trách chính tính năng đặt lịch và hỗ trợ bảo trì các tính năng khác (09/2023 - 02/2024).'
      - 'Bổ sung tính năng chat và gọi điện (05/2025 - 06/2025): bảo trì Chatwoot và viết API tích hợp mới cho chat; xây dựng hệ thống call center trên LiveKit để quản lý room, token và lịch sử cuộc gọi, kèm JavaScript calling SDK nhúng được vào nhiều sản phẩm.'
    techs: [Flutter, Dart, JavaScript, Chatwoot, LiveKit]

  - name: 'Green Villas'
    period: '02/2024 - 03/2024'
    description: 'Ứng dụng quản lý bất động sản cho căn hộ và biệt thự, giúp chủ sở hữu theo dõi và đóng phí.'
    highlights:
      - 'Một mình xây dựng toàn bộ backend và CMS trong một tháng.'
      - 'Dùng Dart Frog cho API, Stormberry cho tầng database, Firebase cho thông báo và Redis để cache.'
    techs: [Dart, Dart Frog, Stormberry, Firebase, Redis]

  - name: 'Ngoc Dung Admin Portal'
    period: '10/2023 - 09/2025'
    description: 'Trang quản trị viết bằng Flutter web để quản lý nội dung cho ứng dụng Ngọc Dung Beauty và Zalo Mini App, đồng thời theo dõi số liệu và báo cáo.'
    highlights:
      - 'Xây dựng từ đầu, sau đó tiếp tục bảo trì.'
    techs: [Flutter Web, Dart]

  - name: 'Ngoc Dung Zalo Mini App'
    period: '11/2023 - 12/2023'
    description: 'Mini app Ngọc Dung trên Zalo, đưa các dịch vụ chính đến người dùng Zalo.'
    highlights:
      - 'Phụ trách chính tính năng đặt lịch.'
    techs: [React, Zalo Mini App SDK]

  - name: 'Unilever Vietnam - Factory Signal Management'
    period: '06/2023 - 08/2023'
    description: 'Hệ thống backend lấy và phân tích tín hiệu từ Azure Cloud, cung cấp thông tin cần thiết cho các nhà máy của Unilever Việt Nam.'
    highlights:
      - 'Phát triển các tính năng lấy và phân tích tín hiệu.'
      - 'Bảo trì các module hiện có và triển khai các bản phát hành mới.'
    techs: [TypeScript, NestJS, Azure]

  - name: 'Lothashop - E-commerce App'
    description: 'Ứng dụng mobile cho phép cá nhân bán sản phẩm cho khách hàng với tư cách đại lý được ủy quyền của LothaMilk.'
    highlights:
      - 'Dựng codebase dự án từ đầu.'
      - 'Cùng team backend thiết kế database và luồng nghiệp vụ.'
      - 'Tích hợp thanh toán MoMo và VNPay, thông báo đẩy (FCM) và báo cáo crash (Crashlytics).'
    techs: [Flutter, Dart, Cubit, Firebase]

  - name: 'Totoday - E-commerce App'
    description: 'Ứng dụng mobile để xem và mua sản phẩm của thương hiệu Totoday.'
    highlights:
      - 'Xây dựng các tính năng danh sách sản phẩm, tìm kiếm, thanh toán và quản lý tài khoản.'
      - 'Tích hợp thanh toán ví điện tử MoMo và VNPay.'
      - 'Phát hành ứng dụng lên Google Play Store.'
    techs: [Flutter, Dart, Cubit]

  - name: 'DMS - Distribution Management System'
    description: 'Ứng dụng mobile quản lý phân phối sản phẩm.'
    highlights:
      - 'Bảo trì code cũ, phát triển tính năng mới và triển khai.'
      - 'Hướng dẫn đồng nghiệp về cấu trúc dự án và sửa lỗi.'
    techs: [Flutter, Dart]

  - name: 'Lamviettot'
    description: 'Ứng dụng khuyến khích trẻ em từ 5 đến 11 tuổi làm việc tốt.'
    highlights:
      - 'Bảo trì và sửa các tính năng hiện có.'
      - 'Phát triển tính năng mới bằng Kotlin.'
    techs: [Kotlin, Android]

  - name: 'Personal Blog & Portfolio'
    description: 'Chính trang này: CV và blog tĩnh hoàn toàn, nơi tôi viết về những gì học được, bài viết được quản lý qua CMS dựa trên Git.'
    github: 'https://github.com/hieubm1707/blogs'
    techs: [Vue 3, VitePress, Decap CMS, TailwindCSS, Netlify]

education:
  - degree: 'Cử nhân Công nghệ Thông tin'
    school: 'Trường Đại học Công nghệ Thông tin (UIT)'
    period: '2018 - 2022'
    description: 'Phó Chủ tịch Hội Sinh viên trường.'

certifications:
  - title: 'TOEIC 665'
    issuer: 'ETS'
---
