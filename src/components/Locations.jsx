import React from 'react';
import { motion } from 'framer-motion';

function Locations() {
  const locations = [
    {
      title: "Bride's House",
      titleAr: "بيت العروس",
      time: "07:00 AM",
      address: "Bole Medhanialem, Addis Ababa",
      link: "https://www.google.com/maps/search/Bole+Medhanialem+Church+Addis+Ababa",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6657933937175!2d38.79057867499696!3d9.003460691060966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8593a8d9a4e3%3A0x2f9549320e402e6c!2sMedhane%20Alem%20Cathedral!5e0!3m2!1sen!2set!4v1715207460000!5m2!1sen!2set"
    },
    {
      title: "Groom's House",
      titleAr: "بيت العريس",
      time: "09:00 AM",
      address: "CMC Michael, Addis Ababa",
      link: "https://www.google.com/maps/search/CMC+Michael+Addis+Ababa",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.665!2d38.8504!3d9.0156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b90123456789%3A0x1234567890abcdef!2sCMC+Michael!5e0!3m2!1sen!2set!4v1715183424161!5m2!1sen!2set"
    },
    {
      title: "The Grand Venue",
      titleAr: "قاعة الاحتفال",
      time: "04:00 PM",
      address: "Sheraton Addis, Taitu St",
      link: "https://www.google.com/maps/search/Sheraton+Addis+Taitu+St+Addis+Ababa",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.672809187311!2d38.75739347576571!3d9.020275588825708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c8b74681fb%3A0x7d28ef3c9b7405e6!2sSheraton%20Addis%2C%20a%20Luxury%20Collection%20Hotel%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1715183424161!5m2!1sen!2set"
    }
  ];

  return (
    <section className="section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >Locations</motion.h2>
      
      <motion.div 
        className="geo-divider" 
        style={{ marginBottom: '48px' }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.4 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="geo-diamond" />
      </motion.div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {locations.map((loc, index) => (
          <motion.div 
            key={index}
            className="glass-card"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ margin: '-30px' }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(201, 168, 76, 0.3)' }}
            style={{ padding: '32px', transition: 'border-color 0.3s' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ 
                  fontSize: '10px', 
                  letterSpacing: '0.2em', 
                  color: 'var(--color-primary)', 
                  fontWeight: 500,
                  textTransform: 'uppercase'
                }}>{loc.time}</span>
                <h3 className="headline-md" style={{ marginTop: '8px', marginBottom: 0, fontSize: '20px' }}>{loc.title}</h3>
              </div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.35 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                style={{
                  fontFamily: "'Noto Sans Arabic', serif",
                  fontSize: '13px',
                  color: 'var(--color-primary)',
                  direction: 'rtl',
                  marginTop: '20px'
                }}
              >{loc.titleAr}</motion.span>
            </div>
            
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '13px', marginBottom: '20px' }}>{loc.address}</p>
            
            {/* Interactive Map */}
            <div style={{ 
              width: '100%', 
              height: '180px', 
              borderRadius: 'var(--rounded-lg)', 
              overflow: 'hidden', 
              marginBottom: '20px',
              border: '1px solid rgba(201, 168, 76, 0.1)'
            }}>
              <iframe
                title={loc.title}
                src={loc.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, opacity: 0.9 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <motion.a 
              href={loc.link} 
              target="_blank" 
              rel="noreferrer" 
              whileHover={{ opacity: 1 }}
              style={{ 
                color: 'var(--color-on-surface)', 
                textDecoration: 'none',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 500,
                borderBottom: '1px solid rgba(255,255,255,0.15)',
                paddingBottom: '2px',
                opacity: 0.7,
                transition: 'opacity 0.3s'
              }}
            >
              Open in Google Maps
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Locations;
