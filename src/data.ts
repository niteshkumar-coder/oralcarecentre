import { Service, Doctor, GalleryItem, Review, ContactInfo } from './types';

// Let's resolve the generated clinic images using Vite's native URL asset loader
const clinicExterior = 'https://i.ibb.co/1J6sBN0k/image.png';
const clinicReception = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&q=80&w=800';
const clinicTreatment = new URL('./assets/images/clinic_treatment_1782487578210.jpg', import.meta.url).href;

export const CLINIC_IMAGES = {
  exterior: clinicExterior,
  reception: clinicReception,
  treatment: clinicTreatment,
};

export const SERVICES: Service[] = [
  {
    id: 'general-dentistry',
    name: 'General Dentistry',
    icon: 'Stethoscope',
    description: 'Comprehensive dental exams, cleanings, and preventative care for all ages.',
    longDescription: 'Our general dentistry services focus on preventive oral health care. From routine cleanings to deep oral health assessments, we ensure your teeth and gums stay healthy throughout your life.',
    benefits: ['Prevent tooth decay', 'Early detection of issues', 'Fresh breath and clean gums']
  },
  {
    id: 'root-canal',
    name: 'Root Canal Treatment',
    icon: 'Activity',
    description: 'Advanced, pain-free therapy to save infected or severely damaged teeth.',
    longDescription: 'A highly precise micro-endodontic procedure to clean and seal infected root canals. Utilizing modern rotary files and apex locators, we ensure a virtually painless experience to save your natural teeth.',
    benefits: ['Pain relief from infection', 'Saves the natural tooth', 'Prevents infection spread']
  },
  {
    id: 'dental-implants',
    name: 'Dental Implants',
    icon: 'Hammer',
    description: 'Permanent, life-like tooth replacements that restore perfect bite and smile.',
    longDescription: 'Premium titanium implants capped with bio-compatible ceramic crowns. We restore full chewing functionality and facial structure with state-of-the-art computer-guided surgery.',
    benefits: ['Looks and feels like natural teeth', 'Preserves jawbone health', 'Lifetime durability with proper care']
  },
  {
    id: 'braces',
    name: 'Braces',
    icon: 'Grid',
    description: 'Traditional and ceramic corrective brackets to align teeth and correct bites.',
    longDescription: 'Orthodontic solutions designed to treat malocclusions, crowded teeth, and bite issues. We offer high-quality metal, ceramic, and self-ligating braces tailored to all age groups.',
    benefits: ['Perfectly aligned teeth', 'Improved bite functionality', 'Enhanced aesthetic confidence']
  },
  {
    id: 'aligners',
    name: 'Clear Aligners',
    icon: 'Layers',
    description: 'Virtually invisible, removable clear trays for comfortable teeth straightening.',
    longDescription: 'Advanced digital teeth alignment using customized transparent trays. Seamlessly adjust your teeth without metal brackets, enjoying maximum comfort and removable convenience.',
    benefits: ['Nearly invisible aesthetic', 'Fully removable for eating & brushing', 'Customized digital treatment path']
  },
  {
    id: 'teeth-whitening',
    name: 'Teeth Whitening',
    icon: 'Sparkles',
    description: 'Professional laser whitening systems for a brilliant, stain-free smile.',
    longDescription: 'Advanced in-office laser whitening system that brightens teeth up to 8 shades in just one session, removing stubborn stains from coffee, smoking, or age-related discoloration.',
    benefits: ['Immediate, visible results', 'Safe, dentist-supervised treatment', 'Stain-resistant formulation']
  },
  {
    id: 'smile-makeover',
    name: 'Smile Makeover',
    icon: 'Heart',
    description: 'A customized blend of cosmetic treatments to create your dream aesthetic.',
    longDescription: 'A bespoke facial-aesthetic approach combining veneers, crowns, and contouring to redesign your smile. Custom-designed to match your facial features, skin tone, and lip lines.',
    benefits: ['Complete aesthetic transformation', 'Boosts self-esteem and charisma', 'Addresses multiple cosmetic flaws']
  },
  {
    id: 'cosmetic-dentistry',
    name: 'Cosmetic Dentistry',
    icon: 'Smile',
    description: 'Veneers, bonding, and shaping to correct minor chips, gaps, and stains.',
    longDescription: 'Enhance your visual charm with premium composite bonding, porcelain veneers, and gum recontouring, focusing on facial harmony and pristine dental alignment.',
    benefits: ['Natural-looking enhancements', 'Minimally invasive options', 'Corrects structural imperfections']
  },
  {
    id: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    icon: 'Baby',
    description: 'Gentle, friendly, and fun dental care specially designed for children.',
    longDescription: 'Specialized dental care for infants, toddlers, and teens. We provide a fun, anxiety-free atmosphere, focusing on sealants, fluorides, and habit counseling.',
    benefits: ['Anxiety-free kid-friendly environment', 'Protects developing teeth', 'Promotes lifelong healthy habits']
  },
  {
    id: 'tooth-extraction',
    name: 'Tooth Extraction',
    icon: 'Scissors',
    description: 'Gentle, atraumatic removal of non-savable or impacted wisdom teeth.',
    longDescription: 'Surgical and non-surgical extraction procedures carried out under localized anesthesia. Focused on absolute patient comfort and rapid, uncomplicated healing.',
    benefits: ['Relieves chronic toothache', 'Prevents infection from spreading', 'Prepares mouth for restorations']
  },
  {
    id: 'dentures',
    name: 'Premium Dentures',
    icon: 'Award',
    description: 'Custom full and partial removable dentures for a natural and secure fit.',
    longDescription: 'Lightweight, modern prosthetic dentures designed to fit comfortably, restoring your capability to speak clearly and chew naturally. We offer both flexible and cast-metal partials.',
    benefits: ['Restores complete chewing ability', 'Natural looking custom aesthetics', 'Improves facial support']
  },
  {
    id: 'oral-surgery',
    name: 'Oral Surgery',
    icon: 'ShieldAlert',
    description: 'Advanced surgical interventions including bone grafting and jaw corrections.',
    longDescription: 'Expert surgical management of complex oral conditions, including impacted third molars, dental bone grafting, cyst removals, and pre-prosthetic jaw reconstruction.',
    benefits: ['Restores complex oral structure', 'Addresses deep anatomical issues', 'Highest standards of surgical safety']
  },
  {
    id: 'dental-filling',
    name: 'Dental Filling',
    icon: 'Paintbrush',
    description: 'Tooth-colored composite resins that repair cavities and blend seamlessly.',
    longDescription: 'Using premium tooth-colored composite resins, we repair decay-damaged teeth, returning full structural strength while maintaining an invisible, natural look.',
    benefits: ['Mercury-free composite materials', 'Matches natural tooth color', 'Restores bite durability']
  },
  {
    id: 'scaling-polishing',
    name: 'Scaling & Polishing',
    icon: 'Waves',
    description: 'Deep ultrasonic scaling to remove plaque and polish teeth for fresh oral health.',
    longDescription: 'Ultrasonic removal of tartar, calculus, and coffee stains. Finished with a fluoride polish to strengthen enamel, prevent gum disease, and restore smooth, clean surfaces.',
    benefits: ['Stops bleeding gums and gingivitis', 'Removes stubborn plaque/tartar', 'Polishes and brightens surface']
  },
  {
    id: 'crowns-bridges',
    name: 'Crowns & Bridges',
    icon: 'Gem',
    description: 'High-strength zirconium and ceramic crowns to restore decayed or missing teeth.',
    longDescription: 'Custom-milled porcelain-fused-to-metal and solid zirconia crowns and bridges. Restores broken, decayed, or missing teeth with extreme biological compatibility and biting strength.',
    benefits: ['Superior crown strength (Zirconia)', 'Bridges gaps seamlessly', 'Provides natural translucency']
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-pn-gupta',
    name: 'Dr. P.N. Gupta',
    title: 'Founder & Senior Consultant',
    qualification: 'BDS, MDS (Prosthodontics)',
    experience: '30+ Years of Experience',
    specialization: 'Prosthodontics & Implantology Specialist',
    image: 'https://picsum.photos/seed/drpn/400/500',
    bio: 'A visionary in modern dentistry in Gorakhpur. Dr. P.N. Gupta established the clinic with a philosophy of high-tech care and personal healing. He represents the first generation of elite dentistry at Oral Care Centre.'
  },
  {
    id: 'dr-mk-gupta',
    name: 'Dr. M.K. Gupta',
    title: 'Chief Dental Surgeon',
    qualification: 'BDS, MDS (Endodontics & Conservative Dentistry)',
    experience: '15+ Years of Experience',
    specialization: 'Micro-Endodontic Specialist & Implantologist',
    image: 'https://picsum.photos/seed/drmk/400/500',
    bio: 'With over 15 years of surgical brilliance, Dr. M.K. Gupta specializes in painless root canals and complex computer-guided implant surgeries. He combines technical precision with a patient-first approach.'
  },
  {
    id: 'dr-ayushi-jaiswal',
    name: 'Dr. Ayushi Jaiswal',
    title: 'Consultant Orthodontist & Cosmetic Dentist',
    qualification: 'BDS, MDS (Orthodontics & Dentofacial Orthopedics)',
    experience: '8+ Years of Experience',
    specialization: 'Clear Aligners & Facial Aesthetics Expert',
    image: 'https://picsum.photos/seed/drayushi/400/500',
    bio: 'Dedicated to designing stunning smiles. Dr. Ayushi specializes in clear aligners, modern orthodontic braces, and bespoke cosmetic smile makeovers, bringing international standard aesthetic dentistry to Gorakhpur.'
  }
];

