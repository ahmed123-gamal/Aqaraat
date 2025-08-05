import React, { useState } from 'react';
import { propertyService } from '@/services/propertyService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const TestVideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار ملف فيديو أولاً",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      // قراءة الملف كـ base64
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(selectedFile);
      });

      // رفع الفيديو باستخدام الخدمة
      const uploadedVideoUrl = await propertyService.uploadVideo(base64, selectedFile.name);
      
      setVideoUrl(uploadedVideoUrl);
      toast({
        title: "تم بنجاح",
        description: "تم رفع الفيديو بنجاح",
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء رفع الفيديو",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>اختبار رفع الفيديو</CardTitle>
          <CardDescription>اختر ملف فيديو لرفعه إلى الخادم</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input 
              type="file" 
              accept="video/*" 
              onChange={handleFileChange} 
              className="w-full"
            />
            {videoUrl && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">الفيديو المرفوع:</h3>
                <video 
                  src={videoUrl} 
                  controls 
                  className="w-full rounded-md border" 
                  style={{ maxHeight: '300px' }}
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || uploading} 
            className="w-full"
          >
            {uploading ? 'جاري الرفع...' : 'رفع الفيديو'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestVideoUpload;