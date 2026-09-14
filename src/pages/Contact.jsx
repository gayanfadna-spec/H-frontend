import { useState } from 'react';
import { motion } from 'framer-motion';
import SEOComponent from '../components/SEOComponent';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const faqs = [
  {
    q: "How fast is delivery within Sri Lanka?",
    a: "Orders in Colombo and suburbs are delivered in 1-2 business days. All other 24 outstation districts typically take 2-4 business days via prompt door-to-door courier."
  },
  {
    q: "Can I pay using Cash on Delivery?",
    a: "Yes, absolutely. We support Cash on Delivery (COD) islandwide across Sri Lanka, as well as online Visa and Mastercard payments."
  },
  {
    q: "What is your return & exchange policy?",
    a: "We offer a hassle-free 7-day exchange window for unworn items with original tags and packaging. Simply contact our support hotline or WhatsApp us."
  },
  {
    q: "Are the jewelry pieces hypoallergenic & water-resistant?",
    a: "Yes, our gold-plated pieces feature durable anti-tarnish electroplating over surgical stainless steel or 925 sterling silver, ensuring gentle wear on sensitive skin."
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please complete all required fields');
      return;
    }
    setSubmitted(true);
    toast.success('Thank you! Your message has been sent to our concierge team.');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#F9F7F5] min-h-screen pt-8 pb-24"
    >
      <SEOComponent 
        title="Contact Concierge | ShopStore.lk" 
        description="Get in touch with ShopStore.lk. Customer support, WhatsApp hotline 070 280 9286, and Colombo inquiries." 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto my-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A87C] block mb-2">
            Client Care
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1A1A1A] mb-4">
            We're Here For You
          </h1>
          <p className="text-sm text-stone-600 font-light leading-relaxed">
            Have questions about a piece, sizing, or your delivery? Reach out to our dedicated client assistance team in Colombo.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F9F7F5] border border-stone-200 flex items-center justify-center text-[#C9A87C] mb-4">
                <FiPhone size={20} />
              </div>
              <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Direct Hotline</h3>
              <p className="text-xs text-stone-500 mb-3">Monday to Saturday, 9am - 7pm</p>
              <a href="tel:0702809286" className="text-base font-bold text-[#1A1A1A] hover:text-[#C9A87C] transition-colors">
                070 280 9286
              </a>
            </div>
            <a 
              href="https://wa.me/94702809286" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <FiMessageCircle size={14} /> WhatsApp Chat Available
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F9F7F5] border border-stone-200 flex items-center justify-center text-[#C9A87C] mb-4">
                <FiMail size={20} />
              </div>
              <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Email Inquiries</h3>
              <p className="text-xs text-stone-500 mb-3">Average response time: &lt; 4 hours</p>
              <a href="mailto:support@shopstore.lk" className="text-sm font-bold text-[#1A1A1A] hover:text-[#C9A87C] transition-colors">
                support@shopstore.lk
              </a>
            </div>
            <span className="mt-4 text-[11px] text-stone-400">Order updates & bulk inquiries</span>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F9F7F5] border border-stone-200 flex items-center justify-center text-[#C9A87C] mb-4">
                <FiMapPin size={20} />
              </div>
              <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Colombo Headquarters</h3>
              <p className="text-xs text-stone-500 mb-3">Order fulfillment & inspection center</p>
              <p className="text-xs font-medium text-[#1A1A1A]">
                Colombo 03, Western Province, Sri Lanka
              </p>
            </div>
            <span className="mt-4 text-[11px] text-[#C9A87C] font-semibold">Islandwide Courier Hub</span>
          </div>

        </div>

        {/* Message Form + FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-sm">
            <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-2">Send A Message</h2>
            <p className="text-xs text-stone-500 mb-8 font-light">Fill out the form below and we'll reply promptly.</p>

            {submitted ? (
              <div className="py-12 text-center bg-emerald-50 rounded-2xl p-6 text-emerald-900">
                <FiCheckCircle size={36} className="text-emerald-600 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">Message Received</h3>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto mb-6">
                  Thank you for contacting ShopStore.lk. A client care advisor will respond within a few hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ruwan Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C9A87C]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C9A87C]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input 
                      type="tel" 
                      placeholder="07X XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C9A87C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <input 
                      type="text" 
                      placeholder="Order Inquiry / Sizing / Custom"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C9A87C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Your Message *
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="How can we assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-4 bg-[#F9F7F5] border border-stone-300 rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C9A87C]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#C9A87C] text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <FiSend size={14} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">
              Frequently Asked Questions
            </h2>
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm">
                <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default Contact;
