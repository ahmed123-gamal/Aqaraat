import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Home, Trash2, Eye, Phone, Mail, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'owner' | 'student';
  joinDate: string;
  propertiesCount?: number;
}

interface Property {
  id: string;
  title: string;
  type: string;
  area: string;
  price: number;
  ownerName: string;
  ownerEmail: string;
  addedDate: string;
  images?: string[];
}

const AdminManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'users' | 'properties'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for users
  const mockUsers: User[] = [
    {
      id: "1",
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "01234567890",
      type: "owner",
      joinDate: "2024-01-15",
      propertiesCount: 3
    },
    {
      id: "2",
      name: "فاطمة علي",
      email: "fatma@example.com",
      phone: "01234567891",
      type: "student",
      joinDate: "2024-02-20",
      propertiesCount: 0
    },
    {
      id: "3",
      name: "محمد حسن",
      email: "mohamed@example.com",
      phone: "01234567892",
      type: "owner",
      joinDate: "2024-01-10",
      propertiesCount: 2
    },
    {
      id: "4",
      name: "سارة أحمد",
      email: "sara@example.com",
      phone: "01234567893",
      type: "student",
      joinDate: "2024-03-05",
      propertiesCount: 0
    },
    {
      id: "5",
      name: "عمر محمود",
      email: "omar@example.com",
      phone: "01234567894",
      type: "owner",
      joinDate: "2024-02-01",
      propertiesCount: 1
    }
  ];

  // Mock data for properties
  const mockProperties: Property[] = [
    {
      id: "1",
      title: "شقة مميزة للبيع",
      type: "buy",
      area: "النميس",
      price: 850000,
      ownerName: "أحمد محمد",
      ownerEmail: "ahmed@example.com",
      addedDate: "2024-01-20",
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"]
    },
    {
      id: "2",
      title: "سكن طلاب مفروش",
      type: "rent-students",
      area: "الايمان",
      price: 1500,
      ownerName: "محمد حسن",
      ownerEmail: "mohamed@example.com",
      addedDate: "2024-02-15",
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"]
    },
    {
      id: "3",
      title: "شقة عائلية للإيجار",
      type: "rent-family",
      area: "المنشية",
      price: 3000,
      ownerName: "عمر محمود",
      ownerEmail: "omar@example.com",
      addedDate: "2024-03-01",
      images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop"]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      
      // Get properties from localStorage and combine with mock data
      try {
        const addedProperties = localStorage.getItem('addedProperties');
        const localProperties = addedProperties ? JSON.parse(addedProperties) : [];
        const allProperties = [...mockProperties, ...localProperties.map((p: any) => ({
          ...p,
          ownerName: p.ownerName || "مالك غير محدد",
          ownerEmail: p.ownerEmail || "غير محدد",
          addedDate: p.addedDate || new Date().toISOString().split('T')[0]
        }))];
        setProperties(allProperties);
      } catch (error) {
        console.error('Error loading properties:', error);
        setProperties(mockProperties);
      }
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "تم حذف المستخدم",
      description: "تم حذف المستخدم بنجاح",
    });
  };

  const handleDeleteProperty = (propertyId: string) => {
    setProperties(properties.filter(property => property.id !== propertyId));
    
    // Also remove from localStorage if it exists there
    try {
      const addedProperties = localStorage.getItem('addedProperties');
      if (addedProperties) {
        const localProperties = JSON.parse(addedProperties);
        const updatedProperties = localProperties.filter((p: any) => p.id !== propertyId);
        localStorage.setItem('addedProperties', JSON.stringify(updatedProperties));
      }
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
    
    toast({
      title: "تم حذف العقار",
      description: "تم حذف العقار بنجاح",
    });
  };

  const typeLabels = {
    "buy": "شراء",
    "rent-family": "سكن عائلي", 
    "rent-students": "سكن طلاب"
  };

  const userTypeLabels = {
    "owner": "مالك عقار",
    "student": "طالب"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-orange/5 to-orange-100/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-orange/5 to-orange-100/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                العودة
              </Button>
              <h1 className="text-2xl font-bold text-foreground">إدارة النظام</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'users' ? 'default' : 'outline'}
            onClick={() => setActiveTab('users')}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            إدارة المستخدمين ({users.length})
          </Button>
          <Button
            variant={activeTab === 'properties' ? 'default' : 'outline'}
            onClick={() => setActiveTab('properties')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            إدارة العقارات ({properties.length})
          </Button>
        </div>

        {/* Users Management */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  قائمة المستخدمين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {user.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {user.joinDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={user.type === 'owner' ? 'default' : 'secondary'}>
                          {userTypeLabels[user.type]}
                        </Badge>
                        {user.type === 'owner' && (
                          <Badge variant="outline">
                            {user.propertiesCount} عقار
                          </Badge>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Properties Management */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  قائمة العقارات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {properties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex gap-4">
                        {property.images && property.images[0] && (
                          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-full h-full object-cover"
                              style={{
                                filter: 'contrast(1.1) brightness(1.05) saturate(1.1)',
                                imageRendering: 'crisp-edges'
                              } as React.CSSProperties}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                <span>المنطقة: {property.area}</span>
                                <span>السعر: {property.price.toLocaleString()} جنيه</span>
                                <span>تاريخ الإضافة: {property.addedDate}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm">
                                <span>المالك: {property.ownerName}</span>
                                <span>البريد: {property.ownerEmail}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">
                                {typeLabels[property.type as keyof typeof typeLabels]}
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/property/${property.id}`)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteProperty(property.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminManagement;
