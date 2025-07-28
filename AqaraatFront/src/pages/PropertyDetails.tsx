import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Home, ShoppingCart, GraduationCap, Phone, MessageCircle, Image, Video, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageGallery from "@/components/ImageGallery";

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

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showImageGallery, setShowImageGallery] = useState(false);

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

  // Mock data for property details
  const mockProperty: Property = {
    id: "1",
    title: "شقة مميزة للبيع",
    description: "شقة 3 غرف نوم + صالة + مطبخ + 2 حمام في منطقة مميزة. الشقة مفروشة بالكامل وتحتوي على جميع الأجهزة الحديثة. الموقع مميز وقريب من جميع الخدمات. الشقة تتضمن: غرف نوم مفروشة بالكامل، مطبخ مجهز بأحدث الأجهزة، صالة استقبال فسيحة، حمامين حديثين، نظام تكييف مركزي، إنترنت عالي السرعة، موقف سيارات خاص، أمن 24 ساعة.",
    price: 850000,
    type: "buy",
    area: "الايمان",
    rooms: 3,
    size: 120,
    contact: "0123456789",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-5c9e8c8b8b8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-6c9e8c8b8b8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-7c9e8c8b8b8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-8c9e8c8b8b8b?w=800&h=600&fit=crop"
    ],
    videos: [
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Get added properties from localStorage
      try {
        const addedProperties = localStorage.getItem('addedProperties');
        const properties = addedProperties ? JSON.parse(addedProperties) : [];
        
        // Find the specific property by ID
        const foundProperty = properties.find((p: Property) => p.id === id);
        
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          // If not found in added properties, use mock data
          setProperty(mockProperty);
        }
        
        // Increment viewed properties count
        const currentViewed = localStorage.getItem('viewedProperties') || '0';
        localStorage.setItem('viewedProperties', (parseInt(currentViewed) + 1).toString());
        
      } catch (error) {
        console.error('Error loading property:', error);
        setProperty(mockProperty);
      }
      
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleContact = (contact: string) => {
    toast({
      title: "معلومات التواصل",
      description: `رقم الهاتف: ${contact}`,
    });
  };

  const handleWhatsApp = (contact: string) => {
    const message = `مرحباً، أنا مهتم بـ ${property?.title}`;
    const whatsappUrl = `https://wa.me/2${contact}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const openImageGallery = () => {
    setShowImageGallery(true);
  };

  const closeImageGallery = () => {
    setShowImageGallery(false);
  };

  const TypeIcon = property ? typeIcons[property.type as keyof typeof typeIcons] : Home;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل تفاصيل العقار...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="text-center py-12">
          <CardContent>
            <h3 className="text-xl font-bold mb-2">العقار غير موجود</h3>
            <p className="text-muted-foreground mb-4">
              العقار الذي تبحث عنه غير موجود
            </p>
            <Button onClick={() => navigate("/properties")}>
              العودة للعقارات
            </Button>
          </CardContent>
        </Card>
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
              onClick={() => navigate("/properties")}
              className="gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              العودة
            </Button>
            <div className="h-6 w-px bg-border" />
            <TypeIcon className="w-5 h-5 text-brand-orange" />
            <h1 className="text-xl font-bold text-foreground">تفاصيل العقار</h1>
            <Badge variant="secondary" className="mr-auto">
              {typeLabels[property.type as keyof typeof typeLabels]}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Images & Videos */}
          <div className="space-y-6">
            {/* Main Image */}
            {property.images && property.images.length > 0 && (
              <div className="space-y-4">
                <div className="relative h-96 overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={openImageGallery}
                  />
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-2 rounded-full backdrop-blur-sm">
                    <Image className="w-4 h-4 inline mr-1" />
                    {property.images.length} صور
                  </div>
                  <div className="absolute bottom-4 left-4 bg-brand-orange text-white text-sm px-3 py-2 rounded-full">
                    {typeLabels[property.type as keyof typeof typeLabels]}
                  </div>
                </div>

                {/* Image Gallery */}
                {property.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {property.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="relative h-24 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <img
                          src={image}
                          alt={`صورة ${index + 2}`}
                          className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
                          onClick={openImageGallery}
                        />
                        {index === 3 && property.images && property.images.length > 5 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium">
                            +{property.images.length - 5}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Videos */}
            {property.videos && property.videos.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <Video className="w-6 h-6 text-brand-orange" />
                  فيديوهات العقار
                </h3>
                <div className="space-y-4">
                  {property.videos.map((video, index) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                      <video
                        src={video}
                        controls
                        className="w-full h-64 object-cover"
                        poster={property.images && property.images[0]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-3xl text-foreground">{property.title}</CardTitle>
                  <Badge variant="secondary" className="text-sm">
                    {typeLabels[property.type as keyof typeof typeLabels]}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  <span className="font-medium">{property.area}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-foreground leading-relaxed text-lg">
                    {property.description}
                  </p>
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">م²</span>
                      </div>
                      <span className="text-sm text-muted-foreground">المساحة:</span>
                    </div>
                    <p className="font-bold text-xl text-blue-600">{property.size} متر²</p>
                  </div>
                  
                  {property.rooms && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Home className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-muted-foreground">الغرف:</span>
                      </div>
                      <p className="font-bold text-xl text-green-600">{property.rooms} غرفة</p>
                    </div>
                  )}
                </div>

                {/* Price Section */}
                <div className="bg-gradient-to-r from-brand-orange to-orange-500 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">السعر</p>
                      <p className="text-3xl font-bold">{property.price.toLocaleString()} جنيه</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90">نوع العقار</p>
                      <p className="text-lg font-semibold">{typeLabels[property.type as keyof typeof typeLabels]}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full h-12 text-lg font-semibold"
                    onClick={() => handleContact(property.contact)}
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    اتصال مباشر
                  </Button>
                  <Button 
                    variant="brand" 
                    size="lg"
                    className="w-full h-12 text-lg font-semibold"
                    onClick={() => handleWhatsApp(property.contact)}
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    واتساب فوري
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-foreground">معلومات إضافية:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• موقع مميز وهادئ</li>
                    <li>• قريب من جميع الخدمات</li>
                    <li>• أمن 24 ساعة</li>
                    <li>• موقف سيارات خاص</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Image Gallery */}
      {showImageGallery && property.images && (
        <ImageGallery
          images={property.images}
          onClose={closeImageGallery}
        />
      )}
    </div>
  );
};

export default PropertyDetails; 