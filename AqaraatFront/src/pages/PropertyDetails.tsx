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
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&auto=format&q=95&sharp=10",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&h=800&fit=crop&auto=format&q=95&sharp=10",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop&auto=format&q=95&sharp=10",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop&auto=format&q=95&sharp=10",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&auto=format&q=95&sharp=10",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop&auto=format&q=95&sharp=10"
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
            {property.images && property.images.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">صور العقار</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={openImageGallery}
                    className="gap-2"
                  >
                    <Image className="w-4 h-4" />
                    عرض جميع الصور ({property.images.length})
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {property.images.slice(0, 4).map((image, index) => (
                    <div 
                      key={index} 
                      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group border-2 border-transparent hover:border-brand-orange transition-all duration-300"
                      onClick={openImageGallery}
                    >
                      <img 
                        src={image} 
                        alt={`صورة ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                        style={{
                          filter: 'contrast(1.1) brightness(1.05) saturate(1.1)',
                          imageRendering: 'crisp-edges'
                        } as React.CSSProperties}
                        loading="lazy"
                        onClick={openImageGallery}
                      />
                      {index === 3 && property.images.length > 4 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            +{property.images.length - 4} صور أخرى
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">صور العقار</h3>
                <div className="bg-muted rounded-lg p-8 text-center">
                  <Image className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">لا توجد صور متاحة لهذا العقار</p>
                </div>
              </div>
            )}

            {/* Property Videos */}
            {property.videos && property.videos.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-brand-orange" />
                  <h3 className="text-xl font-bold text-foreground">فيديوهات العقار</h3>
                  <Badge variant="secondary">{property.videos.length} فيديو</Badge>
                </div>
                <div className="grid gap-4">
                  {property.videos.map((video, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border-2 border-muted hover:border-brand-orange transition-colors duration-300">
                      <video
                        src={video}
                        controls
                        preload="metadata"
                        className="w-full h-full object-cover bg-black"
                        poster="https://via.placeholder.com/800x450/1a1a1a/ffffff?text=اضغط+للتشغيل"
                        style={{
                          filter: 'contrast(1.1) brightness(1.05)',
                        }}
                        onError={(e) => {
                          console.error('Video failed to load:', video);
                          const target = e.target as HTMLVideoElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full bg-muted flex items-center justify-center">
                                <div class="text-center text-muted-foreground">
                                  <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                  </svg>
                                  <p class="text-sm">فشل في تحميل الفيديو</p>
                                </div>
                              </div>
                            `;
                          }
                        }}
                        onLoadStart={() => {
                          console.log('Video loading started:', video);
                        }}
                        onCanPlay={() => {
                          console.log('Video can play:', video);
                        }}
                      >
                        <source src={video} type="video/mp4" />
                        <source src={video} type="video/webm" />
                        <source src={video} type="video/ogg" />
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">متصفحك لا يدعم تشغيل الفيديو</p>
                          </div>
                        </div>
                      </video>
                      <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        فيديو {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Property Details */}
          <div className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground mb-2">
                      {property.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{property.area}</span>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="bg-brand-orange/10 text-brand-orange border-brand-orange/20"
                  >
                    {typeLabels[property.type as keyof typeof typeLabels]}
                  </Badge>
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