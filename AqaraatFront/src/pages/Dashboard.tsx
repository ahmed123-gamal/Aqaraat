import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Building, MapPin, LogOut, User, Home, Clock, Users, Calendar, Trash2, Eye, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const [sessionDuration, setSessionDuration] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [showUsersList, setShowUsersList] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginTime] = useState(() => {
    const stored = localStorage.getItem('loginTime');
    return stored ? parseInt(stored) : Date.now();
  });

  useEffect(() => {
    // حفظ وقت تسجيل الدخول إذا لم يكن محفوظاً
    if (!localStorage.getItem('loginTime')) {
      localStorage.setItem('loginTime', loginTime.toString());
    }

    // تحديث مدة الجلسة كل ثانية
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const duration = Math.floor((currentTime - loginTime) / 1000);
      setSessionDuration(duration);
    }, 1000);

    // حساب عدد المستخدمين المسجلين
    const calculateUserStats = () => {
      try {
        // محاكاة قاعدة بيانات المستخدمين
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        if (users.length === 0) {
          // إضافة بيانات تجريبية للمستخدمين
          const mockUsers = [
            { 
              id: 1, 
              name: 'أحمد محمد', 
              email: 'ahmed.mohamed@example.com', 
              role: 'admin',
              registeredAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              sessionDuration: 3600,
              lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            { 
              id: 2, 
              name: 'فاطمة علي', 
              email: 'fatma.ali@student.aun.edu.eg', 
              role: 'student',
              registeredAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
              sessionDuration: 1800,
              lastLogin: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
            },
            { 
              id: 3, 
              name: 'محمد أحمد', 
              email: 'mohamed.ahmed@gmail.com', 
              role: 'owner',
              registeredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              sessionDuration: 2400,
              lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
            },
            { 
              id: 4, 
              name: 'سارة حسن', 
              email: 'sara.hassan@student.aun.edu.eg', 
              role: 'student',
              registeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              sessionDuration: 900,
              lastLogin: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
            },
            { 
              id: 5, 
              name: 'عمر خالد', 
              email: 'omar.khaled@yahoo.com', 
              role: 'owner',
              registeredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              sessionDuration: 3200,
              lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString()
            }
          ];
          localStorage.setItem('registeredUsers', JSON.stringify(mockUsers));
          setRegisteredUsers(mockUsers);
          setTotalUsers(mockUsers.length);
        } else {
          setRegisteredUsers(users);
          setTotalUsers(users.length);
        }

        // تحديد صلاحيات المستخدم الحالي
        const currentUserEmail = user?.email;
        const currentUser = users.find((u: any) => u.email === currentUserEmail);
        setIsAdmin(currentUser?.role === 'admin' || currentUserEmail === 'admin@aqaraat.com');

        // حساب عدد العقارات المضافة
        const addedProperties = JSON.parse(localStorage.getItem('addedProperties') || '[]');
        setTotalProperties(addedProperties.length + 3); // 3 عقارات تجريبية + المضافة
      } catch (error) {
        console.error('Error calculating stats:', error);
      }
    };

    calculateUserStats();

    // تحديث الإحصائيات عند إضافة عقار جديد
    const handlePropertyAdded = () => {
      calculateUserStats();
    };

    window.addEventListener('propertyAdded', handlePropertyAdded);

    return () => {
      clearInterval(interval);
      window.removeEventListener('propertyAdded', handlePropertyAdded);
    };
  }, [loginTime]);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours} ساعة و ${minutes} دقيقة`;
    } else if (minutes > 0) {
      return `${minutes} دقيقة و ${secs} ثانية`;
    } else {
      return `${secs} ثانية`;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loginTime'); // إزالة وقت الدخول عند تسجيل الخروج
    logout();
    toast({
      title: "تم تسجيل الخروج",
      description: "شكراً لاستخدامك منصة عقارات أسيوط",
    });
    navigate("/");
  };

  const handleUserCountClick = () => {
    if (isAdmin) {
      setShowUsersList(true);
    } else {
      toast({
        title: "غير مسموح",
        description: "هذه الميزة متاحة للمديرين فقط",
        variant: "destructive"
      });
    }
  };

  const handlePropertiesClick = () => {
    if (isAdmin) {
      navigate('/admin-management');
    } else {
      navigate('/properties');
    }
  };

  const handleDeleteUser = (userId: number) => {
    if (!isAdmin) {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية لحذف المستخدمين",
        variant: "destructive"
      });
      return;
    }

    const updatedUsers = registeredUsers.filter(user => user.id !== userId);
    setRegisteredUsers(updatedUsers);
    setTotalUsers(updatedUsers.length);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "تم الحذف",
      description: "تم حذف المستخدم بنجاح",
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'owner': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'مدير';
      case 'owner': return 'مالك';
      case 'student': return 'طالب';
      default: return 'مستخدم';
    }
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

          {/* Session Duration */}
          <Card className="group hover:shadow-elevated transition-all duration-300 cursor-pointer border-2 hover:border-brand-orange/20">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-blue-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                مدة الجلسة
              </CardTitle>
              <CardDescription className="text-lg">
                الوقت المقضي في التطبيق
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {formatDuration(sessionDuration)}
                </div>
                <div className="text-sm text-muted-foreground">
                  منذ تسجيل الدخول
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Stats Section */}
        <div className="mt-16 space-y-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Total Users Card */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isAdmin ? 'hover:border-brand-orange border-2' : 'hover:shadow-md'
              }`}
              onClick={handleUserCountClick}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي المستخدمين</p>
                    <p className="text-3xl font-bold text-foreground">{totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                {isAdmin && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-brand-orange">
                    <Eye className="w-3 h-3" />
                    <span>اضغط لعرض القائمة</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Session Duration Card */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">مدة الجلسة</p>
                    <p className="text-2xl font-bold text-foreground">{formatDuration(sessionDuration)}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Properties Card */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isAdmin ? 'hover:border-brand-orange border-2' : 'hover:shadow-md'
              }`}
              onClick={handlePropertiesClick}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">العقارات المتاحة</p>
                    <p className="text-3xl font-bold text-foreground">{totalProperties}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                {isAdmin && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-brand-orange">
                    <Eye className="w-3 h-3" />
                    <span>اضغط لعرض المناطق</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Areas Covered Card */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">المناطق المغطاة</p>
                    <p className="text-3xl font-bold text-foreground">12</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Badge */}
          {isAdmin && (
            <div className="flex justify-center">
              <Badge className="bg-red-100 text-red-800 px-4 py-2 text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                صلاحيات المدير
              </Badge>
            </div>
          )}

          {/* Features Section */}
          <div className="bg-white rounded-xl shadow-card p-8">
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
        </div>

        {/* Users List Modal */}
        <Dialog open={showUsersList} onOpenChange={setShowUsersList}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">قائمة المستخدمين المسجلين</DialogTitle>
              <DialogDescription>
                إجمالي {totalUsers} مستخدم مسجل في المنصة
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {registeredUsers.map((user) => (
                <Card key={user.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-orange-light rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-brand-orange" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {getRoleLabel(user.role)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            مدة الجلسة: {formatDuration(user.sessionDuration)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm text-muted-foreground">
                        <p>تاريخ التسجيل:</p>
                        <p>{new Date(user.registeredAt).toLocaleDateString('ar-EG')}</p>
                        <p className="text-xs mt-1">
                          آخر دخول: {new Date(user.lastLogin).toLocaleString('ar-EG')}
                        </p>
                      </div>
                      {isAdmin && user.role !== 'admin' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          حذف
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Dashboard;
