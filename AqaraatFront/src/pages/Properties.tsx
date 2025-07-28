import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, MapPin, Home, ShoppingCart, GraduationCap, Search, Filter, Phone, MessageCircle, Image, Video } from "lucide-react";
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
}

const Properties = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const propertyType = searchParams.get("type");
  const area = searchParams.get("area");
  const areaName = searchParams.get("areaName");
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState("");
  const [roomCount, setRoomCount] = useState("");

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
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500&h=300&fit=crop"
      ],
      videos: [
        "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
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
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop"
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
      images: [
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500&h=300&fit=crop"
      ]
    }
  ];

  // Get added properties from localStorage
  const getAddedProperties = (): Property[] => {
    try {
      const addedProperties = localStorage.getItem('addedProperties');
      return addedProperties ? JSON.parse(addedProperties) : [];
    } catch (error) {
      console.error('Error loading added properties:', error);
      return [];
    }
  };

  useEffect(() => {
    if (!propertyType || !area) {
      navigate("/search");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const allProperties = [...mockProperties, ...getAddedProperties()];
      const filteredProperties = allProperties.filter(p => p.type === propertyType);
      setProperties(filteredProperties);
      setLoading(false);
    }, 1000);
  }, [propertyType, area, navigate]);

  const handleContact = (contact: string, propertyTitle: string) => {
    toast({
      title: "معلومات التواصل",
      description: `رقم الهاتف: ${contact}`,
    });
  };

  const handleWhatsApp = (contact: string, propertyTitle: string) => {
    const message = `مرحباً، أنا مهتم بـ ${propertyTitle}`;
    const whatsappUrl = `https://wa.me/2${contact}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleViewDetails = (propertyId: string) => {
    // Increment viewed properties count
    try {
      const currentViewed = localStorage.getItem('viewedProperties') || '0';
      localStorage.setItem('viewedProperties', (parseInt(currentViewed) + 1).toString());
    } catch (error) {
      console.error('Error updating viewed count:', error);
    }
    
    navigate(`/properties/${propertyId}`);
  };

  const TypeIcon = propertyType ? typeIcons[propertyType as keyof typeof typeIcons] : Home;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري البحث عن العقارات...</p>
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
            <TypeIcon className="w-5 h-5 text-brand-orange" />
            <h1 className="text-xl font-bold text-foreground">العقارات المتاحة</h1>
            {propertyType && (
              <Badge variant="secondary" className="mr-auto">
                {typeLabels[propertyType as keyof typeof typeLabels]}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">تصفية:</span>
            </div>
            
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="نطاق السعر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1000">0 - 1000 جنيه</SelectItem>
                <SelectItem value="1000-3000">1000 - 3000 جنيه</SelectItem>
                <SelectItem value="3000-5000">3000 - 5000 جنيه</SelectItem>
                <SelectItem value="5000+">أكثر من 5000 جنيه</SelectItem>
              </SelectContent>
            </Select>

            <Select value={roomCount} onValueChange={setRoomCount}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="عدد الغرف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">غرفة واحدة</SelectItem>
                <SelectItem value="2">غرفتين</SelectItem>
                <SelectItem value="3">3 غرف</SelectItem>
                <SelectItem value="4+">4 غرف أو أكثر</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            العقارات في {areaName}
          </h2>
          <p className="text-lg text-muted-foreground">
            تم العثور على {properties.length} عقار
          </p>
        </div>

        {properties.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">لا توجد عقارات</h3>
              <p className="text-muted-foreground mb-4">
                لا توجد عقارات متاحة في هذه المنطقة حالياً
              </p>
              <Button onClick={() => navigate("/areas")}>
                العودة للمناطق
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <Card key={property.id} className="hover:shadow-elevated transition-all duration-300 group overflow-hidden">
                {/* Property Images */}
                {property.images && property.images.length > 0 && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      <Image className="w-3 h-3 inline mr-1" />
                      {property.images.length} صور
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        {typeLabels[property.type as keyof typeof typeLabels]}
                      </Badge>
                    </div>
                    {property.videos && property.videos.length > 0 && (
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        <Video className="w-3 h-3 inline mr-1" />
                        {property.videos.length} فيديو
                      </div>
                    )}
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 text-brand-orange" />
                    <span className="font-medium">{property.area}</span>
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
                        variant="brand" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleWhatsApp(property.contact, property.title)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        واتساب
                      </Button>
                    </div>
                    
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