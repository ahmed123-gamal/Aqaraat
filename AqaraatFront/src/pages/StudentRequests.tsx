import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, GraduationCap, MapPin, Search, Filter, Plus, Phone, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentRequest {
  id: string;
  studentName: string;
  college: string;
  area: string;
  budget: number;
  requirements: string;
  contact: string;
  status: string;
  createdAt: string;
}

const StudentRequests = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const propertyType = searchParams.get("type");
  const area = searchParams.get("area");
  const areaName = searchParams.get("areaName");
  
  const [requests, setRequests] = useState<StudentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [studentName, setStudentName] = useState("");
  const [college, setCollege] = useState("");
  const [budget, setBudget] = useState("");
  const [requirements, setRequirements] = useState("");

  const colleges = [
    "كلية الطب",
    "كلية الهندسة",
    "كلية العلوم",
    "كلية التجارة",
    "كلية الآداب",
    "كلية التربية",
    "كلية الزراعة",
    "كلية الحقوق",
    "كلية التمريض",
    "كلية الصيدلة"
  ];

  // Mock data for student requests
  const mockRequests: StudentRequest[] = [
    {
      id: "1",
      studentName: "أحمد محمد",
      college: "كلية الطب",
      area: "المعلمين",
      budget: 800,
      requirements: "غرفة مفروشة مع خدمات كاملة، قريبة من الجامعة",
      contact: "0123456789",
      status: "مفتوح",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      studentName: "فاطمة علي",
      college: "كلية الهندسة",
      area: "الايمان",
      budget: 1000,
      requirements: "شقة صغيرة مع مطبخ، هادئة ومناسبة للدراسة",
      contact: "0123456790",
      status: "مفتوح",
      createdAt: "2024-01-14"
    }
  ];

  useEffect(() => {
    if (!propertyType || !area) {
      navigate("/search");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, [propertyType, area, navigate]);

  const handleAddRequest = () => {
    if (!studentName || !college || !budget || !requirements) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const newRequest: StudentRequest = {
      id: Date.now().toString(),
      studentName,
      college,
      area: areaName || "",
      budget: parseFloat(budget),
      requirements,
      contact: "0123456789", // Mock contact
      status: "مفتوح",
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRequests([newRequest, ...requests]);
    setShowAddForm(false);
    setStudentName("");
    setCollege("");
    setBudget("");
    setRequirements("");

    toast({
      title: "تم إضافة الطلب بنجاح",
      description: "سيتم التواصل معك قريباً",
    });
  };

  const handleContact = (contact: string, studentName: string) => {
    toast({
      title: "معلومات التواصل",
      description: `رقم الهاتف: ${contact}`,
    });
  };

  const handleWhatsApp = (contact: string, studentName: string) => {
    const message = `مرحباً، أنا مهتم بـ طلب الطالب ${studentName}`;
    const whatsappUrl = `https://wa.me/2${contact}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري البحث عن الطلبات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-white shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/areas")}
              className="gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              العودة
            </Button>
            <div className="h-6 w-px bg-border" />
            <GraduationCap className="w-5 h-5 text-brand-orange" />
            <h1 className="text-xl font-bold text-foreground">طلبات الطلاب</h1>
            <Badge variant="secondary" className="mr-auto">
              {areaName}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              طلبات الطلاب في {areaName}
            </h2>
            <p className="text-lg text-muted-foreground">
              تم العثور على {requests.length} طلب
            </p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            variant="brand"
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            إضافة طلب جديد
          </Button>
        </div>

        {/* Add Request Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>إضافة طلب جديد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">اسم الطالب</label>
                  <Input
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="أدخل اسم الطالب"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">الكلية</label>
                  <Select value={college} onValueChange={setCollege}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الكلية" />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map((col) => (
                        <SelectItem key={col} value={col}>{col}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">الميزانية الشهرية</label>
                  <Input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="أدخل الميزانية"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">المنطقة</label>
                  <Input value={areaName || ""} disabled />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">المتطلبات</label>
                <Textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="اكتب متطلباتك بالتفصيل..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddRequest} variant="brand">
                  إضافة الطلب
                </Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline">
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {requests.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">لا توجد طلبات</h3>
              <p className="text-muted-foreground mb-4">
                لا توجد طلبات طلاب في هذه المنطقة حالياً
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                إضافة طلب جديد
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
              <Card key={request.id} className="hover:shadow-elevated transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">
                      {request.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {request.area}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{request.studentName}</CardTitle>
                  <p className="text-sm text-muted-foreground">{request.college}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {request.requirements}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-brand-orange">
                      {request.budget.toLocaleString()} جنيه
                    </span>
                    <span className="text-sm text-muted-foreground">
                      شهرياً
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleContact(request.contact, request.studentName)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      اتصال
                    </Button>
                    <Button 
                      variant="brand" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleWhatsApp(request.contact, request.studentName)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      واتساب
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentRequests; 