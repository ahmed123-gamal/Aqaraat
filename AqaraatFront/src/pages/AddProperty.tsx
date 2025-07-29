import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Upload, MapPin, Home, Loader2, X, Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PropertyFormData {
  type: string;
  area: string;
  rooms: string;
  price: string;
  phone: string;
  ownerName: string;
  description: string;
  size: string; // المساحة بالمتر
  images: File[];
  videos: File[];
}

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<PropertyFormData>({
    type: "",
    area: "",
    rooms: "",
    price: "",
    phone: "",
    ownerName: "",
    description: "",
    size: "",
    images: [],
    videos: []
  });

  const areas = [
    "الايمان", "الزهراء", "النميس", "الهلالي", "فريال", "صلاح سالم", 
    "الوديه", "المعلمين", "الاربعين", "المحكمه", "الناصرية", "الحمراء", 
    "شارع سيد", "موقف الازهر", "نزله عبدالله", "منقباد", "الوليدية", "الكوثر", "المنشية"
  ];

  const propertyTypes = [
    { value: "للبيع", label: "للبيع" },
    { value: "إيجار عائلي", label: "إيجار عائلي" },
    { value: "إيجار طلاب", label: "إيجار طلاب" }
  ];

  const handleTypeAreaSubmit = () => {
    if (!formData.type || !formData.area) {
      toast({
        title: "بيانات مطلوبة",
        description: "يرجى اختيار نوع العقار والمنطقة",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData.images.length + files.length > 5) {
      toast({
        title: "عدد الصور محدود",
        description: "يمكن رفع 5 صور كحد أقصى",
        variant: "destructive"
      });
      return;
    }
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData.videos.length + files.length > 2) {
      toast({
        title: "عدد الفيديوهات محدود",
        description: "يمكن رفع فيديوهين كحد أقصى",
        variant: "destructive"
      });
      return;
    }
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, ...files]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      toast({
        title: "صور مطلوبة",
        description: "يجب رفع صورة واحدة على الأقل للعقار",
        variant: "destructive"
      });
      return;
    }

    if (!formData.rooms || !formData.price || !formData.phone || !formData.ownerName || !formData.size) {
      toast({
        title: "بيانات مطلوبة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create mock URLs for images
      const imageUrls: string[] = [];
      for (const image of formData.images) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(image);
        });
        imageUrls.push(base64);
      }
      
      // Create mock URLs for videos
      const videoUrls: string[] = [];
      for (const video of formData.videos) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(video);
        });
        videoUrls.push(base64);
      }

      const newProperty = {
        id: Date.now().toString(),
        title: `${formData.type} - ${formData.area}`,
        description: formData.description || "عقار مميز في موقع استراتيجي",
        price: parseInt(formData.price),
        type: formData.type === "للبيع" ? "buy" : formData.type === "إيجار عائلي" ? "rent-family" : "rent-students",
        area: formData.area,
        rooms: parseInt(formData.rooms),
        size: parseInt(formData.size),
        contact: formData.phone,
        ownerName: formData.ownerName,
        images: imageUrls,
        videos: videoUrls,
        addedDate: new Date().toISOString().split('T')[0],
        ownerId: localStorage.getItem('currentUserId') || 'user_' + Date.now()
      };

      // Save to localStorage
      const existingProperties = JSON.parse(localStorage.getItem('addedProperties') || '[]');
      existingProperties.push(newProperty);
      localStorage.setItem('addedProperties', JSON.stringify(existingProperties));

      // تحديث إحصائيات الداشبورد
      const event = new CustomEvent('propertyAdded', { detail: newProperty });
      window.dispatchEvent(event);

      toast({
        title: "تم إضافة العقار بنجاح",
        description: "تم حفظ بيانات العقار وهو متاح الآن للعرض",
      });

      // Navigate to properties page to show the new property
      const typeParam = formData.type === "للبيع" ? "buy" : formData.type === "إيجار عائلي" ? "rent-family" : "rent-students";
      navigate(`/properties?type=${typeParam}&area=${formData.area}&areaName=${formData.area}`);
    } catch (error) {
      toast({
        title: "خطأ في إضافة العقار",
        description: "حدث خطأ أثناء حفظ البيانات، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إضافة عقار جديد</h1>
          <p className="text-gray-600">أضف عقارك بسهولة في خطوات بسيطة</p>
        </div>

        {step === 1 ? (
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Home className="h-6 w-6 text-blue-600" />
                اختر نوع العقار والمنطقة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="type" className="text-lg font-semibold">نوع العقار</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="اختر نوع العقار" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="area" className="text-lg font-semibold">المنطقة</Label>
                <Select value={formData.area} onValueChange={(value) => setFormData(prev => ({ ...prev, area: value }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="اختر المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {area}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleTypeAreaSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                size="lg"
              >
                التالي
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle>تفاصيل العقار</CardTitle>
              <p className="text-sm text-gray-600">
                {formData.type} في {formData.area}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rooms">عدد الغرف *</Label>
                    <Input
                      id="rooms"
                      type="number"
                      value={formData.rooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, rooms: e.target.value }))}
                      placeholder="مثال: 3"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">السعر (جنيه) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="مثال: 500000"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">رقم الهاتف *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="01xxxxxxxxx"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="size">المساحة (متر مربع) *</Label>
                    <Input
                      id="size"
                      type="number"
                      value={formData.size}
                      onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                      placeholder="مثال: 120"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="ownerName">اسم المالك *</Label>
                  <Input
                    id="ownerName"
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                    placeholder="الاسم الكامل"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">وصف العقار</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="اكتب وصفاً مفصلاً للعقار..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label className="text-lg font-semibold">صور العقار * (مطلوب صورة واحدة على الأقل)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        اضغط لرفع الصور (حد أقصى 5 صور)
                      </p>
                    </label>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`صورة ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Video Upload */}
                <div>
                  <Label className="text-lg font-semibold">فيديوهات العقار (اختياري)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Video className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        اضغط لرفع الفيديوهات (حد أقصى فيديوهين)
                      </p>
                    </label>
                  </div>
                  
                  {formData.videos.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.videos.map((video, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                          <span className="text-sm">{video.name}</span>
                          <button
                            type="button"
                            onClick={() => removeVideo(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    السابق
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        إضافة العقار
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AddProperty;