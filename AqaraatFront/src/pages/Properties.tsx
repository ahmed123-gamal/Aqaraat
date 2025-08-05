import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, MapPin, Home, ShoppingCart, GraduationCap, Search, Filter, Phone, MessageCircle, Image, Video, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { propertyService, PropertyResponse } from "@/services/propertyService";

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
  ownerId?: string; // معرف صاحب العقار
}

const Properties = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const propertyType = searchParams.get("type");
  const area = searchParams.get("area");
  const areaName = searchParams.get("areaName");
  
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState("");
  const [roomCount, setRoomCount] = useState("");

  const typeLabels = {
    "Sale": "شراء",
    "FamilyRent": "سكن عائلي", 
    "StudentRent": "سكن طلاب"
  };

  const typeIcons = {
    "Sale": ShoppingCart,
    "FamilyRent": Home,
    "StudentRent": GraduationCap
  };

  const loadProperties = async () => {
    try {
      setLoading(true);
      
      let searchResults: PropertyResponse[] = [];
      
      try {
        // تحويل نوع العقار من الواجهة الأمامية إلى الخلفية
        let apiType = propertyType;
        if (propertyType === 'buy' || propertyType === 'ForSale') apiType = 'Sale';
        else if (propertyType === 'rent-family' || propertyType === 'ForRentFamily') apiType = 'FamilyRent';
        else if (propertyType === 'rent-students' || propertyType === 'ForRentStudents') apiType = 'StudentRent';
        
        // تحويل معرف المنطقة إلى اسم المنطقة
        let searchAreaName = areaName;
        if (area && !areaName) {
          // البحث عن اسم المنطقة من معرفها
          const areaMap: { [key: string]: string } = {
            'alqaysariya': 'القيسارية',
            'almujahidin': 'المجاهدين',
            'gharb-albalad': 'غرب البلد',
            'aljumhuriyah': 'الجمهورية',
            'yusri-ragab': 'يسري راغب',
            'alhelali': 'الهلالي',
            'thabit': 'ثابت',
            'alwalidiyah': 'الوليدية',
            '26-july': '26 يوليو',
            'aljaysh': 'الجيش',
            'alsadat': 'السادات',
            'masakin-alazhar': 'مساكن الأزهر',
            'alfath': 'الفتح',
            'alhamra': 'الحمراء',
            'manqabad': 'منقباد',
            'alsalam': 'السلام',
            'masakin-alshabab': 'مساكن الشباب',
            'nazlat-abdullah': 'نزلة عبداللاه',
            'alarbaein': 'الأربعين',
            'kadwani': 'كدواني',
            'almoalimin': 'المعلمين',
            'manshiyat-almoalimin': 'منشية المعلمين',
            'city': 'سيتي',
            'alfirdaws': 'الفردوس',
            'alhadabah': 'الهضبة',
            'hawd-alzaafaran': 'حوض الزعفران',
            'maydan-albunuk': 'ميدان البنوك',
            'shari-alriyadh': 'شارع الرياض',
            'shari-sayyid': 'شارع سيد'
          };
          searchAreaName = areaMap[area] || area;
        }
          
          console.log('Searching with:', { type: apiType, area: searchAreaName });
          
          try {
        // محاولة البحث عن العقارات باستخدام الـ API أولاً
        searchResults = await propertyService.searchProperties({
          type: apiType,
          area: searchAreaName
        });
        console.log('Properties loaded from API:', searchResults);
        
        // إذا نجح الـ API، نستخدم النتائج مباشرة
        if (searchResults && Array.isArray(searchResults)) {
          setProperties(searchResults);
          return;
        } else {
          console.warn('API returned invalid data format');
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error searching properties:', error);
        toast({
          title: "تعذر تحميل العقارات",
          description: "حدث خطأ أثناء البحث عن العقارات، سيتم استخدام البيانات المحلية",
          variant: "destructive"
        });
        // استمر في المحاولة باستخدام localStorage
      }
        
      } catch (apiError) {
        console.warn('API failed, trying localStorage:', apiError);
        
        // في حالة فشل الـ API، نحاول localStorage (البيانات الأساسية فقط)
        try {
          const localProperties = JSON.parse(localStorage.getItem('properties') || '[]');
          
          // تصفية العقارات حسب النوع والمنطقة
          const filteredLocal = localProperties.filter((prop: any) => {
            let matches = true;
            
            if (propertyType && prop.type !== propertyType) {
              matches = false;
            }
            
            if (area && prop.area !== area) {
              matches = false;
            }
            
            return matches && prop.isActive !== false;
          });
          
          // تحويل البيانات المحلية لنفس تنسيق الـ API
          searchResults = filteredLocal.map((prop: any) => ({
            id: parseInt(prop.id) || Date.now(),
            title: prop.title,
            description: prop.description,
            price: prop.price,
            type: prop.type,
            category: 'Apartment',
            area: prop.area,
            subArea: prop.subArea || prop.area,
            numberOfRooms: prop.rooms || prop.numberOfRooms || 1,
            numberOfBathrooms: 1,
            numberOfLivingRooms: 1,
            numberOfKitchens: 1,
            areaSize: prop.size || prop.areaSize || 100,
            floorNumber: 1,
            totalFloors: 3,
            address: prop.area,
            distanceFromUniversity: 5.0,
            distanceFromCityCenter: 3.0,
            ownerName: prop.ownerName || 'مالك العقار',
            ownerPhone: prop.phone || '01000000000',
            ownerEmail: '',
            images: Array.isArray(prop.images) ? prop.images.map((img: string, index: number) => ({
              id: index + 1,
              imageUrl: img,
              caption: `صورة العقار ${index + 1}`,
              type: index === 0 ? 'Main' : 'Interior',
              isMain: index === 0,
              orderIndex: index,
              altText: `صورة العقار - ${prop.area}`
            })) : [],
            videos: Array.isArray(prop.videos) ? prop.videos.map((vid: string, index: number) => ({
              id: index + 1,
              videoUrl: vid,
              caption: `فيديو العقار ${index + 1}`,
              type: 'Tour',
              isMain: index === 0,
              orderIndex: index,
              altText: `فيديو العقار - ${prop.area}`
            })) : [],
            createdAt: prop.createdAt || new Date().toISOString(),
            updatedAt: prop.updatedAt || new Date().toISOString(),
            isActive: prop.isActive !== false,
            userId: parseInt(prop.userId) || 1
          }));
          
          console.log('Properties loaded from localStorage:', searchResults);
          
        } catch (storageError) {
          console.error('localStorage error:', storageError);
          // في حالة فشل localStorage أيضاً، نعرض قائمة فارغة
          searchResults = [];
        }
      }
      
      setProperties(searchResults);
      
    } catch (error) {
      console.error('Error loading properties:', error);
      // في حالة أي خطأ آخر، نتأكد إن الصفحة لا تبيض
      setProperties([]);
      
      toast({
        title: "تعذر تحميل العقارات",
        description: "يرجى التأكد من الاتصال بالإنترنت أو المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // تحقق من وجود نوع العقار والمنطقة
    if (!propertyType || !area) {
      navigate("/search");
      return;
    }

    // تحميل العقارات
    loadProperties();
  }, [propertyType, area, navigate]);

  useEffect(() => {
    const handlePropertyAdded = () => {
      loadProperties();
    };

    window.addEventListener('propertyAdded', handlePropertyAdded);
    return () => window.removeEventListener('propertyAdded', handlePropertyAdded);
  }, []);

  const getCurrentUserId = (): string => {
    return localStorage.getItem('currentUserId') || 'admin';
  };

  const isAdmin = (): boolean => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'admin';
  };

  const canEditProperty = (property: PropertyResponse): boolean => {
    const currentUserId = getCurrentUserId();
    return isAdmin(); // مؤقتاً للأدمن فقط
  };

  const handleContact = (contact: string, propertyTitle: string) => {
    window.open(`tel:${contact}`, '_self');
  };

  const handleWhatsApp = (contact: string, propertyTitle: string) => {
    const message = `مرحباً، أنا مهتم بالعقار: ${propertyTitle}`;
    window.open(`https://wa.me/${contact}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleViewDetails = (propertyId: number) => {
    navigate(`/properties/${propertyId}`);
  };

  const handleEditProperty = (propertyId: number) => {
    // TODO: تنفيذ صفحة التعديل
    toast({
      title: "قريباً",
      description: "سيتم تفعيل خاصية التعديل قريباً",
    });
  };

  const handleDeleteProperty = async (propertyId: number, propertyTitle: string) => {
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
        // TODO: إضافة API endpoint للحذف
        // await propertyService.deleteProperty(propertyId);

        // تحديث القائمة المحلية مؤقتاً
        setProperties(prev => prev.filter(p => p.id !== propertyId));

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

  const filteredProperties = properties.filter(property => {
    let matches = true;

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        matches = matches && property.price >= min && property.price <= max;
      } else {
        matches = matches && property.price >= min;
      }
    }

    if (roomCount) {
      const rooms = parseInt(roomCount);
      matches = matches && property.numberOfRooms === rooms;
    }

    return matches;
  });

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

  if (!propertyType || !area) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">معاملات البحث غير صحيحة</p>
          <Button onClick={() => navigate("/search")} className="bg-brand-orange hover:bg-orange-600">
            العودة للبحث
          </Button>
        </div>
      </div>
    );
  }

  const TypeIcon = typeIcons[propertyType as keyof typeof typeIcons] || Home;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/search")}
                className="flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                العودة للبحث
              </Button>
              <div className="flex items-center gap-3">
                <TypeIcon className="w-6 h-6 text-brand-orange" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {typeLabels[propertyType as keyof typeof typeLabels]} - {areaName}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {filteredProperties.length} عقار متاح
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* فلاتر البحث */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              تصفية النتائج
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">نطاق السعر</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نطاق السعر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الأسعار</SelectItem>
                    <SelectItem value="0-500000">أقل من 500,000 جنيه</SelectItem>
                    <SelectItem value="500000-1000000">500,000 - 1,000,000 جنيه</SelectItem>
                    <SelectItem value="1000000-2000000">1,000,000 - 2,000,000 جنيه</SelectItem>
                    <SelectItem value="2000000">أكثر من 2,000,000 جنيه</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">عدد الغرف</label>
                <Select value={roomCount} onValueChange={setRoomCount}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر عدد الغرف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الغرف</SelectItem>
                    <SelectItem value="1">غرفة واحدة</SelectItem>
                    <SelectItem value="2">غرفتان</SelectItem>
                    <SelectItem value="3">3 غرف</SelectItem>
                    <SelectItem value="4">4 غرف</SelectItem>
                    <SelectItem value="5">5 غرف أو أكثر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* نتائج البحث */}
        {filteredProperties.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <Home className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد عقارات متاحة</h3>
              <p className="text-gray-600 mb-4">
                لم يتم العثور على عقارات تطابق معايير البحث في {areaName}
              </p>
              <Button onClick={() => navigate("/search")} variant="outline">
                تعديل البحث
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                {property.images && property.images.length > 0 && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.images[0].imageUrl}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      style={{
                        filter: 'contrast(1.15) brightness(1.05) saturate(1.1)',
                        imageRendering: 'crisp-edges'
                      }}
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {typeLabels[property.type as keyof typeof typeLabels]}
                      </Badge>
                    </div>
                    {property.images.length > 1 && (
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          <Image className="w-3 h-3 mr-1" />
                          {property.images.length} صور
                        </Badge>
                      </div>
                    )}
                    {property.videos && property.videos.length > 0 && (
                      <div className="absolute bottom-3 right-3">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          <Video className="w-3 h-3 mr-1" />
                          {property.videos.length} فيديو
                        </Badge>
                      </div>
                    )}
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
                      <p className="font-bold text-brand-orange">{property.areaSize} متر²</p>
                    </div>
                    
                    {property.numberOfRooms && (
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">الغرف</p>
                        <p className="font-bold text-brand-orange">{property.numberOfRooms} غرفة</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-brand-orange">
                        {property.price.toLocaleString()} جنيه
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleContact(property.ownerPhone, property.title)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        اتصال
                      </Button>
                      <Button 
                        variant="brand" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleWhatsApp(property.ownerPhone, property.title)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        واتساب
                      </Button>
                    </div>
                    
                    {canEditProperty(property) && (
                      <div className="flex gap-2 mb-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                          onClick={() => handleEditProperty(property.id)}
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
                    )}
                    
                    <Button 
                      size="lg" 
                      variant="brand"
                      className="w-full"
                      onClick={() => handleViewDetails(property.id)}
                    >
                      عرض التفاصيل
                      <ArrowRight className="w-4 h-4 mr-2" />
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

export default Properties;
