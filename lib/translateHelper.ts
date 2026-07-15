export function tStr(text: any, locale: string): string {
  if (!text) return "";
  if (typeof text !== "string") return text;
  if (locale !== "ar") return text;

  const arMap: Record<string, string> = {
    // Categories
    "Music": "موسيقى",
    "Sports": "رياضة",
    "Technology": "تكنولوجيا",
    "Food & Drink": "طعام وشراب",
    "Art": "فن",
    "Business": "أعمال",

    // Venues
    "Cairo Opera House": "دار الأوبرا المصرية",
    "Cairo Stadium": "ستاد القاهرة",
    "Smart Village": "القرية الذكية",
    "Garden City Arena": "صالة جاردن سيتي",

    // Events
    "Cairo Jazz Festival 2026": "مهرجان القاهرة للجاز 2026",
    "Egyptian Premier League Final": "نهائي الدوري المصري الممتاز",
    "TechSummit Egypt 2026": "قمة التكنولوجيا في مصر 2026",
    "Cairo Food Festival": "مهرجان القاهرة للمأكولات",
    "Modern Egyptian Art Exhibition": "معرض الفن المصري الحديث",
    "Startup Pitch Night Cairo": "ليلة عرض الشركات الناشئة بالقاهرة",
    "Amr Diab Live in Concert": "حفل عمرو دياب المباشر",
    "Cairo International Book Fair": "معرض القاهرة الدولي للكتاب",

    // Cities / Governorates / Countries
    "Cairo": "القاهرة",
    "Giza": "الجيزة",
    "Cairo Governorate": "محافظة القاهرة",
    "Giza Governorate": "محافظة الجيزة",
    "Egypt": "مصر",

    // Addresses
    "Gezira St, Zamalek": "شارع الجزيرة، الزمالك",
    "KM 28 Cairo-Alexandria Desert Road": "الكيلو 28 طريق القاهرة الإسكندرية الصحراوي",
    "12 El Saraya Al Kobra, Garden City": "12 السرايا الكبرى، جاردن سيتي",
    "Grand Arena, Downtown": "الساحة الكبرى، وسط البلد",
    "Nasr City": "مدينة نصر",

    // Event Descriptions
    "Annual international jazz festival featuring global artists.": "المهرجان الدولي السنوي لموسيقى الجاز بمشاركة فنانين عالميين.",
    "The championship-deciding match of the Egyptian football season.": "المباراة الحاسمة للبطولة في موسم كرة القدم المصري.",
    "The biggest gathering of developers, founders, and investors in the MENA region.": "أكبر تجمع للمطورين والمؤسسين والمستثمرين في منطقة الشرق الأوسط وشمال أفريقيا.",
    "A celebration of Egyptian and international culinary delights.": "احتفال بالمأكولات والحلويات المصرية والعالمية.",
    "Showcasing contemporary masterpieces from Egypt's leading artists.": "عرض الروائع المعاصرة من كبار الفنانين في مصر.",
    "A night of innovation where top startups pitch to investors.": "ليلة للابتكار حيث تعرض أفضل الشركات الناشئة مشاريعها على المستثمرين.",
    "An unforgettable night with the legendary Arab pop superstar.": "ليلة لا تُنسى مع النجم الأسطوري لموسيقى البوب العربية.",
    "One of the largest and oldest book fairs in the Arab world.": "أحد أكبر وأقدم معارض الكتب في العالم العربي.",

    // Venue Descriptions
    "Egypt's premier venue for performing arts, opera, and classical concerts. Located on Gezira Island.": "أبرز دار للفنون الأدائية والأوبرا والحفلات الموسيقية الكلاسيكية في مصر، تقع في جزيرة الجزيرة.",
    "The historic multipurpose stadium in Cairo, hosting national football matches and major tournaments.": "الاستاد التاريخي متعدد الأغراض في القاهرة، يستضيف مباريات كرة القدم الوطنية والبطولات الكبرى.",
    "The high-tech hub on the outskirts of Cairo, featuring modern conference spaces and technology centers.": "المركز التكنولوجي المتطور على أطراف القاهرة، يتميز بمساحات مؤتمرات حديثة ومراكز تكنولوجية.",
    "A modern indoor arena located in the heart of Garden City, suitable for sports and concerts.": "صالة مغطاة حديثة تقع في قلب جاردن سيتي، مناسبة للرياضة والحفلات الموسيقية.",

    // Category Descriptions
    "Live concerts, festivals, and musical performances": "حفلات موسيقية حية ومهرجانات وعروض موسيقية",
    "Sporting events, tournaments, and athletic competitions": "فعاليات رياضية وبطولات ومسابقات رياضية",
    "Tech conferences, hackathons, and innovation summits": "مؤتمرات تكنولوجية وهاكاثونات وقمم ابتكار",
    "Food festivals, tastings, and culinary experiences": "مهرجانات طعام وتذوق وتجارب طهي",
    "Art exhibitions, gallery openings, and creative workshops": "معارض فنية وافتتاح صالات عرض وورش عمل إبداعية",
    "Networking events, seminars, and professional conferences": "فعاليات تواصل وندوات ومؤتمرات مهنية",

    // Amenities
    "Parking": "مواقف سيارات",
    "WiFi": "إنترنت لاسلكي",
    "VIP Lounge": "صالة كبار الشخصيات",
    "Air Conditioning": "تكييف هواء",
    "Wheelchair Access": "مدخل للكراسي المتحركة",
    "Food Court": "منطقة مطاعم"
  };

  return arMap[text.trim()] || text;
}
