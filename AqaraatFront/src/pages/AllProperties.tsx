import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Home, ShoppingCart, GraduationCap, Edit, Trash2, Phone, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  area: string;
  rooms?: number;
  size?: number;
  contact: string;
  images?: string[];
  videos?: string[];
  ownerId?: string;
  addedDate?: string;
}

const AllProperties = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const typeLabels = {
    "buy": "شراء",
    "rent-family": "سكن عائلي", 
    "rent-students": "سكن طلاب"
  };

  const typeIcons = {
    "buy": ShoppingCart,
    "rent-family": Home,
    "rent-students": GraduationCap
  };

  // Mock data for properties
  const mockProperties: Property[] = [
    {
      id: "1",
      title: "شقة مميزة للبيع",
      description: "شقة 3 غرف نوم + صالة + مطبخ + 2 حمام في منطقة مميزة",
      price: 850000,
      type: "buy",
      area: "الايمان",
      rooms: 3,
      size: 120,
      contact: "0123456789",
      ownerId: "user1",
      addedDate: "2024-01-15",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&crop=center&auto=format&q=95&sharp=10&con=15&bri=5&sat=10",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&h=800&fit=crop&crop=center&auto=format&q=95&sharp=10&con=15&bri=5&sat=10"
      ]
    },
    {
      id: "2",
      title: "شقة للإيجار العائلي",
      description: "شقة 2 غرف نوم + صالة + مطبخ + حمام مناسب للعائلة",
      price: 2500,
      type: "rent-family",
      area: "الزهراء",
      rooms: 2,
      size: 90,
      contact: "0123456790",
      ownerId: "user2",
      addedDate: "2024-01-20",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&crop=center&auto=format&q=95&sharp=10&con=15&bri=5&sat=10"
      ]
    },
    {
      id: "3",
      title: "غرفة للطلاب",
      description: "غرفة مفروشة للطلاب مع خدمات كاملة",
      price: 800,
      type: "rent-students",
      area: "المعلمين",
      rooms: 1,
      size: 25,
      contact: "0123456791",
      ownerId: "user3",
      addedDate: "2024-01-25",
      images: [
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&h=800&fit=crop&crop=center&auto=format&q=95&sharp=10&con=15&bri=5&sat=10"
      ]
    }
  ];

  const getAddedProperties = (): Property[] => {
    try {
      const addedProperties = localStorage.getItem('addedProperties');
      return addedProperties ? JSON.parse(addedProperties) : [];
    } catch (error) {
      console.error('Error loading added properties:', error);
      return [];
    }
  };

  const isAdmin = (): boolean => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'admin';
  };

  const handleDeleteProperty = (propertyId: string, propertyTitle: string) => {
    if (!isAdmin()) {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية لحذف هذا العقار",
        variant: "destructive"
      });
      return;
    }

    if (confirm(`هل أنت متأكد من حذف العقار: ${propertyTitle}؟`)) {
      try {
        // حذف من العقارات المضافة
        const addedProperties = getAddedProperties();
        const updatedProperties = addedProperties.filter(p => p.id !== propertyId);
        localStorage.setItem('addedProperties', JSON.stringify(updatedProperties));

        // تحديث القائمة المحلية
        setProperties(prev => prev.filter(p => p.id !== propertyId));

        // إرسال حدث التحديث
        const event = new CustomEvent('propertyDeleted', { detail: { propertyId } });
        window.dispatchEvent(event);

        toast({
          title: "تم الحذف بنجاح",
          description: `تم حذف العقار: ${propertyTitle}`,
        });
      } catch (error) {
        toast({
          title: "خطأ في الحذف",
          description: "حدث خطأ أثناء حذف العقار",
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteAllAIProperties = () => {
    if (!isAdmin()) {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية لحذف العقارات",
        variant: "destructive"
      });
      return;
    }

    const aiPropertiesCount = mockProperties.length;
    
    if (confirm(`هل أنت متأكد من حذف جميع العقارات المضافة بواسطة الذكاء الاصطناعي؟ (${aiPropertiesCount} عقار)`)) {
      try {
        // الاحتفاظ بالعقارات المضافة من قبل المستخدمين فقط
        const userAddedProperties = getAddedProperties();
        setProperties(userAddedProperties);

        toast({
          title: "تم الحذف بنجاح",
          description: `تم حذف ${aiPropertiesCount} عقار مضاف بواسطة الذكاء الاصطناعي`,
        });

        // إرسال حدث التحديث
        const event = new CustomEvent('aiPropertiesDeleted');
        window.dispatchEvent(event);
      } catch (error) {
        toast({
          title: "خطأ في الحذف",
          description: "حدث خطأ أثناء حذف العقارات",
          variant: "destructive"
        });
      }
    }
  };

  const handleContact = (contact: string, propertyTitle: string) => {
    window.open(`tel:${contact}`, '_self');
  };

  const handleWhatsApp = (contact: string, propertyTitle: string) => {
    const message = `مرحباً، أنا مهتم بالعقار: ${propertyTitle}`;
    window.open(`https://wa.me/${contact}?text=${encodeURIComponent(message)}`, '_blank');
  };

  useEffect(() => {
    // التحقق من صلاحيات الأدمن
    if (!isAdmin()) {
      toast({
        title: "غير مسموح",
        description: "ليس لديك صلاحية للوصول لهذه الصفحة",
        variant: "destructive"
      });
      navigate("/dashboard");
      return;
    }

    setTimeout(() => {
      const allProperties = [...mockProperties, ...getAddedProperties()];
      setProperties(allProperties);
      setLoading(false);
    }, 500);

    // Listen for property updates
    const handlePropertyUpdate = () => {
      const allProperties = [...mockProperties, ...getAddedProperties()];
      setProperties(allProperties);
    };

    window.addEventListener('propertyAdded', handlePropertyUpdate);
    window.addEventListener('propertyDeleted', handlePropertyUpdate);
    
    return () => {
      window.removeEventListener('propertyAdded', handlePropertyUpdate);
      window.removeEventListener('propertyDeleted', handlePropertyUpdate);
    };
  }, [navigate]);

  // تجميع العقارات حسب المنطقة
  const propertiesByArea = properties.reduce((acc, property) => {
    if (!acc[property.area]) {
      acc[property.area] = [];
    }
    acc[property.area].push(property);
    return acc;
  }, {} as Record<string, Property[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل العقارات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">جميع العقارات المتاحة</h1>
            <p className="text-gray-600">إدارة شاملة لجميع العقارات في النظام</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للوحة التحكم
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDeleteAllAIProperties}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            حذف جميع العقارات المضافة بواسطة الذكاء الاصطناعي
          </Button>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold">{properties.length}</h3>
                <p className="text-sm opacity-90">إجمالي العقارات</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold">{Object.keys(propertiesByArea).length}</h3>
                <p className="text-sm opacity-90">المناطق المغطاة</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold">{properties.filter(p => p.type === 'buy').length}</h3>
                <p className="text-sm opacity-90">عقارات للبيع</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold">{properties.filter(p => p.type.includes('rent')).length}</h3>
                <p className="text-sm opacity-90">عقارات للإيجار</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* العقارات مجمعة حسب المنطقة */}
        {Object.keys(propertiesByArea).length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <Home className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد عقارات متاحة</h3>
              <p className="text-gray-600">لم يتم إضافة أي عقارات بعد</p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(propertiesByArea).map(([area, areaProperties]) => (
            <div key={area} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-brand-orange" />
                <h2 className="text-2xl font-bold text-gray-900">{area}</h2>
                <Badge variant="secondary" className="bg-brand-orange/10 text-brand-orange">
                  {areaProperties.length} عقار
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {areaProperties.map((property) => {
                  const TypeIcon = typeIcons[property.type as keyof typeof typeIcons];
                  return (
                    <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                      {property.images && property.images.length > 0 && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            style={{
                              filter: 'contrast(1.15) brightness(1.05) saturate(1.1)',
                              WebkitImageRendering: 'crisp-edges' as any,
                              imageRendering: 'crisp-edges'
                            } as React.CSSProperties}
                            loading="lazy"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {typeLabels[property.type as keyof typeof typeLabels]}
                            </Badge>
                          </div>
                        </div>
                      )}
                      
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{property.area}</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl text-foreground">{property.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {property.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-muted/50 rounded-lg p-3 text-center">
                            <p className="text-xs text-muted-foreground mb-1">المساحة</p>
                            <p className="font-bold text-brand-orange">{property.size} متر²</p>
                          </div>
                          
                          {property.rooms && (
                            <div className="bg-muted/50 rounded-lg p-3 text-center">
                              <p className="text-xs text-muted-foreground mb-1">الغرف</p>
                              <p className="font-bold text-brand-orange">{property.rooms} غرفة</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl font-bold text-brand-orange">
                              {property.price.toLocaleString()} جنيه
                            </span>
                            {property.addedDate && (
                              <span className="text-xs text-muted-foreground">
                                {property.addedDate}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-2 mb-3">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleContact(property.contact, property.title)}
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              اتصال
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleWhatsApp(property.contact, property.title)}
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              واتساب
                            </Button>
                          </div>
                          
                          {/* أزرار الإدارة للأدمن */}
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                              onClick={() => toast({
                                title: "قريباً",
                                description: "سيتم تفعيل خاصية التعديل قريباً",
                              })}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              تعديل
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteProperty(property.id, property.title)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              حذف
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProperties;