export const TRUST_FACTS = [
  { value: '30+', label: 'Years Experience', desc: 'Over three decades of trust and clinical excellence across generations.' },
  { value: '10K+', label: 'Happy Patients', desc: 'Transforming smiles and boosting confidence for families in Gorakhpur.' },
  { value: '100%', label: 'Hygiene & Sterilization', desc: 'Strict class-B autoclave sterilization protocols for supreme safety.' },
  { value: '24/7', label: 'Emergency Support', desc: 'Prompt emergency dental assistance when you need urgent pain relief.' }
];

export const WHY_CHOOSE_US = [
  { title: 'Latest Technology', desc: 'Equipped with digital radiography, intraoral cameras, and modern rotary endodontics.', icon: 'Cpu' },
  { title: 'Experienced Doctors', desc: 'Our multi-speciality team brings over 30 combined years of elite clinical expertise.', icon: 'Award' },
  { title: 'Pain-Free Treatment', desc: 'Advanced anesthetic techniques and gentle procedures make every visit highly comfortable.', icon: 'Heart' },
  { title: 'Sterilized Instruments', desc: 'Multi-stage medical sterilization matching world-class hospital hygiene standards.', icon: 'Sparkles' },
  { title: 'Affordable Cost', desc: 'Transparent pricing with flexible options, making world-class dentistry accessible.', icon: 'CheckCircle' },
  { title: 'Digital X-Ray', desc: 'Instant low-radiation RVG digital X-rays for fast, highly accurate dental diagnoses.', icon: 'Shield' },
  { title: 'Emergency Support', desc: 'Immediate priority care for severe pain, tooth fractures, or trauma cases.', icon: 'PhoneCall' },
  { title: 'Personal Care', desc: 'Warm, customized treatment plans focused entirely on your unique oral goals.', icon: 'User' }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', category: 'exterior', title: 'Premium Hospital Front Elevation', image: clinicExterior },
  { id: 'g2', category: 'reception', title: 'Luxury Waiting Lobby & Desk', image: clinicReception },
  { id: 'g3', category: 'treatment', title: 'Modern Dental Operatory Suite', image: clinicTreatment },
  { id: 'g4', category: 'equipment', title: 'High-Resolution Digital Dental Unit', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80' },
  { id: 'g5', category: 'treatment', title: 'Sterilized Treatment Room 2', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80' },
  { id: 'g6', category: 'interior', title: 'Comfortable Patient Lounge', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Alok Srivastava',
    rating: 5,
    text: 'Oral Care Centre has been our family dental clinic for 2 generations. Dr. P.N. Gupta is highly experienced and Dr. M.K. Gupta recently performed a painless root canal on me. Highly recommend for their cleanliness and modern machines!',
    date: '2 weeks ago',
    avatar: 'https://picsum.photos/seed/user1/100/100'
  },
  {
    id: 'r2',
    name: 'Anjali Pandey',
    rating: 5,
    text: 'I underwent a smile makeover with clear aligners from Dr. Ayushi Jaiswal. She is extremely knowledgeable and explained every stage of the treatment with 3D digital scans. The results are amazing, and my confidence is back!',
    date: '1 month ago',
    avatar: 'https://picsum.photos/seed/user2/100/100'
  },
  {
    id: 'r3',
    name: 'Rajesh Mishra',
    rating: 5,
    text: 'Extremely clean and state-of-the-art clinic. They follow amazing sterilization steps. I got my dental implants done here, and there was zero discomfort. The fees are also very reasonable for such a premium setup.',
    date: '3 weeks ago',
    avatar: 'https://picsum.photos/seed/user3/100/100'
  },
  {
    id: 'r4',
    name: 'Preeti Jaiswal',
    rating: 5,
    text: 'Brought my 6-year-old child for cavity fillings. The doctors were incredibly gentle, and the child-friendly atmosphere completely removed his fear. Thank you Oral Care Centre team!',
    date: '1 month ago',
    avatar: 'https://picsum.photos/seed/user4/100/100'
  }
];

export const CONTACT_DATA: ContactInfo = {
  phone: '+91 94504 56789',
  whatsapp: '+91 94504 56789',
  email: 'info@oralcarecentre.in',
  address: 'Maili Nawa, Jogia Road, Gorakhpur, Uttar Pradesh - 273001',
  openingHours: {
    weekdays: '10:00 AM - 02:00 PM, 05:00 PM - 08:30 PM',
    saturday: '10:00 AM - 02:00 PM, 05:00 PM - 08:30 PM',
    sunday: '10:00 AM - 01:30 PM (By Appointment Only)'
  },
  emergencyContact: '+91 94152 12345',
  // High-fidelity Google Map embed URL centered on Maili Nawa area, Gorakhpur
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.4347209778404!2d83.362489!3d26.762145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39914436577df17d%3A0xe54d6b63f272a278!2sGorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1719400000000!5m2!1sen!2sin'
};
