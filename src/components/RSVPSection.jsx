import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

function RSVPSection({ onRsvpSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    meal_preference: 'halal'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      setError("Please fill in both your name and email.");
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const ticketId = `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      if (import.meta.env.VITE_SUPABASE_URL) {
        const { error: sbError } = await supabase
          .from('guests')
          .insert([{ ...formData, ticket_id: ticketId }]);
        if (sbError) throw sbError;
      }

      localStorage.setItem('wedding_ticket_id', ticketId);
      localStorage.setItem('wedding_guest_name', formData.name);
      onRsvpSuccess(ticketId);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      filter: 'blur(10px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      filter: 'blur(10px)',
      transition: { duration: 0.3, ease: 'easeIn' }
    })
  };

  return (
    <section className="section" id="rsvp">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >RSVP</motion.h2>

      <div className="geo-divider" style={{ marginBottom: '40px' }}>
        <div className="geo-diamond" />
      </div>

      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ 
          padding: '48px 32px', 
          maxWidth: '500px', 
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Progress Bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.05)' }}>
          <motion.div 
            animate={{ width: `${(step / 3) * 100}%` }}
            style={{ height: '100%', background: 'var(--color-primary)', boxShadow: '0 0 10px var(--color-primary)' }}
          />
        </div>

        <p style={{ textAlign: 'center', color: 'var(--color-primary)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '32px', opacity: 0.6 }}>
          Step {step} of 3
        </p>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              background: 'rgba(211, 47, 47, 0.1)', 
              color: '#ff8a80', 
              padding: '12px', 
              marginBottom: '24px', 
              fontSize: '12px', 
              borderRadius: 'var(--rounded-md)',
              border: '1px solid rgba(211, 47, 47, 0.2)',
              textAlign: 'center'
            }}
          >
            {error}
          </motion.div>
        )}

        <div style={{ flex: 1, position: 'relative' }}>
          <AnimatePresence mode="wait" custom={step}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={1}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h3 style={{ fontSize: '22px', marginBottom: '24px', textAlign: 'center', letterSpacing: '0.05em' }}>Welcome, Who are you?</h3>
                <div className="form-group">
                  <label className="form-label" style={{ opacity: 0.5 }}>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="form-input" 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--glass-border)' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ opacity: 0.5 }}>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    className="form-input" 
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--glass-border)' }}
                  />
                </div>
                <button onClick={nextStep} className="btn btn-primary" style={{ marginTop: '24px', width: '100%' }}>
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={1}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h3 style={{ fontSize: '22px', marginBottom: '24px', textAlign: 'center', letterSpacing: '0.05em' }}>Will you be attending?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '20px', 
                    cursor: 'pointer',
                    background: formData.attending === 'yes' ? 'rgba(201, 168, 76, 0.15)' : 'rgba(255,255,255,0.02)',
                    border: formData.attending === 'yes' ? '1px solid var(--color-primary)' : '1px solid var(--glass-border)',
                    borderRadius: 'var(--rounded-lg)',
                    transition: 'all 0.3s'
                  }}>
                    <input type="radio" name="attending" value="yes" checked={formData.attending === 'yes'} onChange={handleChange} style={{ marginRight: '12px' }} />
                    <span style={{ fontSize: '14px', letterSpacing: '0.1em' }}>Yes, I'll be there!</span>
                  </label>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '20px', 
                    cursor: 'pointer',
                    background: formData.attending === 'no' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)',
                    border: formData.attending === 'no' ? '1px solid rgba(255,255,255,0.3)' : '1px solid var(--glass-border)',
                    borderRadius: 'var(--rounded-lg)',
                    transition: 'all 0.3s'
                  }}>
                    <input type="radio" name="attending" value="no" checked={formData.attending === 'no'} onChange={handleChange} style={{ marginRight: '12px' }} />
                    <span style={{ fontSize: '14px', letterSpacing: '0.1em', opacity: 0.7 }}>Respectfully, I can't make it</span>
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                  <button onClick={prevStep} className="btn btn-glass" style={{ flex: 1 }}>Back</button>
                  <button onClick={nextStep} className="btn btn-primary" style={{ flex: 2 }}>Next</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={1}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {formData.attending === 'yes' ? (
                  <>
                    <h3 style={{ fontSize: '22px', marginBottom: '12px', textAlign: 'center', letterSpacing: '0.05em' }}>One last thing...</h3>
                    <p style={{ textAlign: 'center', fontSize: '13px', opacity: 0.6, marginBottom: '24px' }}>Do you have any meal preferences?</p>
                    <div className="form-group">
                      <select 
                        name="meal_preference" 
                        className="form-input" 
                        value={formData.meal_preference}
                        onChange={handleChange}
                        style={{ background: 'rgba(255,255,255,0.05)', height: '56px', padding: '0 16px' }}
                      >
                        <option value="halal">Halal (Standard)</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="allergy">Other (Allergies)</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '12px', letterSpacing: '0.05em' }}>We'll miss you!</h3>
                    <p style={{ fontSize: '14px', opacity: 0.6, lineHeight: 1.6 }}>Thank you for letting us know. We appreciate your response.</p>
                  </div>
                )}
                
                <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                  <button onClick={prevStep} className="btn btn-glass" style={{ flex: 1 }}>Back</button>
                  <button 
                    onClick={handleSubmit} 
                    className="btn btn-primary" 
                    disabled={loading}
                    style={{ flex: 2 }}
                  >
                    {loading ? 'Sending...' : 'Confirm RSVP'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ fontSize: '12px', fontFamily: "'Noto Sans Arabic', serif", color: 'var(--color-primary)', opacity: 0.4 }}>
            بارك الله فيكم
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default RSVPSection;
