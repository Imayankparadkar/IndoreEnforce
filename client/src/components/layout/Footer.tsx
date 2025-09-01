import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Youtube,
  ExternalLink
} from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: t('dashboard'), href: '/' },
        { label: t('Trinetra- Real-Time Threat Map'), href: '/vajra' },
        { label: t('Chanakya- AI Investigation Assistant'), href: '/kautilya' },
        // { label: t('mayajaal'), href: '/mayajaal' },
        { label: t('brahmanet'), href: '/brahmanet' },
        { label: t('officer'), href: '/officer' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: t('helpCenter'), href: '/help' },
        { label: 'User Guide', href: '/guide' },
        { label: 'Training Videos', href: '/training' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Report Bug', href: '/bug-report' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: t('privacyPolicy'), href: '/privacy' },
        { label: t('termsOfService'), href: '/terms' },
        { label: 'Data Protection', href: '/data-protection' },
        { label: 'Compliance', href: '/compliance' },
        { label: 'Accessibility', href: '/accessibility' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Cybercrime Prevention', href: '/prevention' },
        { label: 'Security Tips', href: '/security-tips' },
        { label: 'Incident Response', href: '/incident-response' },
        { label: 'Awareness Programs', href: '/awareness' },
        { label: 'Downloads', href: '/downloads' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const emergencyContacts = [
    { label: 'Cybercrime Helpline', value: '1930' },
    { label: 'Emergency', value: '100' },
    { label: 'Women Helpline', value: '1091' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Prahaar 360</h3>
                  <p className="text-gray-400 text-sm">Cyber Enforcement Suite</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Comprehensive AI-powered cybercrime reporting and prevention platform 
                designed to protect citizens of Indore, Madhya Pradesh from digital threats.
              </p>

              {/* Emergency Contacts */}
              <div className="space-y-2">
                <h4 className="font-semibold text-red-400">Emergency Contacts</h4>
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-red-400" />
                    <span className="text-gray-400">{contact.label}:</span>
                    <span className="font-bold text-red-400">{contact.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-lg mb-4 text-blue-400">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1 group"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-medium">Headquarters</h5>
                <p className="text-gray-400 text-sm">
                  Police Control Room, Indore<br />
                  Madhya Pradesh, India
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-medium">24/7 Support</h5>
                <p className="text-gray-400 text-sm">
                  +91-731-2545100<br />
                  cybercrime.indore@mp.gov.in
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-medium">Official Email</h5>
                <p className="text-gray-400 text-sm">
                  support@prahaar360.mp.gov.in<br />
                  reports@prahaar360.mp.gov.in
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-800 pt-6 flex flex-col lg:flex-row items-center justify-between gap-4"
        >
          <div className="text-center lg:text-left">
            <p className="text-gray-400 text-sm mb-2">
              © 2024 Prahaar 360 - Unified Cyber Enforcement Suite. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Developed by Madhya Pradesh Police in collaboration with cybersecurity experts.
              <br />
              Powered by AI technology for enhanced threat detection and prevention.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Follow us:</span>
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <IconComponent className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 pt-4 border-t border-gray-800"
        >
          <p className="text-center text-xs text-gray-500">
            <strong>Disclaimer:</strong> This platform is an official initiative by the Government of Madhya Pradesh. 
            Information provided here should be used responsibly. For emergency situations, contact local law enforcement immediately.
            All data is handled according to government privacy and security standards.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}