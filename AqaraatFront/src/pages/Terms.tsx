import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building, Shield, Phone, DollarSign, GraduationCap, AlertTriangle } from "lucide-react";
import assiutImage from "@/assets/assiut-image.jpg";

const Terms = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    // حفظ موافقة المستخدم
    localStorage.setItem('termsAccepted', 'true');
    navigate("/dashboard");
  };

  const handleReject = () => {
    // حذف بيانات المستخدم عند الرفض
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('termsAccepted');
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mx-auto w-full h-64 mb-6 rounded-xl overflow-hidden shadow-elevated">
            <img 
              src={assiutImage} 
              alt="محافظة أسيوط" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
              <div className="text-white text-center">
                <Building className="w-12 h-12 mx-auto mb-4 animate-float" />
                <h1 className="text-4xl font-bold mb-2">🏠 عقارات أسيوط</h1>
                <p className="text-xl opacity-90">الشروط والأحكام وتعريف البرنامج</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-brand-orange">
              🏠 عقارات أسيوط
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full rounded-md border p-4">
              <div className="space-y-6 text-right" dir="rtl">
                
                {/* Program Definition */}
                <div className="bg-brand-orange-light p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="w-6 h-6 text-brand-orange" />
                    <h3 className="text-lg font-bold text-brand-orange">تعريف البرنامج</h3>
                  </div>
                  <p className="text-sm leading-relaxed">
                    🏠 عقارات أسيوط هو تطبيق ويب يربط المالكين بالمستأجرين مباشرة داخل محافظة أسيوط بدون وسطاء.
                    يتيح عرض الشقق والمكاتب للإيجار أو البيع بسهولة من خلال واجهة استخدام بسيطة تدعم الهاتف والكمبيوتر.
                    يمكنك البحث حسب الموقع، النوع، السعر، وعدد الغرف، مع عرض صور وفيديوهات للعقار.
                  </p>
                </div>

                {/* Contact */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-bold text-blue-600">📞 التواصل المباشر</h3>
                  </div>
                  <p className="text-sm leading-relaxed">
                    التواصل مباشر بين المالك والمستأجر من خلال رقم الهاتف أو واتساب المسجل في الإعلان.
                  </p>
                </div>

                {/* Privacy */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-bold text-green-600">🔒 سياسة الخصوصية</h3>
                  </div>
                  <ul className="text-sm space-y-2 leading-relaxed">
                    <li>• يتم جمع بيانات أساسية فقط مثل الاسم، رقم الهاتف، العنوان، صور العقار.</li>
                    <li>• تُستخدم بياناتك فقط لتحسين تجربة الاستخدام وتسهيل التواصل داخل المنصة.</li>
                    <li>• لا يتم مشاركة بياناتك مع أي طرف ثالث بدون إذنك أو وفق القانون.</li>
                    <li>• نستخدم تقنيات حديثة لحماية البيانات، والوصول إليها مقتصر على الإدارة فقط.</li>
                    <li>• يمكنك تعديل أو حذف حسابك وبياناتك بالكامل في أي وقت.</li>
                  </ul>
                </div>

                {/* Fees */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-lg font-bold text-yellow-600">💰 نظام الرسوم</h3>
                  </div>
                  <ul className="text-sm space-y-2 leading-relaxed">
                    <li>• عند تأجير العقار: تخصم المنصة 15% من قيمة الإيجار الشهري.</li>
                    <li>• عند البيع أو الشراء: تخصم 0.25% فقط من قيمة البيع.</li>
                    <li>• عند تأجير مكاتب إدارية: تخصم 15% من قيمة الإيجار.</li>
                  </ul>
                </div>

                {/* Students */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                    <h3 className="text-lg font-bold text-purple-600">👨‍🎓 للطلاب</h3>
                  </div>
                  <p className="text-sm leading-relaxed">
                    يتم دفع 100 جنيه فقط عند استلام الشقة كرسوم دعم.
                  </p>
                </div>

                {/* Warning */}
                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-bold text-red-600">❌ تحذير مهم</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-red-700 font-medium">
                    يمنع التحايل أو إتمام الاتفاق مع المالك خارج التطبيق دون علم الإدارة، وإلا سيتم إيقاف الحساب.
                  </p>
                </div>

              </div>
            </ScrollArea>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6" dir="rtl">
              <Button 
                onClick={handleAccept}
                variant="brand"
                size="lg"
                className="flex-1 text-lg font-bold py-4"
              >
                ✅ أوافق على الشروط والأحكام
              </Button>
              <Button 
                onClick={handleReject}
                variant="outline"
                size="lg"
                className="flex-1 text-lg py-4"
              >
                ❌ غير موافق
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;