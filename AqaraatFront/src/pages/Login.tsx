import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Mail, Phone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import assiutImage from "@/assets/assiut-image.jpg";
import assiutLogo from "@/assets/assiut-logo.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!email || !phone) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // محاكاة تسجيل الدخول بدون أخطاء
    setTimeout(() => {
      setIsLoading(false);
      // حفظ بيانات المستخدم في localStorage
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        email: email,
        phone: phone,
        name: 'مستخدم أسيوط'
      }));
      localStorage.setItem('token', 'fake-token-123');
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في منصة عقارات أسيوط",
      });
      
      // الذهاب مباشرة لصفحة الشروط
      navigate("/terms");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Hero Image with Logo */}
        <div className="text-center mb-8">
          {/* Assiut Logo */}
          <div className="mx-auto w-20 h-20 mb-4 rounded-full overflow-hidden shadow-elevated bg-white p-2">
            <img 
              src={assiutLogo} 
              alt="شعار أسيوط" 
              className="w-full h-full object-cover rounded-full animate-pulse"
            />
          </div>
          
          {/* Main Hero Image */}
          <div className="relative mx-auto w-64 h-40 mb-6 rounded-lg overflow-hidden shadow-elevated">
            <img 
              src={assiutImage} 
              alt="محافظة أسيوط" 
              className="w-full h-full object-cover animate-fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center">
              <div className="text-white text-center p-4">
                <Building className="w-8 h-8 mx-auto mb-2 animate-bounce" />
                <h1 className="text-xl font-bold animate-fade-in">عقارات أسيوط</h1>
                <p className="text-sm animate-fade-in">محافظة أسيوط</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-elevated bg-white/95 backdrop-blur-sm border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              تسجيل الدخول
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              مرحباً بك في منصة عقارات أسيوط
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right block">
                البريد الإلكتروني
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-right block">
                رقم الهاتف
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="أدخل رقم هاتفك"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <Button 
              onClick={handleLogin}
              variant="brand"
              size="lg"
              className="w-full text-lg font-medium"
              disabled={!email || !phone || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              بالتسجيل أنت توافق على الشروط والأحكام
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;