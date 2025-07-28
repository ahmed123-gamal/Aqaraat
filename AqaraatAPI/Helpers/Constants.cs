namespace AqaraatAPI.Helpers
{
    public static class Constants
    {
        // مناطق أسيوط
        public static readonly List<string> AssiutAreas = new List<string>
        {
            "الايمان",
            "الزهراء", 
            "الخميس الهلالى",
            "فريال",
            "صلاح سالم",
            "الوديه",
            "المعلمين",
            "الاربعين",
            "المحكمه",
            "الناصرية",
            "الحمراء",
            "شارع سيد",
            "موقف الازهر",
            "نزله عبدالله",
            "منقباد"
        };

        // مراكز محافظة أسيوط
        public static readonly List<string> AssiutDistricts = new List<string>
        {
            "ديروط",
            "اسيوط الجديده",
            "البدارى",
            "ساحل سليم",
            "الغنائم",
            "ابو تيج",
            "صدفا",
            "الفتح",
            "منفلوط",
            "ابنوب",
            "القوصيه"
        };

        // أنواع الكليات لتجميع الطلاب
        public static readonly List<string> MedicalColleges = new List<string>
        {
            "طب",
            "طب اسنان",
            "صيدله",
            "طب بيطرى",
            "تمريض"
        };

        public static readonly List<string> EngineeringColleges = new List<string>
        {
            "هندسه",
            "حاسبات ومعلومات"
        };

        // نسب الرسوم
        public const decimal RentalFeePercentage = 0.15m; // 15%
        public const decimal SaleFeePercentage = 0.0025m; // 0.25%
        public const decimal OfficeFeePercentage = 0.15m; // 15%
        public const decimal StudentFee = 100m; // 100 جنيه

        // رسائل النظام
        public const string StudentRequestPendingMessage = "الطلب قيد التنفيذ";
        public const string AdminOnlyPhoneAccess = "رقم الهاتف متاح للإدارة فقط";
    }
}
