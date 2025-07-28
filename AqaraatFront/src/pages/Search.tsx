import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShoppingCart, Home, GraduationCap, Search as SearchIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("");

  const propertyTypes = [
    {
      id: "buy",
      title: "شراء",
      description: "البحث عن عقارات للشراء",
      icon: ShoppingCart,
      color: "bg-green-500",
      lightColor: "bg-green-50",
    },
    {
      id: "rent-family",
      title: "سكن عائلي",
      description: "البحث عن سكن للعائلات",
      icon: Home,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
    },
    {
      id: "rent-students",
      title: "سكن طلاب",
      description: "البحث عن سكن للطلاب",
      icon: GraduationCap,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
    },
  ];

  const { toast } = useToast();

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    toast({
      title: "تم اختيار نوع العقار",
      description: `سيتم البحث عن ${type === 'buy' ? 'عقارات للشراء' : type === 'rent-family' ? 'سكن عائلي' : 'سكن طلاب'}`,
    });
    navigate(`/areas?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              العودة
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-bold text-foreground">البحث عن عقار</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            اختر نوع العقار
          </h2>
          <p className="text-lg text-muted-foreground">
            حدد نوع العقار الذي تبحث عنه
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {propertyTypes.map((type) => (
            <Card
              key={type.id}
              className="group hover:shadow-elevated transition-all duration-300 cursor-pointer border-2 hover:border-brand-orange/20"
              onClick={() => handleTypeSelect(type.id)}
            >
              <CardHeader className="text-center pb-6">
                <div className={`mx-auto w-20 h-20 ${type.lightColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className={`w-10 h-10 text-white`} style={{ color: type.color.replace('bg-', '').replace('-500', '') }} />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-6">
                  {type.description}
                </p>
                <Button 
                  variant="brand"
                  size="lg"
                  className="w-full"
                >
                  اختيار
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-card p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">
            ماذا بعد اختيار النوع؟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">1</div>
              <p>اختر المنطقة أو المركز</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">2</div>
              <p>تصفح العقارات المتاحة</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">3</div>
              <p>تواصل مع المالك مباشرة</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;