import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";

const TestConnection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const { toast } = useToast();

  const testConnection = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      // Test 1: Basic connection
      setTestResults(prev => [...prev, "🔍 اختبار الاتصال الأساسي..."]);
      
      // Test 2: Get areas
      setTestResults(prev => [...prev, "📋 اختبار جلب المناطق..."]);
      const areasResponse = await apiClient.getAreas();
      if (areasResponse.success) {
        setTestResults(prev => [...prev, "✅ تم جلب المناطق بنجاح"]);
      } else {
        setTestResults(prev => [...prev, "❌ فشل في جلب المناطق"]);
      }

      // Test 3: Get property types
      setTestResults(prev => [...prev, "🏠 اختبار جلب أنواع العقارات..."]);
      const typesResponse = await apiClient.getPropertyTypes();
      if (typesResponse.success) {
        setTestResults(prev => [...prev, "✅ تم جلب أنواع العقارات بنجاح"]);
      } else {
        setTestResults(prev => [...prev, "❌ فشل في جلب أنواع العقارات"]);
      }

      toast({
        title: "تم اختبار الاتصال",
        description: "راجع النتائج أدناه",
      });

    } catch (error) {
      console.error('Connection test error:', error);
      setTestResults(prev => [...prev, "❌ خطأ في الاتصال: " + error]);
      toast({
        title: "خطأ في الاتصال",
        description: "فشل في الاتصال بالباك إند",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">اختبار الاتصال بالباك إند</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Button 
                onClick={testConnection} 
                disabled={isLoading}
                variant="brand"
                size="lg"
              >
                {isLoading ? "جاري الاختبار..." : "بدء اختبار الاتصال"}
              </Button>
            </div>

            {testResults.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">نتائج الاختبار:</h3>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  {testResults.map((result, index) => (
                    <div key={index} className="text-sm">
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-sm text-muted-foreground space-y-2">
              <h4 className="font-semibold">معلومات الاتصال:</h4>
              <div>الباك إند: http://localhost:5257</div>
              <div>الفرونت إند: http://localhost:8081</div>
              <div>API Base: http://localhost:5257/api</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestConnection; 