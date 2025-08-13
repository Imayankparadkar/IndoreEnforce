import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Video, Image, Book, Shield, Users, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Downloads() {
  const { t } = useTranslation();

  const downloadCategories = [
    {
      title: "Security Templates",
      icon: Shield,
      color: "bg-blue-500",
      items: [
        {
          name: "Incident Response Checklist",
          description: "Step-by-step cybersecurity incident response guide",
          type: "PDF",
          size: "2.3 MB",
          downloads: 1247
        },
        {
          name: "Security Assessment Template",
          description: "Comprehensive security evaluation framework",
          type: "Excel",
          size: "1.8 MB",
          downloads: 892
        },
        {
          name: "Risk Assessment Matrix",
          description: "Risk evaluation and mitigation planning tool",
          type: "Word",
          size: "1.2 MB",
          downloads: 654
        }
      ]
    },
    {
      title: "Training Materials",
      icon: Book,
      color: "bg-green-500",
      items: [
        {
          name: "Cybersecurity Awareness Guide",
          description: "Complete training manual for cybersecurity awareness",
          type: "PDF",
          size: "15.7 MB",
          downloads: 2341
        },
        {
          name: "Phishing Detection Training",
          description: "Interactive training materials for phishing recognition",
          type: "ZIP",
          size: "8.4 MB",
          downloads: 1876
        },
        {
          name: "Password Security Best Practices",
          description: "Guidelines for creating and managing secure passwords",
          type: "PDF",
          size: "3.2 MB",
          downloads: 1543
        }
      ]
    },
    {
      title: "Investigation Tools",
      icon: AlertTriangle,
      color: "bg-orange-500",
      items: [
        {
          name: "Digital Evidence Collection Kit",
          description: "Tools and procedures for digital evidence gathering",
          type: "ZIP",
          size: "45.2 MB",
          downloads: 567
        },
        {
          name: "Case Documentation Template",
          description: "Standardized template for cybercrime case documentation",
          type: "Word",
          size: "2.1 MB",
          downloads: 834
        },
        {
          name: "Forensic Analysis Checklist",
          description: "Comprehensive checklist for digital forensic analysis",
          type: "PDF",
          size: "1.9 MB",
          downloads: 723
        }
      ]
    },
    {
      title: "Public Resources",
      icon: Users,
      color: "bg-purple-500",
      items: [
        {
          name: "Cybercrime Reporting Guide",
          description: "How to report cybercrime incidents effectively",
          type: "PDF",
          size: "4.5 MB",
          downloads: 3247
        },
        {
          name: "Social Media Safety Tips",
          description: "Essential safety guidelines for social media users",
          type: "PDF",
          size: "2.8 MB",
          downloads: 2891
        },
        {
          name: "Online Banking Security",
          description: "Best practices for secure online banking",
          type: "PDF",
          size: "3.1 MB",
          downloads: 2134
        }
      ]
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'word':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'excel':
        return <FileText className="w-5 h-5 text-green-500" />;
      case 'zip':
        return <FileText className="w-5 h-5 text-purple-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Downloads Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access essential cybersecurity resources, templates, and training materials
          </p>
        </motion.div>

        <div className="grid gap-8">
          {downloadCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className={`${category.color} text-white`}>
                  <CardTitle className="flex items-center gap-3">
                    <category.icon className="w-6 h-6" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getFileIcon(item.type)}
                              <h3 className="font-semibold text-gray-900">{item.name}</h3>
                              <Badge variant="outline">{item.type}</Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{item.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Size: {item.size}</span>
                              <span>Downloads: {item.downloads.toLocaleString()}</span>
                            </div>
                          </div>
                          <Button className="ml-6 flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Popular Downloads Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-6 h-6" />
                Most Popular Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3,247</div>
                  <p className="text-gray-600">Cybercrime Reporting Guide</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">2,891</div>
                  <p className="text-gray-600">Social Media Safety Tips</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">2,341</div>
                  <p className="text-gray-600">Cybersecurity Awareness Guide</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}