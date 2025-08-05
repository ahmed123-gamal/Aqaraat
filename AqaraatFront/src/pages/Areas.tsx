import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Building2, Home, GraduationCap, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Areas = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyType = searchParams.get("type");
  const [selectedArea, setSelectedArea] = useState("");

  const typeLabels = {
    "buy": "شراء",
    "rent-family": "سكن عائلي", 
    "rent-students": "سكن طلاب"
  };

  const areas = [
    // القيسارية – المجاهدين – غرب البلد – الجمهورية – يسري راغب – الهلالي – ثابت
    { id: "alqaysariya", name: "القيسارية", count: 15 },
    { id: "almujahidin", name: "المجاهدين", count: 12 },
    { id: "gharb-albalad", name: "غرب البلد", count: 18 },
    { id: "aljumhuriyah", name: "الجمهورية", count: 22 },
    { id: "yusri-ragab", name: "يسري راغب", count: 14 },
    { id: "alhelali", name: "الهلالي", count: 16 },
    { id: "thabit", name: "ثابت", count: 10 },
    
    // الوليدية – 26 يوليو – الجيش – السادات – مساكن الأزهر – الفتح
    { id: "alwalidiyah", name: "الوليدية", count: 20 },
    { id: "26-july", name: "26 يوليو", count: 25 },
    { id: "aljaysh", name: "الجيش", count: 18 },
    { id: "alsadat", name: "السادات", count: 16 },
    { id: "masakin-alazhar", name: "مساكن الأزهر", count: 30 },
    { id: "alfath", name: "الفتح", count: 12 },
    
    // الحمراء – منقباد – السلام – مساكن الشباب
    { id: "alhamra", name: "الحمراء", count: 24 },
    { id: "manqabad", name: "منقباد", count: 15 },
    { id: "alsalam", name: "السلام", count: 19 },
    { id: "masakin-alshabab", name: "مساكن الشباب", count: 28 },
    
    // نزلة عبداللاه – الأربعين – كدواني – المعلمين – منشية المعلمين
    { id: "nazlat-abdullah", name: "نزلة عبداللاه", count: 8 },
    { id: "alarbaein", name: "الأربعين", count: 14 },
    { id: "kadwani", name: "كدواني", count: 11 },
    { id: "almoalimin", name: "المعلمين", count: 26 },
    { id: "manshiyat-almoalimin", name: "منشية المعلمين", count: 20 },
    
    // سيتي – الفردوس – الهضبة – حوض الزعفران – ميدان البنوك – شارع الرياض – شارع سيد
    { id: "city", name: "سيتي", count: 32 },
    { id: "alfirdaws", name: "الفردوس", count: 18 },
    { id: "alhadabah", name: "الهضبة", count: 22 },
    { id: "hawd-alzaafaran", name: "حوض الزعفران", count: 12 },
    { id: "maydan-albunuk", name: "ميدان البنوك", count: 35 },
    { id: "shari-alriyadh", name: "شارع الرياض", count: 28 },
    { id: "shari-sayyid", name: "شارع سيد", count: 30 }
  ];

  const centers = [
    { id: "dairout", name: "ديروط", count: 25 },
    { id: "new-assiut", name: "اسيوط الجديده", count: 30 },
    { id: "albadari", name: "البدارى", count: 12 },
    { id: "sahel-selim", name: "ساحل سليم", count: 8 },
    { id: "alghanayem", name: "الغنائم", count: 15 },
    { id: "abu-teeg", name: "ابو تيج", count: 22 },
    { id: "sedfa", name: "صدفا", count: 18 },
    { id: "alfath", name: "الفتح", count: 10 },
    { id: "manfalout", name: "منفلوط", count: 28 },
    { id: "abnoub", name: "ابنوب", count: 20 },
    { id: "alqusiya", name: "القوصيه", count: 16 }
  ];

  const { toast } = useToast();

  const handleAreaSelect = (areaId: string, areaName: string) => {
    toast({
      title: "تم اختيار المنطقة",
      description: `سيتم البحث في منطقة ${areaName}`,
    });
    
    if (propertyType === "rent-students") {
      navigate(`/student-requests?type=${propertyType}&area=${areaId}&areaName=${areaName}`);
    } else {
      navigate(`/properties?type=${propertyType}&area=${areaId}&areaName=${areaName}`);
    }
  };

  useEffect(() => {
    if (!propertyType) {
      navigate("/search");
    }
  }, [propertyType, navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-white shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/search")}
              className="gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              العودة
            </Button>
            <div className="h-6 w-px bg-border" />
            <MapPin className="w-5 h-5 text-brand-orange" />
            <h1 className="text-xl font-bold text-foreground">اختر المنطقة</h1>
            {propertyType && (
              <Badge variant="secondary" className="mr-auto">
                {typeLabels[propertyType as keyof typeof typeLabels]}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            اختر المنطقة أو المركز
          </h2>
          <p className="text-lg text-muted-foreground">
            حدد المنطقة التي تريد البحث فيها عن العقارات
          </p>
        </div>

        {/* Areas Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-brand-orange" />
            <h3 className="text-xl font-bold text-foreground">مناطق أسيوط</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {areas.map((area) => (
              <Card
                key={area.id}
                className="group hover:shadow-elevated transition-all duration-300 cursor-pointer border-2 hover:border-brand-orange/20"
                onClick={() => handleAreaSelect(area.id, area.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <MapPin className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{area.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {area.count} عقار متاح
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Centers Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-brand-orange" />
            <h3 className="text-xl font-bold text-foreground">مراكز محافظة أسيوط</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {centers.map((center) => (
              <Card
                key={center.id}
                className="group hover:shadow-elevated transition-all duration-300 cursor-pointer border-2 hover:border-brand-orange/20"
                onClick={() => handleAreaSelect(center.id, center.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <Building2 className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{center.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {center.count} عقار متاح
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-card p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">
            ماذا بعد اختيار المنطقة؟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">1</div>
              <p>عرض العقارات المتاحة في المنطقة</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">2</div>
              <p>مشاهدة تفاصيل كل عقار وصوره</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">3</div>
              <p>التواصل مع المالك مباشرة</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Areas;