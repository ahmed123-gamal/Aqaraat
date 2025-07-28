import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Building, MapPin, LogOut, User, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "تم تسجيل الخروج",
      description: "شكراً لاستخدامك منصة عقارات أسيوط",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-brand-orange" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">عقارات أسيوط</h1>
                <p className="text-sm text-muted-foreground">منصة العقارات الرائدة في محافظة أسيوط</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user?.name || user?.email || 'مستخدم'}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            مرحباً بك في منصة عقارات أسيوط
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            اختر ما تريد فعله للبدء في رحلتك العقارية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Search for Property */}
          <Card className="group hover:shadow-elevated transition-all duration-300 cursor-pointer border-2 hover:border-brand-orange/20">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-brand-orange-light rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-10 h-10 text-brand-orange" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                البحث عن شقة
              </CardTitle>
              <CardDescription className="text-lg">
                ابحث عن الشقة أو العقار المناسب لك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/search")}
                variant="brand"
                size="xl"
                className="w-full"
              >
                ابدأ البحث
              </Button>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                شراء • إيجار عائلي • سكن طلاب
              </div>
            </CardContent>
          </Card>

          {/* Add Property */}
          <Card className="group hover:shadow-elevated transition-all duration-300 cursor-pointer border-2 hover:border-brand-orange/20">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-brand-orange-light rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-10 h-10 text-brand-orange" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                إضافة شقة
              </CardTitle>
              <CardDescription className="text-lg">
                أضف عقارك واعرضه للبيع أو الإيجار
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/add-property")}
                variant="brand"
                size="xl"
                className="w-full"
              >
                إضافة عقار
              </Button>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                بيع • إيجار • سكن طلاب
              </div>
            </CardContent>
          </Card>

          {/* My Properties */}
          <Card className="group hover:shadow-elevated transition-all duration-300 cursor-pointer border-2 hover:border-brand-orange/20">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Home className="w-10 h-10 text-purple-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                عقاراتي
              </CardTitle>
              <CardDescription className="text-lg">
                إدارة العقارات المضافة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/my-properties")}
                variant="brand-outline"
                size="xl"
                className="w-full"
              >
                عرض عقاراتي
              </Button>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                عرض • تعديل • حذف
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-xl shadow-card p-8">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            لماذا عقارات أسيوط؟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-brand-orange" />
              </div>
              <h4 className="text-lg font-semibold mb-2">بدون وسطاء</h4>
              <p className="text-muted-foreground">تواصل مباشر بين المالك والمستأجر</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-brand-orange" />
              </div>
              <h4 className="text-lg font-semibold mb-2">تغطية شاملة</h4>
              <p className="text-muted-foreground">جميع مناطق ومراكز محافظة أسيوط</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-brand-orange" />
              </div>
              <h4 className="text-lg font-semibold mb-2">بحث متقدم</h4>
              <p className="text-muted-foreground">فلترة حسب النوع والموقع والسعر</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;