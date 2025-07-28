import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, Building } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-elevated">
        <CardHeader>
          <div className="mx-auto w-20 h-20 bg-brand-orange-light rounded-full flex items-center justify-center mb-4">
            <Building className="w-10 h-10 text-brand-orange" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            الصفحة غير موجودة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-6xl">🏠</div>
          <p className="text-muted-foreground">
            عذراً، الصفحة التي تبحث عنها غير موجودة
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/dashboard")}
              variant="brand"
              className="w-full gap-2"
            >
              <Home className="w-4 h-4" />
              العودة للوحة التحكم
            </Button>
            <Button 
              onClick={() => navigate("/search")}
              variant="outline"
              className="w-full gap-2"
            >
              <Search className="w-4 h-4" />
              البحث عن عقار
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
