import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, FileText, Clock, Shield, Users, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function IncidentResponse() {
  const { t } = useTranslation();

  const responseSteps = [
    {
      phase: "Immediate Response",
      timeframe: "0-30 minutes",
      icon: AlertTriangle,
      color: "bg-red-500",
      actions: [
        "Isolate affected systems",
        "Document time and nature of incident",
        "Notify incident response team",
        "Preserve evidence"
      ]
    },
    {
      phase: "Assessment",
      timeframe: "30 minutes - 2 hours",
      icon: FileText,
      color: "bg-orange-500",
      actions: [
        "Assess scope and impact",
        "Identify attack vectors",
        "Determine if data was compromised",
        "Notify law enforcement if required"
      ]
    },
    {
      phase: "Containment",
      timeframe: "2-24 hours",
      icon: Shield,
      color: "bg-yellow-500",
      actions: [
        "Implement containment measures",
        "Reset compromised credentials",
        "Apply security patches",
        "Monitor for continued activity"
      ]
    },
    {
      phase: "Recovery",
      timeframe: "1-7 days",
      icon: Users,
      color: "bg-blue-500",
      actions: [
        "Restore systems from clean backups",
        "Implement additional security measures",
        "Monitor for signs of reinfection",
        "Update security policies"
      ]
    }
  ];

  const emergencyContacts = [
    {
      title: "Cyber Crime Police Station",
      phone: "1930",
      description: "National cybercrime helpline"
    },
    {
      title: "Indore Cyber Cell",
      phone: "+91-731-2511100",
      description: "Local cybercrime investigation unit"
    },
    {
      title: "CERT-In",
      phone: "+91-11-24368572",
      description: "Computer Emergency Response Team"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Incident Response Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive cybersecurity incident response procedures for immediate action
          </p>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="text-center">
                    <h3 className="font-semibold text-red-800 mb-2">{contact.title}</h3>
                    <div className="text-2xl font-bold text-red-600 mb-1">{contact.phone}</div>
                    <p className="text-sm text-red-600">{contact.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Response Phases */}
        <div className="grid gap-8 mb-12">
          {responseSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="flex">
                  <div className={`${step.color} p-6 flex items-center justify-center`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{step.phase}</h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {step.timeframe}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {step.actions.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Incident Report Template */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-6 h-6" />
                Incident Report Template
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Download our comprehensive incident report template to ensure all critical information is captured during a cybersecurity incident.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  PDF Template
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Word Document
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Excel Spreadsheet
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}